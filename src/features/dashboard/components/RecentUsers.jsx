import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useUserStore } from "../../users/Store/adminStore.js";
import TotalUsers from "../../../assets/icons/TotalUsers.svg";

const getInitials = (firstName = '', lastName = '') =>
    `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();

export const RecentUsers = () => {
    const { users, getUsers } = useUserStore();

    useEffect(() => { getUsers(); }, []);

    const recent = [...users]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 5);

    const getStatus = (user) => {
        if (!user.active) return "suspendido";
        return "activo";
    };

    const timeAgo = (date) => {
        const diff = Date.now() - new Date(date);
        const h = Math.floor(diff / 3600000);
        if (h < 1) return "Hace menos de 1h";
        if (h < 24) return `Hace ${h}h`;
        return `Hace ${Math.floor(h / 24)}d`;
    };

    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <img src={TotalUsers} alt="Total Users" className="w-5 h-5" />
                    <h3 className="font-bold text-[#0F172A]">Usuarios Recientes</h3>
                </div>
                <Link to="/dashboard/usuarios" className="text-sm text-green-600 font-semibold hover:text-green-700">
                    Ver todos →
                </Link>
            </div>

            <div>
                {recent.length === 0 ? (
                    <p className="px-5 py-6 text-sm text-gray-400 text-center">Sin usuarios registrados</p>
                ) : recent.map((user) => (
                    <div key={user._id} className="px-4 sm:px-5 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-50 last:border-b-0">
                        <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-slate-700 text-white flex items-center justify-center text-xs font-bold">
                                {getInitials(user.firstName, user.lastName)}
                            </div>
                            <div>
                                <p className="font-semibold text-sm text-[#0F172A]">
                                    {user.firstName} {user.lastName}
                                </p>
                                <p className="text-xs text-gray-400">
                                    {user.role === 'WORKER' ? 'Trabajador' : 'Cliente'} · {timeAgo(user.createdAt)}
                                </p>
                            </div>
                        </div>
                        <span className={`self-end sm:self-auto px-3 py-1 rounded-full text-xs font-semibold ${
                            getStatus(user) === "activo" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
                        }`}>
                            {getStatus(user)}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};