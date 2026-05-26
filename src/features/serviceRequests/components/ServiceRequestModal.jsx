import { useState } from 'react';
import JobIconG from '../../../assets/icons/JobIconG.svg';
import money    from '../../../assets/icons/money.svg';
import location from '../../../assets/icons/location.svg';
import dateIcon from '../../../assets/icons/date.svg';
import personC  from '../../../assets/icons/personC.svg';
import { ServiceRequestStatusBadge } from './ServiceRequestStatusBadge.jsx';
import { useServiceRequestActions }  from '../hook/useServiceRequestActions.js';
import { MapView } from '../../../shared/components/ui/MapView.jsx';

export const ServiceRequestModal = ({ request, onClose }) => {
    const { handleChangeRequestStatus } = useServiceRequestActions();
    const [actionLoading, setActionLoading] = useState(false);

    const isFinal = ['COMPLETED', 'CANCELLED', 'CLOSED'].includes(request.status);

    const handleAction = async (status) => {
        setActionLoading(true);
        try {
            await handleChangeRequestStatus(request._id, status, onClose);
        } finally {
            setActionLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                onClick={onClose}
            />

            <div
                className="relative bg-white w-full max-w-xl rounded-2xl shadow-xl max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
            >
                {/* HEADER */}
                <div className="relative bg-linear-to-r from-[#0F172A] to-[#1E293B] px-6 py-6 sticky top-0 z-10">
                    <button
                        onClick={onClose}
                        className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white text-sm transition"
                        aria-label="Cerrar"
                    >
                        ✕
                    </button>
                    <div className="flex items-center gap-4 min-w-0">
                        <div className="w-14 h-14 rounded-2xl bg-green-500/20 border border-green-400/30 flex items-center justify-center shrink-0">
                            <img src={JobIconG} alt="Solicitud" className="w-7 h-7" />
                        </div>
                        <div className="text-white min-w-0">
                            <p className="text-xs text-slate-400">#{request._id.slice(-6)}</p>
                            <h2 className="font-bold text-xl truncate">{request.title}</h2>
                            <div className="flex flex-wrap gap-2 mt-2">
                                <ServiceRequestStatusBadge value={request.status} />
                                <span className="px-3 py-1 rounded-full bg-white/10 text-white text-xs font-semibold">
                                    {request._categoryName}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* BODY */}
                <div className="p-6 space-y-6">

                    {/* Descripción */}
                    {request.description && (
                        <p className="text-sm text-gray-600 leading-relaxed">
                            {request.description}
                        </p>
                    )}

                    {/* Datos de la solicitud */}
                    <section>
                        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                            Detalle
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <InfoBox
                                icon={<img src={personC} alt="Cliente" className="w-4 h-4" />}
                                label="Cliente"
                                value={request._clientName}
                                color="text-blue-500 bg-blue-50"
                            />
                            <InfoBox
                                icon={<img src={money} alt="Presupuesto" className="w-4 h-4" />}
                                label="Presupuesto"
                                value={request._budgetRange}
                                color="text-green-500 bg-green-50"
                            />
                            <InfoBox
                                icon={<img src={location} alt="Dirección" className="w-4 h-4" />}
                                label="Dirección"
                                value={request.address ?? '—'}
                                color="text-purple-500 bg-purple-50"
                            />
                            <InfoBox
                                icon={<img src={dateIcon} alt="Fecha" className="w-4 h-4" />}
                                label="Publicada"
                                value={request._date}
                                color="text-orange-500 bg-orange-50"
                            />
                        </div>
                    </section>

                    {/* Mapa */}
                    <section>
                        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                            Ubicación
                        </h3>
                        <MapView
                            latitude={request.latitude}
                            longitude={request.longitude}
                        />
                    </section>

                    {/* Acciones de moderación */}
                    <section className="pt-2 border-t border-gray-100 space-y-3">
                        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                            Acciones de moderación
                        </h3>

                        {!isFinal ? (
                            <div className="flex flex-col sm:flex-row gap-2">
                                {request.status === 'IN_PROGRESS' && (
                                    <button
                                        disabled={actionLoading}
                                        onClick={() => handleAction('CLOSED')}
                                        className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200
                                                   text-gray-600 bg-gray-50 text-sm font-semibold
                                                   hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        Cerrar solicitud
                                    </button>
                                )}
                                <button
                                    disabled={actionLoading}
                                    onClick={() => handleAction('CANCELLED')}
                                    className="flex-1 px-4 py-2.5 rounded-xl border border-red-200
                                               text-red-600 bg-red-50 text-sm font-semibold
                                               hover:bg-red-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {actionLoading ? 'Guardando…' : 'Cancelar solicitud'}
                                </button>
                            </div>
                        ) : (
                            <p className="text-xs text-gray-400 italic">
                                Esta solicitud está en estado final. No hay acciones disponibles.
                            </p>
                        )}
                    </section>
                </div>
            </div>
        </div>
    );
};

const InfoBox = ({ icon, label, value, color }) => (
    <div className="flex items-center gap-3">
        <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${color}`}>
            {icon}
        </div>
        <div className="min-w-0">
            <p className="text-xs text-gray-400">{label}</p>
            <p className="font-semibold text-slate-700 truncate">{value}</p>
        </div>
    </div>
);