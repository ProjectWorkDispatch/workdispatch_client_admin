// src/features/verifications/components/VerificationsTable.jsx
import EyeB from '../../../assets/icons/EyeB.svg';
import deny from '../../../assets/icons/deny.svg';
import check from '../../../assets/icons/check.svg';
import { RoleBadge, StatusBadge, UrgencyBadge } from './VerificationBadges.jsx';

// Calcula urgencia en base a antigüedad del createdAt
const getUrgency = (createdAt) => {
    const hours = (Date.now() - new Date(createdAt).getTime()) / (1000 * 60 * 60);
    if (hours >= 48) return 'Alta';
    if (hours >= 24) return 'Media';
    return 'Baja';
};

// Genera iniciales y color de avatar a partir del nombre
const getAvatar = (firstName = '', lastName = '') => {
    const initials = `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
    const colors = [
        'bg-orange-500', 'bg-teal-500', 'bg-pink-500',
        'bg-blue-500', 'bg-purple-500', 'bg-green-600'
    ];
    const index = (firstName.charCodeAt(0) + lastName.charCodeAt(0)) % colors.length;
    return { initials, color: colors[index] };
};

export const VerificationsTable = ({
    verifications,
    totalVerifications,
    pendingCount,
    onView,
    onApprove,
    onReject
}) => {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-[900px] w-full text-sm">
                <thead className="bg-gray-50 text-gray-500">
                    <tr>
                        <th className="text-left font-medium px-5 py-4">Solicitante</th>
                        <th className="text-left font-medium px-5 py-4">Rol</th>
                        <th className="text-left font-medium px-5 py-4">Documento</th>
                        <th className="text-left font-medium px-5 py-4">Enviado</th>
                        <th className="text-left font-medium px-5 py-4">Urgencia</th>
                        <th className="text-left font-medium px-5 py-4">Estado</th>
                        <th className="text-left font-medium px-5 py-4">Acciones</th>
                    </tr>
                </thead>

                <tbody>
                    {verifications.length === 0 ? (
                        <tr>
                            <td colSpan="7" className="px-5 py-10 text-center text-gray-400">
                                No se encontraron solicitudes.
                            </td>
                        </tr>
                    ) : (
                        verifications.map((verification) => {
                            const { initials, color } = getAvatar(
                                verification.userId?.firstName,
                                verification.userId?.lastName
                            );
                            const urgency = getUrgency(verification.createdAt);
                            const isPending = verification.status === 'PENDING';

                            return (
                                <tr
                                    key={verification._id}
                                    className={`border-t border-gray-100 hover:bg-gray-50 transition ${
                                        isPending && urgency === 'Alta'
                                            ? 'border-l-2 border-l-red-400'
                                            : ''
                                    }`}
                                >
                                    <td className="px-5 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-9 h-9 rounded-full ${color} text-white flex items-center justify-center text-xs font-bold shrink-0`}>
                                                {initials}
                                            </div>
                                            <div className="min-w-0">
                                                <p className="font-semibold text-[#0F172A] truncate">
                                                    {verification.userId?.firstName} {verification.userId?.lastName}
                                                </p>
                                                <p className="text-xs text-gray-400 truncate">
                                                    {verification.userId?.email}
                                                </p>
                                            </div>
                                        </div>
                                    </td>

                                    <td className="px-5 py-4">
                                        <RoleBadge value={verification.userId?.role} />
                                    </td>

                                    <td className="px-5 py-4">
                                        <p className="text-[#0F172A]">{verification.documentNumber}</p>
                                        <p className="text-xs text-gray-400">{verification.documentType}</p>
                                    </td>

                                    <td className="px-5 py-4 text-gray-500 whitespace-nowrap">
                                        {verification.createdAt
                                            ? new Date(verification.createdAt).toLocaleString('es-GT', {
                                                day: '2-digit',
                                                month: 'short',
                                                hour: '2-digit',
                                                minute: '2-digit'
                                            })
                                            : '—'}
                                    </td>

                                    <td className="px-5 py-4">
                                        <UrgencyBadge value={urgency} />
                                    </td>

                                    <td className="px-5 py-4">
                                        <StatusBadge value={verification.status} />
                                    </td>

                                    <td className="px-5 py-4">
                                        <div className="flex items-center justify-center gap-1">
                                            <button
                                                onClick={() => onView(verification)}
                                                className="w-8 h-8 rounded-full bg-blue-50 hover:bg-blue-100 flex items-center justify-center transition"
                                                title="Ver detalle"
                                            >
                                                <img src={EyeB} alt="Ver detalle" className="w-4 h-4" />
                                            </button>

                                            {isPending && (
                                                <>
                                                    <button
                                                        onClick={() => onApprove(verification._id)}
                                                        className="w-8 h-8 rounded-full bg-green-50 hover:bg-green-100 flex items-center justify-center transition"
                                                        title="Aprobar"
                                                    >
                                                        <img src={check} alt="Aprobar" className="w-4 h-4" />
                                                    </button>

                                                    <button
                                                        onClick={() => onReject(verification._id)}
                                                        className="w-8 h-8 rounded-full bg-red-50 hover:bg-red-100 flex items-center justify-center transition"
                                                        title="Rechazar"
                                                    >
                                                        <img src={deny} alt="Rechazar" className="w-4 h-4" />
                                                    </button>
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

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-5 py-4 border-t border-gray-100">
                <p className="text-xs text-gray-400">
                    Mostrando {verifications.length} de {totalVerifications} solicitudes
                    <span className="text-yellow-600 font-semibold">
                        {' '}· {pendingCount} pendientes de revisión
                    </span>
                </p>
                <p className="text-xs text-green-600 font-semibold">
                    Aprobar actualiza el estado del usuario en tiempo real
                </p>
            </div>
        </div>
    );
};