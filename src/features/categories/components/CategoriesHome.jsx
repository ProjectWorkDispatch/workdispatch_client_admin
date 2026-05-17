import { useEffect, useMemo, useState } from "react";

import { CategoriesTable } from "./CategoriesTable";
import { CategoryModal } from "./CategoryModal";
import { CategoryStatsCard } from "./CategoryStatsCard";
import { CreateCategoryModal } from "./CreateCategoryModal";

import { useCategoryStore } from "../../../features/users/Store/adminStore";

import Exp from "../../../assets/icons/export.svg";

export const CategoriesHome = () => {
    const {
        categories,
        loading,
        getCategories,
        toggleCategoryStatus
    } = useCategoryStore();

    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("Todas");
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [openCreateModal, setOpenCreateModal] = useState(false);

    const itemsPerPage = 8;

    useEffect(() => {
        getCategories();
    }, []);

    const handleStatusChange = async (
        id,
        currentStatus
    ) => {
        await toggleCategoryStatus(
            id,
            currentStatus
        );

        if (
            selectedCategory &&
            selectedCategory._id === id
        ) {
            setSelectedCategory((prev) => ({
                ...prev,
                status:
                    currentStatus === "ACTIVE"
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

    const filteredCategories = useMemo(() => {
        return categories.filter((category) => {
            const text = search.toLowerCase();

            const matchSearch =
                category.name?.toLowerCase().includes(text) ||
                category.description?.toLowerCase().includes(text);

            let matchStatus = true;

            if (statusFilter === "Activas") {
                matchStatus = category.status === "ACTIVE";
            }

            if (statusFilter === "Inactivas") {
                matchStatus = category.status === "INACTIVE";
            }

            return matchSearch && matchStatus;
        });
    }, [categories, search, statusFilter]);

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
        <div className="space-y-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-[#0F172A]">
                        Categorías
                    </h1>

                    <p className="text-sm text-gray-500">
                        Gestión de categorías del sistema
                    </p>
                </div>
                <button
                    onClick={() => setOpenCreateModal(true)}
                    className="w-fit px-4 py-2 rounded-2xl bg-white border border-gray-200 shadow-sm text-sm font-semibold text-slate-600 hover:bg-gray-50 transition flex items-center gap-2">
                    <img
                        src={Exp}
                        alt="Exportar"
                        className="w-4 h-4"
                    />

                    Nueva categoría
                </button>
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

                {loading ? (
                    <div className="p-10 text-center text-gray-400">
                        Cargando categorías...
                    </div>
                ) : (
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
                )}
            </div>

            {selectedCategory && (
                <CategoryModal
                    category={selectedCategory}
                    onClose={() => setSelectedCategory(null)}
                    onStatusChange={handleStatusChange}
                />
            )}

            <CreateCategoryModal
                open={openCreateModal}
                onClose={() => setOpenCreateModal(false)}
            />
        </div>
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