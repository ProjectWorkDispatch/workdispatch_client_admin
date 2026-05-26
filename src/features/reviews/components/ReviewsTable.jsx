import EyeB from "../../../assets/icons/EyeB.svg";
import deny from "../../../assets/icons/deny.svg";

export const ReviewsTable = ({
    reviews,
    onView,
    onDelete
}) => {
    return (
        <div>
            {/* ── Tabla desktop ── */}
            <div className="hidden lg:block overflow-x-auto">
                <table className="w-full min-w-225 text-sm">
                    <thead className="bg-gray-50 text-gray-500 uppercase text-[11px] tracking-wider">
                        <tr>
                            <th className="text-left font-semibold px-5 py-4">Reviewer</th>
                            <th className="text-left font-semibold px-5 py-4">Evaluado</th>
                            <th className="text-left font-semibold px-5 py-4">Servicio</th>
                            <th className="text-left font-semibold px-5 py-4">Rating</th>
                            <th className="text-left font-semibold px-5 py-4">Comentario</th>
                            <th className="text-left font-semibold px-5 py-4">Estado</th>
                            <th className="text-left font-semibold px-5 py-4">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reviews.map((review) => (
                            <tr key={review._id} className="border-t border-gray-100 hover:bg-gray-50 transition">
                                <td className="px-5 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-9 h-9 rounded-full ${review.color} text-white flex items-center justify-center text-xs font-bold shrink-0`}>
                                            {review.initials}
                                        </div>
                                        <p className="font-semibold text-[#0F172A] truncate">{review.reviewer}</p>
                                    </div>
                                </td>
                                <td className="px-5 py-4 text-[#0F172A]">{review.reviewered}</td>
                                <td className="px-5 py-4 text-gray-500">{review.service}</td>
                                <td className="px-5 py-4"><RatingStars rating={review.rating} /></td>
                                <td className="px-5 py-4 text-gray-500 max-w-62.5 truncate">{review.comment}</td>
                                <td className="px-5 py-4"><StatusBadge value={review.status} /></td>
                                <td className="px-5 py-4">
                                    <div className="flex items-center gap-2">
                                        <button onClick={() => onView(review)} className="w-8 h-8 rounded-full bg-blue-50 hover:bg-blue-100 flex items-center justify-center transition"><img src={EyeB} className="w-4 h-4" /></button>
                                        {review.status && (
                                            <button onClick={() => onDelete(review._id)} className="w-8 h-8 rounded-full bg-red-50 hover:bg-red-100 flex items-center justify-center transition"><img src={deny} className="w-4 h-4" /></button>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* ── Vista de CARDS Mobile ── */}
            <div className="lg:hidden flex flex-col gap-4 p-4 bg-gray-50/50">
                {reviews.length === 0 ? (
                    <p className="px-5 py-10 text-center text-sm text-gray-400 font-medium">No hay reseñas registradas.</p>
                ) : (
                    reviews.map((review) => (
                        <div key={review._id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                            {/* Header: Reviewer, Rating y Estado */}
                            <div className="p-4 bg-white flex items-start justify-between border-b border-gray-50">
                                <div className="flex items-center gap-3">
                                    <div className={`w-10 h-10 rounded-full ${review.color} text-white flex items-center justify-center text-sm font-bold shadow-sm`}>
                                        {review.initials}
                                    </div>
                                    <div>
                                        <p className="font-bold text-sm text-[#0F172A] leading-tight">{review.reviewer}</p>
                                        <RatingStars rating={review.rating} />
                                    </div>
                                </div>
                                <StatusBadge value={review.status} />
                            </div>

                            {/* Contenido: Comentario y Participantes */}
                            <div className="p-4 space-y-4">
                                {/* Globo de Comentario */}
                                <div className="bg-gray-50 rounded-xl p-3 relative italic text-gray-600 text-xs leading-relaxed">
                                    <span className="text-gray-300 text-2xl absolute -top-1 left-1 leading-none font-serif">“</span>
                                    <p className="px-2">{review.comment || "Sin comentario."}</p>
                                </div>

                                {/* Info del Servicio y Evaluado */}
                                <div className="grid grid-cols-2 gap-4 pt-1">
                                    <div className="border-r border-gray-100 pr-2">
                                        <p className="text-[10px] text-gray-400 uppercase font-bold tracking-tight mb-0.5">Evaluado</p>
                                        <p className="text-xs font-semibold text-[#0F172A] truncate">{review.reviewered}</p>
                                    </div>
                                    <div className="pl-2">
                                        <p className="text-[10px] text-gray-400 uppercase font-bold tracking-tight mb-0.5">Servicio</p>
                                        <p className="text-xs font-medium text-gray-500 truncate">{review.service}</p>
                                    </div>
                                </div>

                                {/* Botones de Acción */}
                                <div className="flex gap-2 pt-2">
                                    <button 
                                        onClick={() => onView(review)}
                                        className="flex-1 py-3 bg-gray-50 hover:bg-gray-100 text-[#0F172A] rounded-xl flex items-center justify-center gap-2 transition-colors border border-gray-100 font-bold text-xs"
                                    >
                                        <img src={EyeB} className="w-4 h-4 opacity-70" />
                                        DETALLES
                                    </button>
                                    
                                    {review.status && (
                                        <button 
                                            onClick={() => onDelete(review._id)}
                                            className="w-12 py-3 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl flex items-center justify-center transition-colors border border-red-100"
                                            title="Eliminar review"
                                        >
                                            <img src={deny} className="w-4 h-4" />
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

const RatingStars = ({ rating }) => {
    return (
        <div className="flex items-center gap-0.5 text-yellow-500 text-xs">
            {"★".repeat(rating)}
            <span className="text-gray-200">{"★".repeat(5 - rating)}</span>
        </div>
    );
};

const StatusBadge = ({ value }) => {
    const base = "px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border";
    if (value) {
        return <span className={`${base} bg-green-50 border-green-100 text-green-600`}>● Activa</span>;
    }
    return <span className={`${base} bg-red-50 border-red-100 text-red-600`}>● Eliminada</span>;
};