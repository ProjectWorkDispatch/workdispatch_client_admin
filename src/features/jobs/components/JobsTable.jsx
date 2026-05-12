import view from "../../../assets/icons/view.svg";
import JobIconG from "../../../assets/icons/JobIconG.svg";
import date from "../../../assets/icons/date.svg";

export const JobsTable = ({
    jobs,
    totalJobs,
    startIndex,
    endIndex,
    currentPage,
    totalPages,
    setCurrentPage,
    onViewJob
}) => {
    return (
        <div className="overflow-x-auto">
            <table className="w-full min-w-300 text-sm">
                <thead className="bg-gray-50 text-gray-400 uppercase text-xs">
                    <tr>
                        <th className="text-left font-semibold px-5 py-4">ID</th>
                        <th className="text-left font-semibold px-5 py-4">Título del trabajo</th>
                        <th className="text-left font-semibold px-5 py-4">Cliente</th>
                        <th className="text-left font-semibold px-5 py-4">Trabajador asignado</th>
                        <th className="text-left font-semibold px-5 py-4">Categoría</th>
                        <th className="text-left font-semibold px-5 py-4">Presupuesto</th>
                        <th className="text-left font-semibold px-5 py-4">Estado</th>
                        <th className="text-left font-semibold px-5 py-4">Acciones</th>
                    </tr>
                </thead>

                <tbody>
                    {jobs.length === 0 ? (
                        <tr>
                            <td
                                colSpan="8"
                                className="px-5 py-10 text-center text-gray-400"
                            >
                                No se encontraron trabajos.
                            </td>
                        </tr>
                    ) : (
                        jobs.map((job) => (
                            <tr
                                key={job.id}
                                className="border-t border-gray-100 hover:bg-gray-50 transition"
                            >
                                <td className="px-5 py-4">
                                    <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-400 text-xs font-bold">
                                        {job.id}
                                    </span>
                                </td>

                                <td className="px-5 py-4 min-w-64">
                                    <div className="flex items-center gap-3">
                                        <div className="w-9 h-9 rounded-xl bg-green-50 text-green-500 flex items-center justify-center font-bold">
                                            <img src={JobIconG} alt="Trabajo activo" className="w-4 h-4" />
                                        </div>

                                        <div className="min-w-0">
                                            <p className="font-semibold text-[#0F172A] truncate">
                                                {job.title}
                                            </p>
                                            <p className="text-xs text-gray-400 flex items-center gap-1 mt-1">
                                                <img src={date} alt="Fecha" className="w-3 h-3" />
                                                {job.date}
                                            </p>
                                        </div>
                                    </div>
                                </td>

                                <td className="px-5 py-4 min-w-44">
                                    <PersonCell
                                        initials={job.clientInitials}
                                        name={job.client}
                                        color="bg-blue-600"
                                    />
                                </td>

                                <td className="px-5 py-4 min-w-52">
                                    <PersonCell
                                        initials={job.workerInitials}
                                        name={job.worker}
                                        color="bg-slate-700"
                                    />
                                </td>

                                <td className="px-5 py-4">
                                    <span className="px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-semibold">
                                        ⌑ {job.category}
                                    </span>
                                </td>

                                <td className="px-5 py-4">
                                    <p className="font-semibold text-[#0F172A]">
                                        Q {job.budget}
                                    </p>

                                    {job.rating > 0 && (
                                        <p className="text-yellow-400 text-xs">
                                            {"★".repeat(job.rating)}
                                            <span className="text-gray-300">
                                                {"★".repeat(5 - job.rating)}
                                            </span>
                                        </p>
                                    )}
                                </td>

                                <td className="px-5 py-4">
                                    <StatusBadge value={job.status} />
                                </td>

                                <td className="px-5 py-4">
                                    <button
                                        onClick={() => onViewJob(job)}
                                        className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition"
                                        title="Ver detalles">
                                        <img
                                            src={view}
                                            alt="Ver detalles"
                                            className="w-4 h-4 object-contain"
                                        />
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between px-5 py-4 border-t border-gray-100">
                <p className="text-xs text-gray-400">
                    Mostrando{" "}
                    {totalJobs === 0 ? 0 : startIndex + 1}
                    {"–"}
                    {Math.min(endIndex, totalJobs)} de {totalJobs} trabajos
                </p>

                <div className="flex items-center gap-2">
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
                            className={`w-8 h-8 rounded-lg text-sm font-semibold ${currentPage === index + 1
                                ? "bg-[#0F172A] text-white"
                                : "text-gray-500 hover:bg-gray-100"
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

const PersonCell = ({ initials, name, color }) => {
    return (
        <div className="flex items-center gap-3 min-w-0">
            <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${color} text-white flex items-center justify-center text-xs font-bold`}
            >
                {initials}
            </div>

            <span className="text-slate-700 truncate">{name}</span>
        </div>
    );
};

const StatusBadge = ({ value }) => {
    if (value === "Finalizado") {
        return (
            <span className="px-3 py-1 rounded-full bg-green-100 border border-green-200 text-green-600 text-xs font-semibold">
                ● Finalizado
            </span>
        );
    }

    if (value === "Cancelado") {
        return (
            <span className="px-3 py-1 rounded-full bg-gray-100 border border-gray-200 text-gray-500 text-xs font-semibold">
                ● Cancelado
            </span>
        );
    }

    return (
        <span className="px-3 py-1 rounded-full bg-yellow-100 border border-yellow-200 text-yellow-600 text-xs font-semibold">
            ● En progreso
        </span>
    );
};