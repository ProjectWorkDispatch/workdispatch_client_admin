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
            {/* ── TABLA — Desktop ── */}
            <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-sm">
                    <thead className="bg-gray-50 text-gray-500 uppercase text-[11px] tracking-wider">
                        <tr>
                            {["Usuario", "Rol", "Verificación", "Estado", "Rating", "Registro", "Acciones"].map(h => (
                                <th key={h} className="text-left font-semibold px-5 py-4">{h}</th>
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
                                <td className="px-5 py-4"><RatingStars rating={user.ratingAverage} /></td>
                                <td className="px-5 py-4 text-gray-400 text-sm whitespace-nowrap">
                                    {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "—"}
                                </td>
                                <td className="px-5 py-4">
                                    <div className="flex items-center gap-2">
                                        <button onClick={() => onViewSkills(user)} className="w-8 h-8 rounded-full bg-blue-50 hover:bg-blue-100 flex items-center justify-center transition" title="Ver habilidades">
                                            <img src={EyeB} className="w-4 h-4" />
                                        </button>
                                        <button onClick={() => onToggleStatus(user._id, getStatusValue(user))} className={`w-8 h-8 rounded-full flex items-center justify-center transition ${getStatusValue(user) ? "bg-red-50 hover:bg-red-100" : "bg-green-50 hover:bg-green-100"}`}>
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

            {/* ── CARDS — Mobile ── */}
            <div className="md:hidden flex flex-col gap-4 p-4 bg-gray-50/50">
                {users.length === 0 ? (
                    <p className="px-5 py-10 text-center text-sm text-gray-400">No se encontraron usuarios.</p>
                ) : users.map((user) => (
                    <div key={user._id || user.email} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-4 flex items-center justify-between border-b border-gray-50">
                            <div className="flex items-center gap-3 min-w-0">
                                {user.profilePhoto ? (
                                    <img src={user.profilePhoto} alt="" className="w-12 h-12 rounded-full object-cover shrink-0 border border-gray-100" />
                                ) : (
                                    <div className="w-12 h-12 rounded-full bg-green-500 text-white flex items-center justify-center text-sm font-bold shrink-0">
                                        {user.firstName?.[0]}{user.lastName?.[0]}
                                    </div>
                                )}
                                <div className="min-w-0">
                                    <p className="font-bold text-[#0F172A] text-sm truncate">{user.firstName} {user.lastName}</p>
                                    <p className="text-xs text-gray-400 truncate">{user.email}</p>
                                </div>
                            </div>
                            <UsersActionsMenu user={user} />
                        </div>

                        <div className="p-4 space-y-4">
                            <div className="flex flex-wrap gap-2">
                                <RoleBadge value={getRoleValue(user)} />
                                <VerificationBadge value={getVerificationValue(user)} />
                                <StatusBadge value={getStatusValue(user)} />
                            </div>

                            <div className="grid grid-cols-2 gap-4 py-3 border-y border-gray-50">
                                <div>
                                    <p className="text-[10px] text-gray-400 uppercase font-bold mb-1">Rating</p>
                                    <RatingStars rating={user.ratingAverage} />
                                </div>
                                <div className="text-right">
                                    <p className="text-[10px] text-gray-400 uppercase font-bold mb-1">Registro</p>
                                    <p className="text-xs font-semibold text-gray-600">
                                        {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "—"}
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-2">
                                <button onClick={() => onViewSkills(user)} className="flex-1 py-3 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center gap-2 font-bold text-xs">
                                    <img src={EyeB} className="w-4 h-4" /> HABILIDADES
                                </button>
                                <button
                                    onClick={() => onToggleStatus(user._id, getStatusValue(user))}
                                    className={`w-14 py-3 rounded-xl flex items-center justify-center border ${getStatusValue(user) ? "bg-red-50 border-red-100 text-red-600" : "bg-green-50 border-green-100 text-green-600"}`}
                                >
                                    <img src={getStatusValue(user) ? PersonD : check} className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* ── PAGINACIÓN ── */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 px-5 py-6 border-t border-gray-100">
                <p className="text-xs text-gray-400 font-medium text-center">
                    Mostrando <span className="text-gray-600">{totalUsers === 0 ? 0 : startIndex + 1}–{Math.min(endIndex, totalUsers)}</span> de {totalUsers}
                </p>
                <div className="flex items-center justify-center gap-1.5">
                    <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1} className="w-9 h-9 rounded-xl text-gray-400 hover:bg-gray-100 disabled:opacity-20 transition-all">‹</button>
                    {Array.from({ length: totalPages }, (_, i) => (
                        <button key={i + 1} onClick={() => setCurrentPage(i + 1)} className={`w-9 h-9 rounded-xl text-xs font-bold ${currentPage === i + 1 ? "bg-green-500 text-white shadow-lg shadow-green-100" : "text-gray-500 hover:bg-gray-100"}`}>
                            {i + 1}
                        </button>
                    ))}
                    <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages || totalPages === 0} className="w-9 h-9 rounded-xl text-gray-400 hover:bg-gray-100 disabled:opacity-20 transition-all">›</button>
                </div>
            </div>
        </div>
    );
};

// ── BADGES & HELPERS ──
const RatingStars = ({ rating }) => {
    const val = Math.round(rating || 0);
    return (
        <div className="flex items-center gap-0.5 text-yellow-400 text-xs">
            {"★".repeat(val)}<span className="text-gray-200">{"★".repeat(5 - val)}</span>
        </div>
    );
};

const RoleBadge = ({ value }) => {
    const base = "px-2.5 py-1 rounded-full text-[10px] font-bold uppercase border";
    if (["CLIENT", "CLIENTE"].includes(value)) return <span className={`${base} bg-blue-50 border-blue-100 text-blue-600`}>Cliente</span>;
    if (value === "ADMIN") return <span className={`${base} bg-red-50 border-red-100 text-red-600`}>Admin</span>;
    if (["WORKER", "TRABAJADOR"].includes(value)) return <span className={`${base} bg-purple-50 border-purple-100 text-purple-600`}>Trabajador</span>;
    return <span className={`${base} bg-gray-50 border-gray-100 text-gray-600`}>{value || "S/R"}</span>;
};

const VerificationBadge = ({ value }) => {
    const base = "px-2.5 py-1 rounded-full text-[10px] font-bold uppercase border";
    return value === true
        ? <span className={`${base} bg-green-50 border-green-100 text-green-600`}>Verificado</span>
        : <span className={`${base} bg-yellow-50 border-yellow-100 text-yellow-600`}>Pendiente</span>;
};

const StatusBadge = ({ value }) => {
    const base = "px-2.5 py-1 rounded-full text-[10px] font-bold uppercase border";
    return value === false
        ? <span className={`${base} bg-red-50 border-red-100 text-red-600`}>● Suspendido</span>
        : <span className={`${base} bg-green-50 border-green-100 text-green-600`}>● Activo</span>;
};