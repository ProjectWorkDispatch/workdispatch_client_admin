export const WorkerPortfolioModal = ({
    open,
    onClose,
    portfolio
}) => {
    if (!open || !portfolio) return null;

    return (
        <div className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm p-4 overflow-y-auto">
            <div className="min-h-full flex items-center justify-center">
                <div className="w-full max-w-3xl bg-white rounded-3xl overflow-hidden shadow-2xl">
                    <div className="relative">
                        <img
                            src={portfolio.imageUrl}
                            alt="Portfolio"
                            className="w-full h-72 object-cover"
                        />

                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 text-white"
                        >
                            ✕
                        </button>
                    </div>

                    <div className="p-6 space-y-6">
                        <div>
                            <h2 className="text-2xl font-bold text-[#0F172A]">
                                {
                                    portfolio.workerId
                                        ?.firstName
                                }{" "}
                                {
                                    portfolio.workerId
                                        ?.lastName
                                }
                            </h2>

                            <p className="text-sm text-gray-400 mt-1">
                                {
                                    portfolio.workerId
                                        ?.email
                                }
                            </p>
                        </div>

                        <div>
                            <h3 className="text-lg font-bold text-[#0F172A] mb-3">
                                Descripción
                            </h3>

                            <p className="text-gray-600 leading-relaxed">
                                {portfolio.description}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <InfoCard
                                title="Estado"
                                value={portfolio.status}
                            />

                            <InfoCard
                                title="Fecha"
                                value={new Date(
                                    portfolio.createdAt
                                ).toLocaleDateString()}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const InfoCard = ({ title, value }) => {
    return (
        <div className="bg-gray-50 rounded-2xl border border-gray-100 p-5">
            <p className="text-xs uppercase tracking-wide text-gray-400 font-semibold">
                {title}
            </p>

            <h4 className="text-lg font-bold text-[#0F172A] mt-2">
                {value}
            </h4>
        </div>
    );
};