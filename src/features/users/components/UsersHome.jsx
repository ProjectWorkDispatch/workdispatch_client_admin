import { useState, useEffect } from "react";
import { UserStatsCard } from "./UserStatsCard";
import { UsersTable } from "./UsersTable";
import Exp from "../../../assets/icons/export.svg";
import { useUserStore } from "../Store/adminStore";
import { UserSkillsModal } from "./UserSkillsModal";
import { CreateUserModal } from "./CreateUserModal";

export const UsersHome = () => {
    const { users, getUsers, toggleUserStatus } = useUserStore();
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("Todos");
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedUserForSkills, setSelectedUserForSkills] = useState(null);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    
    const itemsPerPage = 8;

    useEffect(() => {
        getUsers();
    }, []);

    const handleSearch = (e) => {
        setSearch(e.target.value);
        setCurrentPage(1);
    };

    const handleFilter = (value) => {
        setFilter(value);
        setCurrentPage(1);
    };

    // Filtros lógicos
    const filteredUsers = users.filter((user) => {
        const searchText = search.toLowerCase();
        const fullName = (user.name || `${user.firstName || ""} ${user.lastName || ""}`).toString().toLowerCase();
        const email = user.email?.toLowerCase() || "";
        const matchSearch = fullName.includes(searchText) || email.includes(searchText);

        const role = (user.role || "").toString().toUpperCase();
        const status = user.active ?? user.isActive;
        const verified = user.verificationStatus ?? user.verified;

        if (filter === "Clientes") return matchSearch && ["CLIENT", "CLIENTE"].includes(role);
        if (filter === "Trabajadores") return matchSearch && ["WORKER", "TRABAJADOR"].includes(role);
        if (filter === "Verificados") return matchSearch && verified === true;
        if (filter === "Pendientes") return matchSearch && verified === false;
        if (filter === "Suspendidos") return matchSearch && status === false;
        return matchSearch;
    });

    const isUserActive = (user) => user.active ?? user.isActive ?? false;
    const isUserVerified = (user) => user.verificationStatus ?? user.verified ?? false;

    const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentUsers = filteredUsers.slice(startIndex, startIndex + itemsPerPage);

    return (
        <section className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-[#0F172A]">Usuarios</h1>
                </div>

                <button
                    onClick={() => setIsCreateModalOpen(true)}
                    className="inline-flex items-center justify-center rounded-2xl bg-green-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-700"
                >
                    + Crear usuario
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                <UserStatsCard value={users.length} label="Total usuarios" color="text-[#0F172A]" />
                <UserStatsCard value={users.filter((u) => isUserActive(u)).length} label="Activos" color="text-green-500" />
                <UserStatsCard value={users.filter((u) => !isUserVerified(u)).length} label="Pendientes" color="text-yellow-500" />
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-5 border-b border-gray-100">
                    <input
                        type="text"
                        value={search}
                        onChange={handleSearch}
                        placeholder="Buscar por nombre o correo..."
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-green-400"
                    />
                </div>

                <UsersTable
                    users={currentUsers}
                    totalUsers={filteredUsers.length}
                    startIndex={startIndex}
                    endIndex={startIndex + currentUsers.length}
                    currentPage={currentPage}
                    totalPages={totalPages}
                    setCurrentPage={setCurrentPage}
                    onToggleStatus={(id, currentStatus) => toggleUserStatus(id, currentStatus)}
                    onViewSkills={(user) => setSelectedUserForSkills(user)}
                    onVerifyUser={(id) => console.log("Verificar ID:", id)} // Implementar en store si es necesario
                />
            </div>

            {selectedUserForSkills && (
                <UserSkillsModal
                    user={selectedUserForSkills}
                    onClose={() => setSelectedUserForSkills(null)}
                />
            )}

            <CreateUserModal
                open={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
            />
        </section>
    );
};