// src/features/workerPortafolio/components/WorkerPortfolioHeader.jsx
export const WorkerPortfolioHeader = ({ totalCount, inactiveCount }) => {
    return (
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div>
                <h1 className="text-2xl font-bold text-[#0F172A]">
                    Portafolios de Trabajadores
                </h1>
                <p className="text-sm text-gray-500">
                    Moderación de registros de trabajos publicados
                </p>
            </div>

            {inactiveCount > 0 && (
                <div className="w-fit px-4 py-2 rounded-full bg-red-50 border border-red-200 text-red-500 text-sm font-medium flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-400 inline-block" />
                    <span>{inactiveCount} registros desactivados</span>
                </div>
            )}
        </div>
    );
};