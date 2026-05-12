import { useState } from "react";
import { ReportStatsCard } from "./ReportStatsCard";
import { ReportsTable } from "./ReportsTable";
import { ReportModal } from "./ReportModal";

const initialReports = [
    {
        id: "R-001",
        reportedInitials: "JP",
        reportedName: "Juan Pérez",
        reportedEmail: "juan.p@email.com",
        reportedRole: "Trabajador",
        reporterInitials: "CR",
        reporterName: "Carlos Ruiz",
        reporterEmail: "carlos.r@email.com",
        reason: "Trabajo incompleto",
        sentAt: "Hace 2h",
        severity: "Alta",
        status: "Pendiente",
        description:
            "El trabajador cobró el anticipo y no terminó la instalación de la tubería como habíamos acordado.",
        resolution: "",
        color: "bg-pink-500",
        reporterColor: "bg-pink-500"
    },
    {
        id: "R-002",
        reportedInitials: "LT",
        reportedName: "Luis Torres",
        reportedEmail: "luis.t@email.com",
        reportedRole: "Cliente",
        reporterInitials: "AG",
        reporterName: "Ana Gómez",
        reporterEmail: "ana.g@email.com",
        reason: "Lenguaje ofensivo",
        sentAt: "Hace 5h",
        severity: "Media",
        status: "Pendiente",
        description:
            "El cliente me insultó por el chat interno cuando le dije que llegaría 10 minutos tarde por el tráfico.",
        resolution: "",
        color: "bg-blue-500",
        reporterColor: "bg-purple-500"
    },
    {
        id: "R-003",
        reportedInitials: "SC",
        reportedName: "Sofía Castro",
        reportedEmail: "sofia.c@email.com",
        reportedRole: "Cliente",
        reporterInitials: "DL",
        reporterName: "Diego López",
        reporterEmail: "diego.l@email.com",
        reason: "No se presentó",
        sentAt: "Hace 4h",
        severity: "Media",
        status: "Pendiente",
        description:
            "La cliente confirmó el trabajo, pero no se presentó en la dirección acordada.",
        resolution: "",
        color: "bg-blue-500",
        reporterColor: "bg-green-500"
    },
    {
        id: "R-004",
        reportedInitials: "MD",
        reportedName: "Marcos Díaz",
        reportedEmail: "marcos.d@email.com",
        reportedRole: "Trabajador",
        reporterInitials: "LM",
        reporterName: "Lucía Méndez",
        reporterEmail: "lucia.m@email.com",
        reason: "Intento de estafa",
        sentAt: "Hace 2d",
        severity: "Alta",
        status: "Sancionado",
        description:
            "El trabajador solicitó pagos fuera de la plataforma y prometió descuentos no autorizados.",
        resolution:
            "El usuario ha recibido una sanción y suspensión temporal.",
        color: "bg-blue-500",
        reporterColor: "bg-orange-500"
    },
    {
        id: "R-005",
        reportedInitials: "PP",
        reportedName: "Pedro Pineda",
        reportedEmail: "pedro.p@email.com",
        reportedRole: "Cliente",
        reporterInitials: "MS",
        reporterName: "Miguel Soto",
        reporterEmail: "miguel.s@email.com",
        reason: "Reseña falsa",
        sentAt: "Hace 1d",
        severity: "Baja",
        status: "Ignorado",
        description:
            "El usuario dejó una reseña falsa después de cancelar el trabajo.",
        resolution:
            "El reporte fue ignorado por falta de evidencia suficiente.",
        color: "bg-blue-500",
        reporterColor: "bg-purple-500"
    }
];

