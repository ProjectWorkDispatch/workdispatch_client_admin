import EyeB from "../../../assets/icons/EyeB.svg";
import deny from "../../../assets/icons/deny.svg";

export const ReviewsTable = ({
    reviews,
    onView,
    onDelete
}) => {
    return (
        <div className="overflow-x-auto">
            <table className="w-full min-w-225 text-sm">
                <thead className="bg-gray-50 text-gray-500">
                    <tr>
                        <th className="text-left font-medium px-5 py-4">
                            Reviewer
                        </th>

                        <th className="text-left font-medium px-5 py-4">
                            Evaluado
                        </th>

                        <th className="text-left font-medium px-5 py-4">
                            Servicio
                        </th>

                        <th className="text-left font-medium px-5 py-4">
                            Rating
                        </th>

                        <th className="text-left font-medium px-5 py-4">
                            Comentario
                        </th>

                        <th className="text-left font-medium px-5 py-4">
                            Estado
                        </th>

                        <th className="text-left font-medium px-5 py-4">
                            Acciones
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {reviews.map((review) => (
                        <tr
                            key={review._id}
                            className="border-t border-gray-100 hover:bg-gray-50 transition"
                        >
                            <td className="px-5 py-4">
                                <div className="flex items-center gap-3">
                                    <div
                                        className={`w-9 h-9 rounded-full ${review.color} text-white flex items-center justify-center text-xs font-bold`}
                                    >
                                        {review.initials}
                                    </div>

                                    <div>
                                        <p className="font-semibold text-[#0F172A]">
                                            {review.reviewer}
                                        </p>
                                    </div>
                                </div>
                            </td>

                            <td className="px-5 py-4 text-[#0F172A]">
                                {review.reviewered}
                            </td>

                            <td className="px-5 py-4 text-gray-500">
                                {review.service}
                            </td>

                            <td className="px-5 py-4">
                                <RatingStars rating={review.rating} />
                            </td>

                            <td className="px-5 py-4 text-gray-500 max-w-35 md:max-w-62.5 truncate">
                                {review.comment}
                            </td>

                            <td className="px-5 py-4">
                                <StatusBadge value={review.status} />
                            </td>

                            <td className="px-5 py-4">
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => onView(review)}
                                        className="w-8 h-8 rounded-full bg-blue-50 hover:bg-blue-100 flex items-center justify-center"
                                    >
                                        <img src={EyeB} alt="Ver" className="w-4 h-4" />
                                    </button>

                                    {review.status && (
                                        <button
                                            onClick={() => onDelete(review._id)}
                                            className="w-8 h-8 rounded-full bg-red-50 hover:bg-red-100 flex items-center justify-center"
                                        >
                                            <img src={deny} alt="Eliminar" className="w-4 h-4" />
                                        </button>
                                    )}
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

const RatingStars = ({ rating }) => {
    return (
        <div className="flex items-center gap-1 text-yellow-500">
            {"★".repeat(rating)}
            {"☆".repeat(5 - rating)}
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