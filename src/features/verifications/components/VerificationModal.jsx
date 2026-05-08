import check from "../../../assets/icons/check.svg";
import deny from "../../../assets/icons/deny.svg";
import warning from "../../../assets/icons/warning.svg";
import detail from "../../../assets/icons/detail.svg";
import pending from "../../../assets/icons/pending.svg";
import noAvailable from "../../../assets/icons/noAvailable.svg";

export const VerificationModal = ({
    verification,
    onClose,
    onApprove,
    onReject
}) => {
    return (
        <div className="fixed inset-0 z-100 flex items-center justify-center">
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                onClick={onClose}
            />

            <div className="relative bg-white w-full max-w-md rounded-2xl shadow-xl overflow-hidden">
                <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
                    <h2 className="flex items-center gap-2 text-lg font-bold text-[#0F172A]">
                        <img src={detail} alt="Detalle" className="w-5 h-5" />
                        Detalle de Verificación
                    </h2>

                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 text-xl"
                    >
                        ×
                    </button>
                </div>

                <div className="p-6 space-y-5">
                    <div className="flex items-center gap-4">
                        <div
                            className={`w-14 h-14 rounded-full ${verification.color} text-white flex items-center justify-center font-bold text-lg`}
                        >
                            {verification.initials}
                        </div>

                        <div>
                            <p className="font-bold text-[#0F172A]">
                                {verification.name}
                            </p>

                            <p className="text-sm text-gray-400">
                                {verification.email}
                            </p>

                            <RoleBadge value={verification.role} />
                        </div>
                    </div>

                    <div className="bg-gray-50 rounded-2xl p-4 space-y-3">
                        <DetailRow
                            label="Tipo de documento"
                            value={verification.documentType}
                        />

                        <DetailRow
                            label="Número"
                            value={verification.documentNumber}
                        />

                        <DetailRow
                            label="Enviado"
                            value={verification.sentAt}
                        />

                        <DetailRow
                            label="Urgencia"
                            value={<UrgencyBadge value={verification.urgency} />}
                        />

                        <DetailRow
                            label="Estado actual"
                            value={<StatusBadge value={verification.status} />}
                        />
                    </div>

                    <div className="border border-dashed border-gray-200 rounded-2xl py-8 text-center flex flex-col items-center justify-center gap-3">
                        <img src={noAvailable} alt="noAvailable" className="w-15 h-15 "/>

                        <p className="text-sm text-gray-300 mt-2">
                            Vista previa no disponible
                        </p>
                    </div>

                    {verification.status !== "Pendiente" && verification.reviewNote && (
                        <div className="rounded-2xl border border-yellow-300 bg-yellow-50 px-4 py-3">
                            <p className="text-sm font-semibold text-yellow-700">
                                Nota del revisor
                            </p>

                            <p className="text-sm text-yellow-600 mt-1">
                                {verification.reviewNote}
                            </p>
                        </div>
                    )}

                    {verification.status === "Pendiente" ? (
                        <div className="grid grid-cols-2 gap-3">
                            <button
                                onClick={() => onReject(verification.documentNumber)}
                                className="py-3 rounded-xl border border-red-300 text-red-500 font-semibold hover:bg-red-50 transition flex items-center justify-center gap-2"
                            >
                                <img src={deny} alt="Rechazar" className="w-4 h-4" />
                                Rechazar
                            </button>

                            <button
                                onClick={() => onApprove(verification.documentNumber)}
                                className="py-3 rounded-xl bg-green-600 text-white font-semibold hover:bg-green-700 transition flex items-center justify-center gap-2"
                            >
                                <img src={check} alt="Aprobar" className="w-4 h-4" />
                                Aprobar
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

const DetailRow = ({ label, value }) => {
    return (
        <div className="flex items-center justify-between gap-4">
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

const UrgencyBadge = ({ value }) => {
    if (value === "Alta") {
        return (
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-red-100 text-red-600 text-xs font-semibold">
                Alta
            </span>
        );
    }

    if (value === "Media") {
        return (
            <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-600 text-xs font-semibold">
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
    if (value === "Aprobado") {
        return (
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-green-100 text-green-600 text-xs font-semibold">                <img src={check} alt="Aprobado" className="w-4 h-4" />
                Aprobado
            </span>
        );
    }

    if (value === "Rechazado") {
        return (
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-red-100 text-red-600 text-xs font-semibold">
                <img src={deny} alt="Rechazado" className="w-4 h-4" />
                Rechazado
            </span>
        );
    }

    return (
        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-yellow-100 text-yellow-600 text-xs font-semibold">
            <img src={pending} alt="Pendiente" className="w-4 h-4" />
            Pendiente
        </span>
    );
};