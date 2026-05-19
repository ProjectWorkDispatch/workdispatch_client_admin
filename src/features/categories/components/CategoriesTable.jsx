import EyeB from "../../../assets/icons/EyeB.svg";
import deny from "../../../assets/icons/deny.svg";
import check from "../../../assets/icons/check.svg";

export const CategoriesTable = ({
    categories,
    totalCategories,
    startIndex,
    endIndex,
    currentPage,
    totalPages,
    setCurrentPage,
    onView,
    onStatusChange
}) => {
    return (
        <div className="overflow-x-auto">
            <table className="w-full min-w-212.5 text-sm">
                <thead className="bg-gray-50 text-gray-400 uppercase text-xs">
                    <tr>
                        <th className="text-left font-semibold px-5 py-4">
                            Nombre
                        </th>

                        <th className="text-left font-semibold px-5 py-4">
                            Descripción
                        </th>

                        <th className="text-left font-semibold px-5 py-4">
                            Estado
                        </th>

                        <th className="text-left font-semibold px-5 py-4">
                            Creada
                        </th>

                        <th className="text-left font-semibold px-5 py-4">
                            Acciones
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {categories.length === 0 ? (
                        <tr>
                            <td
                                colSpan="5"
                                className="px-5 py-10 text-center text-gray-400"
                            >
                                No se encontraron categorías.
                            </td>
                        </tr>
                    ) : (
                        categories.map((category) => (
                            <tr
                                key={category._id}
                                className="border-t border-gray-100 hover:bg-gray-50 transition"
                            >
                                <td className="px-5 py-4 min-w-52">
                                    <div className="flex items-center gap-3">
                                        <div className="min-w-0">
                                            <p className="font-semibold text-[#0F172A] truncate">
                                                {category.name}
                                            </p>

                                            <p className="text-xs text-gray-400">
                                                Categoría del sistema
                                            </p>
                                        </div>
                                    </div>
                                </td>

                                <td className="px-5 py-4 text-gray-500 min-w-72">
                                    <p className="truncate">
                                        {category.description}
                                    </p>
                                </td>

                                <td className="px-5 py-4">
                                    <StatusBadge value={category.status} />
                                </td>

                                <td className="px-5 py-4 text-gray-500 whitespace-nowrap">
                                    {category.createdAt}
                                </td>

                                <td className="px-5 py-4">
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => onView(category)}
                                            className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition"
                                            title="Ver categoría"
                                        >
                                            <img
                                                src={EyeB}
                                                alt="Ver"
                                                className="w-4 h-4 object-contain"
                                            />
                                        </button>

                                        <button
                                            onClick={() =>
                                                onStatusChange(
                                                    category._id,
                                                    category.status
                                                )
                                            }
                                            className={`w-8 h-8 rounded-full flex items-center justify-center transition ${category.status === "ACTIVE"
                                                    ? "hover:bg-red-50"
                                                    : "hover:bg-green-50"
                                                }`}
                                            title={
                                                category.status === "ACTIVE"
                                                    ? "Desactivar"
                                                    : "Activar"
                                            }
                                        >
                                            <img
                                                src={
                                                    category.status === "ACTIVE"
                                                        ? deny
                                                        : check
                                                }
                                                alt="Estado"
                                                className="w-4 h-4 object-contain"
                                            />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between px-5 py-4 border-t border-gray-100">
                <p className="text-xs text-gray-400">
                    Mostrando{" "}
                    {totalCategories === 0 ? 0 : startIndex + 1}
                    {"–"}
                    {Math.min(endIndex, totalCategories)} de {totalCategories} categorías
                </p>

                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setCurrentPage(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="w-8 h-8 rounded-lg text-gray-400 hover:bg-gray-100 disabled:opacity-30"
                    >
                        ‹
                    </button>

                    {Array.from({ length: totalPages }, (_, index) => (
                        <button
                            key={index + 1}
                            onClick={() => setCurrentPage(index + 1)}
                            className={`w-8 h-8 rounded-lg text-sm font-semibold ${currentPage === index + 1
                                    ? "bg-[#0F172A] text-white"
                                    : "text-gray-500 hover:bg-gray-100"
                                }`}
                        >
                            {index + 1}
                        </button>
                    ))}

                    <button
                        onClick={() => setCurrentPage(currentPage + 1)}
                        disabled={
                            currentPage === totalPages || totalPages === 0
                        }
                        className="w-8 h-8 rounded-lg text-gray-400 hover:bg-gray-100 disabled:opacity-30"
                    >
                        ›
                    </button>
                </div>
            </div>
        </div>
    );
};

const StatusBadge = ({ value }) => {
    if (value === "ACTIVE") {
        return (
            <span className="px-3 py-1 rounded-full bg-green-100 border border-green-200 text-green-600 text-xs font-semibold">
                ● Activa
            </span>
        );
    }

    return (
        <span className="px-3 py-1 rounded-full bg-red-100 border border-red-200 text-red-600 text-xs font-semibold">
            ● Inactiva
        </span>
    );
};