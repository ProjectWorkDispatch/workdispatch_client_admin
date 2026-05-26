import { useMemo, useState, useEffect } from "react";
import { ServicesTable } from "./ServicesTable";
import { ServiceStatsCard } from "./ServiceStatsCard";
import { ServiceModal } from "./ServiceModal";
import { useServiceStore } from "../../users/Store/adminStore";

export const ServicesHome = () => {
    const { services, loading, fetchServices } = useServiceStore();
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("ALL");
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedService, setSelectedService] = useState(null);

    const itemsPerPage = 8;

    useEffect(() => {
        fetchServices();
    }, []);

    const normalizedServices = useMemo(() => {
        return (Array.isArray(services) ? services : []).map((service) => ({
            ...service,
            id: service._id,
            requestCode: service.requestId?._id ?? service.requestId ?? "Sin solicitud",
            clientName:
                (service.clientId?.name ||
                    `${service.clientId?.firstName ?? ""} ${service.clientId?.lastName ?? ""}`.trim()) ||
                "Sin cliente",
            workerName:
                (service.workerId?.name ||
                    `${service.workerId?.firstName ?? ""} ${service.workerId?.lastName ?? ""}`.trim()) ||
                "Sin trabajador",
            budget: service.finalPrice ?? 0,
            createdDate: service.createdAt
                ? new Date(service.createdAt).toLocaleDateString("es-GT", {
                    day: "2-digit", month: "short", year: "numeric",
                })
                : "—",
            startDateFormatted: service.startDate
                ? new Date(service.startDate).toLocaleDateString("es-GT", {
                    day: "2-digit", month: "short", year: "numeric",
                })
                : "Sin iniciar",
            endDateFormatted: service.endDate
                ? new Date(service.endDate).toLocaleDateString("es-GT", {
                    day: "2-digit", month: "short", year: "numeric",
                })
                : "Sin finalizar",
        }));
    }, [services]);

    const filteredServices = normalizedServices.filter((service) => {
        const q = search.toLowerCase();
        const matchSearch =
            service.clientName.toLowerCase().includes(q) ||
            service.workerName.toLowerCase().includes(q) ||
            service.requestCode.toString().toLowerCase().includes(q) ||
            service.id.toLowerCase().includes(q);
        const matchStatus = statusFilter === "ALL" ? true : service.status === statusFilter;
        return matchSearch && matchStatus;
    });

    const totalPages = Math.ceil(filteredServices.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentServices = filteredServices.slice(startIndex, startIndex + itemsPerPage);

    const totalServices = normalizedServices.length;
    const pendingServices = normalizedServices.filter((s) => s.status === "PENDING").length;
    const progressServices = normalizedServices.filter((s) => s.status === "IN_PROGRESS").length;
    const completedServices = normalizedServices.filter((s) => s.status === "COMPLETED").length;
    const canceledServices = normalizedServices.filter((s) => s.status === "CANCELLED").length;

    return (
        <section className="space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-[#0F172A]">Servicios</h1>
                    <p className="text-sm text-gray-500">
                        Supervisión de todos los servicios activos dentro del sistema
                    </p>
                </div>
                <div className="w-fit px-4 py-2 rounded-full bg-green-50 border border-green-200 text-green-600 text-sm font-medium flex items-center gap-2">
                    <span className="text-green-500">●</span>
                    <span>{progressServices} activos ahora</span>
                </div>
            </div>

            {/* STATS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                <ServiceStatsCard value={totalServices} label="Total de servicios" color="text-[#0F172A]" />
                <ServiceStatsCard value={progressServices} label="En progreso" color="text-yellow-500" bg="bg-yellow-50" />
                <ServiceStatsCard value={completedServices} label="Finalizados" color="text-green-500" bg="bg-green-50" />
                <ServiceStatsCard value={canceledServices} label="Cancelados" color="text-gray-500" />
            </div>

            <article className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                {/* BÚSQUEDA */}
                <div className="p-5 border-b border-gray-100">
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
                        placeholder="Buscar por cliente, trabajador, solicitud o ID..."
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none text-sm text-gray-600 placeholder:text-gray-400 focus:border-green-400 focus:ring-2 focus:ring-green-100"
                    />
                </div>

                {/* FILTROS */}
                <div className="px-5 py-4 border-b border-gray-100">
                    <div className="flex flex-wrap gap-4">
                        <StatusButton text="Todos" value="ALL" count={totalServices} current={statusFilter} onClick={(v) => { setStatusFilter(v); setCurrentPage(1); }} />
                        <StatusButton text="Pendientes" value="PENDING" count={pendingServices} current={statusFilter} onClick={(v) => { setStatusFilter(v); setCurrentPage(1); }} />
                        <StatusButton text="En progreso" value="IN_PROGRESS" count={progressServices} current={statusFilter} onClick={(v) => { setStatusFilter(v); setCurrentPage(1); }} />
                        <StatusButton text="Finalizados" value="COMPLETED" count={completedServices} current={statusFilter} onClick={(v) => { setStatusFilter(v); setCurrentPage(1); }} />
                        <StatusButton text="Cancelados" value="CANCELLED" count={canceledServices} current={statusFilter} onClick={(v) => { setStatusFilter(v); setCurrentPage(1); }} />
                    </div>
                </div>

                {loading ? (
                    <p className="p-10 text-center italic text-gray-400">Cargando servicios...</p>
                ) : (
                    <ServicesTable
                        services={currentServices}
                        totalServices={filteredServices.length}
                        startIndex={startIndex}
                        endIndex={startIndex + currentServices.length}
                        currentPage={currentPage}
                        totalPages={totalPages}
                        setCurrentPage={setCurrentPage}
                        onViewService={setSelectedService}
                    />
                )}
            </article>

            {selectedService && (
                <ServiceModal service={selectedService} onClose={() => setSelectedService(null)} />
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
            <span className={`px-2 py-0.5 rounded-full text-xs ${
                active ? "bg-white/20 text-white" : "bg-gray-100 text-gray-500"
            }`}>
                {count}
            </span>
        </button>
    );
};