import { useState, useEffect } from "react";
import { useSkillStore, useCategoryStore } from "../../users/Store/adminStore";

const FALLBACK_CATEGORIES = [
    { _id: "646f83a7e527e4d9f8a4b111", name: "Electricidad" },
    { _id: "646f83a7e527e4d9f8a4b112", name: "Diseño Gráfico" },
    { _id: "646f83a7e527e4d9f8a4b113", name: "Programación" },
    { _id: "646f83a7e527e4d9f8a4b114", name: "Carpintería" },
];

export const SkillModal = ({ onClose }) => {
    const { addSkill } = useSkillStore();
    const { categories, getCategories } = useCategoryStore();
    
    const [name, setName] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getCategories();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name.trim()) {
            alert("El nombre de la habilidad es requerido");
            return;
        }
        if (!categoryId) {
            alert("Debe seleccionar una categoría");
            return;
        }
        
        setLoading(true);
        try {
            await addSkill({ 
                name: name.trim(),
                categoryId: categoryId,
                isActive: true 
            });
            onClose();
        } catch (error) {
            const errorData = error.response?.data || error;
            const message = errorData.message || "Error desconocido";
            const details = errorData.error?.map(e => `${e.field}: ${e.message}`).join("\n") || "";
            alert(`No se pudo guardar:\n${message}\n${details}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm">
            <div className="bg-white w-full max-w-md rounded-2xl p-6 shadow-xl">
                <h2 className="text-xl font-bold mb-4 text-[#0F172A]">Nueva Habilidad</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        autoFocus
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-green-400 transition-all"
                        placeholder="Nombre (ej: Carpintería)"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        disabled={loading}
                    />
                    
                    <select
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-green-400 transition-all"
                        value={categoryId}
                        onChange={(e) => setCategoryId(e.target.value)}
                        disabled={loading}
                    >
                        <option value="">Selecciona una categoría</option>
                        {(Array.isArray(categories) && categories.length > 0 ? categories : FALLBACK_CATEGORIES).map(cat => (
                            <option key={cat._id} value={cat._id}>
                                {cat.name}
                            </option>
                        ))}
                    </select>

                    <div className="flex gap-2">
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
                            {loading ? "Guardando..." : "Guardar"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};