// src/features/workerPortafolio/components/WorkerPortfolioGrid.jsx
import { StatusBadge, RoleBadge } from './WorkerPortfolioBadges.jsx';
import EyeB from '../../../assets/icons/EyeB.svg';
import deny from '../../../assets/icons/deny.svg';
import check from '../../../assets/icons/check.svg';

const getAvatar = (firstName = '', lastName = '') => {
    const initials = `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
    const colors = [
        'bg-orange-500', 'bg-teal-500', 'bg-pink-500',
        'bg-blue-500', 'bg-purple-500', 'bg-green-600'
    ];
    const index = (firstName.charCodeAt(0) + lastName.charCodeAt(0)) % colors.length;
    return { initials, color: colors[index] };
};

const PortfolioCard = ({ portfolio, onView, onModerate }) => {
    const firstName = portfolio.workerId?.firstName || '';
    const lastName  = portfolio.workerId?.lastName  || '';
    const { initials, color } = getAvatar(firstName, lastName);
    const isActive = portfolio.status === 'ACTIVE';

    return (
        <article className={`bg-white rounded-2xl border shadow-sm overflow-hidden flex flex-col transition ${
            isActive ? 'border-gray-100' : 'border-red-100 opacity-75'
        }`}>
            {/* Imagen del trabajo */}
            <div className="relative w-full h-44 bg-gray-100 overflow-hidden">
                {portfolio.imageUrl ? (
                    <img
                        src={portfolio.imageUrl}
                        alt="Trabajo"
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-300 text-sm">
                        Sin imagen
                    </div>
                )}

                {/* Badge de estado sobre la imagen */}
                <div className="absolute top-3 right-3">
                    <StatusBadge value={portfolio.status} />
                </div>
            </div>

            {/* Contenido */}
            <div className="p-4 flex flex-col gap-3 flex-1">
                {/* Worker */}
                <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-full ${color} text-white flex items-center justify-center text-xs font-bold shrink-0`}>
                        {initials}
                    </div>
                    <div className="min-w-0">
                        <p className="font-semibold text-[#0F172A] text-sm truncate">
                            {firstName} {lastName}
                        </p>
                        <p className="text-xs text-gray-400 truncate">
                            {portfolio.workerId?.email}
                        </p>
                    </div>
                    <div className="ml-auto shrink-0">
                        <RoleBadge value={portfolio.workerId?.role} />
                    </div>
                </div>

                {/* Descripción */}
                <p className="text-sm text-gray-500 line-clamp-2 flex-1">
                    {portfolio.description || 'Sin descripción'}
                </p>

                {/* Fecha */}
                <p className="text-xs text-gray-300">
                    {portfolio.createdAt
                        ? new Date(portfolio.createdAt).toLocaleDateString('es-GT', {
                            day: '2-digit', month: 'short', year: 'numeric'
                        })
                        : '—'}
                </p>

                {/* Acciones */}
                <div className="flex items-center gap-2 pt-1 border-t border-gray-100">
                    <button
                        onClick={() => onView(portfolio)}
                        className="flex-1 flex items-center justify-center gap-1 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-600 text-xs font-semibold transition"
                    >
                        <img src={EyeB} alt="Ver" className="w-4 h-4" />
                        Ver detalle
                    </button>

                    <button
                        onClick={() => onModerate(portfolio)}
                        className={`flex-1 flex items-center justify-center gap-1 py-2 rounded-xl text-xs font-semibold transition ${
                            isActive
                                ? 'bg-red-50 hover:bg-red-100 text-red-500'
                                : 'bg-green-50 hover:bg-green-100 text-green-600'
                        }`}
                    >
                        <img
                            src={isActive ? deny : check}
                            alt={isActive ? 'Desactivar' : 'Reactivar'}
                            className="w-4 h-4"
                        />
                        {isActive ? 'Desactivar' : 'Reactivar'}
                    </button>
                </div>
            </div>
        </article>
    );
};

export const WorkerPortfolioGrid = ({
    portfolios,
    totalPortfolios,
    onView,
    onModerate
}) => {
    if (portfolios.length === 0) {
        return (
            <div className="px-5 py-16 text-center text-gray-400 text-sm">
                No se encontraron registros de portafolio.
            </div>
        );
    }

    return (
        <div className="p-5 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {portfolios.map((portfolio) => (
                    <PortfolioCard
                        key={portfolio._id}
                        portfolio={portfolio}
                        onView={onView}
                        onModerate={onModerate}
                    />
                ))}
            </div>

            <p className="text-xs text-gray-400 text-right pt-2 border-t border-gray-100">
                Mostrando {portfolios.length} de {totalPortfolios} registros
            </p>
        </div>
    );
};