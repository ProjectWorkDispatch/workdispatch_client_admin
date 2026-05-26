import { useState, useEffect } from "react";
import { useSkillStore, useCategoryStore } from "../../users/Store/adminStore";
import { SkillModal } from "./SkillModal";
import { EditSkillModal } from "./EditSkillModal";
import { UserStatsCard } from "../../users/components/UserStatsCard";

export const SkillsHome = () => {
    const { skills, loading, getSkills } = useSkillStore();
    const { categories, getCategories } = useCategoryStore();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingSkill, setEditingSkill] = useState(null);
    const [search, setSearch] = useState("");

    useEffect(() => {
        getSkills();
        getCategories();
    }, []);

    const skillsList = Array.isArray(skills) ? skills : [];

    const filteredSkills = skillsList.filter((skill) => {
        const q = search.toLowerCase();
        return (
            skill.name?.toLowerCase().includes(q) ||
            skill.categoryId?.name?.toLowerCase().includes(q)
        );
    });

    const totalActive   = skillsList.filter((s) => s.isActive !== false).length;
    const totalInactive = skillsList.filter((s) => s.isActive === false).length;

    return (
        <section className="space-y-6">

            {/* HEADER */}
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-[#0F172A]">Habilidades</h1>
                    <p className="text-sm text-gray-500">Configuración global de habilidades</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="inline-flex items-center justify-center rounded-2xl bg-green-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-700"
                >
                    + Nueva Habilidad
                </button>
            </div>

            {/* STATS */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <UserStatsCard value={skillsList.length}  label="Total habilidades" color="text-[#0F172A]" />
                <UserStatsCard value={totalActive}        label="Activas"           color="text-green-500" />
                <UserStatsCard value={totalInactive}      label="Inactivas"         color="text-red-500" />
            </div>

            {/* TABLA */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">

                {/* BARRA DE BÚSQUEDA */}
                <div className="p-5 border-b border-gray-100">
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Buscar por nombre o categoría..."
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-green-400 text-sm"
                    />
                </div>

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
                        ) : filteredSkills.length > 0 ? (
                            filteredSkills.map((skill) => (
                                <tr key={skill._id || Math.random()} className="border-t border-gray-100 hover:bg-gray-50 transition">
                                    <td className="px-5 py-4 font-semibold text-[#0F172A]">{skill.name}</td>
                                    <td className="px-5 py-4 text-gray-500">{skill.categoryId?.name || "Global"}</td>
                                    <td className="px-5 py-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${skill.isActive !== false ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"}`}>
                                            ● {skill.isActive !== false ? "Activa" : "Inactiva"}
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
                            <tr><td colSpan="4" className="p-10 text-center text-gray-400">
                                {search ? "No hay habilidades que coincidan con la búsqueda." : "No hay habilidades registradas."}
                            </td></tr>
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