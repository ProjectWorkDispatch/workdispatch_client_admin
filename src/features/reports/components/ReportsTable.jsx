import EyeB from "../../../assets/icons/EyeB.svg";
import ban from "../../../assets/icons/ban.svg";
import ignore from "../../../assets/icons/ignore.svg";

export const ReportsTable = ({
    reports,
    totalReports,
    pendingReports,
    onView,
    onSanction,
    onIgnore
}) => {
    return (
        <div>
            {/* ── Tabla desktop ── */}
            <div className="hidden lg:block overflow-x-auto">
                <table className="min-w-225 w-full text-sm">
                    <thead className="bg-gray-50 text-gray-500 uppercase text-[11px] tracking-wider">
                        <tr>
                            <th className="text-left font-semibold px-5 py-4">Usuario Reportado</th>
                            <th className="text-left font-semibold px-5 py-4">Motivo</th>
                            <th className="text-left font-semibold px-5 py-4">Enviado</th>
                            <th className="text-left font-semibold px-5 py-4">Gravedad</th>
                            <th className="text-left font-semibold px-5 py-4">Estado</th>
                            <th className="text-left font-semibold px-5 py-4">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reports.length === 0 ? (
                            <tr><td colSpan="6" className="px-5 py-10 text-center text-gray-400">No se encontraron reportes.</td></tr>
                        ) : (
                            reports.map((report) => (
                                <tr key={report.id} className={`border-t border-gray-100 hover:bg-gray-50 transition ${report.severity === "Alta" && report.status === "Pendiente" ? "border-l-2 border-l-red-400" : ""}`}>
                                    <td className="px-5 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-9 h-9 rounded-full ${report.color} text-white flex items-center justify-center text-xs font-bold shrink-0`}>{report.reportedInitials}</div>
                                            <div>
                                                <p className="font-semibold text-[#0F172A]">{report.reportedName}</p>
                                                <p className="text-xs text-gray-400">Por: {report.reporterName}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-5 py-4 text-[#0F172A]">{report.reason}</td>
                                    <td className="px-5 py-4 text-gray-500">{report.sentAt}</td>
                                    <td className="px-5 py-4"><SeverityBadge value={report.severity} /></td>
                                    <td className="px-5 py-4"><StatusBadge value={report.status} /></td>
                                    <td className="px-5 py-4">
                                        <div className="flex items-center gap-2">
                                            <button onClick={() => onView(report)} className="w-8 h-8 rounded-full bg-blue-50 text-blue-500 hover:bg-blue-100 flex items-center justify-center transition"><img src={EyeB} className="w-4 h-4" /></button>
                                            {report.status === "Pendiente" && (
                                                <>
                                                    <button onClick={() => onSanction(report.id)} className="w-8 h-8 rounded-full bg-red-50 text-red-500 hover:bg-red-100 flex items-center justify-center transition"><img src={ban} className="w-4 h-4" /></button>
                                                    <button onClick={() => onIgnore(report.id)} className="w-8 h-8 rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 flex items-center justify-center transition"><img src={ignore} className="w-4 h-4" /></button>
                                                </>
                                            )}
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
                {reports.length === 0 ? (
                    <p className="px-5 py-10 text-center text-sm text-gray-400 font-medium">No hay reportes pendientes.</p>
                ) : (
                    reports.map((report) => (
                        <div
                            key={report.id}
                            className={`bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden ${report.severity === "Alta" && report.status === "Pendiente" ? "ring-1 ring-red-200" : ""
                                }`}
                        >
                            {/* Cabecera: Reportado y Gravedad */}
                            <div className="p-4 flex items-start justify-between bg-white border-b border-gray-50">
                                <div className="flex items-center gap-3 min-w-0">
                                    <div className={`w-11 h-11 rounded-full ${report.color} text-white flex items-center justify-center text-sm font-bold shrink-0 shadow-sm`}>
                                        {report.reportedInitials}
                                    </div>
                                    <div className="min-w-0">
                                        <p className="font-bold text-sm text-[#0F172A] truncate">
                                            {report.reportedName}
                                        </p>
                                        <p className="text-[11px] text-gray-400 font-medium">
                                            Reportado por: <span className="text-gray-600">{report.reporterName}</span>
                                        </p>
                                    </div>
                                </div>
                                <div className="flex flex-col items-end gap-1">
                                    <StatusBadge value={report.status} />
                                    <SeverityBadge value={report.severity} />
                                </div>
                            </div>

                            {/* Cuerpo: Motivo y Fecha */}
                            <div className="p-4 space-y-3">
                                <div className="bg-red-50/30 rounded-xl p-3 border border-red-50/50">
                                    <p className="text-[10px] text-red-400 uppercase font-bold mb-1 tracking-wider">Motivo del reporte</p>
                                    <p className="text-sm font-semibold text-[#0F172A] leading-snug">{report.reason}</p>
                                </div>

                                <div className="flex justify-between items-center text-[11px] px-1">
                                    <span className="text-gray-400 font-medium uppercase">Enviado</span>
                                    <span className="text-gray-600 font-bold">{report.sentAt}</span>
                                </div>

                                {/* Acciones */}
                                <div className="flex gap-2 pt-2">
                                    <button
                                        onClick={() => onView(report)}
                                        className="flex-1 py-3 bg-gray-50 hover:bg-gray-100 text-[#0F172A] rounded-xl flex items-center justify-center gap-2 transition-colors border border-gray-200 font-bold text-xs"
                                    >
                                        <img src={EyeB} className="w-4 h-4 opacity-70" />
                                        REVISAR
                                    </button>

                                    {report.status === "Pendiente" && (
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => onSanction(report.id)}
                                                className="w-12 py-3 bg-red-500 hover:bg-red-600 rounded-xl flex items-center justify-center transition-colors shadow-sm shadow-red-100"
                                                title="Sancionar"
                                            >
                                                <img src={ban} className="w-5 h-5 brightness-0 invert" />
                                            </button>
                                            <button
                                                onClick={() => onIgnore(report.id)}
                                                className="w-12 py-3 bg-gray-100 hover:bg-gray-200 text-gray-500 rounded-xl flex items-center justify-center transition-colors border border-gray-200"
                                                title="Ignorar"
                                            >
                                                <img src={ignore} className="w-5 h-5" />
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Footer / Resumen */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-5 py-4 border-t border-gray-100">
                <p className="text-xs text-gray-400 font-medium">
                    Mostrando {reports.length} de {totalReports} reportes
                    <span className="text-red-500 font-bold">
                        {" "}· {pendingReports} urgentes
                    </span>
                </p>
                <div className="flex gap-1">
                    <button className="w-8 h-8 rounded-lg bg-green-500 text-white text-xs font-bold shadow-sm shadow-green-100 flex items-center justify-center">
                        1
                    </button>
                </div>
            </div>
        </div>
    );
};

const SeverityBadge = ({ value }) => {
    const base = "px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-tighter";
    if (value === "Alta") return <span className={`${base} bg-red-100 text-red-600`}>Prioridad Alta</span>;
    if (value === "Media") return <span className={`${base} bg-orange-100 text-orange-600`}>Prioridad Media</span>;
    return <span className={`${base} bg-gray-100 text-gray-500`}>Baja</span>;
};

const StatusBadge = ({ value }) => {
    const base = "px-2 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border";
    if (value === "Resuelto") return <span className={`${base} bg-green-50 border-green-100 text-green-600`}>Resuelto</span>;
    if (value === "Sancionado") return <span className={`${base} bg-red-50 border-red-100 text-red-600`}>Sancionado</span>;
    if (value === "Ignorado") return <span className={`${base} bg-gray-50 border-gray-100 text-gray-400`}>Ignorado</span>;
    return <span className={`${base} bg-yellow-50 border-yellow-100 text-yellow-600`}>Pendiente</span>;
};