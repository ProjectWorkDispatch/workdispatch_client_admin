import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useReportStore } from "../../users/Store/adminStore.js";
import Reports from "../../../assets/icons/Reports.svg";

export const RecentReports = () => {
    const { reports, getReports } = useReportStore();

    useEffect(() => { getReports(); }, []);

    const recent = [...reports]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 3);

    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden min-h-72">
            <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <img src={Reports} alt="Reports" className="w-5 h-5" />
                    <h3 className="font-bold text-[#0F172A]">Reportes Recientes</h3>
                </div>
                <Link to="/dashboard/reportes" className="text-sm text-green-600 font-semibold hover:text-green-700">
                    Ver todos →
                </Link>
            </div>

            <div>
                {recent.length === 0 ? (
                    <p className="px-5 py-6 text-sm text-gray-400 text-center">Sin reportes recientes</p>
                ) : recent.map((report) => (
                    <div key={report._id} className="px-4 sm:px-5 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-50 last:border-b-0">
                        <div className="flex items-center gap-3 min-w-0">
                            <div className="w-9 h-9 rounded-full bg-red-50 text-red-400 flex items-center justify-center text-xs font-bold">!</div>
                            <div className="min-w-0">
                                <p className="font-semibold text-sm text-[#0F172A]">{report.reason || report.title || 'Reporte'}</p>
                                <p className="text-xs text-gray-500 wrap-break-words">
                                    {report.reporterId?.firstName
                                        ? `${report.reporterId.firstName} reportó a ${report.reportedId?.firstName || 'usuario'}`
                                        : 'Reporte de usuario'}
                                </p>
                            </div>
                        </div>
                        <span className={`self-end sm:self-auto px-3 py-1 rounded-full text-xs font-semibold ${report.Status !== false ? "bg-red-100 text-red-600" : "bg-gray-100 text-gray-500"
                            }`}>
                            {report.Status !== false ? "abierto" : "resuelto"}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};