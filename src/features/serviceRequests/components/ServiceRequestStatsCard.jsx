// src/features/serviceRequests/components/ServiceRequestStatsCard.jsx

export const ServiceRequestStatsCard = ({
    value,
    label,
    color   = 'text-[#0F172A]',
    bg      = 'bg-white',
    icon    = null,
}) => {
    return (
        <article
            className={`${bg} rounded-2xl border border-gray-100 shadow-sm px-5 py-4 flex items-center gap-4`}
        >
            {icon && (
                <div className="w-10 h-10 rounded-xl bg-white/60 flex items-center justify-center shrink-0">
                    {icon}
                </div>
            )}
            <div>
                <h2 className={`text-2xl font-bold ${color}`}>{value}</h2>
                <p className="text-sm text-gray-500 mt-0.5">{label}</p>
            </div>
        </article>
    );
};