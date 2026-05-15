import { useState } from "react";

import { ReviewsTable } from "./ReviewsTable";
import { ReviewModal } from "./ReviewModal";
import { ReviewStatsCard } from "./ReviewStatsCard";

const initialReviews = [
    {
        _id: "1",
        reviewer: "Juan Pérez",
        reviewered: "Carlos Méndez",
        service: "Electricista",
        rating: 5,
        comment: "Excelente servicio, muy profesional y puntual.",
        status: true,
        createdAt: "23 mar, 03:00 a. m.",
        initials: "JP",
        color: "bg-orange-500"
    },
    {
        _id: "2",
        reviewer: "María López",
        reviewered: "Andrea Ruiz",
        service: "Diseño gráfico",
        rating: 2,
        comment: "Lenguaje ofensivo durante el trabajo.",
        status: false,
        createdAt: "22 mar, 11:00 p. m.",
        initials: "ML",
        color: "bg-pink-500"
    },
    {
        _id: "3",
        reviewer: "Pedro Ramírez",
        reviewered: "Luis Gómez",
        service: "Programación",
        rating: 4,
        comment: "Muy buen trabajo y buena comunicación.",
        status: true,
        createdAt: "21 mar, 08:00 p. m.",
        initials: "PR",
        color: "bg-teal-500"
    }
];

export const ReviewsHome = () => {
    const [reviews, setReviews] = useState(initialReviews);

    const [search, setSearch] = useState("");

    const [statusFilter, setStatusFilter] = useState("Todas");

    const [selectedReview, setSelectedReview] = useState(null);

    const handleDelete = (id) => {
        setReviews((prev) =>
            prev.map((review) =>
                review._id === id
                    ? {
                        ...review,
                        status: false
                    }
                    : review
            )
        );

        if (selectedReview?._id === id) {
            setSelectedReview((prev) => ({
                ...prev,
                status: false
            }));
        }
    };

    const filteredReviews = reviews.filter((review) => {
        const text = search.toLowerCase();

        const matchSearch =
            review.reviewer.toLowerCase().includes(text) ||
            review.reviewered.toLowerCase().includes(text) ||
            review.service.toLowerCase().includes(text) ||
            review.comment.toLowerCase().includes(text);

        let matchStatus = true;

        if (statusFilter === "Activas") {
            matchStatus = review.status === true;
        }

        if (statusFilter === "Eliminadas") {
            matchStatus = review.status === false;
        }

        return matchSearch && matchStatus;
    });

    const totalReviews = reviews.length;

    const activeReviews = reviews.filter(
        (review) => review.status === true
    ).length;

    const deletedReviews = reviews.filter(
        (review) => review.status === false
    ).length;

    const averageRating =
        (
            reviews.reduce((acc, item) => acc + item.rating, 0) /
            reviews.length
        ).toFixed(1);

    return (
        <section className="space-y-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-[#0F172A]">
                        Reviews
                    </h1>

                    <p className="text-sm text-gray-500">
                        Moderación y gestión de reseñas
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                <ReviewStatsCard
                    value={totalReviews}
                    label="Total reviews"
                    color="text-[#0F172A]"
                />

                <ReviewStatsCard
                    value={activeReviews}
                    label="Activas"
                    color="text-green-500"
                />

                <ReviewStatsCard
                    value={deletedReviews}
                    label="Eliminadas"
                    color="text-red-500"
                />

                <ReviewStatsCard
                    value={`⭐ ${averageRating}`}
                    label="Promedio rating"
                    color="text-yellow-500"
                />
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
                            <FilterButton
                                text="Todas"
                                current={statusFilter}
                                setFilter={setStatusFilter}
                            />

                            <FilterButton
                                text="Activas"
                                current={statusFilter}
                                setFilter={setStatusFilter}
                            />

                            <FilterButton
                                text="Eliminadas"
                                current={statusFilter}
                                setFilter={setStatusFilter}
                            />
                        </div>

                        <p className="text-xs text-gray-400">
                            {filteredReviews.length} reviews
                        </p>
                    </div>
                </div>

                <ReviewsTable
                    reviews={filteredReviews}
                    onView={setSelectedReview}
                    onDelete={handleDelete}
                />
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
            className={`px-3 py-1 rounded-full text-xs font-semibold transition ${active
                ? "bg-green-500 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
        >
            {text}
        </button>
    );
};