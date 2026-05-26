import { useState, useEffect, useMemo } from "react";
import { ReportStatsCard } from "./ReportStatsCard";
import { ReportsTable } from "./ReportsTable";
import { ReportModal } from "./ReportModal";
import { useReportStore } from "../../users/Store/adminStore.js";

const AVATAR_COLORS = [
    "bg-pink-500", "bg-blue-500", "bg-purple-500",
    "bg-green-500", "bg-orange-500", "bg-teal-500", "bg-red-500"
];

const getAvatarColor = (name = "") => {
    const index = name.charCodeAt(0) % AVATAR_COLORS.length;
    return AVATAR_COLORS[index];
};

const getInitials = (firstName = "", lastName = "") =>
    `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase() || "??";

export const ReportsHome = () => {
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("Todos");
    const [severityFilter, setSeverityFilter] = useState("Todas");
    const [selectedReport, setSelectedReport] = useState(null);
    
    const { reports, loading, getReports, resolveReport, sanctionReport } = useReportStore();

    useEffect(() => {
        getReports();
    }, [getReports]);

    const normalizedReports = useMemo(() => {
        return reports.map((report) => {
            const reporterFirst = report.reporterId?.firstName ?? "";
            const reporterLast = report.reporterId?.lastName ?? "";
            const reportedFirst = report.reporteredId?.firstName ?? "";
            const reportedLast = report.reporteredId?.lastName ?? "";

            const status = report.Status ? "Pendiente" : "Resuelto";

            const reason = report.Reason?.toLowerCase() ?? "";
            let severity = "Baja";
            if (reason.includes("estafa") || reason.includes("fraude") || reason.includes("agresión")) {
                severity = "Alta";
            } else if (reason.includes("lenguaje") || reason.includes("retraso") || reason.includes("incompleto")) {
                severity = "Media";
            }

            const diff = Math.floor((Date.now() - new Date(report.createdAt)) / 1000);
            let sentAt = "Hace un momento";
            if (diff >= 86400) sentAt = `Hace ${Math.floor(diff / 86400)}d`;
            else if (diff >= 3600) sentAt = `Hace ${Math.floor(diff / 3600)}h`;
            else if (diff >= 60) sentAt = `Hace ${Math.floor(diff / 60)} min`;

            return {
                ...report,
                id: report._id,
                reportedName: `${reportedFirst} ${reportedLast}`.trim() || "Usuario eliminado",
                reportedEmail: report.reporteredId?.email ?? "",
                reportedInitials: getInitials(reportedFirst, reportedLast),
                reportedRole: report.reporteredId?.role ?? "",
                color: getAvatarColor(reportedFirst),
                reporterName: `${reporterFirst} ${reporterLast}`.trim() || "Usuario eliminado",
                reporterEmail: report.reporterId?.email ?? "",
                reporterInitials: getInitials(reporterFirst, reporterLast),
                reporterColor: getAvatarColor(reporterFirst),
                reason: report.Reason ?? "Sin motivo",
                description: report.Description ?? "Sin descripción",
                status,
                severity,
                sentAt,
                resolution: report.Status ? "" : "El reporte fue marcado como resuelto por el administrador.",
            };
        });
    }, [reports]);

    // Sincroniza el modal con el nuevo estado tras la acción
    const syncModal = (id) => {
        setSelectedReport((prev) =>
            prev?.id === id
                ? { ...prev, status: "Resuelto", resolution: "El reporte fue marcado como resuelto por el administrador." }
                : prev
        );
    };

    const onSanction = async (id) => {
        await sanctionReport(id);
        syncModal(id);
    };

    const onIgnore = async (id) => {
        await resolveReport(id);
        syncModal(id);
    };

    const filteredReports = normalizedReports.filter((report) => {
        const searchText = search.toLowerCase();
        const matchSearch =
            report.reportedName.toLowerCase().includes(searchText) ||
            report.reporterName.toLowerCase().includes(searchText) ||
            report.reason.toLowerCase().includes(searchText);
        const matchStatus = statusFilter === "Todos" ? true : report.status === statusFilter;
        const matchSeverity = severityFilter === "Todas" ? true : report.severity === severityFilter;
        return matchSearch && matchStatus && matchSeverity;
    });

    const totalReports = normalizedReports.length;
    const pendingReports = normalizedReports.filter((r) => r.status === "Pendiente").length;
    const resolvedReports = normalizedReports.filter((r) => r.status === "Resuelto").length;
    const highPriority = normalizedReports.filter((r) => r.severity === "Alta" && r.status === "Pendiente").length;

    return (
        <section className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-[#0F172A]">Reportes de Usuarios</h1>
                <p className="text-sm text-gray-500">
                    Gestión de conflictos, moderación y sanciones en la plataforma
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                <ReportStatsCard value={totalReports} label="Total reportes" color="text-[#0F172A]" />
                <ReportStatsCard value={pendingReports} label="Pendientes" color="text-yellow-500" />
                <ReportStatsCard value={resolvedReports} label="Resueltos" color="text-green-500" />
                <ReportStatsCard value={highPriority} label="Alta prioridad" color="text-red-500" />
            </div>

            <article className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-5 border-b border-gray-100">
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Buscar por nombre de usuario, rol o motivo..."
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none text-sm text-gray-600 placeholder:text-gray-400 focus:border-green-400 focus:ring-2 focus:ring-green-100"
                    />

                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mt-4">
                        <div className="flex flex-wrap items-center gap-2">
                            <span className="text-xs text-gray-400 self-end lg:self-auto">Estado:</span>
                            <FilterButton text="Todos" current={statusFilter} setFilter={setStatusFilter} />
                            <FilterButton text="Pendiente" current={statusFilter} setFilter={setStatusFilter} />
                            <FilterButton text="Resuelto" current={statusFilter} setFilter={setStatusFilter} />

                            <span className="text-xs text-gray-400 ml-2">Gravedad:</span>
                            <FilterButton text="Todas" current={severityFilter} setFilter={setSeverityFilter} />
                            <FilterButton text="Alta" current={severityFilter} setFilter={setSeverityFilter} />
                            <FilterButton text="Media" current={severityFilter} setFilter={setSeverityFilter} />
                            <FilterButton text="Baja" current={severityFilter} setFilter={setSeverityFilter} />
                        </div>

                        <p className="text-xs text-gray-400">{filteredReports.length} reportes</p>
                    </div>
                </div>

                {loading && reports.length === 0 ? (
                    <div className="flex justify-center py-12">
                        <div className="w-6 h-6 border-2 border-green-500 border-t-transparent rounded-full animate-spin" />
                    </div>
                ) : (
                    <ReportsTable
                        reports={filteredReports}
                        totalReports={totalReports}
                        pendingReports={pendingReports}
                        onView={setSelectedReport}
                        onSanction={onSanction}
                        onIgnore={onIgnore}
                    />
                )}
            </article>

            {selectedReport && (
                <ReportModal
                    report={selectedReport}
                    onClose={() => setSelectedReport(null)}
                    onSanction={onSanction}
                    onIgnore={onIgnore}
                />
            )}
        </section>
    );
};

const FilterButton = ({ text, current, setFilter }) => {
    const active = current === text;
    return (
        <button
            onClick={() => setFilter(text)}
            className={`px-3 py-1 rounded-full text-xs font-semibold transition ${active ? "bg-green-500 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
        >
            {text}
        </button>
    );
};