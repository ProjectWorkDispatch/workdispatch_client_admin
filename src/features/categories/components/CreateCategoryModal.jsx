import { useSaveCategory } from "../hooks/useSaveCategory";

export const CreateCategoryModal = ({
    open,
    onClose
}) => {
    const {
        form,
        loading,
        handleChange,
        handleSubmit
    } = useSaveCategory(onClose);

    if (!open) return null;

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
                            <h2 className="text-xl font-bold">Nueva categoría</h2>
                            <p className="text-sm text-slate-300 mt-1">Completa los campos para crear una categoría</p>
                        </div>
                    </div>
                </div>

                {/* BODY */}
                <form onSubmit={handleSubmit} className="p-6 space-y-5">
                    <div>
                        <label className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-2 block">Nombre</label>
                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            placeholder="Ej: Electricidad"
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none text-sm focus:border-green-400 focus:ring-2 focus:ring-green-100"
                        />
                    </div>

                    <div>
                        <label className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-2 block">Descripción</label>
                        <textarea
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            placeholder="Describe la categoría..."
                            rows={4}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none text-sm resize-none focus:border-green-400 focus:ring-2 focus:ring-green-100"
                        />
                    </div>

                    {/* FOOTER */}
                    <div className="flex gap-3 pt-2 border-t border-gray-100">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 border border-gray-200 text-gray-600 py-3 rounded-xl font-semibold hover:bg-gray-50 transition text-sm"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-1 bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white font-semibold py-3 rounded-xl transition text-sm"
                        >
                            {loading ? "Guardando..." : "Crear categoría"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};