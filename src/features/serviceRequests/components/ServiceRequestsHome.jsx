import { useMemo, useState } from "react";
import { ServiceRequestsTable } from "./ServiceRequestsTable";
import { ServiceRequestStatsCard } from "./ServiceRequestStatsCard";
import { ServiceRequestModal } from "./ServiceRequestModal";

const requestsData = [
    {
        _id: "665REQ001",
        clientId: {
            name: "Carlos Mendoza",
            email: "carlos@gmail.com"
        },
        categoryId: {
            name: "Plomería"
        },
        title: "Reparación de tubería",
        description:
            "Se necesita reparar una fuga de agua en la cocina.",
        address: "Mixco, Guatemala",
        latitude: 14.6349,
        longitude: -90.5069,
        budgetMin: 500,
        budgetMax: 1200,
        status: "OPEN",
        isActive: true,
        createdAt: "2026-04-10T10:00:00.000Z"
    },
    {
        _id: "665REQ002",
        clientId: {
            name: "Ana García",
            email: "ana@gmail.com"
        },
        categoryId: {
            name: "Electricidad"
        },
        title: "Instalación eléctrica",
        description:
            "Instalación completa de cableado en habitación.",
        address: "Villa Nueva",
        latitude: 14.52,
        longitude: -90.58,
        budgetMin: 1500,
        budgetMax: 3000,
        status: "IN_PROGRESS",
        isActive: true,
        createdAt: "2026-04-11T09:00:00.000Z"
    },
    {
        _id: "665REQ003",
        clientId: {
            name: "José Ramírez"
        },
        categoryId: {
            name: "Albañilería"
        },
        title: "Construcción de muro",
        description:
            "Construcción de muro perimetral de block.",
        address: "Zona 18",
        latitude: 14.65,
        longitude: -90.45,
        budgetMin: 4000,
        budgetMax: 7000,
        status: "CANCELLED",
        isActive: false,
        createdAt: "2026-04-09T08:00:00.000Z"
    }
];

export const ServiceRequestsHome = () => {
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("ALL");
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedRequest, setSelectedRequest] = useState(null);

    const itemsPerPage = 8;

    const normalizedRequests = useMemo(() => {
        return requestsData.map((request) => ({
            ...request,

            id: request._id,

            clientName:
                request.clientId?.name || "Sin cliente",

            categoryName:
                request.categoryId?.name || "Sin categoría",

            budgetRange: `Q ${request.budgetMin} - Q ${request.budgetMax}`,

            date: new Date(request.createdAt).toLocaleDateString("es-GT", {
                day: "2-digit",
                month: "short",
                year: "numeric"
            })
        }));
    }, []);

    const filteredRequests = normalizedRequests.filter((request) => {
        const searchText = search.toLowerCase();

        const matchSearch =
            request.title.toLowerCase().includes(searchText) ||
            request.clientName.toLowerCase().includes(searchText) ||
            request.categoryName.toLowerCase().includes(searchText) ||
            request.id.toLowerCase().includes(searchText);

        const matchStatus =
            statusFilter === "ALL"
                ? true
                : request.status === statusFilter;

        return matchSearch && matchStatus;
    });

    const totalPages = Math.ceil(filteredRequests.length / itemsPerPage);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const currentRequests = filteredRequests.slice(startIndex, endIndex);

    const totalRequests = normalizedRequests.length;

    const openRequests = normalizedRequests.filter(
        (request) => request.status === "OPEN"
    ).length;

    const progressRequests = normalizedRequests.filter(
        (request) => request.status === "IN_PROGRESS"
    ).length;

    const completedRequests = normalizedRequests.filter(
        (request) => request.status === "COMPLETED"
    ).length;

    const canceledRequests = normalizedRequests.filter(
        (request) => request.status === "CANCELLED"
    ).length;

    return (
        <section className="space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-[#0F172A]">
                        Solicitudes de Servicio
                    </h1>

                    <p className="text-sm text-gray-500">
                        Administración de solicitudes publicadas por clientes
                    </p>
                </div>

                <div className="w-fit px-4 py-2 rounded-full bg-blue-50 border border-blue-200 text-blue-600 text-sm font-medium flex items-center gap-2">
                    <span className="text-blue-500">●</span>
                    <span>{openRequests} abiertas</span>
                </div>
            </div>

            <article className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-5 border-b border-gray-100">
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value);
                            setCurrentPage(1);
                        }}
                        placeholder="Buscar por título, cliente, categoría o ID..."
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none text-sm text-gray-600 placeholder:text-gray-400 focus:border-green-400 focus:ring-2 focus:ring-green-100"
                    />
                </div>

                <div className="px-5 py-4 border-b border-gray-100">
                    <div className="flex flex-wrap gap-4">
                        <StatusButton
                            text="Todos"
                            value="ALL"
                            count={totalRequests}
                            current={statusFilter}
                            onClick={setStatusFilter}
                        />

                        <StatusButton
                            text="Abiertas"
                            value="OPEN"
                            count={openRequests}
                            current={statusFilter}
                            onClick={setStatusFilter}
                        />

                        <StatusButton
                            text="En progreso"
                            value="IN_PROGRESS"
                            count={progressRequests}
                            current={statusFilter}
                            onClick={setStatusFilter}
                        />

                        <StatusButton
                            text="Completadas"
                            value="COMPLETED"
                            count={completedRequests}
                            current={statusFilter}
                            onClick={setStatusFilter}
                        />

                        <StatusButton
                            text="Canceladas"
                            value="CANCELLED"
                            count={canceledRequests}
                            current={statusFilter}
                            onClick={setStatusFilter}
                        />
                    </div>
                </div>

                <ServiceRequestsTable
                    requests={currentRequests}
                    onViewRequest={setSelectedRequest}
                />
            </article>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                <ServiceRequestStatsCard
                    value={totalRequests}
                    label="Total solicitudes"
                    color="text-[#0F172A]"
                />

                <ServiceRequestStatsCard
                    value={openRequests}
                    label="Abiertas"
                    color="text-blue-500"
                    bg="bg-blue-50"
                />

                <ServiceRequestStatsCard
                    value={progressRequests}
                    label="En progreso"
                    color="text-yellow-500"
                    bg="bg-yellow-50"
                />

                <ServiceRequestStatsCard
                    value={completedRequests}
                    label="Completadas"
                    color="text-green-500"
                    bg="bg-green-50"
                />
            </div>

            {selectedRequest && (
                <ServiceRequestModal
                    request={selectedRequest}
                    onClose={() => setSelectedRequest(null)}
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