// src/features/verifications/components/VerificationsHome.jsx
import { useState, useEffect } from 'react';
import { useVerificationStore } from '../../users/Store/adminStore.js';
import { useVerificationActions } from '../hook/useVerificationActions.js';
import { VerificationHeader }    from './VerificationHeader.jsx';
import { VerificationStatsCard } from './VerificationStatsCard.jsx';
import { VerificationsFilters }  from './VerificationsFilters.jsx';
import { VerificationsTable }    from './VerificationsTable.jsx';
import { VerificationModal }     from './VerificationModal.jsx';

export const VerificationsHome = () => {
    const verifications = useVerificationStore((state) => state.verifications);
    const loading       = useVerificationStore((state) => state.loading);
    const error         = useVerificationStore((state) => state.error);

    const { handleFetch, handleApprove, handleReject, handleClearError } = useVerificationActions();

    const [search, setSearch]               = useState('');
    const [statusFilter, setStatusFilter]   = useState('Todos');
    const [urgencyFilter, setUrgencyFilter] = useState('Todas');
    const [selectedVerification, setSelectedVerification] = useState(null);

    useEffect(() => {
        handleFetch();
    }, []);

    const getUrgency = (createdAt) => {
        const hours = (Date.now() - new Date(createdAt).getTime()) / (1000 * 60 * 60);
        if (hours >= 48) return 'Alta';
        if (hours >= 24) return 'Media';
        return 'Baja';
    };

    const filteredVerifications = verifications.filter((v) => {
        const text     = search.toLowerCase();
        const fullName = `${v.userId?.firstName || ''} ${v.userId?.lastName || ''}`.toLowerCase();

        const matchSearch =
            fullName.includes(text) ||
            v.userId?.email?.toLowerCase().includes(text) ||
            v.documentNumber?.toLowerCase().includes(text);

        const matchStatus  = statusFilter === 'Todos' || v.status === statusFilter;
        const matchUrgency = urgencyFilter === 'Todas' || getUrgency(v.createdAt) === urgencyFilter;

        return matchSearch && matchStatus && matchUrgency;
    });

    const totalRequests    = verifications.length;
    const pendingRequests  = verifications.filter((v) => v.status === 'PENDING').length;
    const approvedRequests = verifications.filter((v) => v.status === 'APPROVED').length;
    const rejectedRequests = verifications.filter((v) => v.status === 'REJECTED').length;

    // Aprobar desde la tabla (sin modal abierto)
    const onApprove = (id, onSuccess) => {
        handleApprove(id, onSuccess);
    };

    // Rechazar desde la tabla: abre el modal con ese registro
    // para que el input de razón aparezca ahí dentro
    const onRejectFromTable = (id) => {
        const found = verifications.find((v) => v._id === id);
        if (found) setSelectedVerification(found);
    };

    return (
        <section className="space-y-6">
            <VerificationHeader pendingCount={pendingRequests} />

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                <VerificationStatsCard value={totalRequests}    label="Total solicitudes" color="text-[#0F172A]" />
                <VerificationStatsCard value={pendingRequests}  label="Pendientes"         color="text-yellow-500" />
                <VerificationStatsCard value={approvedRequests} label="Aprobados"          color="text-green-500" />
                <VerificationStatsCard value={rejectedRequests} label="Rechazados"         color="text-red-500" />
            </div>

            {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl flex items-center justify-between">
                    <span>{error}</span>
                    <button
                        onClick={handleClearError}
                        className="ml-4 text-red-400 hover:text-red-600 font-bold"
                    >
                        ×
                    </button>
                </div>
            )}

            <article className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <VerificationsFilters
                    search={search}
                    onSearchChange={setSearch}
                    statusFilter={statusFilter}
                    onStatusFilterChange={setStatusFilter}
                    urgencyFilter={urgencyFilter}
                    onUrgencyFilterChange={setUrgencyFilter}
                    filteredCount={filteredVerifications.length}
                />

                {loading ? (
                    <div className="px-5 py-16 text-center text-gray-400 text-sm">
                        Cargando verificaciones...
                    </div>
                ) : (
                    <VerificationsTable
                        verifications={filteredVerifications}
                        totalVerifications={verifications.length}
                        pendingCount={pendingRequests}
                        onView={setSelectedVerification}
                        onApprove={onApprove}
                        onReject={onRejectFromTable}
                    />
                )}
            </article>

            {selectedVerification && (
                <VerificationModal
                    verification={selectedVerification}
                    onClose={() => setSelectedVerification(null)}
                    onApprove={onApprove}
                    onReject={handleReject}
                />
            )}
        </section>
    );
};