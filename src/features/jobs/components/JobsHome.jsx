import { useMemo, useState } from "react";
import { JobsTable } from "./JobsTable";
import { JobStatsCard } from "./JobStatsCard";
import { JobModal } from "./JobModal";

const servicesData = [
    {
        _id: "664ad11a1",
        requestId: {
            _id: "REQ001"
        },
        clientId: {
            name: "Carlos Mendoza",
            email: "carlos@gmail.com"
        },
        workerId: {
            name: "Pedro Jiménez",
            email: "pedro@gmail.com"
        },
        finalPrice: 1800,
        status: "IN_PROGRESS",
        cancelReason: null,
        cancelledBy: null,
        startDate: "2026-03-18T10:00:00.000Z",
        endDate: null,
        createdAt: "2026-03-18T08:00:00.000Z"
    },
    {
        _id: "664ad11a2",
        requestId: {
            _id: "REQ002"
        },
        clientId: {
            name: "Ana García",
            email: "ana@gmail.com"
        },
        workerId: {
            name: "Luis Hernández",
            email: "luis@gmail.com"
        },
        finalPrice: 950,
        status: "COMPLETED",
        cancelReason: null,
        cancelledBy: null,
        startDate: "2026-03-12T09:00:00.000Z",
        endDate: "2026-03-12T13:00:00.000Z",
        createdAt: "2026-03-12T07:00:00.000Z"
    },
    {
        _id: "664ad11a3",
        requestId: {
            _id: "REQ003"
        },
        clientId: {
            name: "José Ramírez"
        },
        workerId: {
            name: "Mario López"
        },
        finalPrice: 500,
        status: "CANCELLED",
        cancelReason: "El cliente canceló el servicio",
        cancelledBy: "CLIENT",
        startDate: "2026-03-10T08:00:00.000Z",
        endDate: null,
        createdAt: "2026-03-09T08:00:00.000Z"
    }
];

export const JobsHome = () => {
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("ALL");
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedJob, setSelectedJob] = useState(null);

    const itemsPerPage = 8;

    const normalizedJobs = useMemo(() => {
        return servicesData.map((service) => ({
            ...service,

            id: service._id,

            requestCode:
                service.requestId?._id || "Sin solicitud",

            clientName:
                service.clientId?.name || "Sin cliente",

            workerName:
                service.workerId?.name || "Sin trabajador",

            budget: service.finalPrice,

            createdDate: new Date(
                service.createdAt
            ).toLocaleDateString("es-GT", {
                day: "2-digit",
                month: "short",
                year: "numeric"
            }),

            startDateFormatted: service.startDate
                ? new Date(service.startDate).toLocaleDateString("es-GT", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric"
                  })
                : "Sin iniciar",

            endDateFormatted: service.endDate
                ? new Date(service.endDate).toLocaleDateString("es-GT", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric"
                  })
                : "Sin finalizar"
        }));
    }, []);

    const filteredJobs = normalizedJobs.filter((job) => {
        const searchText = search.toLowerCase();

        const matchSearch =
            job.clientName.toLowerCase().includes(searchText) ||
            job.workerName.toLowerCase().includes(searchText) ||
            job.requestCode.toLowerCase().includes(searchText) ||
            job.id.toLowerCase().includes(searchText);

        const matchStatus =
            statusFilter === "ALL"
                ? true
                : job.status === statusFilter;

        return matchSearch && matchStatus;
    });

    const totalPages = Math.ceil(filteredJobs.length / itemsPerPage);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const currentJobs = filteredJobs.slice(startIndex, endIndex);

    const totalJobs = normalizedJobs.length;

    const pendingJobs = normalizedJobs.filter(
        (job) => job.status === "PENDING"
    ).length;

    const progressJobs = normalizedJobs.filter(
        (job) => job.status === "IN_PROGRESS"
    ).length;

    const completedJobs = normalizedJobs.filter(
        (job) => job.status === "COMPLETED"
    ).length;

    const canceledJobs = normalizedJobs.filter(
        (job) => job.status === "CANCELLED"
    ).length;

    return (
        <section className="space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-[#0F172A]">
                        Servicios y Trabajos
                    </h1>

                    <p className="text-sm text-gray-500">
                        Supervisión de todos los servicios realizados dentro del sistema
                    </p>
                </div>

                <div className="w-fit px-4 py-2 rounded-full bg-green-50 border border-green-200 text-green-600 text-sm font-medium flex items-center gap-2">
                    <span className="text-green-500">●</span>
                    <span>{progressJobs} activos ahora</span>
                </div>
            </div>

            <article className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-5 border-b border-gray-100">
                    <div className="flex flex-col sm:flex-row gap-3">
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => {
                                setSearch(e.target.value);
                                setCurrentPage(1);
                            }}
                            placeholder="Buscar por cliente, trabajador, solicitud o ID..."
                            className="flex-1 px-4 py-3 rounded-xl border border-gray-200 outline-none text-sm text-gray-600 placeholder:text-gray-400 focus:border-green-400 focus:ring-2 focus:ring-green-100"
                        />
                    </div>
                </div>

                <div className="px-5 py-4 border-b border-gray-100">
                    <div className="flex flex-wrap gap-4">
                        <StatusButton
                            text="Todos"
                            value="ALL"
                            count={totalJobs}
                            current={statusFilter}
                            onClick={setStatusFilter}
                        />

                        <StatusButton
                            text="Pendientes"
                            value="PENDING"
                            count={pendingJobs}
                            current={statusFilter}
                            onClick={setStatusFilter}
                        />

                        <StatusButton
                            text="En progreso"
                            value="IN_PROGRESS"
                            count={progressJobs}
                            current={statusFilter}
                            onClick={setStatusFilter}
                        />

                        <StatusButton
                            text="Finalizados"
                            value="COMPLETED"
                            count={completedJobs}
                            current={statusFilter}
                            onClick={setStatusFilter}
                        />

                        <StatusButton
                            text="Cancelados"
                            value="CANCELLED"
                            count={canceledJobs}
                            current={statusFilter}
                            onClick={setStatusFilter}
                        />
                    </div>
                </div>

                <JobsTable
                    jobs={currentJobs}
                    totalJobs={filteredJobs.length}
                    startIndex={startIndex}
                    endIndex={endIndex}
                    currentPage={currentPage}
                    totalPages={totalPages}
                    setCurrentPage={setCurrentPage}
                    onViewJob={setSelectedJob}
                />
            </article>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                <JobStatsCard
                    value={totalJobs}
                    label="Total de servicios"
                    color="text-[#0F172A]"
                />

                <JobStatsCard
                    value={progressJobs}
                    label="En progreso"
                    color="text-yellow-500"
                    bg="bg-yellow-50"
                />

                <JobStatsCard
                    value={completedJobs}
                    label="Finalizados"
                    color="text-green-500"
                    bg="bg-green-50"
                />

                <JobStatsCard
                    value={canceledJobs}
                    label="Cancelados"
                    color="text-gray-500"
                />
            </div>

            {selectedJob && (
                <JobModal
                    job={selectedJob}
                    onClose={() => setSelectedJob(null)}
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