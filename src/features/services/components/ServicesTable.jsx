import JobIconG from "../../../assets/icons/JobIconG.svg";
import date from "../../../assets/icons/date.svg";
import view from "../../../assets/icons/view.svg";

export const ServicesTable = ({
    services, totalServices, startIndex, endIndex,
    currentPage, totalPages, setCurrentPage, onViewService
}) => {
    return (
        <div>
            {/* ── Tabla desktop ── */}
            <div className="hidden sm:block overflow-x-auto">
                <table className="w-full text-sm">
                    <thead className="bg-gray-50 text-gray-400 uppercase text-xs">
                        <tr>
                            {["Solicitud", "Cliente", "Trabajador", "Inicio", "Precio", "Estado", ""].map((h, i) => (
                                <th key={i} className="text-left font-semibold px-5 py-4">{h}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {services.length === 0 ? (
                            <tr><td colSpan="7" className="px-5 py-10 text-center text-gray-400">No se encontraron servicios.</td></tr>
                        ) : services.map(s => (
                            <tr key={s.id} className="border-t border-gray-100 hover:bg-gray-50 transition">
                                <td className="px-5 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-9 h-9 rounded-xl bg-green-50 flex items-center justify-center shrink-0">
                                            <img src={JobIconG} className="w-4 h-4" />
                                        </div>
                                        <div className="min-w-0">
                                            <p className="font-semibold text-[#0F172A] truncate text-xs">{s.requestCode}</p>
                                            <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
                                                <img src={date} className="w-3 h-3" />{s.createdDate}
                                            </p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-5 py-4 text-sm text-gray-700">{s.clientName}</td>
                                <td className="px-5 py-4 text-sm text-gray-700">{s.workerName}</td>
                                <td className="px-5 py-4 text-sm text-gray-600">{s.startDateFormatted}</td>
                                <td className="px-5 py-4 font-semibold text-[#0F172A]">Q {s.budget}</td>
                                <td className="px-5 py-4"><StatusBadge value={s.status} /></td>
                                <td className="px-5 py-4 text-right">
                                    <button onClick={() => onViewService(s)} className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:bg-gray-100 transition">
                                        <img src={view} className="w-4 h-4" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* ── Vista de CARDS Mobile ── */}
            <div className="sm:hidden flex flex-col gap-4 p-4 bg-gray-50/50">
                {services.length === 0 ? (
                    <p className="px-5 py-10 text-center text-sm text-gray-400 font-medium">No se encontraron servicios.</p>
                ) : services.map(s => (
                    <div 
                        key={s.id} 
                        className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
                    >
                        {/* Header: Código + Fecha + Estado */}
                        <div className="p-4 flex items-center justify-between border-b border-gray-50 bg-white">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center">
                                    <img src={JobIconG} className="w-5 h-5" />
                                </div>
                                <div>
                                    <span className="text-[10px] font-bold text-blue-500 uppercase tracking-wider">
                                        Ref: {s.requestCode}
                                    </span>
                                    <p className="text-xs text-gray-400 flex items-center gap-1">
                                        <img src={date} className="w-3 h-3 opacity-60" />
                                        {s.createdDate}
                                    </p>
                                </div>
                            </div>
                            <StatusBadge value={s.status} />
                        </div>

                        {/* Contenido: Participantes y Detalles */}
                        <div className="p-4 space-y-4">
                            {/* Grid de Personas */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-[10px] text-gray-400 uppercase font-bold tracking-tight mb-0.5">Cliente</p>
                                    <p className="text-sm font-semibold text-[#0F172A] truncate">{s.clientName}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] text-gray-400 uppercase font-bold tracking-tight mb-0.5">Trabajador</p>
                                    <p className="text-sm font-semibold text-[#0F172A] truncate">{s.workerName}</p>
                                </div>
                            </div>

                            {/* Grid de Info del Servicio */}
                            <div className="grid grid-cols-2 gap-4 py-3 border-y border-gray-50">
                                <div>
                                    <p className="text-[10px] text-gray-400 uppercase font-bold tracking-tight mb-0.5">Fecha Inicio</p>
                                    <p className="text-sm font-semibold text-gray-600">{s.startDateFormatted}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] text-gray-400 uppercase font-bold tracking-tight mb-0.5">Total</p>
                                    <p className="text-sm font-bold text-green-600">Q {s.budget}</p>
                                </div>
                            </div>

                            {/* Botón de Acción Principal */}
                            <button 
                                onClick={() => onViewService(s)}
                                className="w-full py-3 bg-gray-50 hover:bg-gray-100 text-[#0F172A] rounded-xl flex items-center justify-center gap-2 transition-colors border border-gray-100 font-semibold text-sm"
                            >
                                <img src={view} className="w-4 h-4" />
                                Detalles del servicio
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Paginación */}
            {totalPages > 0 && (
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-4 sm:px-5 py-4 border-t border-gray-100">
                    <p className="text-xs text-gray-400">
                        Mostrando {totalServices === 0 ? 0 : startIndex + 1}–{Math.min(endIndex, totalServices)} de {totalServices}
                    </p>
                    <div className="flex items-center gap-1.5">
                        <button onClick={() => setCurrentPage(p => Math.max(p - 1, 1))} disabled={currentPage === 1} className="px-3 py-1.5 rounded-lg text-sm text-gray-500 hover:bg-gray-100 disabled:opacity-40 transition">
                            ← Anterior
                        </button>
                        <span className="text-xs text-gray-400 px-2 font-medium">Página {currentPage} / {totalPages}</span>
                        <button onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))} disabled={currentPage === totalPages} className="px-3 py-1.5 rounded-lg text-sm text-gray-500 hover:bg-gray-100 disabled:opacity-40 transition">
                            Siguiente →
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

const StatusBadge = ({ value }) => {
    if (value === "COMPLETED") return <span className="px-2 sm:px-3 py-1 rounded-full bg-green-100 border border-green-200 text-green-600 text-[10px] font-bold whitespace-nowrap">● Finalizado</span>;
    if (value === "CANCELLED") return <span className="px-2 sm:px-3 py-1 rounded-full bg-red-100 border border-red-200 text-red-600 text-[10px] font-bold whitespace-nowrap">● Cancelado</span>;
    if (value === "PENDING") return <span className="px-2 sm:px-3 py-1 rounded-full bg-blue-100 border border-blue-200 text-blue-600 text-[10px] font-bold whitespace-nowrap">● Pendiente</span>;
    return <span className="px-2 sm:px-3 py-1 rounded-full bg-yellow-100 border border-yellow-200 text-yellow-600 text-[10px] font-bold whitespace-nowrap">● En progreso</span>;
};