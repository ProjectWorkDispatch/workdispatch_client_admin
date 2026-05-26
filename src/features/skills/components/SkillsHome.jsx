import { useState, useEffect } from "react";
import { useSkillStore, useCategoryStore } from "../../users/Store/adminStore";
import { SkillModal } from "./SkillModal";
import { EditSkillModal } from "./EditSkillModal";
import { UserStatsCard } from "../../users/components/UserStatsCard";
import EyeB from "../../../assets/icons/EyeB.svg";

export const SkillsHome = () => {
    const { skills, loading, getSkills } = useSkillStore();
    const { getCategories } = useCategoryStore();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingSkill, setEditingSkill] = useState(null);
    const [search, setSearch] = useState("");

    useEffect(() => { getSkills(); getCategories(); }, []);

    const skillsList     = Array.isArray(skills) ? skills : [];
    const filteredSkills = skillsList.filter(s =>
        s.name?.toLowerCase().includes(search.toLowerCase()) ||
        s.categoryId?.name?.toLowerCase().includes(search.toLowerCase())
    );
    const totalActive   = skillsList.filter(s => s.isActive !== false).length;
    const totalInactive = skillsList.filter(s => s.isActive === false).length;

    return (
        <section className="space-y-4 sm:space-y-6">

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                    <h1 className="text-xl sm:text-2xl font-bold text-[#0F172A]">Habilidades</h1>
                    <p className="text-xs sm:text-sm text-gray-500">Configuración global de habilidades</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="w-full sm:w-auto inline-flex items-center justify-center rounded-2xl bg-green-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-green-700 transition"
                >
                    + Nueva Habilidad
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4">
                <UserStatsCard value={skillsList.length} label="Total"    color="text-[#0F172A]" />
                <UserStatsCard value={totalActive}       label="Activas"  color="text-green-500" />
                <UserStatsCard value={totalInactive}     label="Inactivas" color="text-red-500" />
            </div>

            {/* Tabla / Tarjetas */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-4 sm:p-5 border-b border-gray-100">
                    <input
                        type="text"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        placeholder="Buscar por nombre o categoría..."
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 outline-none focus:border-green-400 text-sm"
                    />
                </div>

                {loading ? (
                    <p className="p-10 text-center italic text-gray-400 text-sm">Cargando...</p>
                ) : filteredSkills.length === 0 ? (
                    <p className="p-10 text-center text-gray-400 text-sm">
                        {search ? "No hay habilidades que coincidan." : "No hay habilidades registradas."}
                    </p>
                ) : (
                    <>
                        {/* ── Tabla desktop ── */}
                        <div className="hidden sm:block overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead className="bg-gray-50 text-gray-400 uppercase text-xs">
                                    <tr>
                                        {["Habilidad", "Categoría", "Estado", "Acciones"].map(h => (
                                            <th key={h} className="text-left px-5 py-4">{h}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredSkills.map(skill => (
                                        <tr key={skill._id} className="border-t border-gray-100 hover:bg-gray-50 transition">
                                            <td className="px-5 py-4 font-semibold text-[#0F172A]">{skill.name}</td>
                                            <td className="px-5 py-4 text-gray-500">{skill.categoryId?.name || "Global"}</td>
                                            <td className="px-5 py-4">
                                                <StatusBadge active={skill.isActive !== false} />
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
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* ── Tarjetas mobile ── */}
                        <div className="sm:hidden divide-y divide-gray-50">
                            {filteredSkills.map(skill => (
                                <div key={skill._id} className="p-4 flex items-center justify-between gap-3">
                                    <div className="min-w-0">
                                        <p className="font-semibold text-sm text-[#0F172A] truncate">{skill.name}</p>
                                        <p className="text-xs text-gray-400 mt-0.5">{skill.categoryId?.name || "Global"}</p>
                                        <div className="mt-2">
                                            <StatusBadge active={skill.isActive !== false} />
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => setEditingSkill(skill)}
                                        className="shrink-0 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-semibold transition"
                                    >
                                        <img src={EyeB} className="w-4 h-4" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>

            {isModalOpen   && <SkillModal onClose={() => { setIsModalOpen(false); getSkills(); }} />}
            {editingSkill  && <EditSkillModal skill={editingSkill} onClose={() => { setEditingSkill(null); getSkills(); }} />}
        </section>
    );
};

const StatusBadge = ({ active }) => (
    <span className={`px-3 py-1 rounded-full text-xs font-bold ${active ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"}`}>
        ● {active ? "Activa" : "Inactiva"}
    </span>
);