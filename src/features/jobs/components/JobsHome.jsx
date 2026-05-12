import { useState } from "react";
import { JobsTable } from "./JobsTable";
import { JobStatsCard } from "./JobStatsCard";
import { JobModal } from "./JobModal";

const jobsData = [
    {
        id: "T-001",
        title: "Reparación de techo de lámina",
        date: "18 Mar 2026",
        client: "Carlos Mendoza",
        clientInitials: "CM",
        worker: "Pedro Jiménez",
        workerInitials: "PJ",
        category: "Albañilería",
        budget: 1800,
        status: "En progreso",
        rating: 0,
        description: "Reparación de techo de lámina con cambio de piezas dañadas y sellado.",
        duration: "2 días",
        location: "Mixco"
    },
    {
        id: "T-002",
        title: "Instalación de tubería principal",
        date: "12 Mar 2026",
        client: "Ana García",
        clientInitials: "AG",
        worker: "Luis Hernández",
        workerInitials: "LH",
        category: "Plomería",
        budget: 950,
        status: "Finalizado",
        rating: 5,
        description: "Instalación de tubería principal para vivienda familiar.",
        duration: "1 día",
        location: "Guatemala"
    },
    {
        id: "T-003",
        title: "Pintura interior de apartamento",
        date: "10 Mar 2026",
        client: "Sofía Bermúdez",
        clientInitials: "SB",
        worker: "Marco Reyes",
        workerInitials: "MR",
        category: "Pintura",
        budget: 2200,
        status: "Finalizado",
        rating: 4,
        description: "Pintura completa de paredes interiores de apartamento.",
        duration: "3 días",
        location: "Zona 10"
    },
    {
        id: "T-004",
        title: "Instalación de sistema eléctrico",
        date: "8 Mar 2026",
        client: "Roberto Palma",
        clientInitials: "RP",
        worker: "Jorge Estrada",
        workerInitials: "JE",
        category: "Electricidad",
        budget: 3500,
        status: "Cancelado",
        rating: 0,
        description: "Instalación eléctrica general para local comercial.",
        duration: "4 días",
        location: "Villa Nueva"
    },
    {
        id: "T-005",
        title: "Colocación de piso cerámico",
        date: "20 Mar 2026",
        client: "Marta López",
        clientInitials: "ML",
        worker: "Ernesto Vásquez",
        workerInitials: "EV",
        category: "Albañilería",
        budget: 1400,
        status: "En progreso",
        rating: 0,
        description: "Colocación de piso cerámico en sala y comedor.",
        duration: "2 días",
        location: "San Cristóbal"
    },
    {
        id: "T-006",
        title: "Reparación de aire acondicionado",
        date: "5 Mar 2026",
        client: "Diego Ríos",
        clientInitials: "DR",
        worker: "Héctor Morales",
        workerInitials: "HM",
        category: "Climatización",
        budget: 620,
        status: "Finalizado",
        rating: 5,
        description: "Revisión, limpieza y reparación de aire acondicionado.",
        duration: "1 día",
        location: "Zona 14"
    },
    {
        id: "T-007",
        title: "Impermeabilización de terraza",
        date: "21 Mar 2026",
        client: "Laura Rincón",
        clientInitials: "LR",
        worker: "Samuel Ortiz",
        workerInitials: "SO",
        category: "Impermeabilización",
        budget: 2800,
        status: "En progreso",
        rating: 0,
        description: "Impermeabilización completa de terraza con sellador especial.",
        duration: "2 días",
        location: "Carretera a El Salvador"
    },
    {
        id: "T-008",
        title: "Instalación de portón eléctrico",
        date: "1 Mar 2026",
        client: "Andrés Torres",
        clientInitials: "AT",
        worker: "Raúl Aguilar",
        workerInitials: "RA",
        category: "Herrería",
        budget: 4100,
        status: "Cancelado",
        rating: 0,
        description: "Instalación de portón eléctrico residencial.",
        duration: "3 días",
        location: "Zona 7"
    },
    {
        id: "T-009",
        title: "Chapeo y limpieza de terreno",
        date: "15 Mar 2026",
        client: "Verónica Castillo",
        clientInitials: "VC",
        worker: "Julio Méndez",
        workerInitials: "JM",
        category: "Jardinería",
        budget: 480,
        status: "Finalizado",
        rating: 4,
        description: "Chapeo de 200 m² de terreno baldío con maquinaria y limpieza completa.",
        duration: "1 día",
        location: "Amatitlán"
    },
    {
        id: "T-010",
        title: "Construcción de muro perimetral",
        date: "17 Mar 2026",
        client: "Fernando Nájera",
        clientInitials: "FN",
        worker: "Ramiro Peña",
        workerInitials: "RP",
        category: "Albañilería",
        budget: 7500,
        status: "En progreso",
        rating: 0,
        description: "Construcción de muro perimetral con block y columnas.",
        duration: "7 días",
        location: "Fraijanes"
    },
    {
        id: "T-011",
        title: "Reparación de filtración en baño",
        date: "9 Mar 2026",
        client: "Patricia Solís",
        clientInitials: "PS",
        worker: "Daniel Fuentes",
        workerInitials: "DF",
        category: "Plomería",
        budget: 350,
        status: "Finalizado",
        rating: 5,
        description: "Reparación de filtración en baño principal.",
        duration: "1 día",
        location: "Zona 1"
    },
    {
        id: "T-012",
        title: "Instalación de cielo falso",
        date: "14 Mar 2026",
        client: "Miguel Ángel Ruiz",
        clientInitials: "MA",
        worker: "Carlos Tello",
        workerInitials: "CT",
        category: "Construcción",
        budget: 1600,
        status: "Cancelado",
        rating: 0,
        description: "Instalación de cielo falso en habitación principal.",
        duration: "2 días",
        location: "Villa Canales"
    }
];

