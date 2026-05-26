// src/features/serviceRequests/components/ServiceRequestModal.jsx
import { useState } from 'react';
import JobIconG from '../../../assets/icons/JobIconG.svg';
import money from '../../../assets/icons/money.svg';
import location from '../../../assets/icons/location.svg';
import dateIcon from '../../../assets/icons/date.svg';
import duration from '../../../assets/icons/duration.svg';
import personC from '../../../assets/icons/personC.svg';
import personD from '../../../assets/icons/personD.svg';
import { ServiceRequestStatusBadge } from './ServiceRequestStatusBadge.jsx';
import { useServiceRequestActions } from '../hook/useServiceRequestActions.js';
import { MapView } from '../../../shared/components/ui/MapView.jsx';

export const ServiceRequestModal = ({ request, onClose }) => {
    const { handleChangeRequestStatus, handleChangeServiceStatus } =
        useServiceRequestActions();

    const [actionLoading, setActionLoading] = useState(false);

    const handleAction = async (type, id, status) => {
        setActionLoading(true);
        try {
            if (type === 'request') {
                await handleChangeRequestStatus(id, status, onClose);
            } else {
                await handleChangeServiceStatus(id, status, onClose);
            }
        } finally {
            setActionLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Panel */}
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
                            <img src={JobIconG} alt="Trabajo" className="w-7 h-7" />
                        </div>
                        <div className="text-white min-w-0">
                            <p className="text-xs text-slate-400">#{request._id.slice(-6)}</p>
                            <h2 className="font-bold text-xl truncate">{request.title}</h2>
                            <div className="flex flex-wrap gap-2 mt-2">
                                <ServiceRequestStatusBadge value={request.status} />
                                {request.service && <ServiceRequestStatusBadge value={request.service.status} />}
                                <span className="px-3 py-1 rounded-full bg-white/10 text-white text-xs font-semibold">
                                    {request._categoryName}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Body — sin cambios, copiar desde <div className="p-6 space-y-6"> en adelante */}

                {/* Body */}
                <div className="p-6 space-y-6">

                    {/* ── Badges de estado ── */}
                    <div className="flex flex-wrap gap-2">
                        <ServiceRequestStatusBadge value={request.status} />
                        {request.service && (
                            <ServiceRequestStatusBadge value={request.service.status} />
                        )}
                        <span className="px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-semibold">
                            {request._categoryName}
                        </span>
                    </div>

                    {/* ── Descripción ── */}
                    {request.description && (
                        <p className="text-sm text-gray-600 leading-relaxed">
                            {request.description}
                        </p>
                    )}

                    {/* ── Datos de la solicitud ── */}
                    <section>
                        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                            Solicitud
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

                    <section>
                        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                            Ubicación
                        </h3>

                        <MapView
                            latitude={request.latitude}
                            longitude={request.longitude}
                        />
                    </section>

                    {/* ── Datos del trabajo en ejecución (Service) ── */}
                    {request.service && (
                        <section>
                            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                                Trabajo en ejecución
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <InfoBox
                                    icon={<img src={personD} alt="Trabajador" className="w-4 h-4" />}
                                    label="Trabajador"
                                    value={
                                        request.service.workerId?.name ??
                                            request.service.workerId?.firstName
                                            ? `${request.service.workerId.firstName} ${request.service.workerId.lastName ?? ''}`.trim()
                                            : '—'
                                    }
                                    color="text-indigo-500 bg-indigo-50"
                                />
                                {request.service.finalPrice != null && (
                                    <InfoBox
                                        icon={<img src={money} alt="Precio final" className="w-4 h-4" />}
                                        label="Precio final"
                                        value={`Q ${request.service.finalPrice}`}
                                        color="text-green-500 bg-green-50"
                                    />
                                )}
                                {request.service.startDate && (
                                    <InfoBox
                                        icon={<img src={dateIcon} alt="Inicio" className="w-4 h-4" />}
                                        label="Inicio"
                                        value={new Date(request.service.startDate).toLocaleDateString('es-GT', {
                                            day: '2-digit', month: 'short', year: 'numeric',
                                        })}
                                        color="text-blue-500 bg-blue-50"
                                    />
                                )}
                                {request.service.endDate && (
                                    <InfoBox
                                        icon={<img src={duration} alt="Fin" className="w-4 h-4" />}
                                        label="Fin"
                                        value={new Date(request.service.endDate).toLocaleDateString('es-GT', {
                                            day: '2-digit', month: 'short', year: 'numeric',
                                        })}
                                        color="text-orange-500 bg-orange-50"
                                    />
                                )}
                            </div>
                        </section>
                    )}

                    {/* ── Acciones de moderación ── */}
                    <section className="pt-2 border-t border-gray-100 space-y-3">
                        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                            Acciones de moderación
                        </h3>

                        {/* Acciones sobre la solicitud */}
                        {(request.status === 'OPEN' || request.status === 'IN_PROGRESS') && (
                            <div className="flex flex-col sm:flex-row gap-2">
                                <button
                                    disabled={actionLoading}
                                    onClick={() => handleAction('request', request._id, 'CANCELLED')}
                                    className="w-full sm:w-auto flex-1 px-4 py-2.5 rounded-xl border border-red-200
                                               text-red-600 bg-red-50 text-sm font-semibold
                                               hover:bg-red-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Cancelar solicitud
                                </button>
                                {request.status === 'IN_PROGRESS' && (
                                    <button
                                        disabled={actionLoading}
                                        onClick={() => handleAction('request', request._id, 'CLOSED')}
                                        className="w-full sm:w-auto flex-1 px-4 py-2.5 rounded-xl border border-gray-200
                                                   text-gray-600 bg-gray-50 text-sm font-semibold
                                                   hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        Cerrar solicitud
                                    </button>
                                )}
                            </div>
                        )}

                        {/* Acciones sobre el trabajo en ejecución */}
                        {request.service &&
                            (request.service.status === 'IN_PROGRESS' ||
                                request.service.status === 'OPEN') && (
                                <div className="flex flex-col sm:flex-row gap-2">
                                    <button
                                        disabled={actionLoading}
                                        onClick={() =>
                                            handleAction('service', request.service._id, 'COMPLETED')
                                        }
                                        className="w-full sm:w-auto flex-1 px-4 py-2.5 rounded-xl border border-green-200
                                                   text-green-700 bg-green-50 text-sm font-semibold
                                                   hover:bg-green-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        Marcar trabajo completado
                                    </button>
                                    <button
                                        disabled={actionLoading}
                                        onClick={() =>
                                            handleAction('service', request.service._id, 'CANCELLED')
                                        }
                                        className="w-full sm:w-auto flex-1 px-4 py-2.5 rounded-xl border border-red-200
                                                   text-red-600 bg-red-50 text-sm font-semibold
                                                   hover:bg-red-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        Cancelar trabajo
                                    </button>
                                </div>
                            )}

                        {/* Estado final — solo lectura */}
                        {['COMPLETED', 'CANCELLED', 'CLOSED'].includes(request.status) &&
                            !request.service && (
                                <p className="text-xs text-gray-400 italic">
                                    Esta solicitud ya está en estado final. No hay acciones disponibles.
                                </p>
                            )}
                    </section>
                </div>
            </div>
        </div>
    );
};

/* ── Sub-componentes internos ───────────────────────────────── */
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