export const ReportsHome = () => {
    const [reports, setReports] = useState(initialReports);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("Todos");
    const [severityFilter, setSeverityFilter] = useState("Todas");
    const [selectedReport, setSelectedReport] = useState(null);

    const handleSanction = (id) => {
        setReports((prevReports) =>
            prevReports.map((report) =>
                report.id === id
                    ? {
                        ...report,
                        status: "Sancionado",
                        resolution:
                            "El usuario ha recibido una sanción y suspensión temporal."
                    }
                    : report
            )
        );

        setSelectedReport((prevReport) =>
            prevReport?.id === id
                ? {
                    ...prevReport,
                    status: "Sancionado",
                    resolution:
                        "El usuario ha recibido una sanción y suspensión temporal."
                }
                : prevReport
        );
    };

    const handleIgnore = (id) => {
        setReports((prevReports) =>
            prevReports.map((report) =>
                report.id === id
                    ? {
                        ...report,
                        status: "Ignorado",
                        resolution:
                            "El reporte fue ignorado por falta de evidencia suficiente."
                    }
                    : report
            )
        );

        setSelectedReport((prevReport) =>
            prevReport?.id === id
                ? {
                    ...prevReport,
                    status: "Ignorado",
                    resolution:
                        "El reporte fue ignorado por falta de evidencia suficiente."
                }
                : prevReport
        );
    };

    const filteredReports = reports.filter((report) => {
        const searchText = search.toLowerCase();

        const matchSearch =
            report.reportedName.toLowerCase().includes(searchText) ||
            report.reporterName.toLowerCase().includes(searchText) ||
            report.reportedRole.toLowerCase().includes(searchText) ||
            report.reason.toLowerCase().includes(searchText);

        let matchStatus = true;

        if (statusFilter !== "Todos") {
            matchStatus = report.status === statusFilter;
        }

        let matchSeverity = true;

        if (severityFilter !== "Todas") {
            matchSeverity = report.severity === severityFilter;
        }

        return matchSearch && matchStatus && matchSeverity;
    });

    const totalReports = reports.length;
    const pendingReports = reports.filter((report) => report.status === "Pendiente").length;
    const sanctionedReports = reports.filter((report) => report.status === "Sancionado").length;
    const ignoredReports = reports.filter((report) => report.status === "Ignorado").length;

    return (
        <section className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-[#0F172A]">
                    Reportes de Usuarios
                </h1>

                <p className="text-sm text-gray-500">
                    Gestión de conflictos, moderación y sanciones en la plataforma
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                <ReportStatsCard
                    value={totalReports}
                    label="Total reportes"
                    color="text-[#0F172A]"
                />

                <ReportStatsCard
                    value={pendingReports}
                    label="Pendientes"
                    color="text-yellow-500"
                />

                <ReportStatsCard
                    value={sanctionedReports}
                    label="Sancionados"
                    color="text-red-500"
                />

                <ReportStatsCard
                    value={ignoredReports}
                    label="Ignorados"
                    color="text-gray-500"
                />
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
                            <span className="text-xs text-gray-400 self-end lg:self-auto">
                                Estado:
                            </span>

                            <FilterButton
                                text="Todos"
                                current={statusFilter}
                                setFilter={setStatusFilter}
                            />

                            <FilterButton
                                text="Pendiente"
                                current={statusFilter}
                                setFilter={setStatusFilter}
                            />

                            <FilterButton
                                text="Sancionado"
                                current={statusFilter}
                                setFilter={setStatusFilter}
                            />

                            <FilterButton
                                text="Ignorado"
                                current={statusFilter}
                                setFilter={setStatusFilter}
                            />

                            <span className="text-xs text-gray-400 ml-2">
                                Gravedad:
                            </span>

                            <FilterButton
                                text="Todas"
                                current={severityFilter}
                                setFilter={setSeverityFilter}
                            />

                            <FilterButton
                                text="Alta"
                                current={severityFilter}
                                setFilter={setSeverityFilter}
                            />

                            <FilterButton
                                text="Media"
                                current={severityFilter}
                                setFilter={setSeverityFilter}
                            />

                            <FilterButton
                                text="Baja"
                                current={severityFilter}
                                setFilter={setSeverityFilter}
                            />
                        </div>

                        <p className="text-xs text-gray-400">
                            {filteredReports.length} reportes
                        </p>
                    </div>
                </div>

                <ReportsTable
                    reports={filteredReports}
                    totalReports={reports.length}
                    pendingReports={pendingReports}
                    onView={setSelectedReport}
                    onSanction={handleSanction}
                    onIgnore={handleIgnore}
                />
            </article>

            {selectedReport && (
                <ReportModal
                    report={selectedReport}
                    onClose={() => setSelectedReport(null)}
                    onSanction={handleSanction}
                    onIgnore={handleIgnore}
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
            className={`px-3 py-1 rounded-full text-xs font-semibold transition ${
                active
                    ? "bg-green-500 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
        >
            {text}
        </button>
    );
};