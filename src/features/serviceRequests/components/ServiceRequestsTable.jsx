import view from "../../../assets/icons/view.svg";
import JobIconG from "../../../assets/icons/JobIconG.svg";
import date from "../../../assets/icons/date.svg";

export const ServiceRequestsTable = ({
    requests,
    onViewRequest
}) => {
    return (
        <div className="overflow-x-auto">
            <table className="w-full min-w-300 text-sm">
                <thead className="bg-gray-50 text-gray-400 uppercase text-xs">
                    <tr>
                        <th className="text-left font-semibold px-5 py-4">ID</th>
                        <th className="text-left font-semibold px-5 py-4">Solicitud</th>
                        <th className="text-left font-semibold px-5 py-4">Cliente</th>
                        <th className="text-left font-semibold px-5 py-4">Categoría</th>
                        <th className="text-left font-semibold px-5 py-4">Presupuesto</th>
                        <th className="text-left font-semibold px-5 py-4">Estado</th>
                        <th className="text-left font-semibold px-5 py-4">Acciones</th>
                    </tr>
                </thead>

                <tbody>
                    {requests.length === 0 ? (
                        <tr>
                            <td
                                colSpan="7"
                                className="px-5 py-10 text-center text-gray-400"
                            >
                                No se encontraron solicitudes.
                            </td>
                        </tr>
                    ) : (
                        requests.map((request) => (
                            <tr
                                key={request.id}
                                className="border-t border-gray-100 hover:bg-gray-50 transition"
                            >
                                <td className="px-5 py-4">
                                    <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-400 text-xs font-bold">
                                        {request.id.slice(-6)}
                                    </span>
                                </td>

                                <td className="px-5 py-4 min-w-64">
                                    <div className="flex items-center gap-3">
                                        <div className="w-9 h-9 rounded-xl bg-green-50 flex items-center justify-center">
                                            <img
                                                src={JobIconG}
                                                alt="Solicitud"
                                                className="w-4 h-4"
                                            />
                                        </div>

                                        <div className="min-w-0">
                                            <p className="font-semibold text-[#0F172A] truncate">
                                                {request.title}
                                            </p>

                                            <p className="text-xs text-gray-400 flex items-center gap-1 mt-1">
                                                <img
                                                    src={date}
                                                    alt="Fecha"
                                                    className="w-3 h-3"
                                                />
                                                {request.date}
                                            </p>
                                        </div>
                                    </div>
                                </td>

                                <td className="px-5 py-4">
                                    {request.clientName}
                                </td>

                                <td className="px-5 py-4">
                                    <span className="px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-semibold">
                                        {request.categoryName}
                                    </span>
                                </td>

                                <td className="px-5 py-4 font-semibold text-[#0F172A]">
                                    {request.budgetRange}
                                </td>

                                <td className="px-5 py-4">
                                    <StatusBadge value={request.status} />
                                </td>

                                <td className="px-5 py-4">
                                    <button
                                        onClick={() => onViewRequest(request)}
                                        className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:bg-gray-100 transition"
                                    >
                                        <img
                                            src={view}
                                            alt="Ver"
                                            className="w-4 h-4"
                                        />
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
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