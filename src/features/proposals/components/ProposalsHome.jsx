import { useMemo, useState, useEffect } from "react";
import { ProposalsTable } from "./ProposalsTable";
import { ProposalStatsCard } from "./ProposalStatsCard";
import { ProposalModal } from "./ProposalModal";
import { useProposalStore } from "../../users/store/adminStore.js";

export const ProposalsHome = () => {
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("ALL");
    const [selectedProposal, setSelectedProposal] = useState(null);

    const { proposals, loading, getProposals } = useProposalStore();

    useEffect(() => {
        getProposals();
    }, [getProposals]);

    // ── Normalización robusta ante campos null ─────────────────────────────
    const normalizedProposals = useMemo(() => {
        return proposals.map((proposal) => ({
            ...proposal,

            id: proposal._id,

            // serviceRequestId puede ser null si el documento fue eliminado
            requestTitle: proposal.serviceRequestId?.title || "Solicitud eliminada",
            requestId:    proposal.serviceRequestId?._id  || "N/A",

            // workerId puede ser null si el usuario fue eliminado
            workerName: proposal.workerId
                ? `${proposal.workerId.firstName ?? ""} ${proposal.workerId.lastName ?? ""}`.trim() || "Sin nombre"
                : "Usuario eliminado",

            formattedPrice: `Q ${proposal.price?.toLocaleString("es-GT") ?? 0}`,

            date: new Date(proposal.createdAt).toLocaleDateString("es-GT", {
                day: "2-digit",
                month: "short",
                year: "numeric",
            }),
        }));
    }, [proposals]);

    // ── Filtrado — seguro aunque los campos sean fallback strings ──────────
    const filteredProposals = normalizedProposals.filter((proposal) => {
        const searchText = search.toLowerCase();

        const matchSearch =
            proposal.requestTitle.toLowerCase().includes(searchText) ||
            proposal.workerName.toLowerCase().includes(searchText) ||
            proposal.id.toLowerCase().includes(searchText);

        const matchStatus =
            statusFilter === "ALL" ? true : proposal.status === statusFilter;

        return matchSearch && matchStatus;
    });

    // ── Contadores ─────────────────────────────────────────────────────────
    const totalProposals     = normalizedProposals.length;
    const pendingProposals   = normalizedProposals.filter((p) => p.status === "PENDING").length;
    const acceptedProposals  = normalizedProposals.filter((p) => p.status === "ACCEPTED").length;
    const rejectedProposals  = normalizedProposals.filter((p) => p.status === "REJECTED").length;
    const cancelledProposals = normalizedProposals.filter((p) => p.status === "CANCELLED").length;

    // Sincroniza el modal si la propuesta seleccionada fue modificada en el store
    useEffect(() => {
        if (!selectedProposal) return;
        const updated = normalizedProposals.find((p) => p.id === selectedProposal.id);
        if (updated) setSelectedProposal(updated);
    }, [proposals]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <section className="space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-[#0F172A]">Propuestas</h1>
                    <p className="text-sm text-gray-500">
                        Administración de propuestas enviadas por trabajadores
                    </p>
                </div>

                <div className="w-fit px-4 py-2 rounded-full bg-yellow-50 border border-yellow-200 text-yellow-600 text-sm font-medium flex items-center gap-2">
                    <span className="text-yellow-500">●</span>
                    <span>{pendingProposals} pendientes</span>
                </div>
            </div>

            <article className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                {/* Búsqueda */}
                <div className="p-5 border-b border-gray-100">
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Buscar por solicitud, trabajador o ID..."
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none text-sm text-gray-600 placeholder:text-gray-400 focus:border-green-400 focus:ring-2 focus:ring-green-100"
                    />
                </div>

                {/* Filtros de estado */}
                <div className="px-5 py-4 border-b border-gray-100">
                    <div className="flex flex-wrap gap-4">
                        <StatusButton text="Todos"      value="ALL"       count={totalProposals}     current={statusFilter} onClick={setStatusFilter} />
                        <StatusButton text="Pendientes" value="PENDING"   count={pendingProposals}   current={statusFilter} onClick={setStatusFilter} />
                        <StatusButton text="Aceptadas"  value="ACCEPTED"  count={acceptedProposals}  current={statusFilter} onClick={setStatusFilter} />
                        <StatusButton text="Rechazadas" value="REJECTED"  count={rejectedProposals}  current={statusFilter} onClick={setStatusFilter} />
                        <StatusButton text="Canceladas" value="CANCELLED" count={cancelledProposals} current={statusFilter} onClick={setStatusFilter} />
                    </div>
                </div>

                {/* Tabla o spinner */}
                {loading && proposals.length === 0 ? (
                    <div className="flex justify-center py-12">
                    </div>
                ) : (
                    <ProposalsTable
                        proposals={filteredProposals}
                        onViewProposal={setSelectedProposal}
                    />
                )}
            </article>

            {/* Tarjetas de estadísticas */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                <ProposalStatsCard value={totalProposals}     label="Total propuestas" color="text-[#0F172A]" />
                <ProposalStatsCard value={pendingProposals}   label="Pendientes"       color="text-yellow-500" bg="bg-yellow-50" />
                <ProposalStatsCard value={acceptedProposals}  label="Aceptadas"        color="text-green-500"  bg="bg-green-50" />
                <ProposalStatsCard value={rejectedProposals}  label="Rechazadas"       color="text-red-500"    bg="bg-red-50" />
            </div>

            {/* Modal de detalle */}
            {selectedProposal && (
                <ProposalModal
                    proposal={selectedProposal}
                    onClose={() => setSelectedProposal(null)}
                />
            )}
        </section>
    );
};

const StatusButton = ({ text, value, count, current, onClick }) => {
    const active = current === value;
    return (
        <button
            onClick={() => onClick(value)}
            className={`px-4 py-2 rounded-2xl text-sm font-semibold transition flex items-center gap-2 ${
                active ? "bg-[#0F172A] text-white" : "text-gray-500 hover:bg-gray-100"
            }`}
        >
            <span>{text}</span>
            <span className={`px-2 py-0.5 rounded-full text-xs ${active ? "bg-white/20 text-white" : "bg-gray-100 text-gray-500"}`}>
                {count}
            </span>
        </button>
    );
};