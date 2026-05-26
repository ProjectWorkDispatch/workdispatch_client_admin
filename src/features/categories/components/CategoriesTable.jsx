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
        <div>
            {/* ── Tabla desktop ── */}
            <div className="hidden lg:block overflow-x-auto">
                <table className="w-full min-w-212.5 text-sm">
                    <thead className="bg-gray-50 text-gray-400 uppercase text-xs">
                        <tr>
                            <th className="text-left font-semibold px-5 py-4">Nombre</th>
                            <th className="text-left font-semibold px-5 py-4">Descripción</th>
                            <th className="text-left font-semibold px-5 py-4">Estado</th>
                            <th className="text-left font-semibold px-5 py-4">Creada</th>
                            <th className="text-left font-semibold px-5 py-4">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.length === 0 ? (
                            <tr><td colSpan="5" className="px-5 py-10 text-center text-gray-400">No se encontraron categorías.</td></tr>
                        ) : (
                            categories.map((category) => (
                                <tr key={category._id} className="border-t border-gray-100 hover:bg-gray-50 transition">
                                    <td className="px-5 py-4 min-w-52">
                                        <div className="flex items-center gap-3">
                                            <div className="min-w-0">
                                                <p className="font-semibold text-[#0F172A] truncate">{category.name}</p>
                                                <p className="text-xs text-gray-400">Categoría del sistema</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-5 py-4 text-gray-500 min-w-72">
                                        <p className="truncate">{category.description}</p>
                                    </td>
                                    <td className="px-5 py-4"><StatusBadge value={category.status} /></td>
                                    <td className="px-5 py-4 text-gray-500 whitespace-nowrap">{category.createdAt}</td>
                                    <td className="px-5 py-4">
                                        <div className="flex items-center gap-2">
                                            <button onClick={() => onView(category)} className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:bg-gray-100 transition"><img src={EyeB} className="w-4 h-4" /></button>
                                            <button 
                                                onClick={() => onStatusChange(category._id, category.status)} 
                                                className={`w-8 h-8 rounded-full flex items-center justify-center transition ${category.status === "ACTIVE" ? "hover:bg-red-50" : "hover:bg-green-50"}`}
                                            >
                                                <img src={category.status === "ACTIVE" ? deny : check} className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* ── Vista de CARDS Mobile ── */}
            <div className="lg:hidden flex flex-col gap-4 p-4 bg-gray-50/50">
                {categories.length === 0 ? (
                    <p className="px-5 py-10 text-center text-sm text-gray-400 font-medium">No hay categorías registradas.</p>
                ) : (
                    categories.map((category) => (
                        <div key={category._id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                            {/* Header: Nombre y Estado */}
                            <div className="p-4 flex items-center justify-between border-b border-gray-50">
                                <div className="min-w-0">
                                    <h3 className="font-bold text-[#0F172A] text-sm truncate uppercase tracking-tight">
                                        {category.name}
                                    </h3>
                                    <p className="text-[10px] text-gray-400 font-medium mt-0.5 uppercase">ID: {category._id.slice(-6)}</p>
                                </div>
                                <StatusBadge value={category.status} />
                            </div>

                            {/* Cuerpo: Descripción */}
                            <div className="p-4 space-y-4">
                                <div className="bg-gray-50/80 rounded-xl p-3 border border-gray-100">
                                    <p className="text-[10px] text-gray-400 uppercase font-bold mb-1 tracking-wider">Descripción</p>
                                    <p className="text-xs text-gray-600 leading-relaxed italic">
                                        {category.description || "Sin descripción disponible."}
                                    </p>
                                </div>

                                <div className="flex justify-between items-center px-1">
                                    <span className="text-[10px] text-gray-400 font-bold uppercase">Creada</span>
                                    <span className="text-[11px] font-semibold text-gray-500">{category.createdAt}</span>
                                </div>

                                {/* Acciones */}
                                <div className="flex gap-2 pt-1">
                                    <button 
                                        onClick={() => onView(category)}
                                        className="flex-1 py-3 bg-gray-50 hover:bg-gray-100 text-[#0F172A] rounded-xl flex items-center justify-center gap-2 transition-colors border border-gray-200 font-bold text-xs"
                                    >
                                        <img src={EyeB} className="w-4 h-4 opacity-70" />
                                        EDITAR
                                    </button>
                                    
                                    <button 
                                        onClick={() => onStatusChange(category._id, category.status)}
                                        className={`w-12 py-3 rounded-xl flex items-center justify-center transition-all border ${
                                            category.status === "ACTIVE" 
                                            ? "bg-red-50 border-red-100 text-red-600" 
                                            : "bg-green-50 border-green-100 text-green-600"
                                        }`}
                                    >
                                        <img src={category.status === "ACTIVE" ? deny : check} className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Paginación */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between px-5 py-4 border-t border-gray-100">
                <p className="text-xs text-gray-400 font-medium text-center sm:text-left">
                    Mostrando <span className="text-gray-600">{totalCategories === 0 ? 0 : startIndex + 1}–{Math.min(endIndex, totalCategories)}</span> de {totalCategories} categorías
                </p>

                <div className="flex items-center justify-center gap-1.5">
                    <button
                        onClick={() => setCurrentPage(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:bg-gray-100 disabled:opacity-20 transition-all border border-transparent"
                    >
                        ‹
                    </button>

                    {Array.from({ length: totalPages }, (_, index) => (
                        <button
                            key={index + 1}
                            onClick={() => setCurrentPage(index + 1)}
                            className={`w-8 h-8 rounded-lg text-xs font-bold transition-all ${
                                currentPage === index + 1
                                    ? "bg-[#0F172A] text-white shadow-md shadow-gray-200"
                                    : "text-gray-500 hover:bg-gray-100"
                            }`}
                        >
                            {index + 1}
                        </button>
                    ))}

                    <button
                        onClick={() => setCurrentPage(currentPage + 1)}
                        disabled={currentPage === totalPages || totalPages === 0}
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:bg-gray-100 disabled:opacity-20 transition-all border border-transparent"
                    >
                        ›
                    </button>
                </div>
            </div>
        </div>
    );
};

const StatusBadge = ({ value }) => {
    const base = "px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border";
    if (value === "ACTIVE") {
        return <span className={`${base} bg-green-50 border-green-100 text-green-600`}>● Activa</span>;
    }
    return <span className={`${base} bg-red-50 border-red-100 text-red-600`}>● Inactiva</span>;
};