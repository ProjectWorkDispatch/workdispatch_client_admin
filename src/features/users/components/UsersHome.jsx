import { useState } from "react";
import { UserStatsCard } from "./UserStatsCard";
import { UsersTable } from "./UsersTable";
import Exp from "../../../assets/icons/export.svg";

const initialUsers = [
    {
        firstName: "Carlos",
        lastName: "Mendoza",
        email: "carlos@email.com",
        phone: "+502 5555 5555",
        role: "CLIENT",
        verificationStatus: true,
        active: true,
        ratingAverage: 4.7,
        address: "Zona 10, Ciudad de Guatemala",
        latitude: 14.6349,
        longitude: -90.5069,
        description: "Cliente frecuente de servicios del hogar.",
        createdAt: "2025-01-10",
        profilePhoto: null,
        skills: []
    },
    {
        firstName: "Laura",
        lastName: "Rincón",
        email: "laura@email.com",
        phone: "+502 4444 2222",
        role: "WORKER",
        verificationStatus: false,
        active: true,
        ratingAverage: 4.3,
        address: "Mixco, Guatemala",
        latitude: 14.633,
        longitude: -90.607,
        description: "Electricista con experiencia residencial.",
        createdAt: "2025-02-12",
        profilePhoto: null,
        skills: [
            {
                name: "Electricidad",
                experienceYears: 5
            },
            {
                name: "Instalaciones",
                experienceYears: 3
            }
        ]
    }
];

export const UsersHome = () => {
    const [users, setUsers] = useState(initialUsers);
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("Todos");

    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 8;

    const handleSearch = (e) => {
        setSearch(e.target.value);
        setCurrentPage(1);
    };

    const handleFilter = (value) => {
        setFilter(value);
        setCurrentPage(1);
    };

    const handleVerifyUser = (email) => {
        setUsers((prevUsers) =>
            prevUsers.map((user) =>
                user.email === email
                    ? {
                        ...user,
                        verificationStatus: true
                    }
                    : user
            )
        );
    };

    const handleRejectUser = (email) => {
        setUsers((prevUsers) =>
            prevUsers.map((user) =>
                user.email === email
                    ? {
                        ...user,
                        verificationStatus: false
                    }
                    : user
            )
        );
    };

    const handleToggleStatus = (email) => {
        setUsers((prevUsers) =>
            prevUsers.map((user) =>
                user.email === email
                    ? {
                        ...user,
                        active: !user.active
                    }
                    : user
            )
        );
    };

    const filteredUsers = users.filter((user) => {
        const searchText = search.toLowerCase();

        const fullName =
            `${user.firstName || ""} ${user.lastName || ""}`.toLowerCase();

        const matchSearch =
            fullName.includes(searchText) ||
            user.email?.toLowerCase().includes(searchText) ||
            user.role?.toLowerCase().includes(searchText);

        let matchFilter = true;

        if (filter === "Clientes") {
            matchFilter = user.role === "CLIENT";
        } else if (filter === "Trabajadores") {
            matchFilter = user.role === "WORKER";
        } else if (filter === "Verificados") {
            matchFilter = user.verificationStatus === true;
        } else if (filter === "Pendientes") {
            matchFilter = user.verificationStatus === false;
        } else if (filter === "Suspendidos") {
            matchFilter = user.active === false;
        }

        return matchSearch && matchFilter;
    });

    const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

    const startIndex = (currentPage - 1) * itemsPerPage;

    const endIndex = startIndex + itemsPerPage;

    const currentUsers = filteredUsers.slice(startIndex, endIndex);

    const totalUsers = users.length;

    const activeUsers = users.filter(
        (user) => user.active
    ).length;

    const pendingUsers = users.filter(
        (user) => !user.verificationStatus
    ).length;

    const suspendedUsers = users.filter(
        (user) => !user.active
    ).length;

    return (
        <section className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-[#0F172A]">
                        Usuarios
                    </h1>

                    <p className="text-sm text-gray-500">
                        Gestión de clientes y trabajadores registrados
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

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                <UserStatsCard
                    value={totalUsers}
                    label="Total usuarios"
                    color="text-[#0F172A]"
                />

                <UserStatsCard
                    value={activeUsers}
                    label="Activos"
                    color="text-green-500"
                />

                <UserStatsCard
                    value={pendingUsers}
                    label="Verificaciones pendientes"
                    color="text-yellow-500"
                />

                <UserStatsCard
                    value={suspendedUsers}
                    label="Suspendidos"
                    color="text-red-500"
                />
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-5 border-b border-gray-100">
                    <input
                        type="text"
                        value={search}
                        onChange={handleSearch}
                        placeholder="Buscar por nombre, correo o rol..."
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
                                text="Clientes"
                                filter={filter}
                                setFilter={handleFilter}
                            />

                            <FilterButton
                                text="Trabajadores"
                                filter={filter}
                                setFilter={handleFilter}
                            />

                            <FilterButton
                                text="Verificados"
                                filter={filter}
                                setFilter={handleFilter}
                            />

                            <FilterButton
                                text="Pendientes"
                                filter={filter}
                                setFilter={handleFilter}
                            />

                            <FilterButton
                                text="Suspendidos"
                                filter={filter}
                                setFilter={handleFilter}
                            />
                        </div>

                        <p className="text-xs text-gray-400">
                            {filteredUsers.length} usuarios
                        </p>
                    </div>
                </div>

                <UsersTable
                    users={currentUsers}
                    totalUsers={filteredUsers.length}
                    startIndex={startIndex}
                    endIndex={endIndex}
                    currentPage={currentPage}
                    totalPages={totalPages}
                    setCurrentPage={setCurrentPage}
                    onVerifyUser={handleVerifyUser}
                    onRejectUser={handleRejectUser}
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