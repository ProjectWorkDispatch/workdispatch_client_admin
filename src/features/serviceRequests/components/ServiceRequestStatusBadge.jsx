// src/features/serviceRequests/components/ServiceRequestStatusBadge.jsx

const STATUS_CONFIG = {
    OPEN:        { label: 'Abierta',     classes: 'bg-blue-100 border-blue-200 text-blue-600' },
    IN_PROGRESS: { label: 'En progreso', classes: 'bg-yellow-100 border-yellow-200 text-yellow-600' },
    COMPLETED:   { label: 'Completada',  classes: 'bg-green-100 border-green-200 text-green-600' },
    CANCELLED:   { label: 'Cancelada',   classes: 'bg-red-100 border-red-200 text-red-600' },
    CLOSED:      { label: 'Cerrada',     classes: 'bg-gray-100 border-gray-200 text-gray-500' },
};

export const ServiceRequestStatusBadge = ({ value, size = 'sm' }) => {
    const config = STATUS_CONFIG[value] ?? STATUS_CONFIG.CLOSED;
    const textSize = size === 'xs' ? 'text-[10px]' : 'text-xs';

    return (
        <span
            className={`inline-flex items-center gap-1 px-3 py-1 rounded-full border font-semibold ${textSize} ${config.classes}`}
        >
            <span className="w-1.5 h-1.5 rounded-full bg-current inline-block" />
            {config.label}
        </span>
    );
};