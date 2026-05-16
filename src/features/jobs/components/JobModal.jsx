import JobIconG from "../../../assets/icons/JobIconG.svg";
import money from "../../../assets/icons/money.svg";
import location from "../../../assets/icons/location.svg";
import date from "../../../assets/icons/date.svg";

export const JobModal = ({ job, onClose }) => {
    return (
        <div className="fixed inset-0 z-100 flex items-center justify-center">
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                onClick={onClose}
            />

            <div className="relative bg-white w-[95%] sm:w-full max-w-xl rounded-2xl shadow-xl overflow-hidden max-h-[90vh] overflow-y-auto">
                <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-11 h-11 rounded-xl bg-green-50 text-green-500 flex items-center justify-center font-bold">
                            <img
                                src={JobIconG}
                                alt="Servicio"
                                className="w-5 h-5"
                            />
                        </div>

                        <div>
                            <p className="text-xs text-gray-400">
                                #{job.id}
                            </p>

                            <h2 className="font-bold text-[#0F172A]">
                                Servicio #{job.requestCode}
                            </h2>
                        </div>
                    </div>

                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 text-xl"
                    >
                        ×
                    </button>
                </div>

                <div className="p-6 space-y-5">
                    <div className="flex gap-3 flex-wrap">
                        <StatusBadge value={job.status} />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <InfoBox
                            label="Cliente"
                            value={job.clientName}
                        />

                        <InfoBox
                            label="Trabajador"
                            value={job.workerName}
                        />
                    </div>

                    {job.status === "CANCELLED" && (
                        <div className="bg-red-50 border border-red-100 rounded-2xl p-4">
                            <p className="text-xs text-red-400 mb-2">
                                Motivo de cancelación
                            </p>

                            <p className="text-sm font-medium text-red-600">
                                {job.cancelReason || "Sin motivo"}
                            </p>

                            <p className="text-xs text-red-400 mt-2">
                                Cancelado por: {job.cancelledBy || "Desconocido"}
                            </p>
                        </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <DetailItem
                            icon={<img src={money} alt="Precio" className="w-4 h-4" />}
                            label="Precio final"
                            value={`Q ${job.budget}`}
                            color="text-green-500 bg-green-50"
                        />

                        <DetailItem
                            icon={<img src={date} alt="Fecha" className="w-4 h-4" />}
                            label="Fecha de creación"
                            value={job.createdDate}
                            color="text-blue-500 bg-blue-50"
                        />

                        <DetailItem
                            icon={<img src={location} alt="Inicio" className="w-4 h-4" />}
                            label="Inicio del servicio"
                            value={job.startDateFormatted}
                            color="text-purple-500 bg-purple-50"
                        />

                        <DetailItem
                            icon={<img src={date} alt="Fin" className="w-4 h-4" />}
                            label="Fin del servicio"
                            value={job.endDateFormatted}
                            color="text-gray-500 bg-gray-100"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

const InfoBox = ({ label, value }) => {
    return (
        <div className="bg-gray-50 rounded-2xl p-4">
            <p className="text-xs text-gray-400 mb-2">
                {label}
            </p>

            <p className="font-semibold text-slate-700">
                {value}
            </p>
        </div>
    );
};

const DetailItem = ({ icon, label, value, color }) => {
    return (
        <div className="flex items-center gap-3">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${color}`}>
                {icon}
            </div>

            <div>
                <p className="text-xs text-gray-400">
                    {label}
                </p>

                <p className="font-semibold text-slate-700">
                    {value}
                </p>
            </div>
        </div>
    );
};

const StatusBadge = ({ value }) => {
    if (value === "COMPLETED") {
        return (
            <span className="px-3 py-1 rounded-full bg-green-100 border border-green-200 text-green-600 text-xs font-semibold">
                ● Finalizado
            </span>
        );
    }

    if (value === "CANCELLED") {
        return (
            <span className="px-3 py-1 rounded-full bg-red-100 border border-red-200 text-red-600 text-xs font-semibold">
                ● Cancelado
            </span>
        );
    }

    if (value === "PENDING") {
        return (
            <span className="px-3 py-1 rounded-full bg-blue-100 border border-blue-200 text-blue-600 text-xs font-semibold">
                ● Pendiente
            </span>
        );
    }

    return (
        <span className="px-3 py-1 rounded-full bg-yellow-100 border border-yellow-200 text-yellow-600 text-xs font-semibold">
            ● En progreso
        </span>
    );
};