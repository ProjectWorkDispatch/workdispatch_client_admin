import { UsersActionsMenu } from "./UsersActionsMenu";

export const UsersTable = ({
    users,
    totalUsers,
    startIndex,
    endIndex,
    currentPage,
    totalPages,
    setCurrentPage,
    onVerifyUser,
    onRejectUser,
    onToggleStatus
}) => {
    return (
        <div className="overflow-x-auto">
            <table className="w-full text-sm">
                <thead className="bg-gray-50 text-gray-500">
                    <tr>
                        <th className="text-left font-medium px-5 py-4">
                            Usuario
                        </th>

                        <th className="text-left font-medium px-5 py-4">
                            Rol
                        </th>

                        <th className="text-left font-medium px-5 py-4">
                            Verificación
                        </th>

                        <th className="text-left font-medium px-5 py-4">
                            Estado
                        </th>

                        <th className="text-left font-medium px-5 py-4">
                            Trabajos
                        </th>

                        <th className="text-left font-medium px-5 py-4">
                            Registro
                        </th>

                        <th className="text-left font-medium px-5 py-4">
                            Acciones
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {users.length === 0 ? (
                        <tr>
                            <td
                                colSpan="7"
                                className="px-5 py-10 text-center text-gray-400"
                            >
                                No se encontraron usuarios.
                            </td>
                        </tr>
                    ) : (
                        users.map((user) => (
                            <tr
                                key={user.email}
                                className="border-t border-gray-100 hover:bg-gray-50 transition"
                            >
                                <td className="px-5 py-4">
                                    <div className="flex items-center gap-3">
                                        <div
                                            className={`w-9 h-9 rounded-full ${user.color} text-white flex items-center justify-center text-xs font-bold`}
                                        >
                                            {user.initials}
                                        </div>

                                        <div>
                                            <p className="font-semibold text-[#0F172A]">
                                                {user.name}
                                            </p>

                                            <p className="text-xs text-gray-400">
                                                {user.email}
                                            </p>
                                        </div>
                                    </div>
                                </td>

                                <td className="px-5 py-4">
                                    <RoleBadge value={user.role} />
                                </td>

                                <td className="px-5 py-4">
                                    <VerificationBadge value={user.verification} />
                                </td>

                                <td className="px-5 py-4">
                                    <StatusBadge value={user.status} />
                                </td>

                                <td className="px-5 py-4 text-slate-700">
                                    {user.jobs}
                                </td>

                                <td className="px-5 py-4 text-gray-400">
                                    {user.date}
                                </td>

                                <td className="px-5 py-4">
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => onVerifyUser(user.email)}
                                            className="w-8 h-8 rounded-full bg-green-50 text-green-500 hover:bg-green-100"
                                            title="Verificar usuario"
                                        >
                                            ♙
                                        </button>

                                        <button
                                            onClick={() => onRejectUser(user.email)}
                                            className="w-8 h-8 rounded-full bg-orange-50 text-orange-500 hover:bg-orange-100"
                                            title="Rechazar usuario"
                                        >
                                            ⊗
                                        </button>

                                        <button
                                            onClick={() => onToggleStatus(user.email)}
                                            className={`w-8 h-8 rounded-full ${
                                                user.status === "Suspendido"
                                                    ? "bg-green-50 text-green-500 hover:bg-green-100"
                                                    : "bg-red-50 text-red-500 hover:bg-red-100"
                                            }`}
                                            title={
                                                user.status === "Suspendido"
                                                    ? "Activar usuario"
                                                    : "Suspender usuario"
                                            }
                                        >
                                            {user.status === "Suspendido" ? "✓" : "♙"}
                                        </button>

                                        <UsersActionsMenu user={user} />
                                    </div>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>

            <div className="flex items-center justify-between px-5 py-4 border-t border-gray-100">
                <p className="text-xs text-gray-400">
                    Mostrando{" "}
                    {totalUsers === 0 ? 0 : startIndex + 1}
                    {"–"}
                    {Math.min(endIndex, totalUsers)} de {totalUsers} usuarios
                </p>

                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setCurrentPage(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="w-8 h-8 rounded-lg text-gray-400 hover:bg-gray-100 disabled:opacity-30"
                    >
                        ‹
                    </button>

                    {Array.from({ length: totalPages }, (_, index) => (
                        <button
                            key={index + 1}
                            onClick={() => setCurrentPage(index + 1)}
                            className={`w-8 h-8 rounded-lg text-sm font-semibold ${
                                currentPage === index + 1
                                    ? "bg-green-500 text-white"
                                    : "text-gray-500 hover:bg-gray-100"
                            }`}
                        >
                            {index + 1}
                        </button>
                    ))}

                    <button
                        onClick={() => setCurrentPage(currentPage + 1)}
                        disabled={currentPage === totalPages || totalPages === 0}
                        className="w-8 h-8 rounded-lg text-gray-400 hover:bg-gray-100 disabled:opacity-30"
                    >
                        ›
                    </button>
                </div>
            </div>
        </div>
    );
};

const RoleBadge = ({ value }) => {
    if (value === "Cliente") {
        return (
            <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-600 text-xs font-semibold">
                Cliente
            </span>
        );
    }

    return (
        <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-600 text-xs font-semibold">
            Trabajador
        </span>
    );
};

const VerificationBadge = ({ value }) => {
    if (value === "Verificado") {
        return (
            <span className="px-3 py-1 rounded-full bg-green-100 text-green-600 text-xs font-semibold">
                Verificado
            </span>
        );
    }

    if (value === "Rechazado") {
        return (
            <span className="px-3 py-1 rounded-full bg-red-100 text-red-600 text-xs font-semibold">
                Rechazado
            </span>
        );
    }

    if (value === "Sin solicitud") {
        return (
            <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-500 text-xs font-semibold">
                Sin solicitud
            </span>
        );
    }

    return (
        <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-600 text-xs font-semibold">
            Pendiente
        </span>
    );
};

const StatusBadge = ({ value }) => {
    if (value === "Suspendido") {
        return (
            <span className="px-3 py-1 rounded-full bg-red-100 text-red-600 text-xs font-semibold">
                ● Suspendido
            </span>
        );
    }

    if (value === "Inactivo") {
        return (
            <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-500 text-xs font-semibold">
                ● Inactivo
            </span>
        );
    }

    return (
        <span className="px-3 py-1 rounded-full bg-green-100 text-green-600 text-xs font-semibold">
            ● Activo
        </span>
    );
};