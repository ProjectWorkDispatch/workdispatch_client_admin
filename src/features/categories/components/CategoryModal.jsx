import { useState } from "react";

import deny from "../../../assets/icons/deny.svg";
import check from "../../../assets/icons/check.svg";

import { useSaveCategory } from "../hooks/useSaveCategory";

export const CategoryModal = ({
    category,
    onClose,
    onStatusChange
}) => {
    const [isEditing, setIsEditing] = useState(false);

    const {
        form,
        loading,
        handleChange,
        handleSubmit
    } = useSaveCategory({
        category,
        onClose: () => {
            setIsEditing(false);
            onClose();
        }
    });

    return (
        <div className="fixed inset-0 z-100 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />

            <div className="relative bg-white w-full max-w-lg mx-4 rounded-2xl shadow-xl overflow-hidden">

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
                            <h2 className="text-xl font-bold">{isEditing ? "Editar categoría" : category.name}</h2>
                            <div className="flex items-center gap-2 mt-2">
                                <StatusBadge value={category.status} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* BODY */}
                <div className="p-6 space-y-5">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-2">Nombre</p>
                        {isEditing ? (
                            <input
                                type="text"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none text-sm focus:border-green-400 focus:ring-2 focus:ring-green-100"
                            />
                        ) : (
                            <p className="font-semibold text-[#0F172A]">{category.name}</p>
                        )}
                    </div>

                    <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-2">Descripción</p>
                        {isEditing ? (
                            <textarea
                                name="description"
                                value={form.description}
                                onChange={handleChange}
                                rows={4}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none text-sm resize-none focus:border-green-400 focus:ring-2 focus:ring-green-100"
                            />
                        ) : (
                            <div className="bg-gray-50 rounded-2xl p-4 text-gray-600 text-sm leading-relaxed">
                                {category.description}
                            </div>
                        )}
                    </div>

                    <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-1">Fecha de creación</p>
                        <p className="font-semibold text-[#0F172A] text-sm">
                            {category.createdAt ? new Date(category.createdAt).toLocaleDateString() : "—"}
                        </p>
                    </div>
                </div>

                {/* FOOTER */}
                <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex gap-3">
                    {isEditing ? (
                        <>
                            <button
                                onClick={handleSubmit}
                                disabled={loading}
                                className="flex-1 bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white py-3 rounded-xl font-semibold transition"
                            >
                                {loading ? "Guardando..." : "Guardar cambios"}
                            </button>
                            <button
                                onClick={() => setIsEditing(false)}
                                className="flex-1 border border-gray-300 text-gray-600 py-3 rounded-xl font-semibold hover:bg-gray-50 transition"
                            >
                                Cancelar
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                onClick={() => setIsEditing(true)}
                                className="flex-1 border border-gray-300 text-gray-600 py-3 rounded-xl font-semibold hover:bg-gray-50 transition"
                            >
                                Editar
                            </button>
                            <button
                                onClick={() => onStatusChange(category._id, category.status)}
                                className={`flex-1 py-3 rounded-xl font-semibold transition flex items-center justify-center gap-2 ${category.status === "ACTIVE"
                                        ? "border border-red-300 text-red-500 hover:bg-red-50"
                                        : "bg-green-600 text-white hover:bg-green-700"
                                    }`}
                            >
                                <img src={category.status === "ACTIVE" ? deny : check} alt="Estado" className="w-4 h-4" />
                                {category.status === "ACTIVE" ? "Desactivar" : "Activar"}
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

const StatusBadge = ({ value }) => {
    if (value === "ACTIVE") {
        return (
            <span className="px-3 py-1 rounded-full bg-green-100 text-green-600 text-xs font-semibold">
                Activa
            </span>
        );
    }

    return (
        <span className="px-3 py-1 rounded-full bg-red-100 text-red-600 text-xs font-semibold">
            Inactiva
        </span>
    );
};