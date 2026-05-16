import { useState } from "react";
import { WorkerPortfolioTable } from "./WorkerPortfolioTable";
import { PortfolioStatsCard } from "./PortfolioStatsCard";
import Exp from "../../../assets/icons/export.svg";

const initialPortfolios = [
    {
        _id: "1",
        workerId: {
            _id: "w1",
            firstName: "Carlos",
            lastName: "Mendoza",
            email: "carlos@email.com",
            profilePhoto: null
        },
        imageUrl:
            "https://images.unsplash.com/photo-1504307651254-35680f356dfd",
        description:
            "Instalación eléctrica residencial y mantenimiento general.",
        status: "ACTIVE",
        createdAt: "2025-01-10T10:00:00Z"
    },
    {
        _id: "2",
        workerId: {
            _id: "w2",
            firstName: "Laura",
            lastName: "Rincón",
            email: "laura@email.com",
            profilePhoto: null
        },
        imageUrl:
            "https://images.unsplash.com/photo-1581578731548-c64695cc6952",
        description:
            "Remodelación y pintura de interiores para apartamentos.",
        status: "INACTIVE",
        createdAt: "2025-02-12T10:00:00Z"
    }
];

export const WorkerPortfolioHome = () => {
    const [portfolios, setPortfolios] = useState(initialPortfolios);

    const [search, setSearch] = useState("");

    const [filter, setFilter] = useState("Todos");

    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 6;

    const handleSearch = (e) => {
        setSearch(e.target.value);
        setCurrentPage(1);
    };

    const handleFilter = (value) => {
        setFilter(value);
        setCurrentPage(1);
    };

    const handleToggleStatus = (id) => {
        setPortfolios((prev) =>
            prev.map((portfolio) =>
                portfolio._id === id
                    ? {
                        ...portfolio,
                        status:
                            portfolio.status === "ACTIVE"
                                ? "INACTIVE"
                                : "ACTIVE"
                    }
                    : portfolio
            )
        );
    };

    const filteredPortfolios = portfolios.filter((portfolio) => {
        const searchText = search.toLowerCase();

        const workerName =
            `${portfolio.workerId?.firstName || ""} ${
                portfolio.workerId?.lastName || ""
            }`.toLowerCase();

        const matchSearch =
            workerName.includes(searchText) ||
            portfolio.workerId?.email
                ?.toLowerCase()
                .includes(searchText) ||
            portfolio.description
                ?.toLowerCase()
                .includes(searchText);

        let matchFilter = true;

        if (filter === "Activos") {
            matchFilter = portfolio.status === "ACTIVE";
        }

        if (filter === "Inactivos") {
            matchFilter = portfolio.status === "INACTIVE";
        }

        return matchSearch && matchFilter;
    });

    const totalPages = Math.ceil(
        filteredPortfolios.length / itemsPerPage
    );

    const startIndex = (currentPage - 1) * itemsPerPage;

    const endIndex = startIndex + itemsPerPage;

    const currentPortfolios = filteredPortfolios.slice(
        startIndex,
        endIndex
    );

    const totalPortfolios = portfolios.length;

    const activePortfolios = portfolios.filter(
        (portfolio) => portfolio.status === "ACTIVE"
    ).length;

    const inactivePortfolios = portfolios.filter(
        (portfolio) => portfolio.status === "INACTIVE"
    ).length;

    return (
        <section className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-[#0F172A]">
                        Portafolios
                    </h1>

                    <p className="text-sm text-gray-500">
                        Gestión de trabajos publicados por trabajadores
                    </p>
                </div>

                <button className="w-fit px-4 py-2 rounded-2xl bg-white border border-gray-200 shadow-sm text-sm font-semibold text-slate-600 hover:bg-gray-50 transition flex items-center gap-2">
                    <img
                        src={Exp}
                        alt="Exportar"
                        className="w-4 h-4"
                    />

                    Exportar CSV
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <PortfolioStatsCard
                    value={totalPortfolios}
                    label="Total portafolios"
                    color="text-[#0F172A]"
                />

                <PortfolioStatsCard
                    value={activePortfolios}
                    label="Activos"
                    color="text-green-500"
                />

                <PortfolioStatsCard
                    value={inactivePortfolios}
                    label="Inactivos"
                    color="text-red-500"
                />
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-5 border-b border-gray-100">
                    <input
                        type="text"
                        value={search}
                        onChange={handleSearch}
                        placeholder="Buscar por trabajador o descripción..."
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none text-sm text-gray-600 placeholder:text-gray-400 focus:border-green-400 focus:ring-2 focus:ring-green-100"
                    />

                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mt-4">
                        <div className="flex flex-wrap gap-2">
                            <FilterButton
                                text="Todos"
                                filter={filter}
                                setFilter={handleFilter}
                            />

                            <FilterButton
                                text="Activos"
                                filter={filter}
                                setFilter={handleFilter}
                            />

                            <FilterButton
                                text="Inactivos"
                                filter={filter}
                                setFilter={handleFilter}
                            />
                        </div>

                        <p className="text-xs text-gray-400">
                            {filteredPortfolios.length} portafolios
                        </p>
                    </div>
                </div>

                <WorkerPortfolioTable
                    portfolios={currentPortfolios}
                    totalPortfolios={filteredPortfolios.length}
                    startIndex={startIndex}
                    endIndex={endIndex}
                    currentPage={currentPage}
                    totalPages={totalPages}
                    setCurrentPage={setCurrentPage}
                    onToggleStatus={handleToggleStatus}
                />
            </div>
        </section>
    );
};

const FilterButton = ({
    text,
    filter,
    setFilter
}) => {
    const active = filter === text;

    return (
        <button
            onClick={() => setFilter(text)}
            className={`px-3 sm:px-4 py-2 rounded-full text-xs font-semibold transition whitespace-nowrap ${
                active
                    ? "bg-green-500 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
        >
            {text}
        </button>
    );
};