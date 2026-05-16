import { useMemo, useState } from "react";
import { ProposalsTable } from "./ProposalsTable";
import { ProposalStatsCard } from "./ProposalStatsCard";
import { ProposalModal } from "./ProposalModal";

const proposalsData = [
    {
        _id: "PROP001",
        serviceRequestId: {
            _id: "REQ001",
            title: "Reparación de tubería"
        },
        workerId: {
            name: "Pedro Jiménez",
            email: "pedro@gmail.com"
        },
        price: 1200,
        message:
            "Tengo experiencia en reparaciones de tuberías residenciales.",
        status: "PENDING",
        deletedAt: null,
        createdAt: "2026-04-12T10:00:00.000Z"
    },
    {
        _id: "PROP002",
        serviceRequestId: {
            _id: "REQ002",
            title: "Instalación eléctrica"
        },
        workerId: {
            name: "Luis Hernández"
        },
        price: 2500,
        message:
            "Puedo realizar la instalación completa en 2 días.",
        status: "ACCEPTED",
        deletedAt: null,
        createdAt: "2026-04-13T08:00:00.000Z"
    },
    {
        _id: "PROP003",
        serviceRequestId: {
            _id: "REQ003",
            title: "Construcción de muro"
        },
        workerId: {
            name: "Mario López"
        },
        price: 6000,
        message:
            "Incluye materiales y mano de obra.",
        status: "REJECTED",
        deletedAt: null,
        createdAt: "2026-04-11T06:00:00.000Z"
    }
];

export const ProposalsHome = () => {
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("ALL");
    const [selectedProposal, setSelectedProposal] = useState(null);

    const normalizedProposals = useMemo(() => {
        return proposalsData.map((proposal) => ({
            ...proposal,

            id: proposal._id,

            requestTitle:
                proposal.serviceRequestId?.title || "Sin solicitud",

            requestId:
                proposal.serviceRequestId?._id || "Sin ID",

            workerName:
                proposal.workerId?.name || "Sin trabajador",

            formattedPrice: `Q ${proposal.price}`,

            date: new Date(
                proposal.createdAt
            ).toLocaleDateString("es-GT", {
                day: "2-digit",
                month: "short",
                year: "numeric"
            })
        }));
    }, []);

    const filteredProposals = normalizedProposals.filter((proposal) => {
        const searchText = search.toLowerCase();

        const matchSearch =
            proposal.requestTitle.toLowerCase().includes(searchText) ||
            proposal.workerName.toLowerCase().includes(searchText) ||
            proposal.id.toLowerCase().includes(searchText);

        const matchStatus =
            statusFilter === "ALL"
                ? true
                : proposal.status === statusFilter;

        return matchSearch && matchStatus;
    });

    const totalProposals = normalizedProposals.length;

    const pendingProposals = normalizedProposals.filter(
        (proposal) => proposal.status === "PENDING"
    ).length;

    const acceptedProposals = normalizedProposals.filter(
        (proposal) => proposal.status === "ACCEPTED"
    ).length;

    const rejectedProposals = normalizedProposals.filter(
        (proposal) => proposal.status === "REJECTED"
    ).length;

    const cancelledProposals = normalizedProposals.filter(
        (proposal) => proposal.status === "CANCELLED"
    ).length;

    return (
        <section className="space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-[#0F172A]">
                        Propuestas
                    </h1>

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
                <div className="p-5 border-b border-gray-100">
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Buscar por solicitud, trabajador o ID..."
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none text-sm text-gray-600 placeholder:text-gray-400 focus:border-green-400 focus:ring-2 focus:ring-green-100"
                    />
                </div>

                <div className="px-5 py-4 border-b border-gray-100">
                    <div className="flex flex-wrap gap-4">
                        <StatusButton
                            text="Todos"
                            value="ALL"
                            count={totalProposals}
                            current={statusFilter}
                            onClick={setStatusFilter}
                        />

                        <StatusButton
                            text="Pendientes"
                            value="PENDING"
                            count={pendingProposals}
                            current={statusFilter}
                            onClick={setStatusFilter}
                        />

                        <StatusButton
                            text="Aceptadas"
                            value="ACCEPTED"
                            count={acceptedProposals}
                            current={statusFilter}
                            onClick={setStatusFilter}
                        />

                        <StatusButton
                            text="Rechazadas"
                            value="REJECTED"
                            count={rejectedProposals}
                            current={statusFilter}
                            onClick={setStatusFilter}
                        />

                        <StatusButton
                            text="Canceladas"
                            value="CANCELLED"
                            count={cancelledProposals}
                            current={statusFilter}
                            onClick={setStatusFilter}
                        />
                    </div>
                </div>

                <ProposalsTable
                    proposals={filteredProposals}
                    onViewProposal={setSelectedProposal}
                />
            </article>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                <ProposalStatsCard
                    value={totalProposals}
                    label="Total propuestas"
                    color="text-[#0F172A]"
                />

                <ProposalStatsCard
                    value={pendingProposals}
                    label="Pendientes"
                    color="text-yellow-500"
                    bg="bg-yellow-50"
                />

                <ProposalStatsCard
                    value={acceptedProposals}
                    label="Aceptadas"
                    color="text-green-500"
                    bg="bg-green-50"
                />

                <ProposalStatsCard
                    value={rejectedProposals}
                    label="Rechazadas"
                    color="text-red-500"
                    bg="bg-red-50"
                />
            </div>

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
                active
                    ? "bg-[#0F172A] text-white"
                    : "text-gray-500 hover:bg-gray-100"
            }`}
        >
            <span>{text}</span>

            <span
                className={`px-2 py-0.5 rounded-full text-xs ${
                    active
                        ? "bg-white/20 text-white"
                        : "bg-gray-100 text-gray-500"
                }`}
            >
                {count}
            </span>
        </button>
    );
};