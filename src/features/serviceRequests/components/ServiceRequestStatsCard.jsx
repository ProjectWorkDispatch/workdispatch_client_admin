export const ServiceRequestStatsCard = ({
    value,
    label,
    color,
    bg = "bg-white"
}) => {
    return (
        <article className={`${bg} rounded-2xl border border-gray-100 shadow-sm px-5 py-4`}>
            <h2 className={`text-2xl font-bold ${color}`}>
                {value}
            </h2>

            <p className="text-sm text-gray-500 mt-1">
                {label}
            </p>
        </article>
    );
};