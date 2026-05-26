import { useState } from "react";
import toast from "react-hot-toast";
import JobIconG from "../../../assets/icons/JobIconG.svg";
import money from "../../../assets/icons/money.svg";
import location from "../../../assets/icons/location.svg";
import date from "../../../assets/icons/date.svg";
import { useServiceStore } from "../../users/Store/adminStore";

export const ServiceModal = ({ service, onClose }) => {
    const [loading, setLoading] = useState(false);
    const [confirmAction, setConfirmAction] = useState(null); // "COMPLETED" | "CANCELLED" | null
    const changeServiceStatus = useServiceStore((s) => s.changeServiceStatus);

    const isFinal = service.status === "COMPLETED" || service.status === "CANCELLED";

    const handleAction = async (newStatus) => {
        setLoading(true);
        try {
            await changeServiceStatus(service._id, newStatus);
            toast.success(
                newStatus === "COMPLETED"
                    ? "Servicio marcado como completado"
                    : "Servicio cancelado correctamente"
            );
            setConfirmAction(null);
            onClose();
        } catch {
            toast.error("Error al actualizar el estado del servicio");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-100 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />

            <div className="relative bg-white w-[95%] sm:w-full max-w-xl rounded-2xl shadow-xl overflow-hidden max-h-[90vh] overflow-y-auto">

                {/* HEADER */}
                <div className="relative bg-linear-to-r from-[#0F172A] to-[#1E293B] px-6 py-6">
                    <button
                        onClick={onClose}
                        className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white text-sm transition"
                    >
                        ✕
                    </button>
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-2xl bg-green-500/20 border border-green-400/30 flex items-center justify-center">
                            <img src={JobIconG} alt="Servicio" className="w-7 h-7" />
                        </div>
                        <div className="text-white">
                            <p className="text-xs text-slate-400">#{service.id}</p>
                            <h2 className="text-xl font-bold">Service #{service.requestCode}</h2>
                            <div className="mt-2">
                                <StatusBadge value={service.status} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* BODY */}
                <div className="p-6 space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <InfoBox label="Cliente" value={service.clientName} />
                        <InfoBox label="Trabajador" value={service.workerName} />
                    </div>

                    {service.status === "CANCELLED" && (
                        <div className="bg-red-50 border border-red-100 rounded-2xl p-4">
                            <p className="text-xs text-red-400 mb-2">Motivo de cancelación</p>
                            <p className="text-sm font-medium text-red-600">
                                {service.cancelReason || "Sin motivo"}
                            </p>
                            <p className="text-xs text-red-400 mt-2">
                                Cancelado por: {service.cancelledBy || "Desconocido"}
                            </p>
                        </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <DetailItem
                            icon={<img src={money} alt="" className="w-4 h-4" />}
                            label="Precio final"
                            value={`Q ${service.budget}`}
                            color="text-green-500 bg-green-50"
                        />
                        <DetailItem
                            icon={<img src={date} alt="" className="w-4 h-4" />}
                            label="Fecha de creación"
                            value={service.createdDate}
                            color="text-blue-500 bg-blue-50"
                        />
                        <DetailItem
                            icon={<img src={location} alt="" className="w-4 h-4" />}
                            label="Inicio del servicio"
                            value={service.startDateFormatted}
                            color="text-purple-500 bg-purple-50"
                        />
                        <DetailItem
                            icon={<img src={date} alt="" className="w-4 h-4" />}
                            label="Fin del servicio"
                            value={service.endDateFormatted}
                            color="text-gray-500 bg-gray-100"
                        />
                    </div>

                    {/* Confirmación inline */}
                    {confirmAction && (
                        <div className={`rounded-2xl border p-4 space-y-3 ${
                            confirmAction === "CANCELLED"
                                ? "bg-red-50 border-red-200"
                                : "bg-green-50 border-green-200"
                        }`}>
                            <p className={`text-sm font-semibold ${
                                confirmAction === "CANCELLED" ? "text-red-700" : "text-green-700"
                            }`}>
                                {confirmAction === "CANCELLED"
                                    ? "¿Confirmar cancelación del servicio?"
                                    : "¿Marcar este servicio como completado?"}
                            </p>
                            <p className="text-xs text-gray-500">
                                Esta acción cambiará el estado del servicio de forma permanente.
                            </p>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setConfirmAction(null)}
                                    disabled={loading}
                                    className="flex-1 py-2 rounded-xl border border-gray-200 bg-white text-sm text-gray-600 hover:bg-gray-50 transition"
                                >
                                    Cancelar
                                </button>
                                <button
                                    onClick={() => handleAction(confirmAction)}
                                    disabled={loading}
                                    className={`flex-1 py-2 rounded-xl text-white text-sm font-semibold transition disabled:opacity-60 ${
                                        confirmAction === "CANCELLED"
                                            ? "bg-red-500 hover:bg-red-600"
                                            : "bg-green-600 hover:bg-green-700"
                                    }`}
                                >
                                    {loading ? "Guardando..." : "Confirmar"}
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* FOOTER — acciones de admin */}
                {!isFinal && !confirmAction && (
                    <div className="px-6 pb-6 border-t border-gray-100 pt-4 flex flex-col sm:flex-row gap-3">
                        {service.status === "IN_PROGRESS" && (
                            <button
                                onClick={() => setConfirmAction("COMPLETED")}
                                className="flex-1 py-3 rounded-xl bg-green-600 hover:bg-green-700 text-white text-sm font-semibold transition"
                            >
                                ✓ Marcar como completado
                            </button>
                        )}
                        <button
                            onClick={() => setConfirmAction("CANCELLED")}
                            className="flex-1 py-3 rounded-xl border border-red-300 text-red-500 hover:bg-red-50 text-sm font-semibold transition"
                        >
                            Cancelar servicio
                        </button>
                    </div>
                )}

                {isFinal && (
                    <div className="px-6 pb-6 border-t border-gray-100 pt-4">
                        <p className="text-xs text-gray-400 italic text-center">
                            Este servicio está en estado final. No hay acciones disponibles.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

const InfoBox = ({ label, value }) => (
    <div className="bg-gray-50 rounded-2xl p-4">
        <p className="text-xs text-gray-400 mb-2">{label}</p>
        <p className="font-semibold text-slate-700">{value}</p>
    </div>
);

const DetailItem = ({ icon, label, value, color }) => (
    <div className="flex items-center gap-3">
        <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${color}`}>{icon}</div>
        <div>
            <p className="text-xs text-gray-400">{label}</p>
            <p className="font-semibold text-slate-700">{value}</p>
        </div>
    </div>
);

const StatusBadge = ({ value }) => {
    if (value === "COMPLETED")
        return <span className="px-3 py-1 rounded-full bg-green-500/20 border border-green-400/30 text-green-200 text-xs font-semibold">● Finalizado</span>;
    if (value === "CANCELLED")
        return <span className="px-3 py-1 rounded-full bg-red-500/20 border border-red-400/30 text-red-200 text-xs font-semibold">● Cancelado</span>;
    if (value === "PENDING")
        return <span className="px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-200 text-xs font-semibold">● Pendiente</span>;
    return <span className="px-3 py-1 rounded-full bg-yellow-500/20 border border-yellow-400/30 text-yellow-200 text-xs font-semibold">● En progreso</span>;
};