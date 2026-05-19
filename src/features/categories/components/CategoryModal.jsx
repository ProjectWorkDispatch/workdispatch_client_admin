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
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                onClick={onClose}
            />

            <div className="relative bg-white w-full max-w-lg mx-4 rounded-2xl shadow-xl overflow-hidden">
                <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
                    <h2 className="text-lg font-bold text-[#0F172A]">
                        {isEditing
                            ? "Editar categoría"
                            : "Detalle de Categoría"}
                    </h2>

                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 text-xl"
                    >
                        ×
                    </button>
                </div>

                <div className="p-6 space-y-5">
                    <div>
                        <p className="text-sm text-gray-400 mb-2">
                            Nombre
                        </p>

                        {isEditing ? (
                            <input
                                type="text"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none text-sm focus:border-green-400 focus:ring-2 focus:ring-green-100"
                            />
                        ) : (
                            <p className="font-semibold text-[#0F172A]">
                                {category.name}
                            </p>
                        )}
                    </div>

                    <div>
                        <p className="text-sm text-gray-400 mb-2">
                            Descripción
                        </p>

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
                        <p className="text-sm text-gray-400">
                            Estado
                        </p>

                        <div className="mt-2">
                            <StatusBadge value={category.status} />
                        </div>
                    </div>

                    <div>
                        <p className="text-sm text-gray-400">
                            Fecha de creación
                        </p>

                        <p className="font-semibold text-[#0F172A]">
                            {category.createdAt}
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        {isEditing ? (
                            <>
                                <button
                                    onClick={handleSubmit}
                                    disabled={loading}
                                    className="flex-1 bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white py-3 rounded-xl font-semibold transition"
                                >
                                    {loading
                                        ? "Guardando..."
                                        : "Guardar cambios"}
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
                                    onClick={() =>
                                        setIsEditing(true)
                                    }
                                    className="flex-1 border border-blue-300 text-blue-600 hover:bg-blue-50 py-3 rounded-xl font-semibold transition"
                                >
                                    Editar
                                </button>

                                <button
                                    onClick={() =>
                                        onStatusChange(
                                            category._id,
                                            category.status
                                        )
                                    }
                                    className={`flex-1 py-3 rounded-xl font-semibold transition flex items-center justify-center gap-2 ${category.status === "ACTIVE"
                                            ? "border border-red-300 text-red-500 hover:bg-red-50"
                                            : "bg-green-600 text-white hover:bg-green-700"
                                        }`}
                                >
                                    <img
                                        src={
                                            category.status ===
                                                "ACTIVE"
                                                ? deny
                                                : check
                                        }
                                        alt="Estado"
                                        className="w-4 h-4"
                                    />

                                    {category.status ===
                                        "ACTIVE"
                                        ? "Desactivar"
                                        : "Activar"}
                                </button>
                            </>
                        )}
                    </div>
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