// src/features/workerPortafolio/components/WorkerPortfolioBadges.jsx
export const StatusBadge = ({ value }) => {
    if (value === 'ACTIVE') {
        return (
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-green-100 text-green-600 text-xs font-semibold">
                Activo
            </span>
        );
    }
    return (
        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-red-100 text-red-500 text-xs font-semibold">
            Inactivo
        </span>
    );
};

export const RoleBadge = ({ value }) => {
    if (value === 'WORKER') {
        return (
            <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-600 text-xs font-semibold">
                Trabajador
            </span>
        );
    }
    return (
        <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-600 text-xs font-semibold">
            Cliente
        </span>
    );
};