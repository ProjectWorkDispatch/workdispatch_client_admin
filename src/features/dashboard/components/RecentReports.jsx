import { Link } from "react-router-dom";
import Reports from "../../../assets/icons/Reports.svg";

const reports = [
    { title: "Trabajo incompleto", description: "Carlos M. reportó a Pedro J.", status: "abierto" },
    { title: "Comportamiento inapropiado", description: "Ana G. reportó a Luis R.", status: "revisando" },
    { title: "No se presentó", description: "Marcela T. reportó a Jorge V.", status: "abierto" }
];

export const RecentReports = () => {
    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden min-h-72">
            <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <img src={Reports} alt="Reports" className="w-5 h-5" />
                    <h3 className="font-bold text-[#0F172A]">
                        Reportes Recientes
                    </h3>
                </div>

                <Link
                    to="/dashboard/reportes"
                    className="text-sm text-green-600 font-semibold hover:text-green-700"
                >
                    Ver todos →
                </Link>
            </div>

            <div>
                {reports.map((report) => (
                    <div
                        key={report.title}
                        className="px-4 sm:px-5 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-50 last:border-b-0">
                        <div className="flex items-center gap-3 min-w-0">
                            <div className="w-9 h-9 rounded-full bg-red-50 text-red-400 flex items-center justify-center text-xs font-bold">
                                !
                            </div>

                            <div className="min-w-0">
                                <p className="font-semibold text-sm text-[#0F172A]">
                                    {report.title}
                                </p>
                                <p className="text-xs text-gray-500 wrap-break-words">
                                    {report.description}
                                </p>
                            </div>
                        </div>

                        <span
                            className={`self-end sm:self-auto px-3 py-1 rounded-full text-xs font-semibold ${report.status === "abierto"
                                ? "bg-red-100 text-red-600"
                                : "bg-yellow-100 text-yellow-600"
                                }`}
                        >
                            {report.status}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};