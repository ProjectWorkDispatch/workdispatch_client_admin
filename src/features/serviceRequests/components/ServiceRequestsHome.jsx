import { useEffect, useMemo, useState } from 'react';
import { useServiceRequestStore }    from '../../users/Store/adminStore.js';
import { useServiceRequestActions }  from '../hook/useServiceRequestActions.js';
import { ServiceRequestHeader }      from './ServiceRequestHeader.jsx';
import { ServiceRequestStatsCard }   from './ServiceRequestStatsCard.jsx';
import { ServiceRequestTable }       from './ServiceRequestTable.jsx';
import { ServiceRequestCards }       from './ServiceRequestCards.jsx';
import { ServiceRequestModal }       from './ServiceRequestModal.jsx';

const ITEMS_PER_PAGE = 10;

const STATUS_FILTERS = [
    { value: 'ALL',         label: 'Todos' },
    { value: 'OPEN',        label: 'Abiertas' },
    { value: 'IN_PROGRESS', label: 'En progreso' },
    { value: 'COMPLETED',   label: 'Completadas' },
    { value: 'CANCELLED',   label: 'Canceladas' },
    { value: 'CLOSED',      label: 'Cerradas' },
];

export const ServiceRequestsHome = () => {
    const serviceRequests = useServiceRequestStore((s) => s.serviceRequests);
    const loading         = useServiceRequestStore((s) => s.loading);
    const error           = useServiceRequestStore((s) => s.error);

    const { handleFetchAll, handleClearError } = useServiceRequestActions();

    const [search, setSearch]             = useState('');
    const [statusFilter, setStatusFilter] = useState('ALL');
    const [currentPage, setCurrentPage]   = useState(1);
    const [selected, setSelected]         = useState(null);

    useEffect(() => {
        handleFetchAll();
    }, []);

    const normalizedRequests = useMemo(() => {
        return serviceRequests.map((req) => ({
            ...req,
            _clientName:
                req.clientId?.firstName
                    ? `${req.clientId.firstName} ${req.clientId.lastName ?? ''}`.trim()
                    : req.clientId?.name ?? 'Sin cliente',
            _categoryName: req.categoryId?.name ?? 'Sin categoría',
            _budgetRange:  `Q ${req.budgetMin ?? 0} – Q ${req.budgetMax ?? 0}`,
            _date: req.createdAt
                ? new Date(req.createdAt).toLocaleDateString('es-GT', {
                      day: '2-digit', month: 'short', year: 'numeric',
                  })
                : '—',
        }));
    }, [serviceRequests]);

    const counts = useMemo(() => ({
        ALL:         normalizedRequests.length,
        OPEN:        normalizedRequests.filter((r) => r.status === 'OPEN').length,
        IN_PROGRESS: normalizedRequests.filter((r) => r.status === 'IN_PROGRESS').length,
        COMPLETED:   normalizedRequests.filter((r) => r.status === 'COMPLETED').length,
        CANCELLED:   normalizedRequests.filter((r) => r.status === 'CANCELLED').length,
        CLOSED:      normalizedRequests.filter((r) => r.status === 'CLOSED').length,
    }), [normalizedRequests]);

    const filtered = useMemo(() => {
        const text = search.toLowerCase().trim();
        return normalizedRequests.filter((req) => {
            const matchSearch =
                !text ||
                req.title?.toLowerCase().includes(text) ||
                req._clientName.toLowerCase().includes(text) ||
                req._categoryName.toLowerCase().includes(text) ||
                req._id.toLowerCase().includes(text);
            const matchStatus = statusFilter === 'ALL' || req.status === statusFilter;
            return matchSearch && matchStatus;
        });
    }, [normalizedRequests, search, statusFilter]);

    const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const paginated  = filtered.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    const handleSearch = (e) => {
        setSearch(e.target.value);
        setCurrentPage(1);
    };

    const handleFilterChange = (value) => {
        setStatusFilter(value);
        setCurrentPage(1);
    };

    return (
        <section className="space-y-6">

            <ServiceRequestHeader
                openCount={counts.OPEN}
                loading={loading}
                onRefresh={handleFetchAll}
            />

            {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl flex items-center justify-between">
                    <span>{error}</span>
                    <button
                        onClick={handleClearError}
                        className="text-red-400 hover:text-red-600 text-lg leading-none ml-4"
                    >
                        ×
                    </button>
                </div>
            )}

            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3">
                <ServiceRequestStatsCard value={counts.ALL}         label="Total"       color="text-[#0F172A]" />
                <ServiceRequestStatsCard value={counts.OPEN}        label="Abiertas"    color="text-blue-500"   bg="bg-blue-50" />
                <ServiceRequestStatsCard value={counts.IN_PROGRESS} label="En progreso" color="text-yellow-500" bg="bg-yellow-50" />
                <ServiceRequestStatsCard value={counts.COMPLETED}   label="Completadas" color="text-green-500"  bg="bg-green-50" />
                <ServiceRequestStatsCard value={counts.CANCELLED}   label="Canceladas"  color="text-red-500"    bg="bg-red-50" />
                <ServiceRequestStatsCard value={counts.CLOSED}      label="Cerradas"    color="text-gray-500"   bg="bg-gray-50" />
            </div>

            <article className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">

                <div className="p-5 border-b border-gray-100">
                    <input
                        type="text"
                        value={search}
                        onChange={handleSearch}
                        placeholder="Buscar por título, cliente, categoría o ID…"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none text-sm
                                   text-gray-600 placeholder:text-gray-400
                                   focus:border-green-400 focus:ring-2 focus:ring-green-100 transition"
                    />
                </div>

                <div className="px-5 py-4 border-b border-gray-100 overflow-x-auto">
                    <div className="flex gap-2 min-w-max">
                        {STATUS_FILTERS.map(({ value, label }) => (
                            <StatusFilterButton
                                key={value}
                                label={label}
                                value={value}
                                count={counts[value]}
                                active={statusFilter === value}
                                onClick={handleFilterChange}
                            />
                        ))}
                    </div>
                </div>

                {loading && serviceRequests.length === 0 ? (
                    <div className="py-16 text-center text-gray-400 text-sm">
                        Cargando solicitudes…
                    </div>
                ) : (
                    <>
                        <ServiceRequestTable requests={paginated} onView={setSelected} />
                        <div className="p-4 md:hidden">
                            <ServiceRequestCards requests={paginated} onView={setSelected} />
                        </div>
                    </>
                )}

                {totalPages > 1 && (
                    <div className="px-5 py-4 border-t border-gray-100 flex items-center justify-between text-sm">
                        <span className="text-gray-400">
                            {startIndex + 1}–{Math.min(startIndex + ITEMS_PER_PAGE, filtered.length)} de {filtered.length}
                        </span>
                        <div className="flex gap-2">
                            <button
                                disabled={currentPage === 1}
                                onClick={() => setCurrentPage((p) => p - 1)}
                                className="px-3 py-1.5 rounded-lg border border-gray-200 text-gray-600
                                           hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
                            >
                                ← Anterior
                            </button>
                            <button
                                disabled={currentPage === totalPages}
                                onClick={() => setCurrentPage((p) => p + 1)}
                                className="px-3 py-1.5 rounded-lg border border-gray-200 text-gray-600
                                           hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
                            >
                                Siguiente →
                            </button>
                        </div>
                    </div>
                )}
            </article>

            {selected && (
                <ServiceRequestModal
                    request={selected}
                    onClose={() => setSelected(null)}
                />
            )}
        </section>
    );
};

const StatusFilterButton = ({ label, value, count, active, onClick }) => (
    <button
        onClick={() => onClick(value)}
        className={`px-4 py-2 rounded-2xl text-sm font-semibold transition flex items-center gap-2 whitespace-nowrap ${
            active ? 'bg-[#0F172A] text-white' : 'text-gray-500 hover:bg-gray-100'
        }`}
    >
        <span>{label}</span>
        <span className={`px-2 py-0.5 rounded-full text-xs ${
            active ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-500'
        }`}>
            {count}
        </span>
    </button>
);