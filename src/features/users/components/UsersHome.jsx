import { useState } from "react";
import { UserStatsCard } from "./UserStatsCard";
import { UsersTable } from "./UsersTable";
import Exp from "../../../assets/icons/export.svg";

const initialUsers = [
    {
        initials: "CM",
        name: "Carlos Mendoza",
        email: "carlos.m@email.com",
        role: "Cliente",
        verification: "Verificado",
        status: "Activo",
        jobs: 14,
        date: "10 ene 2025",
        color: "bg-pink-500"
    },
    {
        initials: "LR",
        name: "Laura Rincón",
        email: "laura.r@email.com",
        role: "Trabajador",
        verification: "Pendiente",
        status: "Activo",
        jobs: 8,
        date: "12 ene 2025",
        color: "bg-pink-500"
    },
    {
        initials: "AT",
        name: "Andrés Torres",
        email: "andres.t@email.com",
        role: "Trabajador",
        verification: "Verificado",
        status: "Activo",
        jobs: 22,
        date: "15 ene 2025",
        color: "bg-green-500"
    },
    {
        initials: "SB",
        name: "Sofía Bermúdez",
        email: "sofia.b@email.com",
        role: "Cliente",
        verification: "Sin solicitud",
        status: "Activo",
        jobs: 3,
        date: "18 ene 2025",
        color: "bg-green-500"
    },
    {
        initials: "MR",
        name: "Miguel Ángel Ruiz",
        email: "miguel.r@email.com",
        role: "Trabajador",
        verification: "Rechazado",
        status: "Suspendido",
        jobs: 0,
        date: "20 ene 2025",
        color: "bg-cyan-500"
    },
    {
        initials: "PS",
        name: "Paola Suárez",
        email: "paola.s@email.com",
        role: "Trabajador",
        verification: "Pendiente",
        status: "Activo",
        jobs: 5,
        date: "22 ene 2025",
        color: "bg-green-500"
    },
    {
        initials: "RP",
        name: "Ramiro Peña",
        email: "ramiro.p@email.com",
        role: "Trabajador",
        verification: "Pendiente",
        status: "Activo",
        jobs: 11,
        date: "25 ene 2025",
        color: "bg-purple-500"
    },
    {
        initials: "DC",
        name: "Diana Castro",
        email: "diana.c@email.com",
        role: "Cliente",
        verification: "Verificado",
        status: "Activo",
        jobs: 7,
        date: "28 ene 2025",
        color: "bg-green-500"
    },
    {
        initials: "JC",
        name: "Jhon Castillo",
        email: "jhon.c@email.com",
        role: "Trabajador",
        verification: "Pendiente",
        status: "Activo",
        jobs: 2,
        date: "02 feb 2025",
        color: "bg-purple-400"
    },
    {
        initials: "AG",
        name: "Ana Guerrero",
        email: "ana.g@email.com",
        role: "Cliente",
        verification: "Sin solicitud",
        status: "Inactivo",
        jobs: 0,
        date: "05 feb 2025",
        color: "bg-orange-500"
    },
    {
        initials: "LH",
        name: "Luis Herrera",
        email: "luis.h@email.com",
        role: "Trabajador",
        verification: "Verificado",
        status: "Activo",
        jobs: 18,
        date: "08 feb 2025",
        color: "bg-purple-500"
    },
    {
        initials: "MV",
        name: "Marcela Vargas",
        email: "marcela.v@email.com",
        role: "Cliente",
        verification: "Verificado",
        status: "Activo",
        jobs: 9,
        date: "10 feb 2025",
        color: "bg-green-500"
    },
    {
        initials: "JV",
        name: "Jorge Velandia",
        email: "jorge.v@email.com",
        role: "Trabajador",
        verification: "Rechazado",
        status: "Suspendido",
        jobs: 1,
        date: "12 feb 2025",
        color: "bg-indigo-500"
    },
    {
        initials: "VL",
        name: "Valentina López",
        email: "valentina.l@email.com",
        role: "Cliente",
        verification: "Sin solicitud",
        status: "Activo",
        jobs: 4,
        date: "15 feb 2025",
        color: "bg-purple-500"
    },
    {
        initials: "SM",
        name: "Sebastián Mora",
        email: "sebastian.m@email.com",
        role: "Trabajador",
        verification: "Verificado",
        status: "Activo",
        jobs: 31,
        date: "18 feb 2025",
        color: "bg-indigo-400"
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
        setUsers((Users) =>
            Users.map((user) =>
                user.email === email
                    ? { ...user, verification: "Verificado" }
                    : user
            )
        );
    };

    const handleRejectUser = (email) => {
        setUsers((Users) =>
            Users.map((user) =>
                user.email === email
                    ? { ...user, verification: "Rechazado" }
                    : user
            )
        );
    };

    const handleToggleStatus = (email) => {
        setUsers((Users) =>
            Users.map((user) =>
                user.email === email
                    ? {
                        ...user,
                        status: user.status === "Suspendido" ? "Activo" : "Suspendido"
                    }
                    : user
            )
        );
    };

    const filteredUsers = users.filter((user) => {
        const searchText = search.toLowerCase();

        const matchSearch =
            user.name.toLowerCase().includes(searchText) ||
            user.email.toLowerCase().includes(searchText) ||
            user.role.toLowerCase().includes(searchText);

        let matchFilter = true;

        if (filter === "Clientes") {
            matchFilter = user.role === "Cliente";
        } else if (filter === "Trabajadores") {
            matchFilter = user.role === "Trabajador";
        } else if (filter === "Verificados") {
            matchFilter = user.verification === "Verificado";
        } else if (filter === "Pendientes") {
            matchFilter = user.verification === "Pendiente";
        } else if (filter === "Suspendidos") {
            matchFilter = user.status === "Suspendido";
        }

        return matchSearch && matchFilter;
    });

    const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentUsers = filteredUsers.slice(startIndex, endIndex);

    const totalUsers = users.length;
    const activeUsers = users.filter((user) => user.status === "Activo").length;
    const pendingUsers = users.filter((user) => user.verification === "Pendiente").length;
    const suspendedUsers = users.filter((user) => user.status === "Suspendido").length;

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
                    <img src={Exp} alt="Exportar" className="w-4 h-4" />
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
                            <FilterButton text="Todos" filter={filter} setFilter={handleFilter} />
                            <FilterButton text="Clientes" filter={filter} setFilter={handleFilter} />
                            <FilterButton text="Trabajadores" filter={filter} setFilter={handleFilter} />
                            <FilterButton text="Verificados" filter={filter} setFilter={handleFilter} />
                            <FilterButton text="Pendientes" filter={filter} setFilter={handleFilter} />
                            <FilterButton text="Suspendidos" filter={filter} setFilter={handleFilter} />
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

const FilterButton = ({ text, filter, setFilter }) => {
    const active = filter === text;

    return (
        <button
            onClick={() => setFilter(text)}
            className={`px-3 sm:px-4 py-2 rounded-full text-xs font-semibold transition whitespace-nowrap ${active
                ? "bg-green-500 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
        >
            {text}
        </button>
    );
};