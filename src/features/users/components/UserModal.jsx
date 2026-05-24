import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useUserStore } from "../Store/adminStore";

export const UserModal = ({ open, onClose, user }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    // Importamos updateUser y toggleUserStatus del store
    const updateUser = useUserStore((state) => state.updateUser);
    const toggleUserStatus = useUserStore((state) => state.toggleUserStatus);

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address: "",
        description: "",
        role: "CLIENT",
    });

    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", handleEscape);
        return () => window.removeEventListener("keydown", handleEscape);
    }, [onClose]);

    useEffect(() => {
        if (user) {
            setFormData({
                firstName: user.firstName || "",
                lastName: user.lastName || "",
                email: user.email || "",
                phone: user.phone || "",
                address: user.address || "",
                description: user.description || "",
                role: user.role || "CLIENT",
            });
            setIsEditing(false);
        }
    }, [user]);

    if (!open || !user) return null;

    const fullName = `${user.firstName || ""} ${user.lastName || ""}`;

    const roleMap = {
        CLIENT: "Cliente",
        WORKER: "Trabajador",
        ADMIN: "Administrador",
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Guarda cambios llamando al store
    const handleSave = async () => {
        if (submitting) return;
        setSubmitting(true);
        try {
            // updateUser manda PUT /users/:id con los datos en JSON
            await updateUser(user._id, formData);
            toast.success("Usuario actualizado correctamente");
            setIsEditing(false);
        } catch (error) {
            const message =
                error?.response?.data?.message ||
                error?.message ||
                "Error al actualizar usuario";
            toast.error(message);
        } finally {
            setSubmitting(false);
        }
    };

    // Suspender / activar llamando al store
    const handleToggleStatus = async () => {
        try {
            await toggleUserStatus(user._id, user.active);
            toast.success(
                user.active ? "Usuario suspendido" : "Usuario activado"
            );
            onClose(); // cerramos para que la tabla se refresque
        } catch {
            toast.error("Error al cambiar estado del usuario");
        }
    };

    return (
        <div className="fixed inset-0 z-100 bg-black/50 backdrop-blur-sm p-2 sm:p-4 overflow-y-auto">
            <div className="min-h-full flex items-center justify-center">
                <div className="w-full max-w-5xl bg-white rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
                    {/* HEADER */}
                    <div className="relative bg-linear-to-r from-[#0F172A] to-[#1E293B] px-4 sm:px-6 py-6 sm:py-8">
                        <button
                            onClick={onClose}
                            className="absolute top-3 right-3 sm:top-4 sm:right-4 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/10 hover:bg-white/20 text-white text-sm sm:text-lg transition"
                        >
                            ✕
                        </button>

                        <div className="flex flex-col sm:flex-row sm:items-center gap-5">
                            <div className="shrink-0 mx-auto sm:mx-0">
                                {user.profilePhoto ? (
                                    <img
                                        src={user.profilePhoto}
                                        alt={fullName}
                                        className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border-4 border-white/20"
                                    />
                                ) : (
                                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-green-500 text-white flex items-center justify-center text-2xl sm:text-3xl font-bold border-4 border-white/20">
                                        {`${user.firstName?.[0] || ""}${user.lastName?.[0] || ""}`}
                                    </div>
                                )}
                            </div>

                            <div className="flex-1 text-white text-center sm:text-left">
                                <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-2 sm:gap-3">
                                    <h2 className="text-xl sm:text-2xl font-bold wrap-break-words">
                                        {fullName}
                                    </h2>
                                    <span
                                        className={`w-fit mx-auto sm:mx-0 px-3 py-1 rounded-full text-xs font-semibold ${
                                            user.active
                                                ? "bg-green-500/20 text-green-200 border border-green-400/30"
                                                : "bg-red-500/20 text-red-200 border border-red-400/30"
                                        }`}
                                    >
                                        ● {user.active ? "Activo" : "Suspendido"}
                                    </span>
                                </div>

                                <p className="text-sm text-slate-300 mt-2 break-all">
                                    {user.email}
                                </p>

                                <div className="flex flex-wrap justify-center sm:justify-start gap-2 mt-4">
                                    <span className="px-3 py-1 rounded-full bg-white/10 text-xs font-semibold">
                                        {roleMap[user.role]}
                                    </span>
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                            user.verificationStatus
                                                ? "bg-green-500/20 text-green-200"
                                                : "bg-yellow-500/20 text-yellow-200"
                                        }`}
                                    >
                                        {user.verificationStatus ? "Verificado" : "Pendiente"}
                                    </span>
                                    <span className="px-3 py-1 rounded-full bg-white/10 text-xs font-semibold">
                                        ⭐ {user.ratingAverage || 1}/5
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* BODY */}
                    <div className="p-4 sm:p-6 space-y-5 sm:space-y-6 max-h-[80vh] overflow-y-auto">
                        <div className="grid grid-cols-1 xl:grid-cols-3 gap-5 sm:gap-6">
                            {/* INFO PERSONAL */}
                            <div className="xl:col-span-2 bg-gray-50 rounded-2xl border border-gray-100 p-4 sm:p-5">
                                <div className="flex items-center justify-between mb-5">
                                    <h3 className="text-base sm:text-lg font-bold text-[#0F172A]">
                                        Información personal
                                    </h3>
                                    {isEditing && (
                                        <span className="text-xs font-semibold text-green-600">
                                            Modo edición
                                        </span>
                                    )}
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                                    <InputField label="Nombre" name="firstName" value={formData.firstName} onChange={handleChange} editing={isEditing} />
                                    <InputField label="Apellido" name="lastName" value={formData.lastName} onChange={handleChange} editing={isEditing} />
                                    <InputField label="Correo" name="email" value={formData.email} onChange={handleChange} editing={isEditing} />
                                    <InputField label="Teléfono" name="phone" value={formData.phone} onChange={handleChange} editing={isEditing} />

                                    <div>
                                        <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-wide text-gray-400 mb-2">
                                            Rol
                                        </p>
                                        {isEditing ? (
                                            <select
                                                name="role"
                                                value={formData.role}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-green-400 focus:ring-2 focus:ring-green-100"
                                            >
                                                <option value="CLIENT">Cliente</option>
                                                <option value="WORKER">Trabajador</option>
                                                <option value="ADMIN">Administrador</option>
                                            </select>
                                        ) : (
                                            <p className="text-sm text-slate-700">{roleMap[user.role]}</p>
                                        )}
                                    </div>

                                    <InfoItem
                                        label="Fecha de registro"
                                        value={user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "No disponible"}
                                    />
                                </div>
                            </div>

                            {/* STATS */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 xl:grid-cols-1 gap-4">
                                <StatsCard title="Calificación" value={`${user.ratingAverage || 1}/5`} color="text-yellow-500" />
                                <StatsCard title="Estado" value={user.active ? "Activo" : "Suspendido"} color={user.active ? "text-green-500" : "text-red-500"} />
                                <StatsCard title="Verificación" value={user.verificationStatus ? "Verificado" : "Pendiente"} color={user.verificationStatus ? "text-green-500" : "text-yellow-500"} />
                            </div>
                        </div>

                        {/* DESCRIPCIÓN */}
                        <div className="bg-gray-50 rounded-2xl border border-gray-100 p-4 sm:p-5">
                            <h3 className="text-base sm:text-lg font-bold text-[#0F172A] mb-4">Descripción</h3>
                            {isEditing ? (
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    rows={4}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none resize-none focus:border-green-400 focus:ring-2 focus:ring-green-100"
                                />
                            ) : (
                                <p className="text-sm text-gray-600 leading-relaxed wrap-break-words">
                                    {user.description?.trim() ? user.description : "Este usuario aún no ha agregado una descripción."}
                                </p>
                            )}
                        </div>

                        {/* UBICACIÓN */}
                        <div className="bg-gray-50 rounded-2xl border border-gray-100 p-4 sm:p-5">
                            <h3 className="text-base sm:text-lg font-bold text-[#0F172A] mb-4">Ubicación</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                                <InputField label="Dirección" name="address" value={formData.address} onChange={handleChange} editing={isEditing} />
                                <InfoItem label="Latitud" value={user.latitude !== null ? user.latitude : "No disponible"} />
                                <InfoItem label="Longitud" value={user.longitude !== null ? user.longitude : "No disponible"} />
                            </div>
                        </div>

                        {/* SKILLS */}
                        {user.skills && (
                            <div className="bg-gray-50 rounded-2xl border border-gray-100 p-4 sm:p-5">
                                <h3 className="text-base sm:text-lg font-bold text-[#0F172A] mb-4">Habilidades</h3>
                                {user.skills.length === 0 ? (
                                    <p className="text-sm text-gray-500">Este usuario no tiene habilidades registradas.</p>
                                ) : (
                                    <div className="flex flex-wrap gap-3">
                                        {user.skills.map((skill, index) => (
                                            <div key={index} className="w-full sm:w-auto px-4 py-3 rounded-xl bg-white border border-gray-200">
                                                <p className="text-sm font-semibold text-slate-700 wrap-break-words">
                                                    {skill.skillId?.name || skill.name}
                                                </p>
                                                <p className="text-xs text-gray-400 mt-1">{skill.experienceYears} años de experiencia</p>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* FOOTER */}
                    <div className="px-4 sm:px-6 py-4 border-t border-gray-100 bg-gray-50 flex flex-col sm:flex-row sm:justify-end gap-3">
                        {isEditing ? (
                            <>
                                <button
                                    onClick={() => setIsEditing(false)}
                                    className="w-full sm:w-auto px-5 py-2 rounded-xl text-sm font-semibold bg-gray-200 hover:bg-gray-300 text-slate-700 transition"
                                >
                                    Cancelar edición
                                </button>
                                <button
                                    onClick={handleSave}
                                    disabled={submitting}
                                    className="w-full sm:w-auto px-5 py-2 rounded-xl text-sm font-semibold bg-green-500 hover:bg-green-600 text-white transition disabled:opacity-60"
                                >
                                    {submitting ? "Guardando..." : "Guardar cambios"}
                                </button>
                            </>
                        ) : (
                            <button
                                onClick={() => setIsEditing(true)}
                                className="w-full sm:w-auto px-5 py-2 rounded-xl text-sm font-semibold bg-gray-200 hover:bg-gray-300 text-slate-700 transition"
                            >
                                Editar usuario
                            </button>
                        )}

                        <button
                            onClick={handleToggleStatus}
                            className={`w-full sm:w-auto px-5 py-2 rounded-xl text-sm font-semibold text-white transition ${
                                user.active
                                    ? "bg-red-500 hover:bg-red-600"
                                    : "bg-green-500 hover:bg-green-600"
                            }`}
                        >
                            {user.active ? "Suspender usuario" : "Activar usuario"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const InputField = ({ label, name, value, onChange, editing }) => (
    <div>
        <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-wide text-gray-400 mb-2">{label}</p>
        {editing ? (
            <input
                type="text"
                name={name}
                value={value}
                onChange={onChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-green-400 focus:ring-2 focus:ring-green-100"
            />
        ) : (
            <p className="text-sm text-slate-700 wrap-break-words">{value || "No disponible"}</p>
        )}
    </div>
);

const InfoItem = ({ label, value }) => (
    <div className="min-w-0">
        <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-wide text-gray-400">{label}</p>
        <p className="text-sm text-slate-700 mt-1 wrap-break-words">{value}</p>
    </div>
);

const StatsCard = ({ title, value, color }) => (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-5">
        <p className="text-[11px] sm:text-xs uppercase tracking-wide text-gray-400 font-semibold">{title}</p>
        <h4 className={`text-xl sm:text-2xl font-bold mt-2 wrap-break-words ${color}`}>{value}</h4>
    </div>
);