import view     from '../../../assets/icons/view.svg';
import JobIconG from '../../../assets/icons/JobIconG.svg';
import dateIcon from '../../../assets/icons/date.svg';
import { ServiceRequestStatusBadge } from './ServiceRequestStatusBadge.jsx';

export const ServiceRequestTable = ({ requests, onView }) => {
    return (
        <div>
            {/* ── Tabla desktop (Se mantiene igual) ── */}
            <div className="hidden md:block overflow-x-auto">
                <table className="w-full min-w-[720px] text-sm">
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
                            <tr><td colSpan="7" className="px-5 py-12 text-center text-gray-400">No se encontraron solicitudes.</td></tr>
                        ) : (
                            requests.map((req) => (
                                <tr key={req._id} className="border-t border-gray-100 hover:bg-gray-50 transition">
                                    <td className="px-5 py-4">
                                        <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-400 text-xs font-bold">
                                            {req._id.slice(-6)}
                                        </span>
                                    </td>
                                    <td className="px-5 py-4 min-w-56 text-sm font-semibold text-[#0F172A]">{req.title}</td>
                                    {/* ... resto de celdas desktop ... */}
                                    <td className="px-5 py-4 text-gray-700">{req._clientName}</td>
                                    <td className="px-5 py-4 text-blue-600">{req._categoryName}</td>
                                    <td className="px-5 py-4 font-semibold">Q {req._budgetRange}</td>
                                    <td className="px-5 py-4"><ServiceRequestStatusBadge value={req.status} /></td>
                                    <td className="px-5 py-4">
                                        <button onClick={() => onView(req)} className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:bg-gray-100 transition">
                                            <img src={view} className="w-4 h-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* ── Vista de CARDS Mobile ── */}
            <div className="md:hidden flex flex-col gap-4 p-4 bg-gray-50/50">
                {requests.length === 0 ? (
                    <p className="px-5 py-10 text-center text-sm text-gray-400 font-medium">No se encontraron solicitudes.</p>
                ) : (
                    requests.map((req) => (
                        <div 
                            key={req._id} 
                            className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
                        >
                            {/* Header de la Card: Icono + ID + Estado */}
                            <div className="p-4 flex items-center justify-between border-b border-gray-50 bg-white">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center">
                                        <img src={JobIconG} className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <span className="text-[10px] font-bold text-blue-500 uppercase tracking-wider">
                                            ID #{req._id.slice(-6)}
                                        </span>
                                        <p className="text-xs text-gray-400 flex items-center gap-1">
                                            <img src={dateIcon} className="w-3 h-3 opacity-60" />
                                            {req._date}
                                        </p>
                                    </div>
                                </div>
                                <ServiceRequestStatusBadge value={req.status} />
                            </div>

                            {/* Contenido Principal */}
                            <div className="p-4 space-y-4">
                                <div>
                                    <h3 className="text-[15px] font-bold text-[#0F172A] leading-tight">
                                        {req.title}
                                    </h3>
                                    <p className="text-xs text-blue-600 font-semibold mt-1">
                                        {req._categoryName}
                                    </p>
                                </div>

                                {/* Grid de Detalles */}
                                <div className="grid grid-cols-2 gap-4 py-3 border-y border-gray-50">
                                    <div>
                                        <p className="text-[10px] text-gray-400 uppercase font-bold tracking-tight mb-0.5">Cliente</p>
                                        <p className="text-sm font-semibold text-gray-700 truncate">{req._clientName}</p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-gray-400 uppercase font-bold tracking-tight mb-0.5">Presupuesto</p>
                                        <p className="text-sm font-bold text-green-600">{req._budgetRange}</p>
                                    </div>
                                </div>

                                {/* Botón de Acción Principal (Full Width) */}
                                <button 
                                    onClick={() => onView(req)}
                                    className="w-full py-3 bg-gray-50 hover:bg-gray-100 text-[#0F172A] rounded-xl flex items-center justify-center gap-2 transition-colors border border-gray-100 font-semibold text-sm"
                                >
                                    <img src={view} className="w-4 h-4" />
                                    Ver detalles de la solicitud
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};