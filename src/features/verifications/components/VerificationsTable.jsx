import EyeB from '../../../assets/icons/EyeB.svg';
import deny from '../../../assets/icons/deny.svg';
import check from '../../../assets/icons/check.svg';
import { RoleBadge, StatusBadge, UrgencyBadge } from './VerificationBadges.jsx';

// [Funciones getUrgency y getAvatar se mantienen igual...]
const getUrgency = (createdAt) => {
    const hours = (Date.now() - new Date(createdAt).getTime()) / (1000 * 60 * 60);
    if (hours >= 48) return 'Alta';
    if (hours >= 24) return 'Media';
    return 'Baja';
};

const getAvatar = (firstName = '', lastName = '') => {
    const initials = `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
    const colors = ['bg-orange-500', 'bg-teal-500', 'bg-pink-500', 'bg-blue-500', 'bg-purple-500', 'bg-green-600'];
    const index = (firstName.charCodeAt(0) + lastName.charCodeAt(0)) % colors.length;
    return { initials, color: colors[index] };
};

export const VerificationsTable = ({
    verifications, totalVerifications, pendingCount, onView, onApprove, onReject
}) => {
    return (
        <div>
            {/* ── Tabla desktop ── */}
            <div className="hidden lg:block overflow-x-auto">
                <table className="min-w-[900px] w-full text-sm">
                    <thead className="bg-gray-50 text-gray-500 uppercase text-[11px] tracking-wider">
                        <tr>
                            <th className="text-left font-semibold px-5 py-4">Solicitante</th>
                            <th className="text-left font-semibold px-5 py-4">Rol</th>
                            <th className="text-left font-semibold px-5 py-4">Documento</th>
                            <th className="text-left font-semibold px-5 py-4">Enviado</th>
                            <th className="text-left font-semibold px-5 py-4">Urgencia</th>
                            <th className="text-left font-semibold px-5 py-4">Estado</th>
                            <th className="text-left font-semibold px-5 py-4">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {verifications.length === 0 ? (
                            <tr><td colSpan="7" className="px-5 py-10 text-center text-gray-400">No se encontraron solicitudes.</td></tr>
                        ) : (
                            verifications.map((verification) => {
                                const { initials, color } = getAvatar(verification.userId?.firstName, verification.userId?.lastName);
                                const urgency = getUrgency(verification.createdAt);
                                const isPending = verification.status === 'PENDING';
                                return (
                                    <tr key={verification._id} className={`border-t border-gray-100 hover:bg-gray-50 transition ${isPending && urgency === 'Alta' ? 'border-l-2 border-l-red-400' : ''}`}>
                                        <td className="px-5 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className={`w-9 h-9 rounded-full ${color} text-white flex items-center justify-center text-xs font-bold shrink-0`}>{initials}</div>
                                                <div className="min-w-0">
                                                    <p className="font-semibold text-[#0F172A] truncate">{verification.userId?.firstName} {verification.userId?.lastName}</p>
                                                    <p className="text-xs text-gray-400 truncate">{verification.userId?.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-5 py-4"><RoleBadge value={verification.userId?.role} /></td>
                                        <td className="px-5 py-4">
                                            <p className="text-[#0F172A] font-medium">{verification.documentNumber}</p>
                                            <p className="text-xs text-gray-400">{verification.documentType}</p>
                                        </td>
                                        <td className="px-5 py-4 text-gray-500 whitespace-nowrap">
                                            {verification.createdAt ? new Date(verification.createdAt).toLocaleString('es-GT', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' }) : '—'}
                                        </td>
                                        <td className="px-5 py-4"><UrgencyBadge value={urgency} /></td>
                                        <td className="px-5 py-4"><StatusBadge value={verification.status} /></td>
                                        <td className="px-5 py-4">
                                            <div className="flex items-center gap-2">
                                                <button onClick={() => onView(verification)} className="w-8 h-8 rounded-full bg-blue-50 hover:bg-blue-100 flex items-center justify-center transition" title="Ver detalle"><img src={EyeB} className="w-4 h-4" /></button>
                                                {isPending && (
                                                    <>
                                                        <button onClick={() => onApprove(verification._id)} className="w-8 h-8 rounded-full bg-green-50 hover:bg-green-100 flex items-center justify-center transition" title="Aprobar"><img src={check} className="w-4 h-4" /></button>
                                                        <button onClick={() => onReject(verification._id)} className="w-8 h-8 rounded-full bg-red-50 hover:bg-red-100 flex items-center justify-center transition" title="Rechazar"><img src={deny} className="w-4 h-4" /></button>
                                                    </>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>

            {/* ── Vista de CARDS Mobile ── */}
            <div className="lg:hidden flex flex-col gap-4 p-4 bg-gray-50/50">
                {verifications.length === 0 ? (
                    <p className="px-5 py-10 text-center text-sm text-gray-400 font-medium">No hay solicitudes pendientes.</p>
                ) : (
                    verifications.map((verification) => {
                        const { initials, color } = getAvatar(verification.userId?.firstName, verification.userId?.lastName);
                        const urgency = getUrgency(verification.createdAt);
                        const isPending = verification.status === 'PENDING';

                        return (
                            <div 
                                key={verification._id} 
                                className={`bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden ${
                                    isPending && urgency === 'Alta' ? 'ring-1 ring-red-200' : ''
                                }`}
                            >
                                {/* Header: Avatar, Info y Urgencia */}
                                <div className="p-4 flex items-start justify-between bg-white">
                                    <div className="flex items-center gap-3 min-w-0">
                                        <div className={`w-11 h-11 rounded-full ${color} text-white flex items-center justify-center text-sm font-bold shrink-0 shadow-sm`}>
                                            {initials}
                                        </div>
                                        <div className="min-w-0">
                                            <p className="font-bold text-sm text-[#0F172A] truncate">
                                                {verification.userId?.firstName} {verification.userId?.lastName}
                                            </p>
                                            <div className="flex flex-wrap gap-1 mt-1">
                                                <RoleBadge value={verification.userId?.role} />
                                                <UrgencyBadge value={urgency} />
                                            </div>
                                        </div>
                                    </div>
                                    <StatusBadge value={verification.status} />
                                </div>

                                {/* Cuerpo: Documentos y Fecha */}
                                <div className="px-4 py-3 bg-gray-50/50 border-y border-gray-50">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-[10px] text-gray-400 uppercase font-bold mb-0.5">Documento</p>
                                            <p className="text-xs font-semibold text-[#0F172A]">{verification.documentNumber}</p>
                                            <p className="text-[10px] text-gray-500 uppercase">{verification.documentType}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-[10px] text-gray-400 uppercase font-bold mb-0.5">Enviado el</p>
                                            <p className="text-[11px] font-medium text-gray-600">
                                                {verification.createdAt ? new Date(verification.createdAt).toLocaleDateString() : '—'}
                                            </p>
                                            <p className="text-[10px] text-gray-400">
                                                {verification.createdAt ? new Date(verification.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Acciones */}
                                <div className="p-3 flex gap-2">
                                    <button 
                                        onClick={() => onView(verification)}
                                        className="flex-1 py-2.5 bg-white hover:bg-gray-50 text-[#0F172A] rounded-xl flex items-center justify-center gap-2 transition-colors border border-gray-200 font-bold text-xs"
                                    >
                                        <img src={EyeB} className="w-3.5 h-3.5" />
                                        REVISAR
                                    </button>
                                    
                                    {isPending && (
                                        <div className="flex gap-2 shrink-0">
                                            <button 
                                                onClick={() => onApprove(verification._id)}
                                                className="w-11 h-11 bg-green-500 hover:bg-green-600 rounded-xl flex items-center justify-center transition-colors shadow-sm shadow-green-100"
                                            >
                                                <img src={check} className="w-5 h-5 brightness-0 invert" />
                                            </button>
                                            <button 
                                                onClick={() => onReject(verification._id)}
                                                className="w-11 h-11 bg-red-50 hover:bg-red-100 rounded-xl flex items-center justify-center transition-colors border border-red-100"
                                            >
                                                <img src={deny} className="w-5 h-5" />
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })
                )}
            </div>

            {/* Footer de información */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-5 py-4 border-t border-gray-100">
                <p className="text-xs text-gray-400 font-medium">
                    Mostrando {verifications.length} de {totalVerifications} solicitudes
                    <span className="text-yellow-600 font-bold">
                        {' '}· {pendingCount} pendientes
                    </span>
                </p>
                <p className="text-[10px] sm:text-xs text-green-600 font-bold uppercase tracking-tight italic">
                    Aprobación inmediata en tiempo real
                </p>
            </div>
        </div>
    );
};