const categories = [
    "Todas",
    "Albañilería",
    "Plomería",
    "Electricidad",
    "Pintura",
    "Climatización",
    "Impermeabilización",
    "Herrería",
    "Jardinería",
    "Construcción"
];

export const JobsHome = () => {
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("Todos");
    const [categoryFilter, setCategoryFilter] = useState("Todas");
    const [showFilters, setShowFilters] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedJob, setSelectedJob] = useState(null);

    const itemsPerPage = 8;

    const filteredJobs = jobsData.filter((job) => {
        const searchText = search.toLowerCase();

        const matchSearch =
            job.title.toLowerCase().includes(searchText) ||
            job.client.toLowerCase().includes(searchText) ||
            job.worker.toLowerCase().includes(searchText) ||
            job.id.toLowerCase().includes(searchText);

        let matchStatus = true;

        if (statusFilter !== "Todos") {
            matchStatus = job.status === statusFilter;
        }

        let matchCategory = true;

        if (categoryFilter !== "Todas") {
            matchCategory = job.category === categoryFilter;
        }

        return matchSearch && matchStatus && matchCategory;
    });

    const totalPages = Math.ceil(filteredJobs.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentJobs = filteredJobs.slice(startIndex, endIndex);

    const totalJobs = jobsData.length;
    const progressJobs = jobsData.filter((job) => job.status === "En progreso").length;
    const finishedJobs = jobsData.filter((job) => job.status === "Finalizado").length;
    const canceledJobs = jobsData.filter((job) => job.status === "Cancelado").length;

    const handleStatusFilter = (status) => {
        setStatusFilter(status);
        setCurrentPage(1);
    };

    const handleCategoryFilter = (category) => {
        setCategoryFilter(category);
        setCurrentPage(1);
    };

    const handleSearch = (e) => {
        setSearch(e.target.value);
        setCurrentPage(1);
    };

    return (
        <section className="space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-[#0F172A]">
                        Trabajos y Contratos
                    </h1>
                    <p className="text-sm text-gray-500">
                        Supervisión de todos los trabajos activos y contratos del sistema
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
                            onChange={handleSearch}
                            placeholder="Buscar por título, cliente, trabajador o ID..."
                            className="flex-1 px-4 py-3 rounded-xl border border-gray-200 outline-none text-sm text-gray-600 placeholder:text-gray-400 focus:border-green-400 focus:ring-2 focus:ring-green-100"
                        />

                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className={`px-4 py-3 rounded-xl border text-sm font-semibold transition ${showFilters
                                ? "border-green-400 text-green-600 bg-green-50"
                                : "border-gray-200 text-slate-600 bg-white hover:bg-gray-50"
                                }`}
                        >
                            Filtros
                        </button>
                    </div>
                </div>

                <div className="px-5 py-4 border-b border-gray-100">
                    <div className="flex flex-wrap gap-4">
                        <StatusButton
                            text="Todos"
                            count={totalJobs}
                            current={statusFilter}
                            onClick={handleStatusFilter}
                        />

                        <StatusButton
                            text="En progreso"
                            count={progressJobs}
                            current={statusFilter}
                            onClick={handleStatusFilter}
                        />

                        <StatusButton
                            text="Finalizado"
                            count={finishedJobs}
                            current={statusFilter}
                            onClick={handleStatusFilter}
                        />

                        <StatusButton
                            text="Cancelado"
                            count={canceledJobs}
                            current={statusFilter}
                            onClick={handleStatusFilter}
                        />
                    </div>
                </div>

                {showFilters && (
                    <div className="px-5 py-4 border-b border-gray-100 bg-gray-50">
                        <p className="text-sm text-gray-500 mb-3">Categoría</p>

                        <div className="flex flex-wrap gap-2">
                            {categories.map((category) => (
                                <CategoryButton
                                    key={category}
                                    text={category}
                                    current={categoryFilter}
                                    onClick={handleCategoryFilter}
                                />
                            ))}
                        </div>
                    </div>
                )}

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
                    label="Total de trabajos"
                    color="text-[#0F172A]"
                />

                <JobStatsCard
                    value={progressJobs}
                    label="En progreso"
                    color="text-yellow-500"
                    bg="bg-yellow-50"
                />

                <JobStatsCard
                    value={finishedJobs}
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

const StatusButton = ({ text, count, current, onClick }) => {
    const active = current === text;

    return (
        <button
            onClick={() => onClick(text)}
            className={`px-4 py-2 rounded-2xl text-sm font-semibold transition flex items-center gap-2 ${active
                ? "bg-[#0F172A] text-white"
                : "text-gray-500 hover:bg-gray-100"
                }`}
        >
            <span>{text}</span>
            <span
                className={`px-2 py-0.5 rounded-full text-xs ${active
                    ? "bg-white/20 text-white"
                    : "bg-gray-100 text-gray-500"
                    }`}
            >
                {count}
            </span>
        </button>
    );
};

const CategoryButton = ({ text, current, onClick }) => {
    const active = current === text;

    return (
        <button
            onClick={() => onClick(text)}
            className={`px-4 py-2 rounded-xl border text-sm font-semibold transition ${active
                ? "bg-green-500 text-white border-green-500"
                : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
                }`}
        >
            {text}
        </button>
    );
};