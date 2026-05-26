import { useEffect } from "react";
import { useNotificationStore } from "../../users/Store/adminStore.js";
import Activity from "../../../assets/icons/Activity.svg";

const timeAgo = (date) => {
    const diff = Date.now() - new Date(date);
    const h = Math.floor(diff / 3600000);
    if (h < 1) return "Hace menos de 1h";
    if (h < 24) return `Hace ${h}h`;
    return `Hace ${Math.floor(h / 24)}d`;
};

const typeColor = (type = '') => {
    if (type.includes('ACCEPTED') || type.includes('APPROVED') || type.includes('REACTIVAT')) return 'bg-green-500';
    if (type.includes('CANCELLED') || type.includes('SANCTION') || type.includes('INACTIVE')) return 'bg-red-500';
    if (type.includes('PENDING') || type.includes('PROPOSAL') || type.includes('NEW')) return 'bg-yellow-500';
    return 'bg-blue-500';
};

export const RecentActivity = () => {
    const { notifications, getNotifications } = useNotificationStore();

    useEffect(() => { getNotifications(); }, []);

    const recent = [...notifications]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 6);

    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100 flex items-end gap-2">
                <img src={Activity} alt="Activity" className="w-5 h-5" />
                <h3 className="font-bold text-[#0F172A]">Actividad Reciente</h3>
            </div>

            <div className="px-4 sm:px-5 py-4 space-y-5">
                {recent.length === 0 ? (
                    <p className="text-sm text-gray-400 text-center py-4">Sin actividad reciente</p>
                ) : recent.map((n) => (
                    <div key={n._id} className="flex gap-3">
                        <span className={`w-2 h-2 rounded-full mt-2 shrink-0 ${typeColor(n.Type)}`} />
                        <div>
                            <p className="text-sm text-slate-700 leading-relaxed">{n.Message}</p>
                            <p className="text-xs text-gray-400 mt-1">{timeAgo(n.createdAt)}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};