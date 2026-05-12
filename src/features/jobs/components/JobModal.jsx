import date from "../../../assets/icons/date.svg";
import JobIconG from "../../../assets/icons/JobIconG.svg";
import money from "../../../assets/icons/money.svg";
import location from "../../../assets/icons/location.svg";
import duration from "../../../assets/icons/duration.svg";

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
                            <img src={JobIconG} alt="Trabajo activo" className="w-5 h-5" />
                        </div>

                        <div>
                            <p className="text-xs text-gray-400">
                                #{job.id}
                            </p>
                            <h2 className="font-bold text-[#0F172A]">
                                {job.title}
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
                    <div className="flex gap-3">
                        <StatusBadge value={job.status} />

                        <span className="px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-semibold">
                            ⌑ {job.category}
                        </span>
                    </div>

                    <p className="text-sm text-gray-600">
                        {job.description}
                    </p>

                    <div className="grid grid-cols-2 gap-3">
                        <InfoBox
                            label="Cliente"
                            value={job.client}
                            initials={job.clientInitials}
                            color="bg-blue-600"
                        />

                        <InfoBox
                            label="Trabajador"
                            value={job.worker}
                            initials={job.workerInitials}
                            color="bg-slate-700"
                        />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <DetailItem
                            icon={<img src={money} alt="Presupuesto" className="w-4 h-4" />}
                            label="Presupuesto"
                            value={`Q ${job.budget}`}
                            color="text-green-500 bg-green-50"
                        />

                        <DetailItem
                            icon={<img src={duration} alt="Duración" className="w-4 h-4" />}
                            label="Duración"
                            value={job.duration}
                            color="text-yellow-500 bg-yellow-50"
                        />

                        <DetailItem
                            icon={<img src={date} alt="Fecha" className="w-4 h-4" />}
                            label="Fecha"
                            value={job.date}
                            color="text-blue-500 bg-blue-50"
                        />

                        <DetailItem
                            icon={<img src={location} alt="Ubicación" className="w-4 h-4" />}
                            label="Ubicación"
                            value={job.location}
                            color="text-purple-500 bg-purple-50"
                        />
                    </div>

                    {job.rating > 0 && (
                        <div className="rounded-2xl bg-yellow-50 border border-yellow-200 p-4">
                            <p className="text-sm text-gray-500">
                                Calificación del cliente
                            </p>

                            <div className="flex items-center gap-3 mt-1">
                                <span className="text-yellow-400">
                                    {"★".repeat(job.rating)}
                                    <span className="text-gray-300">
                                        {"★".repeat(5 - job.rating)}
                                    </span>
                                </span>

                                <span className="text-sm font-semibold text-slate-700">
                                    {job.rating}/5
                                </span>
                            </div>
                        </div>
                    )}

                    <button
                        onClick={onClose}
                        className="w-full py-3 rounded-xl bg-[#0F172A] text-white font-semibold hover:bg-slate-800 transition"
                    >
                        Cerrar
                    </button>
                </div>
            </div>
        </div>
    );
};

const InfoBox = ({ label, value, initials, color }) => {
    return (
        <div className="bg-gray-50 rounded-2xl p-4">
            <p className="text-xs text-gray-400 mb-2">
                {label}
            </p>

            <div className="flex items-center gap-3">
                <div
                    className={`w-9 h-9 rounded-full ${color} text-white flex items-center justify-center text-xs font-bold`}
                >
                    {initials}
                </div>

                <p className="font-semibold text-slate-700">
                    {value}
                </p>
            </div>
        </div>
    );
};

const DetailItem = ({ icon, label, value, color }) => {
    return (
        <div className="flex items-center gap-3">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold ${color}`}>
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
    if (value === "Finalizado") {
        return (
            <span className="px-2.5 py-1 rounded-full bg-green-100 border border-green-200 text-green-600 text-xs font-semibold">
                ● Finalizado
            </span>
        );
    }

    if (value === "Cancelado") {
        return (
            <span className="px-3 py-1 rounded-full bg-gray-100 border border-gray-200 text-gray-500 text-xs font-semibold">
                ● Cancelado
            </span>
        );
    }

    return (
        <span className="px-3 py-1 rounded-full bg-yellow-100 border border-yellow-200 text-yellow-600 text-xs font-semibold">
            ● En progreso
        </span>
    );
};