import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useSkillStore, useCategoryStore } from "../../users/Store/adminStore";
import * as api from "../../../shared/api/admin.js";

export const EditSkillModal = ({ skill, onClose }) => {
    const { getSkills } = useSkillStore();
    const { categories, getCategories } = useCategoryStore();

    const [name, setName] = useState(skill.name || "");
    const [categoryId, setCategoryId] = useState(skill.categoryId?._id || skill.categoryId || "");
    const [isActive, setIsActive] = useState(skill.isActive !== false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getCategories();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name.trim()) return toast.error("El nombre es obligatorio");
        if (!categoryId) return toast.error("Selecciona una categoría");

        setLoading(true);
        try {
            await api.updateSkill(skill._id, { name: name.trim(), categoryId, isActive });
            toast.success("Habilidad actualizada correctamente");
            await getSkills();
            onClose();
        } catch (error) {
            const msg = error?.response?.data?.message || error?.message || "Error al actualizar";
            toast.error(msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm">
            <div className="bg-white w-full max-w-md rounded-2xl p-6 shadow-xl">
                <h2 className="text-xl font-bold mb-4 text-[#0F172A]">Editar Habilidad</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1">Nombre</label>
                        <input
                            autoFocus
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-green-400 transition-all"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            disabled={loading}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1">Categoría</label>
                        <select
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-green-400 transition-all"
                            value={categoryId}
                            onChange={(e) => setCategoryId(e.target.value)}
                            disabled={loading}
                        >
                            <option value="">Selecciona una categoría</option>
                            {(Array.isArray(categories) ? categories : []).map(cat => (
                                <option key={cat._id} value={cat._id}>{cat.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="flex items-center gap-3">
                        <label className="text-sm font-semibold text-slate-700">Estado:</label>
                        <button
                            type="button"
                            onClick={() => setIsActive(v => !v)}
                            className={`px-4 py-1.5 rounded-full text-xs font-bold transition ${isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}
                        >
                            {isActive ? "● Activa" : "● Inactiva"}
                        </button>
                    </div>

                    <div className="flex gap-2 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={loading}
                            className="flex-1 py-3 bg-gray-100 text-gray-600 rounded-xl font-semibold hover:bg-gray-200 disabled:opacity-50"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-1 py-3 bg-[#0F172A] text-white rounded-xl font-semibold hover:bg-slate-800 transition-all disabled:opacity-50"
                        >
                            {loading ? "Guardando..." : "Guardar cambios"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};