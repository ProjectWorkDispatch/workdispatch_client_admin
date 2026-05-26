import deny from "../../../assets/icons/deny.svg";

export const ReviewModal = ({
    review,
    onClose,
    onDelete
}) => {
    return (
        <div className="fixed inset-0 z-100 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />

            <div className="relative bg-white w-full max-w-lg mx-4 rounded-2xl shadow-xl overflow-hidden">

                {/* HEADER */}
                <div className="relative bg-linear-to-r from-[#0F172A] to-[#1E293B] px-6 py-6">
                    <button
                        onClick={onClose}
                        className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white text-sm transition"
                    >
                        ✕
                    </button>
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-2xl bg-yellow-500/20 border border-yellow-400/30 flex items-center justify-center text-2xl">
                            ⭐
                        </div>
                        <div className="text-white">
                            <h2 className="text-xl font-bold">Detalle del Review</h2>
                            <div className="text-yellow-400 text-lg mt-1">
                                {"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}
                            </div>
                            <div className="mt-1">
                                <StatusBadge value={review.status} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* BODY */}
                <div className="p-6 space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-1">Reviewer</p>
                            <p className="font-semibold text-[#0F172A] text-sm">{review.reviewer}</p>
                        </div>
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-1">Evaluado</p>
                            <p className="font-semibold text-[#0F172A] text-sm">{review.reviewered}</p>
                        </div>
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-1">Servicio</p>
                            <p className="font-semibold text-[#0F172A] text-sm">{review.service}</p>
                        </div>
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-1">Fecha</p>
                            <p className="font-semibold text-[#0F172A] text-sm">{review.createdAt}</p>
                        </div>
                    </div>

                    <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-2">Comentario</p>
                        <div className="bg-gray-50 rounded-2xl p-4 text-gray-600 text-sm leading-relaxed">
                            {review.comment}
                        </div>
                    </div>
                </div>

                {/* FOOTER */}
                <div className="px-6 pb-6 border-t border-gray-100 pt-4">
                    {review.status ? (
                        <button
                            onClick={() => onDelete(review._id)}
                            className="w-full py-3 rounded-xl border border-red-300 text-red-500 font-semibold hover:bg-red-50 transition flex items-center justify-center gap-2"
                        >
                            <img src={deny} alt="" className="w-4 h-4" />
                            Eliminar review
                        </button>
                    ) : (
                        <button onClick={onClose} className="w-full py-3 rounded-xl bg-[#0F172A] text-white font-semibold hover:bg-slate-800 transition">
                            Cerrar
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

const StatusBadge = ({ value }) => {
    if (value) {
        return (
            <span className="px-3 py-1 rounded-full bg-green-100 text-green-600 text-xs font-semibold">
                Activa
            </span>
        );
    }

    return (
        <span className="px-3 py-1 rounded-full bg-red-100 text-red-600 text-xs font-semibold">
            Eliminada
        </span>
    );
};