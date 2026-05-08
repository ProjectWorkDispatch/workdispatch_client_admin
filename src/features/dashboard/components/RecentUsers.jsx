import { Link } from "react-router-dom";
import TotalUsers from "../../../assets/icons/TotalUsers.svg";

const users = [
    { initials: "CM", name: "Carlos Mendoza", role: "Cliente", time: "Hace 2h", status: "activo" },
    { initials: "LR", name: "Laura Rincón", role: "Trabajador", time: "Hace 4h", status: "pendiente" },
    { initials: "AT", name: "Andrés Torres", role: "Trabajador", time: "Hace 6h", status: "activo" },
    { initials: "SB", name: "Sofía Bermúdez", role: "Cliente", time: "Hace 9h", status: "activo" },
    { initials: "MR", name: "Miguel Ángel Ruiz", role: "Trabajador", time: "Hace 12h", status: "suspendido" }
];

export const RecentUsers = () => {
    return (
        <article className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <img src={TotalUsers} alt="Total Users" className="w-5 h-5" />
                    <h3 className="font-bold text-[#0F172A]">
                        Usuarios Recientes
                    </h3>
                </div>
                <Link
                    to="/dashboard/usuarios"
                    className="text-sm text-green-600 font-semibold hover:text-green-700"
                >
                    Ver todos →
                </Link>
            </div>

            <div>
                {users.map((user) => (
                    <div
                        key={user.name}
                        className="px-5 py-4 flex items-center justify-between border-b border-gray-50 last:border-b-0"
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-slate-700 text-white flex items-center justify-center text-xs font-bold">
                                {user.initials}
                            </div>

                            <div>
                                <p className="font-semibold text-sm text-[#0F172A]">
                                    {user.name}
                                </p>
                                <p className="text-xs text-gray-400">
                                    {user.role} · {user.time}
                                </p>
                            </div>
                        </div>

                        <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${user.status === "activo"
                                ? "bg-green-100 text-green-600"
                                : user.status === "pendiente"
                                    ? "bg-yellow-100 text-yellow-600"
                                    : "bg-red-100 text-red-600"
                                }`}
                        >
                            {user.status}
                        </span>
                    </div>
                ))}
            </div>
        </article>
    );
};