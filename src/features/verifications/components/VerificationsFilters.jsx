// src/features/verifications/components/VerificationsFilters.jsx
const FilterButton = ({ text, current, setFilter }) => {
    const active = current === text;
    return (
        <button
            onClick={() => setFilter(text)}
            className={`px-3 py-1 rounded-full text-xs font-semibold transition ${
                active
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
        >
            {text}
        </button>
    );
};

export const VerificationsFilters = ({
    search,
    onSearchChange,
    statusFilter,
    onStatusFilterChange,
    urgencyFilter,
    onUrgencyFilterChange,
    filteredCount
}) => {
    return (
        <div className="p-5 border-b border-gray-100">
            <input
                type="text"
                value={search}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Buscar por nombre, correo o número de documento..."
                className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none text-sm text-gray-600 placeholder:text-gray-400 focus:border-green-400 focus:ring-2 focus:ring-green-100"
            />

            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mt-4">
                <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs text-gray-400">Estado:</span>

                    {['Todos', 'PENDING', 'APPROVED', 'REJECTED'].map((s) => (
                        <FilterButton
                            key={s}
                            text={s}
                            current={statusFilter}
                            setFilter={onStatusFilterChange}
                        />
                    ))}

                    <span className="text-xs text-gray-400 ml-2">Urgencia:</span>

                    {['Todas', 'Alta', 'Media', 'Baja'].map((u) => (
                        <FilterButton
                            key={u}
                            text={u}
                            current={urgencyFilter}
                            setFilter={onUrgencyFilterChange}
                        />
                    ))}
                </div>

                <p className="text-xs text-gray-400">
                    {filteredCount} solicitudes
                </p>
            </div>
        </div>
    );
};