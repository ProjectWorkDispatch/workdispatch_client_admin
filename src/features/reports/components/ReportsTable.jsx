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
        <div className="w-full overflow-x-auto">
            <table className="min-w-225 w-full text-sm">
                <thead className="bg-gray-50 text-gray-500">
                    <tr>
                        <th className="text-left font-medium px-5 py-4">
                            Usuario Reportado
                        </th>

                        <th className="text-left font-medium px-5 py-4">
                            Motivo
                        </th>

                        <th className="text-left font-medium px-5 py-4">
                            Enviado
                        </th>

                        <th className="text-left font-medium px-5 py-4">
                            Gravedad
                        </th>

                        <th className="text-left font-medium px-5 py-4">
                            Estado ^
                        </th>

                        <th className="text-left font-medium px-5 py-4">
                            Acciones
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {reports.length === 0 ? (
                        <tr>
                            <td
                                colSpan="6"
                                className="px-5 py-10 text-center text-gray-400"
                            >
                                No se encontraron reportes.
                            </td>
                        </tr>
                    ) : (
                        reports.map((report) => (
                            <tr
                                key={report.id}
                                className={`border-t border-gray-100 hover:bg-gray-50 transition ${report.severity === "Alta" && report.status === "Pendiente"
                                    ? "border-l-2 border-l-red-400"
                                    : ""
                                    }`}
                            >
                                <td className="px-5 py-4">
                                    <div className="flex items-center gap-3">
                                        <div
                                            className={`w-9 h-9 rounded-full ${report.color} text-white flex items-center justify-center text-xs font-bold`}
                                        >
                                            {report.reportedInitials}
                                        </div>

                                        <div>
                                            <p className="font-semibold text-[#0F172A]">
                                                {report.reportedName}
                                            </p>

                                            <p className="text-xs text-gray-400">
                                                Por: {report.reporterName}
                                            </p>
                                        </div>
                                    </div>
                                </td>

                                <td className="px-5 py-4 text-[#0F172A]">
                                    {report.reason}
                                </td>

                                <td className="px-5 py-4 text-gray-500">
                                    {report.sentAt}
                                </td>

                                <td className="px-5 py-4">
                                    <SeverityBadge value={report.severity} />
                                </td>

                                <td className="px-5 py-4">
                                    <StatusBadge value={report.status} />
                                </td>

                                <td className="px-5 py-4">
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => onView(report)}
                                            className="w-8 h-8 rounded-full bg-blue-50 text-blue-500 hover:bg-blue-100 flex items-center justify-center"
                                            title="Ver detalle"
                                        >
                                            <img src={EyeB} alt="Ver detalle" className="w-4 h-4" />
                                        </button>

                                        {report.status === "Pendiente" && (
                                            <>
                                                <button
                                                    onClick={() => onSanction(report.id)}
                                                    className="w-8 h-8 rounded-full bg-red-50 text-red-500 hover:bg-red-100 flex items-center justify-center"
                                                    title="Sancionar usuario"
                                                >
                                                    <img src={ban} alt="Sancionar usuario" className="w-4 h-4" />
                                                </button>

                                                <button
                                                    onClick={() => onIgnore(report.id)}
                                                    className="w-8 h-8 rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 flex items-center justify-center"
                                                    title="Ignorar reporte"
                                                >
                                                    <img src={ignore} alt="Ignorar reporte" className="w-4 h-4" />
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-5 py-4 border-t border-gray-100">
                <p className="text-xs text-gray-400">
                    Mostrando {reports.length} de {totalReports} reportes
                    <span className="text-yellow-600 font-semibold">
                        {" "}· {pendingReports} pendientes de revisión
                    </span>
                </p>

                <button className="w-8 h-8 rounded-lg bg-green-500 text-white text-sm font-semibold">
                    1
                </button>
            </div>
        </div>
    );
};

const SeverityBadge = ({ value }) => {
    if (value === "Alta") {
        return (
            <span className="px-3 py-1 rounded-full bg-red-100 text-red-600 text-xs font-semibold">
                Alta
            </span>
        );
    }

    if (value === "Media") {
        return (
            <span className="px-3 py-1 rounded-full bg-orange-100 text-orange-600 text-xs font-semibold">
                Media
            </span>
        );
    }

    return (
        <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-500 text-xs font-semibold">
            Baja
        </span>
    );
};

const StatusBadge = ({ value }) => {
    if (value === "Sancionado") {
        return (
            <span className="px-3 py-1 rounded-full bg-red-100 text-red-600 text-xs font-semibold">
                Sancionado
            </span>
        );
    }

    if (value === "Ignorado") {
        return (
            <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-500 text-xs font-semibold">
                Ignorado
            </span>
        );
    }

    return (
        <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-600 text-xs font-semibold">
            Pendiente
        </span>
    );
};