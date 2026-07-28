// src/features/verifications/components/VerificationModal.jsx
import { useState } from 'react';
import check from '../../../assets/icons/check.svg';
import deny from '../../../assets/icons/deny.svg';
import noAvailable from '../../../assets/icons/noAvailable.svg';
import { RoleBadge, StatusBadge, UrgencyBadge } from './VerificationBadges.jsx';

const getUrgency = (createdAt) => {
    const hours = (Date.now() - new Date(createdAt).getTime()) / (1000 * 60 * 60);
    if (hours >= 48) return 'Alta';
    if (hours >= 24) return 'Media';
    return 'Baja';
};

const getAvatar = (firstName = '', lastName = '') => {
    const initials = `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
    const colors = [
        'bg-orange-500', 'bg-teal-500', 'bg-pink-500',
        'bg-blue-500', 'bg-purple-500', 'bg-green-600'
    ];
    const index = (firstName.charCodeAt(0) + lastName.charCodeAt(0)) % colors.length;
    return { initials, color: colors[index] };
};

const DetailRow = ({ label, value }) => (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <p className="text-sm text-gray-500">{label}</p>
        <div className="text-sm font-semibold text-[#0F172A]">{value}</div>
    </div>
);

const DocumentImage = ({ src, label }) => {
    if (!src) {
        return (
            <div className="border border-dashed border-gray-200 rounded-2xl py-8 text-center flex flex-col items-center justify-center gap-3">
                <img src={noAvailable} alt="No disponible" className="w-12 h-12" />
                <p className="text-sm text-gray-300">{label} — Vista previa no disponible</p>
            </div>
        );
    }
    return (
        <div className="space-y-2">
            <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide">{label}</p>
            <img
                src={src}
                alt={label}
                className="w-full rounded-2xl object-cover max-h-48 border border-gray-100"
            />
        </div>
    );
};

export const VerificationModal = ({
    verification,
    onClose,
    onApprove,
    onReject
}) => {
    const [showRejectInput, setShowRejectInput] = useState(false);
    const [rejectReason, setRejectReason] = useState('');

    const firstName = verification.userId?.firstName || '';
    const lastName = verification.userId?.lastName || '';
    const { initials, color } = getAvatar(firstName, lastName);
    const urgency = getUrgency(verification.createdAt);
    const isPending = verification.status === 'PENDING';

    const handleRejectClick = () => {
        setRejectReason('');
        setShowRejectInput(true);
    };

    const handleRejectConfirm = () => {
        onReject(verification._id, rejectReason, () => {
            setShowRejectInput(false);
            setRejectReason('');
            onClose();
        });
    };

    const handleRejectCancel = () => {
        setShowRejectInput(false);
        setRejectReason('');
    };

    const handleApproveClick = () => {
        onApprove(verification._id, () => onClose());
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                onClick={onClose}
            />

            <div className="relative bg-white w-[95%] sm:w-full max-w-md rounded-2xl shadow-xl overflow-hidden max-h-[90vh] overflow-y-auto">

                {/* HEADER */}
                <div className="relative bg-linear-to-r from-[#0F172A] to-[#1E293B] px-6 py-6">
                    <button
                        onClick={onClose}
                        className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white text-sm transition leading-none"
                    >
                        ✕
                    </button>
                    <div className="flex items-center gap-4">
                        <div className={`w-14 h-14 rounded-2xl ${color} border-2 border-white/20 text-white flex items-center justify-center font-bold text-xl shrink-0`}>
                            {initials}
                        </div>
                        <div className="text-white">
                            <h2 className="text-xl font-bold">{firstName} {lastName}</h2>
                            <p className="text-sm text-slate-300">{verification.userId?.email}</p>
                            <div className="flex flex-wrap gap-2 mt-2">
                                <RoleBadge value={verification.userId?.role} />
                                <UrgencyBadge value={urgency} />
                                <StatusBadge value={verification.status} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* BODY */}
                <div className="p-6 space-y-5">

                    {/* Datos del documento */}
                    <div className="bg-gray-50 rounded-2xl p-4 space-y-3">
                        <DetailRow label="Tipo de documento" value={verification.documentType} />
                        <DetailRow label="Número" value={verification.documentNumber} />
                        <DetailRow
                            label="Enviado"
                            value={verification.createdAt
                                ? new Date(verification.createdAt).toLocaleString('es-GT', {
                                    day: '2-digit', month: 'short',
                                    hour: '2-digit', minute: '2-digit'
                                })
                                : '—'}
                        />
                    {verification.reviewedBy && (
                        <DetailRow label="Revisado por" value={
                            typeof verification.reviewedBy === 'string'
                                ? verification.reviewedBy
                                : `${verification.reviewedBy.firstName || ''} ${verification.reviewedBy.lastName || ''}`.trim()
                        } />
                    )}
                    </div>

                    {/* Imágenes del documento */}
                    <div className="space-y-3">
                        <DocumentImage src={verification.documentImageFront} label="Frente del documento" />
                        <DocumentImage src={verification.documentImageBack} label="Reverso del documento" />
                    </div>

                    {/* Nota de rechazo existente */}
                    {verification.status === 'REJECTED' && verification.rejectionReason && (
                        <div className="rounded-2xl border border-yellow-300 bg-yellow-50 px-4 py-3">
                            <p className="text-sm font-semibold text-yellow-700">Nota del revisor</p>
                            <p className="text-sm text-yellow-600 mt-1">{verification.rejectionReason}</p>
                        </div>
                    )}

                    {/* Input de razón de rechazo */}
                    {showRejectInput && (
                        <div className="rounded-2xl border border-red-200 bg-red-50 p-4 space-y-3">
                            <p className="text-sm font-semibold text-red-700">Razón del rechazo</p>
                            <textarea
                                value={rejectReason}
                                onChange={(e) => setRejectReason(e.target.value)}
                                placeholder="Describe el motivo (ej. imagen borrosa, datos incorrectos)..."
                                rows={3}
                                className="w-full px-4 py-3 rounded-xl border border-red-200 bg-white outline-none text-sm text-gray-600 placeholder:text-gray-400 focus:border-red-400 focus:ring-2 focus:ring-red-100 resize-none"
                            />
                            <div className="flex flex-col sm:flex-row gap-2 sm:justify-end">
                                <button
                                    onClick={handleRejectCancel}
                                    className="w-full sm:w-auto px-5 py-2 rounded-xl border border-gray-200 bg-white text-sm text-gray-600 hover:bg-gray-50 transition"
                                >
                                    Cancelar
                                </button>
                                <button
                                    onClick={handleRejectConfirm}
                                    className="w-full sm:w-auto px-5 py-2 rounded-xl bg-red-500 text-white text-sm font-semibold hover:bg-red-600 transition"
                                >
                                    Confirmar rechazo
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Acciones principales */}
                    {isPending && !showRejectInput && (
                        <div className="grid grid-cols-2 gap-3">
                            <button
                                onClick={handleRejectClick}
                                className="py-3 rounded-xl border border-red-300 text-red-500 font-semibold hover:bg-red-50 transition flex items-center justify-center gap-2"
                            >
                                <img src={deny} alt="Rechazar" className="w-4 h-4" />
                                Rechazar
                            </button>
                            <button
                                onClick={handleApproveClick}
                                className="py-3 rounded-xl bg-green-600 text-white font-semibold hover:bg-green-700 transition flex items-center justify-center gap-2"
                            >
                                <img src={check} alt="Aprobar" className="w-4 h-4" />
                                Aprobar
                            </button>
                        </div>
                    )}

                    {!isPending && !showRejectInput && (
                        <button
                            onClick={onClose}
                            className="w-full py-3 rounded-xl bg-[#0F172A] text-white font-semibold hover:bg-slate-800 transition"
                        >
                            Cerrar
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};