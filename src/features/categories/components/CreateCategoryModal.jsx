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
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                onClick={onClose}
            />

            <div className="relative bg-white w-full max-w-lg mx-4 rounded-2xl shadow-xl overflow-hidden">
                <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
                    <h2 className="text-lg font-bold text-[#0F172A]">
                        Nueva categoría
                    </h2>

                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 text-xl"
                    >
                        ×
                    </button>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="p-6 space-y-5"
                >
                    <div>
                        <label className="text-sm text-gray-500">
                            Nombre
                        </label>

                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            placeholder="Ej: Electricidad"
                            className="mt-2 w-full px-4 py-3 rounded-xl border border-gray-200 outline-none text-sm focus:border-green-400 focus:ring-2 focus:ring-green-100"
                        />
                    </div>

                    <div>
                        <label className="text-sm text-gray-500">
                            Descripción
                        </label>

                        <textarea
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            placeholder="Describe la categoría..."
                            rows={4}
                            className="mt-2 w-full px-4 py-3 rounded-xl border border-gray-200 outline-none text-sm resize-none focus:border-green-400 focus:ring-2 focus:ring-green-100"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white font-semibold py-3 rounded-xl transition"
                    >
                        {loading
                            ? "Guardando..."
                            : "Crear categoría"}
                    </button>
                </form>
            </div>
        </div>
    );
};