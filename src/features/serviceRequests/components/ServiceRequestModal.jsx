import JobIconG from "../../../assets/icons/JobIconG.svg";
import money from "../../../assets/icons/money.svg";
import location from "../../../assets/icons/location.svg";
import date from "../../../assets/icons/date.svg";

export const ServiceRequestModal = ({ request, onClose }) => {
    return (
        <div className="fixed inset-0 z-100 flex items-center justify-center">
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                onClick={onClose}
            />

            <div className="relative bg-white w-[95%] sm:w-full max-w-xl rounded-2xl shadow-xl overflow-hidden max-h-[90vh] overflow-y-auto">
                <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-11 h-11 rounded-xl bg-green-50 flex items-center justify-center">
                            <img
                                src={JobIconG}
                                alt="Solicitud"
                                className="w-5 h-5"
                            />
                        </div>

                        <div>
                            <p className="text-xs text-gray-400">
                                #{request.id}
                            </p>

                            <h2 className="font-bold text-[#0F172A]">
                                {request.title}
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
                        <StatusBadge value={request.status} />

                        <span className="px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-semibold">
                            {request.categoryName}
                        </span>
                    </div>

                    <p className="text-sm text-gray-600">
                        {request.description}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <InfoBox
                            label="Cliente"
                            value={request.clientName}
                        />

                        <InfoBox
                            label="Dirección"
                            value={request.address}
                        />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <DetailItem
                            icon={<img src={money} alt="Presupuesto" className="w-4 h-4" />}
                            label="Presupuesto"
                            value={request.budgetRange}
                            color="text-green-500 bg-green-50"
                        />

                        <DetailItem
                            icon={<img src={date} alt="Fecha" className="w-4 h-4" />}
                            label="Fecha"
                            value={request.date}
                            color="text-blue-500 bg-blue-50"
                        />

                        <DetailItem
                            icon={<img src={location} alt="Ubicación" className="w-4 h-4" />}
                            label="Coordenadas"
                            value={`${request.latitude}, ${request.longitude}`}
                            color="text-purple-500 bg-purple-50"
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
    if (value === "OPEN") {
        return (
            <span className="px-3 py-1 rounded-full bg-blue-100 border border-blue-200 text-blue-600 text-xs font-semibold">
                ● Abierta
            </span>
        );
    }

    if (value === "IN_PROGRESS") {
        return (
            <span className="px-3 py-1 rounded-full bg-yellow-100 border border-yellow-200 text-yellow-600 text-xs font-semibold">
                ● En progreso
            </span>
        );
    }

    if (value === "COMPLETED") {
        return (
            <span className="px-3 py-1 rounded-full bg-green-100 border border-green-200 text-green-600 text-xs font-semibold">
                ● Completada
            </span>
        );
    }

    return (
        <span className="px-3 py-1 rounded-full bg-red-100 border border-red-200 text-red-600 text-xs font-semibold">
            ● Cancelada
        </span>
    );
};