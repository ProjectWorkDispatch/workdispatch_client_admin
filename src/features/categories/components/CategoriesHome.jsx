import { useState } from "react";

import { CategoriesTable } from "./CategoriesTable";
import { CategoryModal } from "./CategoryModal";
import { CategoryStatsCard } from "./CategoryStatsCard";

const initialCategories = [
    {
        _id: "1",
        name: "Electricidad",
        description: "Servicios eléctricos residenciales.",
        status: "ACTIVE",
        createdAt: "23 mar, 03:00 a. m."
    },
    {
        _id: "2",
        name: "Diseño gráfico",
        description: "Diseño de logos y branding.",
        status: "ACTIVE",
        createdAt: "22 mar, 09:00 p. m."
    },
    {
        _id: "3",
        name: "Programación",
        description: "Desarrollo web y móvil.",
        status: "INACTIVE",
        createdAt: "21 mar, 11:00 a. m."
    }
];

export const CategoriesHome = () => {
    const [categories, setCategories] = useState(initialCategories);

    const [search, setSearch] = useState("");

    const [statusFilter, setStatusFilter] = useState("Todas");

    const [selectedCategory, setSelectedCategory] = useState(null);

    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 8;

    const handleStatusChange = (id) => {
        setCategories((prev) =>
            prev.map((category) =>
                category._id === id
                    ? {
                        ...category,
                        status:
                            category.status === "ACTIVE"
                                ? "INACTIVE"
                                : "ACTIVE"
                    }
                    : category
            )
        );

        if (selectedCategory?._id === id) {
            setSelectedCategory((prev) => ({
                ...prev,
                status:
                    prev.status === "ACTIVE"
                        ? "INACTIVE"
                        : "ACTIVE"
            }));
        }
    };

    const handleStatusFilter = (status) => {
        setStatusFilter(status);
        setCurrentPage(1);
    };

    const handleSearch = (e) => {
        setSearch(e.target.value);
        setCurrentPage(1);
    };

    const filteredCategories = categories.filter((category) => {
        const text = search.toLowerCase();

        const matchSearch =
            category.name.toLowerCase().includes(text) ||
            category.description.toLowerCase().includes(text);

        let matchStatus = true;

        if (statusFilter === "Activas") {
            matchStatus = category.status === "ACTIVE";
        }

        if (statusFilter === "Inactivas") {
            matchStatus = category.status === "INACTIVE";
        }

        return matchSearch && matchStatus;
    });

    const totalCategories = categories.length;

    const activeCategories = categories.filter(
        (category) => category.status === "ACTIVE"
    ).length;

    const inactiveCategories = categories.filter(
        (category) => category.status === "INACTIVE"
    ).length;

    const totalPages = Math.ceil(filteredCategories.length / itemsPerPage);

    const startIndex = (currentPage - 1) * itemsPerPage;

    const endIndex = startIndex + itemsPerPage;

    const currentCategories = filteredCategories.slice(
        startIndex,
        endIndex
    );

    return (
        <section className="space-y-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-[#0F172A]">
                        Categorías
                    </h1>

                    <p className="text-sm text-gray-500">
                        Gestión de categorías del sistema
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                <CategoryStatsCard
                    value={totalCategories}
                    label="Total categorías"
                    color="text-[#0F172A]"
                />

                <CategoryStatsCard
                    value={activeCategories}
                    label="Activas"
                    color="text-green-500"
                />

                <CategoryStatsCard
                    value={inactiveCategories}
                    label="Inactivas"
                    color="text-red-500"
                />
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-5 border-b border-gray-100">
                    <input
                        type="text"
                        value={search}
                        onChange={handleSearch}
                        placeholder="Buscar categorías..."
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none text-sm text-gray-600 placeholder:text-gray-400 focus:border-green-400 focus:ring-2 focus:ring-green-100"
                    />

                    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between mt-4">
                        <div className="flex flex-wrap items-center gap-2">
                            <FilterButton
                                text="Todas"
                                current={statusFilter}
                                setFilter={handleStatusFilter}
                            />

                            <FilterButton
                                text="Activas"
                                current={statusFilter}
                                setFilter={handleStatusFilter}
                            />

                            <FilterButton
                                text="Inactivas"
                                current={statusFilter}
                                setFilter={handleStatusFilter}
                            />
                        </div>

                        <p className="text-xs text-gray-400">
                            {filteredCategories.length} categorías
                        </p>
                    </div>
                </div>

                <CategoriesTable
                    categories={currentCategories}
                    totalCategories={filteredCategories.length}
                    startIndex={startIndex}
                    endIndex={endIndex}
                    currentPage={currentPage}
                    totalPages={totalPages}
                    setCurrentPage={setCurrentPage}
                    onView={setSelectedCategory}
                    onStatusChange={handleStatusChange}
                />
            </div>

            {selectedCategory && (
                <CategoryModal
                    category={selectedCategory}
                    onClose={() => setSelectedCategory(null)}
                    onStatusChange={handleStatusChange}
                />
            )}
        </section>
    );
};

const FilterButton = ({ text, current, setFilter }) => {
    const active = current === text;

    return (
        <button
            onClick={() => setFilter(text)}
            className={`px-3 py-1 rounded-full text-xs font-semibold transition ${active
                ? "bg-green-500 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
        >
            {text}
        </button>
    );
};