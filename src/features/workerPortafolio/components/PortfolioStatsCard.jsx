export const PortfolioStatsCard = ({
    value,
    label,
    color
}) => {
    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-5 py-4">
            <h2 className={`text-2xl font-bold ${color}`}>
                {value}
            </h2>

            <p className="text-xs text-gray-400 mt-1">
                {label}
            </p>
        </div>
    );
};