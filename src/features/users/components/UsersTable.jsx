import { UsersActionsMenu } from "./UsersActionsMenu";
import PersonD from "../../../assets/icons/personD.svg";
import check from "../../../assets/icons/check.svg";
import EyeB from "../../../assets/icons/EyeB.svg";

const getStatusValue = (user) => user.active ?? user.isActive ?? false;
const getVerificationValue = (user) => user.verificationStatus ?? user.verified ?? false;
const getRoleValue = (user) => (user.role || "").toString().toUpperCase();

export const UsersTable = ({
    users, totalUsers, startIndex, endIndex,
    currentPage, totalPages, setCurrentPage,
    onToggleStatus, onViewSkills
}) => {
    return (
        <div>
            {/* ── TABLA — solo desktop ── */}
            <div className="hidden sm:block overflow-x-auto">
                <table className="w-full text-sm">
                    <thead className="bg-gray-50 text-gray-500">
                        <tr>
                            {["Usuario", "Rol", "Verificación", "Estado", "Rating", "Registro", "Acciones"].map(h => (
                                <th key={h} className="text-left font-medium px-5 py-4">{h}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {users.length === 0 ? (
                            <tr><td colSpan="7" className="px-5 py-10 text-center text-gray-400">No se encontraron usuarios.</td></tr>
                        ) : users.map((user) => (
                            <tr key={user._id || user.email} className="border-t border-gray-100 hover:bg-gray-50 transition">
                                <td className="px-5 py-4">
                                    <div className="flex items-center gap-3 min-w-0">
                                        {user.profilePhoto ? (
                                            <img src={user.profilePhoto} alt="" className="w-10 h-10 rounded-full object-cover shrink-0" />
                                        ) : (
                                            <div className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center text-xs font-bold shrink-0">
                                                {user.firstName?.[0]}{user.lastName?.[0]}
                                            </div>
                                        )}
                                        <div className="min-w-0">
                                            <p className="font-semibold text-[#0F172A] truncate">{user.firstName} {user.lastName}</p>
                                            <p className="text-xs text-gray-400 truncate">{user.email}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-5 py-4"><RoleBadge value={getRoleValue(user)} /></td>
                                <td className="px-5 py-4"><VerificationBadge value={getVerificationValue(user)} /></td>
                                <td className="px-5 py-4"><StatusBadge value={getStatusValue(user)} /></td>
                                <td className="px-5 py-4">
                                    <span className="text-yellow-400">
                                        {"★".repeat(Math.round(user.ratingAverage || 1))}
                                        {"☆".repeat(5 - Math.round(user.ratingAverage || 1))}
                                    </span>
                                </td>
                                <td className="px-5 py-4 text-gray-400 text-sm">
                                    {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "—"}
                                </td>
                                <td className="px-5 py-4">
                                    <div className="flex items-center gap-2">
                                        <button onClick={() => onViewSkills(user)} className="w-8 h-8 rounded-full bg-blue-50 hover:bg-blue-100 flex items-center justify-center transition" title="Ver habilidades">
                                            <img src={EyeB} className="w-4 h-4" />
                                        </button>
                                        <button onClick={() => onToggleStatus(user._id, getStatusValue(user))} className={`w-8 h-8 rounded-full flex items-center justify-center transition ${getStatusValue(user) ? "bg-red-50 hover:bg-red-100" : "bg-green-50 hover:bg-green-100"}`} title={getStatusValue(user) ? "Suspender" : "Activar"}>
                                            <img src={getStatusValue(user) ? PersonD : check} className="w-4 h-4" />
                                        </button>
                                        <UsersActionsMenu user={user} />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* ── TARJETAS — solo mobile ── */}
            <div className="sm:hidden divide-y divide-gray-50">
                {users.length === 0 ? (
                    <p className="px-5 py-10 text-center text-sm text-gray-400">No se encontraron usuarios.</p>
                ) : users.map((user) => (
                    <div key={user._id || user.email} className="p-4 space-y-3">
                        {/* Fila superior: avatar + nombre + menú */}
                        <div className="flex items-center justify-between gap-3">
                            <div className="flex items-center gap-3 min-w-0">
                                {user.profilePhoto ? (
                                    <img src={user.profilePhoto} alt="" className="w-10 h-10 rounded-full object-cover shrink-0" />
                                ) : (
                                    <div className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center text-xs font-bold shrink-0">
                                        {user.firstName?.[0]}{user.lastName?.[0]}
                                    </div>
                                )}
                                <div className="min-w-0">
                                    <p className="font-semibold text-sm text-[#0F172A] truncate">{user.firstName} {user.lastName}</p>
                                    <p className="text-xs text-gray-400 truncate">{user.email}</p>
                                </div>
                            </div>
                            <UsersActionsMenu user={user} />
                        </div>

                        {/* Badges */}
                        <div className="flex flex-wrap gap-2">
                            <RoleBadge value={getRoleValue(user)} />
                            <VerificationBadge value={getVerificationValue(user)} />
                            <StatusBadge value={getStatusValue(user)} />
                        </div>

                        {/* Info + acciones */}
                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <p className="text-xs text-gray-400">
                                    {"★".repeat(Math.round(user.ratingAverage || 1))}{"☆".repeat(5 - Math.round(user.ratingAverage || 1))}
                                </p>
                                <p className="text-xs text-gray-400">
                                    {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "—"}
                                </p>
                            </div>
                            <div className="flex gap-2">
                                <button onClick={() => onViewSkills(user)} className="w-8 h-8 rounded-full bg-blue-50 hover:bg-blue-100 flex items-center justify-center transition">
                                    <img src={EyeB} className="w-4 h-4" />
                                </button>
                                <button onClick={() => onToggleStatus(user._id, getStatusValue(user))} className={`w-8 h-8 rounded-full flex items-center justify-center transition ${getStatusValue(user) ? "bg-red-50 hover:bg-red-100" : "bg-green-50 hover:bg-green-100"}`}>
                                    <img src={getStatusValue(user) ? PersonD : check} className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* ── Paginación ── */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-4 sm:px-5 py-4 border-t border-gray-100">
                <p className="text-xs text-gray-400">
                    Mostrando {totalUsers === 0 ? 0 : startIndex + 1}–{Math.min(endIndex, totalUsers)} de {totalUsers} usuarios
                </p>
                <div className="flex items-center gap-1.5 flex-wrap">
                    <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1} className="w-8 h-8 rounded-lg text-gray-400 hover:bg-gray-100 disabled:opacity-30">‹</button>
                    {Array.from({ length: totalPages }, (_, i) => (
                        <button key={i + 1} onClick={() => setCurrentPage(i + 1)} className={`w-8 h-8 rounded-lg text-sm font-semibold ${currentPage === i + 1 ? "bg-green-500 text-white" : "text-gray-500 hover:bg-gray-100"}`}>
                            {i + 1}
                        </button>
                    ))}
                    <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages || totalPages === 0} className="w-8 h-8 rounded-lg text-gray-400 hover:bg-gray-100 disabled:opacity-30">›</button>
                </div>
            </div>
        </div>
    );
};

// ── Badges ──────────────────────────────────────────────────────
const RoleBadge = ({ value }) => {
    if (["CLIENT", "CLIENTE"].includes(value))
        return <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-600 text-xs font-semibold">Cliente</span>;
    if (value === "ADMIN")
        return <span className="px-3 py-1 rounded-full bg-red-100 text-red-600 text-xs font-semibold">Admin</span>;
    if (["WORKER", "TRABAJADOR"].includes(value))
        return <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-600 text-xs font-semibold">Trabajador</span>;
    return <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-xs font-semibold">{value || "Desconocido"}</span>;
};

const VerificationBadge = ({ value }) =>
    value === true
        ? <span className="px-3 py-1 rounded-full bg-green-100 text-green-600 text-xs font-semibold">Verificado</span>
        : <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-600 text-xs font-semibold">Pendiente</span>;

const StatusBadge = ({ value }) =>
    value === false
        ? <span className="px-3 py-1 rounded-full bg-red-100 text-red-600 text-xs font-semibold">● Suspendido</span>
        : <span className="px-3 py-1 rounded-full bg-green-100 text-green-600 text-xs font-semibold">● Activo</span>;