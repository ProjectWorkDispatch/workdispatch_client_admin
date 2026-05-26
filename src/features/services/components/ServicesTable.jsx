import view from "../../../assets/icons/view.svg";
import JobIconG from "../../../assets/icons/JobIconG.svg";
import date from "../../../assets/icons/date.svg";

export const ServicesTable = ({
    services,
    onViewService,
    currentPage,
    totalPages,
    setCurrentPage,
}) => {
    return (
        <div className="overflow-x-auto">
            <table className="w-full min-w-300 text-sm">
                <thead className="bg-gray-50 text-gray-400 uppercase text-xs">
                    <tr>
                        <th className="text-left font-semibold px-5 py-4">Solicitud</th>
                        <th className="text-left font-semibold px-5 py-4">Cliente</th>
                        <th className="text-left font-semibold px-5 py-4">Trabajador</th>
                        <th className="text-left font-semibold px-5 py-4">Inicio</th>
                        <th className="text-left font-semibold px-5 py-4">Precio final</th>
                        <th className="text-left font-semibold px-5 py-4">Estado</th>
                        <th className="text-left font-semibold px-5 py-4">Acciones</th>
                    </tr>
                </thead>

                <tbody>
                    {services.length === 0 ? (
                        <tr>
                            <td colSpan="7" className="px-5 py-10 text-center text-gray-400">
                                No se encontraron servicios.
                            </td>
                        </tr>
                    ) : (
                        services.map((service) => (
                            <tr
                                key={service.id}
                                className="border-t border-gray-100 hover:bg-gray-50 transition"
                            >
                                <td className="px-5 py-4 min-w-64">
                                    <div className="flex items-center gap-3">
                                        <div className="w-9 h-9 rounded-xl bg-green-50 text-green-500 flex items-center justify-center font-bold">
                                            <img src={JobIconG} alt="Servicio" className="w-4 h-4" />
                                        </div>
                                        <div className="min-w-0">
                                            <p className="font-semibold text-[#0F172A] truncate">
                                                {service.requestCode}
                                            </p>
                                            <p className="text-xs text-gray-400 flex items-center gap-1 mt-1">
                                                <img src={date} alt="Fecha" className="w-3 h-3" />
                                                {service.createdDate}
                                            </p>
                                        </div>
                                    </div>
                                </td>

                                <td className="px-5 py-4 min-w-44">{service.clientName}</td>

                                <td className="px-5 py-4 min-w-52">{service.workerName}</td>

                                <td className="px-5 py-4">
                                    <span className="text-sm text-gray-600">
                                        {service.startDateFormatted}
                                    </span>
                                </td>

                                <td className="px-5 py-4 font-semibold text-[#0F172A]">
                                    Q {service.budget}
                                </td>

                                <td className="px-5 py-4">
                                    <StatusBadge value={service.status} />
                                </td>

                                <td className="px-5 py-4">
                                    <button
                                        onClick={() => onViewService(service)}
                                        className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition"
                                    >
                                        <img src={view} alt="Ver" className="w-4 h-4 object-contain" />
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>

            {/* PAGINACIÓN */}
            {totalPages > 1 && (
                <div className="flex items-center justify-between px-5 py-4 border-t border-gray-100">
                    <button
                        onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                        disabled={currentPage === 1}
                        className="px-3 py-1.5 rounded-lg text-sm text-gray-500 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition"
                    >
                        ← Anterior
                    </button>
                    <span className="text-xs text-gray-400">
                        Página {currentPage} de {totalPages}
                    </span>
                    <button
                        onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="px-3 py-1.5 rounded-lg text-sm text-gray-500 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition"
                    >
                        Siguiente →
                    </button>
                </div>
            )}
        </div>
    );
};

const StatusBadge = ({ value }) => {
    if (value === "COMPLETED")
        return (
            <span className="px-3 py-1 rounded-full bg-green-100 border border-green-200 text-green-600 text-xs font-semibold">
                ● Finalizado
            </span>
        );
    if (value === "CANCELLED")
        return (
            <span className="px-3 py-1 rounded-full bg-red-100 border border-red-200 text-red-600 text-xs font-semibold">
                ● Cancelado
            </span>
        );
    if (value === "PENDING")
        return (
            <span className="px-3 py-1 rounded-full bg-blue-100 border border-blue-200 text-blue-600 text-xs font-semibold">
                ● Pendiente
            </span>
        );
    return (
        <span className="px-3 py-1 rounded-full bg-yellow-100 border border-yellow-200 text-yellow-600 text-xs font-semibold">
            ● En progreso
        </span>
    );
};