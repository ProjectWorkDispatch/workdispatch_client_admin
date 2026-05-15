import deny from "../../../assets/icons/deny.svg";

export const ReviewModal = ({
    review,
    onClose,
    onDelete
}) => {
    return (
        <div className="fixed inset-0 z-100 flex items-center justify-center">
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                onClick={onClose}
            />

            <div className="relative bg-white w-full max-w-lg mx-4 rounded-2xl shadow-xl overflow-hidden">
                <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
                    <h2 className="text-lg font-bold text-[#0F172A]">
                        Detalle del Review
                    </h2>

                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 text-xl"
                    >
                        ×
                    </button>
                </div>

                <div className="p-6 space-y-5">
                    <div>
                        <p className="text-sm text-gray-400">
                            Reviewer
                        </p>

                        <p className="font-semibold text-[#0F172A]">
                            {review.reviewer}
                        </p>
                    </div>

                    <div>
                        <p className="text-sm text-gray-400">
                            Evaluado
                        </p>

                        <p className="font-semibold text-[#0F172A]">
                            {review.reviewered}
                        </p>
                    </div>

                    <div>
                        <p className="text-sm text-gray-400">
                            Servicio
                        </p>

                        <p className="font-semibold text-[#0F172A]">
                            {review.service}
                        </p>
                    </div>

                    <div>
                        <p className="text-sm text-gray-400">
                            Rating
                        </p>

                        <div className="text-yellow-500 text-lg">
                            {"★".repeat(review.rating)}
                            {"☆".repeat(5 - review.rating)}
                        </div>
                    </div>

                    <div>
                        <p className="text-sm text-gray-400 mb-2">
                            Comentario
                        </p>

                        <div className="bg-gray-50 rounded-2xl p-4 text-gray-600 text-sm leading-relaxed">
                            {review.comment}
                        </div>
                    </div>

                    <div>
                        <p className="text-sm text-gray-400">
                            Fecha
                        </p>

                        <p className="font-semibold text-[#0F172A]">
                            {review.createdAt}
                        </p>
                    </div>

                    <div>
                        <StatusBadge value={review.status} />
                    </div>

                    {review.status ? (
                        <button
                            onClick={() => onDelete(review._id)}
                            className="w-full py-3 rounded-xl border border-red-300 text-red-500 font-semibold hover:bg-red-50 transition flex items-center justify-center gap-2"
                        >
                            <img src={deny} alt="Eliminar" className="w-4 h-4" />
                            Eliminar review
                        </button>
                    ) : (
                        <button
                            onClick={onClose}
                            className="w-full py-3 rounded-xl bg-[#0F172A] text-white font-semibold hover:bg-slate-800 transition"
                        >
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