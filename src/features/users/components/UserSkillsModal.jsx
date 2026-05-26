import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useSkillStore } from "../Store/adminStore";
import * as api from "../../../shared/api/admin.js";

export const UserSkillsModal = ({ user, onClose, onRefresh }) => {
    const { getSkills, skills } = useSkillStore();

    const [userSkills, setUserSkills] = useState([]);
    const [loadingSkills, setLoadingSkills] = useState(true);
    const [form, setForm] = useState({ skillId: "", experienceYears: "" });
    const [submitting, setSubmitting] = useState(false);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        const init = async () => {
            setLoadingSkills(true);
            try {
                await getSkills();
                const res = await api.getUserById(user._id);
                const freshUser = res.data?.data || res.data?.user || res.data;
                const rawSkills = freshUser?.skills || [];
                setUserSkills(rawSkills.map(s => ({
                    _id: s._id,
                    skillId: s.skillId?._id || s.skillId,
                    name: s.skillId?.name || s.name || "Sin nombre",
                    experienceYears: s.experienceYears
                })));
            } catch {
                const rawSkills = user.skills || [];
                setUserSkills(rawSkills.map(s => ({
                    _id: s._id,
                    skillId: s.skillId?._id || s.skillId,
                    name: s.skillId?.name || s.name || "Sin nombre",
                    experienceYears: s.experienceYears
                })));
            } finally {
                setLoadingSkills(false);
            }
        };
        init();
    }, [user._id]);

    const assignedSkillIds = userSkills.map(s => String(s.skillId));
    const availableSkills = (Array.isArray(skills) ? skills : []).filter(
        s => s.isActive !== false && !assignedSkillIds.includes(String(s._id))
    );

    const handleAssign = async (e) => {
        e.preventDefault();
        if (!form.skillId) return toast.error("Selecciona una habilidad");
        if (form.experienceYears === "" || Number(form.experienceYears) < 0)
            return toast.error("Ingresa los años de experiencia");

        setSubmitting(true);
        try {
            const res = await api.assignSkillToUser({
                userId: user._id,
                skillId: form.skillId,
                experienceYears: Number(form.experienceYears),
            });
            const newEntry = res.data?.data;
            const skillName = skills.find(s => s._id === form.skillId)?.name || "Habilidad";
            setUserSkills(prev => [...prev, {
                _id: newEntry._id,
                skillId: newEntry.skillId?._id || form.skillId,
                name: newEntry.skillId?.name || skillName,
                experienceYears: newEntry.experienceYears
            }]);
            setForm({ skillId: "", experienceYears: "" });
            setShowForm(false);
            toast.success("Habilidad asignada correctamente");
            onRefresh?.();
        } catch (error) {
            const msg = error?.response?.data?.message || error?.message || "Error al asignar";
            toast.error(msg);
        } finally {
            setSubmitting(false);
        }
    };

    const handleRemove = async (userSkillId) => {
        try {
            await api.removeUserSkill(userSkillId);
            setUserSkills(prev => prev.filter(s => s._id !== userSkillId));
            toast.success("Habilidad eliminada");
            onRefresh?.();
        } catch {
            toast.error("Error al eliminar habilidad");
        }
    };

    return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
        <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden">

            {/* HEADER */}
            <div className="relative bg-linear-to-r from-[#0F172A] to-[#1E293B] px-6 py-6">
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white text-sm transition"
                >
                    ✕
                </button>
                <div className="flex items-center gap-4">
                    <div className="text-white">
                        <h2 className="text-xl font-bold">Habilidades Profesionales</h2>
                        <p className="text-sm text-slate-300 mt-1">{user.firstName} {user.lastName}</p>
                    </div>
                </div>
            </div>

            {/* BODY */}
            <div className="p-6">
                <div className="space-y-3 max-h-[280px] overflow-y-auto pr-1 mb-4">
                    {loadingSkills ? (
                        <p className="text-center text-slate-400 italic py-8 text-sm">Cargando habilidades...</p>
                    ) : userSkills.length > 0 ? (
                        userSkills.map((s, idx) => (
                            <div key={s._id || idx} className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                <span className="font-semibold text-slate-700">{s.name}</span>
                                <div className="flex items-center gap-2">
                                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-lg text-xs font-bold">
                                        {s.experienceYears} años
                                    </span>
                                    <button
                                        onClick={() => handleRemove(s._id)}
                                        className="w-7 h-7 rounded-full bg-red-50 hover:bg-red-100 text-red-500 text-xs flex items-center justify-center transition"
                                        title="Eliminar habilidad"
                                    >
                                        ✕
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-8">
                            <p className="text-slate-400 italic text-sm">Este usuario aún no tiene habilidades cargadas.</p>
                        </div>
                    )}
                </div>

                {showForm ? (
                    <form onSubmit={handleAssign} className="space-y-3 border-t border-slate-100 pt-4">
                        <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">Asignar nueva habilidad</p>
                        <select
                            value={form.skillId}
                            onChange={e => setForm(f => ({ ...f, skillId: e.target.value }))}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-green-400"
                            disabled={submitting}
                        >
                            <option value="">Selecciona una habilidad</option>
                            {availableSkills.map(s => (
                                <option key={s._id} value={s._id}>{s.name}</option>
                            ))}
                        </select>
                        {availableSkills.length === 0 && (
                            <p className="text-xs text-slate-400 italic">El usuario ya tiene todas las habilidades disponibles.</p>
                        )}
                        <input
                            type="number"
                            min="0"
                            max="50"
                            placeholder="Años de experiencia"
                            value={form.experienceYears}
                            onChange={e => setForm(f => ({ ...f, experienceYears: e.target.value }))}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-green-400"
                            disabled={submitting}
                        />
                        <div className="flex gap-2">
                            <button
                                type="button"
                                onClick={() => setShowForm(false)}
                                className="flex-1 py-2 rounded-xl border border-gray-200 text-sm font-semibold text-slate-600 hover:bg-gray-50"
                            >
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                disabled={submitting || availableSkills.length === 0}
                                className="flex-1 py-2 rounded-xl bg-green-600 text-white text-sm font-semibold hover:bg-green-700 disabled:opacity-60"
                            >
                                {submitting ? "Guardando..." : "Asignar"}
                            </button>
                        </div>
                    </form>
                ) : (
                    <div className="border-t border-slate-100 pt-4 flex gap-2">
                        <button
                            onClick={() => setShowForm(true)}
                            disabled={availableSkills.length === 0 && !loadingSkills}
                            className="flex-1 py-3 rounded-2xl border-2 border-dashed border-slate-200 text-slate-500 text-sm font-semibold hover:border-green-400 hover:text-green-600 transition disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                            + Asignar habilidad
                        </button>
                        <button
                            onClick={onClose}
                            className="flex-1 py-3 bg-[#0F172A] text-white rounded-2xl font-bold hover:bg-slate-800 transition"
                        >
                            Cerrar
                        </button>
                    </div>
                )}
            </div>
        </div>
    </div>
);
};