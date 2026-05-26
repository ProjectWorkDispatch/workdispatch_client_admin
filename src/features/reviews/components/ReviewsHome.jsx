import { useEffect, useMemo, useState } from "react";
import { ReviewsTable } from "./ReviewsTable";
import { ReviewModal } from "./ReviewModal";
import { ReviewStatsCard } from "./ReviewStatsCard";
import { useReviewStore } from "../../users/Store/adminStore";
import toast from "react-hot-toast";

export const ReviewsHome = () => {
    const { reviews, loading, getReviews, deleteReview } = useReviewStore();
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("Todas");
    const [selectedReview, setSelectedReview] = useState(null);

    useEffect(() => {
        getReviews();
    }, []);

    // Normalizar campos del modelo real al formato que usan los componentes
    const normalizedReviews = useMemo(() => {
        return reviews.map((r) => {
            const firstName = r.reviewerId?.firstName ?? "";
            const lastName = r.reviewerId?.lastName ?? "";
            const colors = [
                "bg-orange-500", "bg-teal-500", "bg-pink-500",
                "bg-blue-500", "bg-purple-500", "bg-green-600",
            ];
            const colorIndex = ((firstName.charCodeAt(0) || 0) + (lastName.charCodeAt(0) || 0)) % colors.length;

            return {
                ...r,
                reviewer: `${firstName} ${lastName}`.trim() || "Sin nombre",
                reviewered: `${r.revieweredId?.firstName ?? ""} ${r.revieweredId?.lastName ?? ""}`.trim() || "Sin nombre",
                service: r.serviceId?.title ?? r.serviceId?._id ?? "—",
                rating: r.Rating ?? 0,
                comment: r.Comment ?? "",
                status: r.Status ?? true,
                createdDate: r.createdAt
                    ? new Date(r.createdAt).toLocaleDateString("es-GT", {
                        day: "2-digit", month: "short", year: "numeric",
                    })
                    : "—",
                initials: `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase() || "?",
                color: colors[colorIndex],
            };
        });
    }, [reviews]);

    const handleDelete = async (id) => {
        try {
            await deleteReview(id);
            toast.success("Review eliminada correctamente");
            if (selectedReview?._id === id) {
                setSelectedReview((prev) => ({ ...prev, Status: false, status: false }));
            }
        } catch {
            toast.error("Error al eliminar la review");
        }
    };

    const filteredReviews = normalizedReviews.filter((review) => {
        const text = search.toLowerCase();
        const matchSearch =
            review.reviewer.toLowerCase().includes(text) ||
            review.reviewered.toLowerCase().includes(text) ||
            review.service.toLowerCase().includes(text) ||
            review.comment.toLowerCase().includes(text);

        const matchStatus =
            statusFilter === "Todas" ? true :
                statusFilter === "Activas" ? review.status === true :
                    statusFilter === "Eliminadas" ? review.status === false : true;

        return matchSearch && matchStatus;
    });

    const totalReviews = normalizedReviews.length;
    const activeReviews = normalizedReviews.filter((r) => r.status === true).length;
    const deletedReviews = normalizedReviews.filter((r) => r.status === false).length;
    const averageRating = totalReviews > 0
        ? (normalizedReviews.reduce((acc, r) => acc + r.rating, 0) / totalReviews).toFixed(1)
        : "0.0";

    return (
        <section className="space-y-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-[#0F172A]">Reviews</h1>
                    <p className="text-sm text-gray-500">Moderación y gestión de reseñas</p>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                <ReviewStatsCard value={totalReviews} label="Total reviews" color="text-[#0F172A]" />
                <ReviewStatsCard value={activeReviews} label="Activas" color="text-green-500" />
                <ReviewStatsCard value={deletedReviews} label="Eliminadas" color="text-red-500" />
                <ReviewStatsCard value={`⭐ ${averageRating}`} label="Promedio rating" color="text-yellow-500" />
            </div>

            <article className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-5 border-b border-gray-100">
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Buscar reviews..."
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none text-sm text-gray-600 placeholder:text-gray-400 focus:border-green-400 focus:ring-2 focus:ring-green-100"
                    />

                    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between mt-4">
                        <div className="flex flex-wrap items-center gap-2">
                            <FilterButton text="Todas" current={statusFilter} setFilter={setStatusFilter} />
                            <FilterButton text="Activas" current={statusFilter} setFilter={setStatusFilter} />
                            <FilterButton text="Eliminadas" current={statusFilter} setFilter={setStatusFilter} />
                        </div>
                        <p className="text-xs text-gray-400">{filteredReviews.length} reviews</p>
                    </div>
                </div>

                {loading ? (
                    <p className="p-10 text-center italic text-gray-400">Cargando reviews...</p>
                ) : (
                    <ReviewsTable
                        reviews={filteredReviews}
                        onView={setSelectedReview}
                        onDelete={handleDelete}
                    />
                )}
            </article>

            {selectedReview && (
                <ReviewModal
                    review={selectedReview}
                    onClose={() => setSelectedReview(null)}
                    onDelete={handleDelete}
                />
            )}
        </section>
    );
};

const FilterButton = ({ text, current, setFilter }) => {
    const active = current === text;
    return (
        <button
            onClick={() => setFilter(text)}
            className={`px-3 py-1 rounded-full text-xs font-semibold transition ${active ? "bg-green-500 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
        >
            {text}
        </button>
    );
};