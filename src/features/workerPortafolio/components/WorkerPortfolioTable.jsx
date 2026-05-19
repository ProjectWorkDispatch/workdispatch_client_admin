// src/features/workerPortafolio/components/WorkerPortfolioTable.jsx
import { StatusBadge } from './WorkerPortfolioBadges.jsx';

import PersonD from '../../../assets/icons/PersonD.svg';
import check   from '../../../assets/icons/check.svg';
import view    from '../../../assets/icons/view.svg';

export const WorkerPortfolioTable = ({
    portfolios,
    totalPortfolios,
    startIndex,
    endIndex,
    currentPage,
    totalPages,
    setCurrentPage,
    onView,
    onModerate
}) => {
    return (
        <div className="overflow-x-auto">
            <table className="w-full min-w-[700px] text-sm">
                <thead className="bg-gray-50 text-gray-500">
                    <tr>
                        <th className="text-left font-medium px-5 py-4">Imagen</th>
                        <th className="text-left font-medium px-5 py-4">Trabajador</th>
                        <th className="text-left font-medium px-5 py-4">Descripción</th>
                        <th className="text-left font-medium px-5 py-4">Estado</th>
                        <th className="text-left font-medium px-5 py-4">Registro</th>
                        <th className="text-left font-medium px-5 py-4">Acciones</th>
                    </tr>
                </thead>

                <tbody>
                    {portfolios.length === 0 ? (
                        <tr>
                            <td colSpan="6" className="px-5 py-10 text-center text-gray-400">
                                No se encontraron portafolios.
                            </td>
                        </tr>
                    ) : (
                        portfolios.map((portfolio) => (
                            <tr
                                key={portfolio._id}
                                className="border-t border-gray-100 hover:bg-gray-50 transition"
                            >
                                <td className="px-5 py-4">
                                    {portfolio.imageUrl ? (
                                        <img
                                            src={portfolio.imageUrl}
                                            alt="Portfolio"
                                            className="w-20 h-16 rounded-xl object-cover"
                                        />
                                    ) : (
                                        <div className="w-20 h-16 rounded-xl bg-gray-100 flex items-center justify-center text-gray-300 text-xs">
                                            Sin imagen
                                        </div>
                                    )}
                                </td>

                                <td className="px-5 py-4">
                                    <div className="min-w-0">
                                        <p className="font-semibold text-[#0F172A] truncate">
                                            {portfolio.workerId?.firstName}{' '}
                                            {portfolio.workerId?.lastName}
                                        </p>
                                        <p className="text-xs text-gray-400 truncate">
                                            {portfolio.workerId?.email}
                                        </p>
                                    </div>
                                </td>

                                <td className="px-5 py-4 max-w-xs">
                                    <p className="line-clamp-2 text-gray-600">
                                        {portfolio.description || '—'}
                                    </p>
                                </td>

                                <td className="px-5 py-4">
                                    <StatusBadge value={portfolio.status} />
                                </td>

                                <td className="px-5 py-4 text-gray-400">
                                    {portfolio.createdAt
                                        ? new Date(portfolio.createdAt).toLocaleDateString('es-GT', {
                                            day: '2-digit', month: 'short', year: 'numeric'
                                        })
                                        : '—'}
                                </td>

                                <td className="px-5 py-4">
                                    <div className="flex items-center gap-2 whitespace-nowrap">
                                        <button
                                            onClick={() => onView(portfolio)}
                                            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition"
                                            title="Ver portafolio"
                                        >
                                            <img src={view} alt="Ver" className="w-4 h-4" />
                                        </button>

                                        <button
                                            onClick={() => onModerate(portfolio)}
                                            className={`w-8 h-8 rounded-full flex items-center justify-center transition ${
                                                portfolio.status === 'ACTIVE'
                                                    ? 'bg-red-50 hover:bg-red-100'
                                                    : 'bg-green-50 hover:bg-green-100'
                                            }`}
                                            title={portfolio.status === 'ACTIVE' ? 'Desactivar' : 'Reactivar'}
                                        >
                                            <img
                                                src={portfolio.status === 'ACTIVE' ? PersonD : check}
                                                alt={portfolio.status === 'ACTIVE' ? 'Desactivar' : 'Reactivar'}
                                                className="w-4 h-4"
                                            />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>

            {/* Paginación */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 px-5 py-4 border-t border-gray-100">
                <p className="text-xs text-gray-400">
                    Mostrando{' '}
                    {totalPortfolios === 0 ? 0 : startIndex + 1}–{Math.min(endIndex, totalPortfolios)}{' '}
                    de {totalPortfolios} portafolios
                </p>

                <div className="flex items-center gap-2 flex-wrap">
                    <button
                        onClick={() => setCurrentPage(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="w-8 h-8 rounded-lg text-gray-400 hover:bg-gray-100 disabled:opacity-30"
                    >
                        ‹
                    </button>

                    {Array.from({ length: totalPages }, (_, index) => (
                        <button
                            key={index + 1}
                            onClick={() => setCurrentPage(index + 1)}
                            className={`w-8 h-8 rounded-lg text-sm font-semibold ${
                                currentPage === index + 1
                                    ? 'bg-green-500 text-white'
                                    : 'text-gray-500 hover:bg-gray-100'
                            }`}
                        >
                            {index + 1}
                        </button>
                    ))}

                    <button
                        onClick={() => setCurrentPage(currentPage + 1)}
                        disabled={currentPage === totalPages || totalPages === 0}
                        className="w-8 h-8 rounded-lg text-gray-400 hover:bg-gray-100 disabled:opacity-30"
                    >
                        ›
                    </button>
                </div>
            </div>
        </div>
    );
};