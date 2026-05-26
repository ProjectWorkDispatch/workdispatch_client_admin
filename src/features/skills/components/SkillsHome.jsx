import { useState, useEffect } from "react";
import { useSkillStore } from "../../users/Store/adminStore";
import { SkillModal } from "./SkillModal";
import { EditSkillModal } from "./EditSkillModal";

export const SkillsHome = () => {
    const { skills, loading, getSkills } = useSkillStore();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingSkill, setEditingSkill] = useState(null);

    useEffect(() => {
        getSkills();
    }, []);

    const skillsList = Array.isArray(skills) ? skills : [];

    return (
        <section className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-[#0F172A]">Habilidades</h1>
                    <p className="text-sm text-gray-500">Configuración global de habilidades</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="px-6 py-3 bg-[#0F172A] text-white rounded-xl font-semibold hover:bg-slate-800 transition"
                >
                    + Nueva Habilidad
                </button>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <table className="w-full text-sm">
                    <thead className="bg-gray-50 text-gray-400 uppercase text-xs">
                        <tr>
                            <th className="text-left px-5 py-4">Habilidad</th>
                            <th className="text-left px-5 py-4">Categoría</th>
                            <th className="text-left px-5 py-4">Estado</th>
                            <th className="text-left px-5 py-4">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr><td colSpan="4" className="p-10 text-center italic text-gray-400">Cargando...</td></tr>
                        ) : skillsList.length > 0 ? (
                            skillsList.map((skill) => (
                                <tr key={skill._id || Math.random()} className="border-t border-gray-100 hover:bg-gray-50 transition">
                                    <td className="px-5 py-4 font-semibold text-[#0F172A]">{skill.name}</td>
                                    <td className="px-5 py-4 text-gray-500">{skill.categoryId?.name || "Global"}</td>
                                    <td className="px-5 py-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${skill.isActive !== false ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                                            ● {skill.isActive !== false ? 'Activa' : 'Inactiva'}
                                        </span>
                                    </td>
                                    <td className="px-5 py-4">
                                        <button
                                            onClick={() => setEditingSkill(skill)}
                                            className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-semibold transition"
                                        >
                                            Editar
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr><td colSpan="4" className="p-10 text-center text-gray-400">No hay habilidades registradas.</td></tr>
                        )}
                    </tbody>
                </table>
            </div>

            {isModalOpen && (
                <SkillModal onClose={() => { setIsModalOpen(false); getSkills(); }} />
            )}

            {editingSkill && (
                <EditSkillModal
                    skill={editingSkill}
                    onClose={() => { setEditingSkill(null); getSkills(); }}
                />
            )}
        </section>
    );
};