import { useLocation } from "react-router-dom";
import { AvatarUser } from "../ui/AvatarUser";
import { Notifications } from "../ui/Notifications";
import { ConversationsButton } from "../ui/ConversationsButton";

export const Navbar = ({ setSidebarOpen }) => {

    const location = useLocation();

    let pageName = "Panel";

    if (location.pathname === "/dashboard/dashboard") {
        pageName = "Dashboard";
    } else if (location.pathname === "/dashboard/usuarios") {
        pageName = "Usuarios";
    } else if (location.pathname === "/dashboard/trabajos") {
        pageName = "Trabajos";
    } else if (location.pathname === "/dashboard/verificaciones") {
        pageName = "Verificaciones";
    } else if (location.pathname === "/dashboard/reportes") {
        pageName = "Reportes";
    } else if (location.pathname === "/dashboard/reviews") {
        pageName = "Reviews";
    } else if (location.pathname === "/dashboard/categories") {
        pageName = "Categorías";
    } else if (location.pathname === "/dashboard/solicitudes") {
        pageName = "Solicitudes";
    } else if (location.pathname === "/dashboard/propuestas") {
        pageName = "Propuestas";
    } else if (location.pathname === "/dashboard/portafolios") {
        pageName = "Portafolios";
    } else if (location.pathname === "/dashboard/skills") {
        pageName = "Habilidades";
    } else if (location.pathname === "/dashboard/conversaciones") {
        pageName = "Conversaciones";
    } else if (location.pathname === "/dashboard/skills") {
        pageName = "Habilidades";
    }

        return (
            <header className="h-16 bg-white border-b border-gray-200 shadow-sm flex items-center justify-between px-4 md:px-6">

                <div className="flex items-center gap-3">

                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="md:hidden text-2xl text-gray-700"
                    >
                        ☰
                    </button>

                    <div className="flex items-center gap-2 text-sm">
                        <span className="text-gray-400">Admin</span>
                        <span className="text-gray-300">{">"}</span>
                        <span className="font-semibold text-gray-700">
                            {pageName}
                        </span>
                    </div>
                </div>

                <div className="flex items-center gap-5">
                    <ConversationsButton />

                    <Notifications />

                    <AvatarUser />
                </div>
            </header>
        );
    };