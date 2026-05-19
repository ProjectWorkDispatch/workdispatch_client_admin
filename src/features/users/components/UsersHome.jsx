import { useState, useEffect } from "react";
import { UserStatsCard } from "./UserStatsCard";
import { UsersTable } from "./UsersTable";
import Exp from "../../../assets/icons/export.svg";
import { useUserStore } from "../Store/adminStore";
import { UserSkillsModal } from "./UserSkillsModal";

export const UsersHome = () => {
    const { users, getUsers, toggleUserStatus } = useUserStore();
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("Todos");
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedUserForSkills, setSelectedUserForSkills] = useState(null);
    
    const itemsPerPage = 8;

    useEffect(() => {
        // Datos ya cargados en estado inicial (mock)
        // getUsers() intenta API, pero usamos mock como fallback
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
        const fullName = `${user.firstName || ""} ${user.lastName || ""}`.toLowerCase();
        const matchSearch = fullName.includes(searchText) || user.email?.toLowerCase().includes(searchText);

        if (filter === "Clientes") return matchSearch && user.role === "CLIENT";
        if (filter === "Trabajadores") return matchSearch && user.role === "WORKER";
        if (filter === "Verificados") return matchSearch && user.verificationStatus === true;
        if (filter === "Pendientes") return matchSearch && user.verificationStatus === false;
        if (filter === "Suspendidos") return matchSearch && user.active === false;
        return matchSearch;
    });

    const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentUsers = filteredUsers.slice(startIndex, startIndex + itemsPerPage);

    return (
        <section className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <h1 className="text-2xl font-bold text-[#0F172A]">Usuarios</h1>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                <UserStatsCard value={users.length} label="Total usuarios" color="text-[#0F172A]" />
                <UserStatsCard value={users.filter(u => u.active).length} label="Activos" color="text-green-500" />
                <UserStatsCard value={users.filter(u => !u.verificationStatus).length} label="Pendientes" color="text-yellow-500" />
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
        </section>
    );
};