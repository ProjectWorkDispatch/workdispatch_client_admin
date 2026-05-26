import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useVerificationStore } from "../../users/Store/adminStore.js";
import Verifications from "../../../assets/icons/Verifications.svg";

const timeAgo = (date) => {
    const diff = Date.now() - new Date(date);
    const h = Math.floor(diff / 3600000);
    if (h < 1) return "Hace menos de 1h";
    if (h < 24) return `Hace ${h}h`;
    return `Hace ${Math.floor(h / 24)}d`;
};

export const PendingVerifications = () => {
    const { verifications, getVerifications } = useVerificationStore();

    useEffect(() => { getVerifications(); }, []);

    const pending = verifications
        .filter(v => v.status === 'PENDING')
        .slice(0, 4);

    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100 flex items-center gap-2">
                <div className="flex items-center gap-2">
                    <img src={Verifications} alt="Verifications" className="w-5 h-5" />
                    <h3 className="font-bold text-[#0F172A]">Verificaciones Pendientes</h3>
                </div>
                <Link to="/dashboard/verificaciones" className="ml-auto text-sm text-green-600 font-semibold hover:text-green-700">
                    Ver todas →
                </Link>
            </div>

            <div>
                {pending.length === 0 ? (
                    <p className="px-5 py-6 text-sm text-gray-400 text-center">Sin verificaciones pendientes</p>
                ) : pending.map((item) => (
                    <div key={item._id} className="px-4 sm:px-5 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-gray-50 last:border-b-0">
                        <div className="flex items-center gap-3 min-w-0">
                            <div className="w-9 h-9 rounded-full bg-yellow-100 text-yellow-500 flex items-center justify-center text-xs font-bold shrink-0">✓</div>
                            <div className="min-w-0">
                                <p className="font-semibold text-sm text-[#0F172A] truncate">
                                    {item.userId?.firstName} {item.userId?.lastName}
                                </p>
                                <p className="text-xs text-gray-400">
                                    {item.documentType || 'Documento'} · {timeAgo(item.createdAt)}
                                </p>
                            </div>
                        </div>
                        <span className="self-end sm:self-auto px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-600">
                            pendiente
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};