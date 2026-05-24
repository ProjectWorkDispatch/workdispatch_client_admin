import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useSkillStore, useCategoryStore } from "../../users/Store/adminStore";

export const SkillModal = ({ onClose }) => {
    const { addSkill } = useSkillStore();
    const { categories, getCategories, loading: loadingCats } = useCategoryStore();

    const [name, setName] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getCategories();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name.trim()) return toast.error("El nombre de la habilidad es requerido");
        if (!categoryId) return toast.error("Debe seleccionar una categoría");

        setLoading(true);
        try {
            await addSkill({
                name: name.trim(),
                categoryId,
                isActive: true
            });
            toast.success("Habilidad creada correctamente");
            onClose();
        } catch (error) {
            const msg = error?.response?.data?.message || error?.message || "Error desconocido";
            toast.error(`No se pudo guardar: ${msg}`);
        } finally {
            setLoading(false);
        }
    };

    const catList = Array.isArray(categories) ? categories : [];

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm">
            <div className="bg-white w-full max-w-md rounded-2xl p-6 shadow-xl">
                <h2 className="text-xl font-bold mb-4 text-[#0F172A]">Nueva Habilidad</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1">Nombre</label>
                        <input
                            autoFocus
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-green-400 transition-all"
                            placeholder="Ej: Carpintería"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            disabled={loading}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1">Categoría</label>
                        {loadingCats ? (
                            <p className="text-sm text-slate-400 italic px-1">Cargando categorías...</p>
                        ) : catList.length === 0 ? (
                            <p className="text-sm text-red-400 italic px-1">No hay categorías disponibles. Crea una primero.</p>
                        ) : (
                            <select
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-green-400 transition-all"
                                value={categoryId}
                                onChange={(e) => setCategoryId(e.target.value)}
                                disabled={loading}
                            >
                                <option value="">Selecciona una categoría</option>
                                {catList.map(cat => (
                                    <option key={cat._id} value={cat._id}>{cat.name}</option>
                                ))}
                            </select>
                        )}
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
                            disabled={loading || catList.length === 0}
                            className="flex-1 py-3 bg-[#0F172A] text-white rounded-xl font-semibold hover:bg-slate-800 transition-all disabled:opacity-50"
                        >
                            {loading ? "Guardando..." : "Guardar"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};