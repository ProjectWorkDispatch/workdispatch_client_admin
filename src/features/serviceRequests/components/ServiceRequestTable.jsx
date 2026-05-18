// src/features/serviceRequests/components/ServiceRequestTable.jsx
import view     from '../../../assets/icons/view.svg';
import JobIconG from '../../../assets/icons/JobIconG.svg';
import dateIcon from '../../../assets/icons/date.svg';
import { ServiceRequestStatusBadge } from './ServiceRequestStatusBadge.jsx';

export const ServiceRequestTable = ({ requests, onView }) => {
    return (
        /* Visible solo en md+ */
        <div className="hidden md:block overflow-x-auto">
            <table className="w-full min-w-[820px] text-sm">
                <thead className="bg-gray-50 text-gray-400 uppercase text-xs">
                    <tr>
                        <th className="text-left font-semibold px-5 py-4">ID</th>
                        <th className="text-left font-semibold px-5 py-4">Solicitud</th>
                        <th className="text-left font-semibold px-5 py-4">Cliente</th>
                        <th className="text-left font-semibold px-5 py-4">Categoría</th>
                        <th className="text-left font-semibold px-5 py-4">Presupuesto</th>
                        <th className="text-left font-semibold px-5 py-4">Estado</th>
                        <th className="text-left font-semibold px-5 py-4">Trabajo</th>
                        <th className="text-left font-semibold px-5 py-4">Acciones</th>
                    </tr>
                </thead>

                <tbody>
                    {requests.length === 0 ? (
                        <tr>
                            <td colSpan="8" className="px-5 py-12 text-center text-gray-400">
                                No se encontraron trabajos.
                            </td>
                        </tr>
                    ) : (
                        requests.map((req) => (
                            <tr
                                key={req._id}
                                className="border-t border-gray-100 hover:bg-gray-50 transition"
                            >
                                {/* ID */}
                                <td className="px-5 py-4">
                                    <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-400 text-xs font-bold">
                                        {req._id.slice(-6)}
                                    </span>
                                </td>

                                {/* Solicitud */}
                                <td className="px-5 py-4 min-w-56">
                                    <div className="flex items-center gap-3">
                                        <div className="w-9 h-9 rounded-xl bg-green-50 flex items-center justify-center shrink-0">
                                            <img src={JobIconG} alt="Trabajo" className="w-4 h-4" />
                                        </div>
                                        <div className="min-w-0">
                                            <p className="font-semibold text-[#0F172A] truncate max-w-40">
                                                {req.title}
                                            </p>
                                            <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
                                                <img src={dateIcon} alt="Fecha" className="w-3 h-3" />
                                                {req._date}
                                            </p>
                                        </div>
                                    </div>
                                </td>

                                {/* Cliente */}
                                <td className="px-5 py-4 text-gray-700">
                                    {req._clientName}
                                </td>

                                {/* Categoría */}
                                <td className="px-5 py-4">
                                    <span className="px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-semibold">
                                        {req._categoryName}
                                    </span>
                                </td>

                                {/* Presupuesto */}
                                <td className="px-5 py-4 font-semibold text-[#0F172A] whitespace-nowrap">
                                    {req._budgetRange}
                                </td>

                                {/* Estado de la solicitud */}
                                <td className="px-5 py-4">
                                    <ServiceRequestStatusBadge value={req.status} />
                                </td>

                                {/* Estado del trabajo en ejecución (Service) */}
                                <td className="px-5 py-4">
                                    {req.service ? (
                                        <ServiceRequestStatusBadge value={req.service.status} />
                                    ) : (
                                        <span className="text-xs text-gray-300 italic">—</span>
                                    )}
                                </td>

                                {/* Acciones */}
                                <td className="px-5 py-4">
                                    <button
                                        onClick={() => onView(req)}
                                        className="w-8 h-8 rounded-full flex items-center justify-center
                                                   text-gray-400 hover:bg-gray-100 transition"
                                        title="Ver detalle"
                                    >
                                        <img src={view} alt="Ver" className="w-4 h-4" />
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