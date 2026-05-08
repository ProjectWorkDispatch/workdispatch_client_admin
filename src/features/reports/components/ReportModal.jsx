import reports from "../../../assets/icons/reports.svg";
import aproveG from "../../../assets/icons/aproveG.svg";
import banW from "../../../assets/icons/banW.svg";
import chatBubble from "../../../assets/icons/chatBubble.svg";

export const ReportModal = ({
    report,
    onClose,
    onSanction,
    onIgnore
}) => {
    return (
        <div className="fixed inset-0 z-100 flex items-center justify-center">
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                onClick={onClose}
            />

            <div className="relative bg-white w-full max-w-xl rounded-2xl shadow-xl overflow-hidden">
                <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
                    <h2 className="flex items-center gap-2 text-lg font-bold text-[#0F172A]">
                        <img src={reports} alt="Reports" className="w-6 h-6" />
                        Detalle del Reporte
                    </h2>

                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 text-xl"
                    >
                        ×
                    </button>
                </div>

                <div className="p-6 space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <UserCard
                            title="Reportado por:"
                            name={report.reporterName}
                            email={report.reporterEmail}
                            initials={report.reporterInitials}
                            color={report.reporterColor}
                            danger={false}
                        />

                        <UserCard
                            title="Usuario Acusado:"
                            name={report.reportedName}
                            email={report.reportedEmail}
                            initials={report.reportedInitials}
                            color={report.color}
                            role={report.reportedRole}
                            danger={true}
                        />
                    </div>

                    <div className="space-y-3">
                        <DetailRow
                            label="Motivo del reporte"
                            value={report.reason}
                        />

                        <DetailRow
                            label="Nivel de Gravedad"
                            value={<SeverityBadge value={report.severity} />}
                        />

                        <DetailRow
                            label="Estado actual"
                            value={<StatusBadge value={report.status} />}
                        />
                    </div>

                    <div>
                        <p className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                            <img src={chatBubble} alt="Chat Bubble" className="w-4.5 h-4.5" />
                            Descripción detallada:
                        </p>

                        <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4 text-sm text-gray-600 leading-relaxed">
                            "{report.description}"
                        </div>
                    </div>

                    {report.status !== "Pendiente" && (
                        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4">
                            <p className="text-sm font-semibold text-gray-500">
                                Resolución del Administrador
                            </p>

                            <p className="text-sm text-gray-500 mt-1">
                                {report.resolution}
                            </p>
                        </div>
                    )}

                    {report.status === "Pendiente" ? (
                        <div className="grid grid-cols-2 gap-3">
                            <button
                                onClick={() => onIgnore(report.id)}
                                className="py-3 rounded-xl border border-gray-200 text-gray-600 font-semibold hover:bg-gray-50 transition flex items-center justify-center gap-2"
                            >
                                <img src={aproveG} alt="Ignorar reporte" className="w-4 h-4" />
                                Ignorar Reporte
                            </button>

                            <button
                                onClick={() => onSanction(report.id)}
                                className="py-3 rounded-xl bg-red-500 text-white font-semibold hover:bg-red-600 transition flex items-center justify-center gap-2"
                            >
                                <img src={banW} alt="Sancionar usuario" className="w-4 h-4" />
                                Sancionar Usuario
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={onClose}
                            className="w-full py-3 rounded-xl bg-[#0F172A] text-white font-semibold hover:bg-slate-800 transition"
                        >
                            Cerrar
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

const UserCard = ({
    title,
    name,
    email,
    initials,
    color,
    role,
    danger
}) => {
    return (
        <div
            className={`rounded-2xl p-4 border ${danger
                ? "bg-red-50/40 border-red-200"
                : "bg-gray-50 border-gray-100"
                }`}
        >
            <p className={`text-sm mb-3 ${danger ? "text-red-500" : "text-gray-500"}`}>
                {title}
            </p>

            <div className="flex items-center gap-3">
                <div
                    className={`w-12 h-12 rounded-full ${color} text-white flex items-center justify-center font-bold`}
                >
                    {initials}
                </div>

                <div>
                    <p className="font-semibold text-[#0F172A]">
                        {name}
                    </p>

                    <p className="text-xs text-gray-400">
                        {email}
                    </p>

                    {role && <RoleBadge value={role} />}
                </div>
            </div>
        </div>
    );
};

const DetailRow = ({ label, value }) => {
    return (
        <div className="flex items-center justify-between gap-4 border-b border-gray-100 pb-2">
            <p className="text-sm text-gray-500">
                {label}
            </p>

            <div className="text-sm font-semibold text-[#0F172A]">
                {value}
            </div>
        </div>
    );
};

const RoleBadge = ({ value }) => {
    if (value === "Cliente") {
        return (
            <span className="inline-block mt-1 px-3 py-1 rounded-full bg-blue-100 text-blue-600 text-xs font-semibold">
                Cliente
            </span>
        );
    }

    return (
        <span className="inline-block mt-1 px-3 py-1 rounded-full bg-purple-100 text-purple-600 text-xs font-semibold">
            Trabajador
        </span>
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