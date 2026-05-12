import { Link } from "react-router-dom";
import Verifications from "../../../assets/icons/Verifications.svg";

const verifications = [
    { name: "Jhon Castillo", id: "CC 1023456789", time: "Hace 1h", priority: "alta" },
    { name: "Paola Suárez", id: "CC 4512378901", time: "Hace 3h", priority: "media" },
    { name: "Ramiro Peña", id: "CC 8901234567", time: "Hace 5h", priority: "baja" },
    { name: "Diana Castro", id: "CC 2345678901", time: "Hace 7h", priority: "media" }
];

export const PendingVerifications = () => {
    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100 flex items-center gap-2">
                <div className="flex items-center gap-2">
                    <img src={Verifications} alt="Verifications" className="w-5 h-5" />
                    <h3 className="font-bold text-[#0F172A]">
                        Verificaciones Pendientes
                    </h3>
                </div>
                <Link
                    to="/dashboard/verificaciones"
                    className="ml-auto text-sm text-green-600 font-semibold hover:text-green-700">
                    Ver todas →
                </Link>
            </div>

            <div>
                {verifications.map((item) => (
                    <div
                        key={item.name}
                        className="px-4 sm:px-5 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-gray-50 last:border-b-0">
                        <div className="flex items-center gap-3 min-w-0">
                            <div className="w-9 h-9 rounded-full bg-yellow-100 text-yellow-500 flex items-center justify-center text-xs font-bold shrink-0">
                                ✓
                            </div>

                            <div className="min-w-0">
                                <p className="font-semibold text-sm text-[#0F172A] truncate">
                                    {item.name}
                                </p>

                                <p className="text-xs text-gray-400 wrap-break-words">
                                    Cédula · {item.id} · {item.time}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 self-end sm:self-auto">
                            <span
                                className={`px-3 py-1 rounded-full text-xs font-semibold ${item.priority === "alta"
                                        ? "bg-red-100 text-red-600"
                                        : item.priority === "media"
                                            ? "bg-yellow-100 text-yellow-600"
                                            : "bg-green-100 text-green-600"
                                    }`}
                            >
                                {item.priority}
                            </span>
                            <button className="text-green-500 font-bold text-lg hover:scale-110 transition">✓</button>

                            <button className="text-red-400 font-bold text-lg hover:scale-110 transition">×</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};