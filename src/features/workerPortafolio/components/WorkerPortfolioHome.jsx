// src/features/workerPortafolio/components/WorkerPortfolioHome.jsx
import { useState, useEffect } from 'react';
import { useWorkerPortfolioStore } from '../../users/Store/adminStore.js';
import { useWorkerPortfolioActions } from '../hooks/useWorkerPortfolioActions.js';
import { WorkerPortfolioHeader } from './WorkerPortfolioHeader.jsx';
import { WorkerPortfolioStatsCard } from './WorkerPortfolioStatsCard.jsx';
import { WorkerPortfolioFilters } from './WorkerPortfolioFilters.jsx';
import { WorkerPortfolioGrid } from './WorkerPortfolioGrid.jsx';
import { WorkerPortfolioModal } from './WorkerPortfolioModal.jsx';

export const WorkerPortfolioHome = () => {
    // ── Store ────────────────────────────────────────────────────
    const portfolios = useWorkerPortfolioStore((state) => state.portfolios);
    const loading = useWorkerPortfolioStore((state) => state.loading);
    const error = useWorkerPortfolioStore((state) => state.error);

    // ── Acciones ─────────────────────────────────────────────────
    const { handleFetch, handleModerate, handleUpdateImage, handleClearError } =
        useWorkerPortfolioActions();

    // ── Estado local de UI ───────────────────────────────────────
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('Todos');
    const [selectedPortfolio, setSelectedPortfolio] = useState(null);

    // ── Carga inicial ─────────────────────────────────────────────
    useEffect(() => {
        handleFetch();
    }, []);

    // ── Filtrado cliente ──────────────────────────────────────────
    const filteredPortfolios = portfolios.filter((p) => {
        const text = search.toLowerCase();
        const fullName = `${p.workerId?.firstName || ''} ${p.workerId?.lastName || ''}`.toLowerCase();

        const matchSearch =
            fullName.includes(text) ||
            p.description?.toLowerCase().includes(text) ||
            p.workerId?.email?.toLowerCase().includes(text);

        const matchStatus = statusFilter === 'Todos' || p.status === statusFilter;

        return matchSearch && matchStatus;
    });

    // ── Estadísticas ──────────────────────────────────────────────
    const totalPortfolios = portfolios.length;
    const activePortfolios = portfolios.filter((p) => p.status === 'ACTIVE').length;
    const inactivePortfolios = portfolios.filter((p) => p.status === 'INACTIVE').length;

    // ── Handlers ──────────────────────────────────────────────────
    const onModerate = (portfolio) => {
        handleModerate(portfolio, (updated) => {
            if (selectedPortfolio?._id === portfolio._id) {
                setSelectedPortfolio((prev) => ({ ...prev, ...updated }));
            }
        });
    };

    const onUpdateImage = (portfolioId, imageFile) => {
        handleUpdateImage(portfolioId, imageFile, (newImageUrl) => {
            if (selectedPortfolio?._id === portfolioId) {
                setSelectedPortfolio((prev) => ({ ...prev, imageUrl: newImageUrl }));
            }
        });
    };

    return (
        <section className="space-y-6">
            <WorkerPortfolioHeader
                totalCount={totalPortfolios}
                inactiveCount={inactivePortfolios}
            />

            {/* Estadísticas */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <WorkerPortfolioStatsCard
                    value={totalPortfolios}
                    label="Total registros"
                    color="text-[#0F172A]"
                />
                <WorkerPortfolioStatsCard
                    value={activePortfolios}
                    label="Activos"
                    color="text-green-500"
                />
                <WorkerPortfolioStatsCard
                    value={inactivePortfolios}
                    label="Desactivados"
                    color="text-red-500"
                />
            </div>

            {/* Error global */}
            {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl flex items-center justify-between">
                    <span>{error}</span>
                    <button
                        onClick={handleClearError}
                        className="ml-4 text-red-400 hover:text-red-600 font-bold"
                    >
                        ×
                    </button>
                </div>
            )}

            {/* Grid con filtros */}
            <article className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <WorkerPortfolioFilters
                    search={search}
                    onSearchChange={setSearch}
                    statusFilter={statusFilter}
                    onStatusFilterChange={setStatusFilter}
                    filteredCount={filteredPortfolios.length}
                />

                {loading ? (
                    <div className="px-5 py-16 text-center text-gray-400 text-sm">
                        Cargando portafolios...
                    </div>
                ) : (
                    <WorkerPortfolioGrid
                        portfolios={filteredPortfolios}
                        totalPortfolios={totalPortfolios}
                        onView={setSelectedPortfolio}
                        onModerate={onModerate}
                    />
                )}
            </article>

            {/* Modal de detalle */}
            {selectedPortfolio && (
                <WorkerPortfolioModal
                    portfolio={selectedPortfolio}
                    onClose={() => setSelectedPortfolio(null)}
                    onModerate={onModerate}
                    onUpdateImage={onUpdateImage}
                />
            )}
        </section>
    );
};