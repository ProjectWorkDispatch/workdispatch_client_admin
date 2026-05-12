import { Link, useLocation, useNavigate } from "react-router-dom";
import imgLogo from "../../../assets/img/logo_WorkDispatch.png";
import { AvatarUser } from "../ui/AvatarUser";
import { useAuthStore } from "../../../features/auth/store/authStore.js";
import jobGr from "../../../assets/icons/jobGr.svg";
import reportGr from "../../../assets/icons/reportGr.svg";
import usersGr from "../../../assets/icons/usersGr.svg";
import dashboardGr from "../../../assets/icons/dashboardGr.svg";
import verificationsGr from "../../../assets/icons/verificationsGr.svg";
import JobIconG from "../../../assets/icons/JobIconG.svg";
import reportGre from "../../../assets/icons/reportGre.svg";
import usersGre from "../../../assets/icons/usersGre.svg";
import dashboardGre from "../../../assets/icons/dashboardGre.svg";
import verificationsGre from "../../../assets/icons/verificationsGre.svg";

export const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {

    const location = useLocation();
    const navigate = useNavigate();

    const { user, logout } = useAuthStore();

    const handleLogout = () => {
        logout();
        navigate("/", { replace: true });
    };

    const items = [
        { label: "Dashboard", to: "/dashboard/dashboard", icon: dashboardGr, iconHover: dashboardGre },
        { label: "Usuarios", to: "/dashboard/usuarios", icon: usersGr, iconHover: usersGre },
        { label: "Trabajos", to: "/dashboard/trabajos", icon: jobGr, iconHover: JobIconG },
        { label: "Verificaciones", to: "/dashboard/verificaciones", icon: verificationsGr, iconHover: verificationsGre },
        { label: "Reportes", to: "/dashboard/reportes", icon: reportGr, iconHover: reportGre }
    ];

    console.log("SIDEBAR RENDERIZADO")

    return (
        <>
            {sidebarOpen && (
                <div
                    onClick={() => setSidebarOpen(false)}
                    className="fixed inset-0 bg-black/50 z-40 md:hidden"
                />
            )}

            <aside
                className={`fixed top-0 left-0 h-screen w-72 bg-[#111827] text-white flex flex-col z-50 transform transition-transform duration-300

                    ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}

                    md:translate-x-0
                `}
            >
                <div className="h-20 flex items-center justify-between px-5 border-b border-white/10">

                    <div className="flex items-center gap-3">
                        <img
                            src={imgLogo}
                            alt="WorkDispatch Logo"
                            className="w-10 h-10 object-contain"
                        />

                        <div>
                            <h1 className="font-bold text-lg leading-none">
                                Work<span className="text-yellow-400">Dispatch</span>
                            </h1>

                            <p className="text-xs text-gray-400 mt-1">
                                Panel Admin
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={() => setSidebarOpen(false)}
                        className="md:hidden text-2xl"
                    >
                        ×
                    </button>
                </div>

                <div className="flex-1 px-5 py-6">
                    <p className="text-xs uppercase tracking-[0.25em] text-gray-500 mb-5">
                        Menú principal
                    </p>

                    <ul className="space-y-2">
                        {items.map((item) => {

                            const active = location.pathname === item.to;

                            return (
                                <li key={item.label}>
                                    <Link
                                        to={item.to}
                                        onClick={() => setSidebarOpen(false)}
                                        className={`
                                            relative group flex items-center gap-3 w-full text-left px-4 py-3 rounded-2xl text-sm font-semibold transition-all duration-300
                                            ${active
                                                ? "bg-green-400/5 text-green-400"
                                                : "text-gray-400 hover:bg-white/5 hover:text-white"
                                            }
                                        `}
                                    >
                                        {active && (
                                            <span className="absolute right-4 text-green-400 text-md opacity-70 font-bold">
                                                {">"}
                                            </span>
                                        )}

                                        <img
                                            src={active ? item.iconHover : item.icon}
                                            alt={item.label}
                                            className={`
                                                w-4 h-4 transition-all duration-300
                                                ${active
                                                    ? ""
                                                    : "opacity-70 group-hover:opacity-100 group-hover:brightness-0 group-hover:invert"
                                                }
                                          `}
                                        />

                                        {item.label}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </div>

                <div className="px-4 pb-4 border-t border-white/10 pt-4">

                    <div className="bg-[#1F2937] rounded-2xl p-3 flex items-center gap-3 mb-3">

                        <AvatarUser />

                        <div className="overflow-hidden">
                            <p className="font-semibold text-sm truncate">
                                {user ? `${user.firstName} ${user.lastName}` : "No logueado"}
                            </p>

                            <p className="text-xs text-gray-400 truncate">
                                {user?.email || "No logueado"}
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 px-4 py-3 rounded-2xl text-sm font-medium text-gray-300 hover:bg-[#2A1722] hover:text-[#F25F5C] transition-all duration-300"
                    >
                        <span>Cerrar sesión</span>
                    </button>
                </div>
            </aside>
        </>
    );
};