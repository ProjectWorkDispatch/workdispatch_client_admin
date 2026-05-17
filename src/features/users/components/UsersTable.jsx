import { UsersActionsMenu } from "./UsersActionsMenu";
import personC from "../../../assets/icons/personC.svg";
import PersonD from "../../../assets/icons/PersonD.svg";
import cancel from "../../../assets/icons/cancel.svg";
import check from "../../../assets/icons/check.svg";

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
    onToggleStatus,
    onViewSkills
}) => {
    return (
        <div className="overflow-x-auto">
            <table className="w-full min-w-225 text-sm">
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
                            Rating
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
                                key={user._id || user.email}
                                className="border-t border-gray-100 hover:bg-gray-50 transition"
                            >
                                <td className="px-5 py-4">
                                    <div className="flex items-center gap-3 min-w-0">
                                        {user.profilePhoto ? (
                                            <img
                                                src={user.profilePhoto}
                                                alt={`${user.firstName} ${user.lastName}`}
                                                className="w-10 h-10 rounded-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center text-xs font-bold">
                                                {user.firstName?.[0]}
                                                {user.lastName?.[0]}
                                            </div>
                                        )}

                                        <div className="min-w-0">
                                            <p className="font-semibold text-[#0F172A] truncate">
                                                {user.firstName} {user.lastName}
                                            </p>

                                            <p className="text-xs text-gray-400 truncate">
                                                {user.email}
                                            </p>
                                        </div>
                                    </div>
                                </td>

                                <td className="px-5 py-4">
                                    <RoleBadge value={user.role} />
                                </td>

                                <td className="px-5 py-4">
                                    <VerificationBadge
                                        value={user.verificationStatus}
                                    />
                                </td>

                                <td className="px-5 py-4">
                                    <StatusBadge value={user.active} />
                                </td>

                                <td className="px-5 py-4 text-slate-700">
                                    ⭐ {user.ratingAverage || 1}
                                </td>

                                <td className="px-5 py-4 text-gray-400">
                                    {user.createdAt
                                        ? new Date(user.createdAt).toLocaleDateString()
                                        : "No disponible"}
                                </td>

                                <td className="px-5 py-4">
                                    <div className="flex items-center gap-2 whitespace-nowrap">
                                        {/* Botón Skills - Entidad 3 */}
                                        <button
                                            onClick={() => onViewSkills(user)}
                                            className="w-8 h-8 rounded-full bg-blue-50 hover:bg-blue-100 flex items-center justify-center transition-colors"
                                            title="Ver Habilidades"
                                        >
                                            <span className="text-sm">🛠️</span>
                                        </button>

                                        {/* Botón Estado (Activar/Suspender) */}
                                        <button
                                            onClick={() => onToggleStatus(user._id, user.active)}
                                            className={`w-8 h-8 rounded-full flex items-center justify-center ${user.active
                                                ? "bg-red-50 hover:bg-red-100"
                                                : "bg-green-50 hover:bg-green-100"
                                                }`}
                                            title={user.active ? "Suspender usuario" : "Activar usuario"}
                                        >
                                            {user.active ? (
                                                <img src={PersonD} alt="Suspender" className="w-4.5 h-4.5" />
                                            ) : (
                                                <img src={check} alt="Activar" className="w-4.5 h-4.5" />
                                            )}
                                        </button>

                                        <UsersActionsMenu user={user} />
                                    </div>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 px-5 py-4 border-t border-gray-100">
                <p className="text-xs text-gray-400">
                    Mostrando{" "}
                    {totalUsers === 0 ? 0 : startIndex + 1}
                    {"–"}
                    {Math.min(endIndex, totalUsers)} de {totalUsers} usuarios
                </p>

                <div className="flex items-center gap-2 flex-wrap">
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
                            className={`w-8 h-8 rounded-lg text-sm font-semibold ${currentPage === index + 1
                                ? "bg-green-500 text-white"
                                : "text-gray-500 hover:bg-gray-100"
                                }`}
                        >
                            {index + 1}
                        </button>
                    ))}

                    <button
                        onClick={() => setCurrentPage(currentPage + 1)}
                        disabled={
                            currentPage === totalPages || totalPages === 0
                        }
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
    if (value === "CLIENT") {
        return (
            <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-600 text-xs font-semibold">
                Cliente
            </span>
        );
    }

    if (value === "ADMIN") {
        return (
            <span className="px-3 py-1 rounded-full bg-red-100 text-red-600 text-xs font-semibold">
                Admin
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
    if (value === true) {
        return (
            <span className="px-3 py-1 rounded-full bg-green-100 text-green-600 text-xs font-semibold">
                Verificado
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
    if (value === false) {
        return (
            <span className="px-3 py-1 rounded-full bg-red-100 text-red-600 text-xs font-semibold">
                ● Suspendido
            </span>
        );
    }

    return (
        <span className="px-3 py-1 rounded-full bg-green-100 text-green-600 text-xs font-semibold">
            ● Activo
        </span>
    );
};