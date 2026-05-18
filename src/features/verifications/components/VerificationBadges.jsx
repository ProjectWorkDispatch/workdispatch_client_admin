// src/features/verifications/components/VerificationBadges.jsx
import check from '../../../assets/icons/check.svg';
import deny from '../../../assets/icons/deny.svg';
import pending from '../../../assets/icons/pending.svg';

export const RoleBadge = ({ value }) => {
    if (value === 'CLIENT') {
        return (
            <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-600 text-xs font-semibold">
                Cliente
            </span>
        );
    }
    return (
        <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-600 text-xs font-semibold">
            Trabajador
        </span>
    );
};

export const UrgencyBadge = ({ value }) => {
    if (value === 'Alta') {
        return (
            <span className="px-3 py-1 rounded-full bg-red-100 text-red-600 text-xs font-semibold">
                Alta
            </span>
        );
    }
    if (value === 'Media') {
        return (
            <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-600 text-xs font-semibold">
                Media
            </span>
        );
    }
    return (
        <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-500 text-xs font-semibold">
            Baja
        </span>
    );
};

export const StatusBadge = ({ value }) => {
    if (value === 'APPROVED') {
        return (
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-green-100 text-green-600 text-xs font-semibold">
                <img src={check} alt="Aprobado" className="w-3.5 h-3.5" />
                Aprobado
            </span>
        );
    }
    if (value === 'REJECTED') {
        return (
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-red-100 text-red-600 text-xs font-semibold">
                <img src={deny} alt="Rechazado" className="w-3.5 h-3.5" />
                Rechazado
            </span>
        );
    }
    return (
        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-yellow-100 text-yellow-600 text-xs font-semibold">
            <img src={pending} alt="Pendiente" className="w-3.5 h-3.5" />
            Pendiente
        </span>
    );
};