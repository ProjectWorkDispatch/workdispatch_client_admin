import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNotificationStore } from "../../../features/users/Store/adminStore.js";

 
export const Notifications = () => {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null);
 
    const { notifications, loading, getNotifications } = useNotificationStore();
 
    const toggleMenu = () => setOpen((prev) => !prev);
 
    // Cargar notificaciones al montar el componente
    useEffect(() => {
        getNotifications();
    }, [getNotifications]);
 
    // Cerrar dropdown al hacer click fuera
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);
 
    // Formatear fecha relativa desde createdAt
    const formatRelativeTime = (dateStr) => {
        const diff = Math.floor((Date.now() - new Date(dateStr)) / 1000);
        if (diff < 60) return "Hace un momento";
        if (diff < 3600) return `Hace ${Math.floor(diff / 60)} min`;
        if (diff < 86400) return `Hace ${Math.floor(diff / 3600)} hora${Math.floor(diff / 3600) > 1 ? "s" : ""}`;
        return `Hace ${Math.floor(diff / 86400)} día${Math.floor(diff / 86400) > 1 ? "s" : ""}`;
    };
 
    // Color del indicador según el Type de la notificación
    const getTypeColor = (type) => {
        switch (type?.toLowerCase()) {
            case "alerta":    return "bg-red-500";
            case "info":      return "bg-blue-500";
            case "éxito":
            case "exito":     return "bg-green-500";
            case "aviso":     return "bg-yellow-400";
            default:          return "bg-blue-500";
        }
    };
 
    const hasUnread = notifications.length > 0;
 
    return (
        <div className="relative" ref={dropdownRef}>
 
            <button
                onClick={toggleMenu}
                className="relative text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition duration-300 text-xl rounded-lg p-1"
            >
                🔔
                {/* Solo muestra el ping si hay notificaciones reales */}
                {hasUnread && (
                    <>
                        <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border border-white animate-ping" />
                        <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border border-white" />
                    </>
                )}
            </button>
 
            {open && (
                <div className="absolute right-0 mt-3 w-80 bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden z-50">
 
                    {/* Header */}
                    <div className="px-4 py-3 border-b border-gray-100">
                        <h3 className="font-semibold text-gray-800">Notificaciones</h3>
                        <p className="text-xs text-gray-400 mt-1">Actividad reciente del sistema</p>
                    </div>
 
                    {/* Lista */}
                    <div className="max-h-96 overflow-y-auto">
 
                        {loading && (
                            <div className="flex justify-center py-6">
                                <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                            </div>
                        )}
 
                        {!loading && notifications.length === 0 && (
                            <div className="px-4 py-8 text-center text-gray-400 text-sm">
                                No hay notificaciones
                            </div>
                        )}
 
                        {!loading && notifications.map((notification) => (
                            <div
                                key={notification._id}
                                className="px-4 py-3 border-b border-gray-100 hover:bg-gray-50 transition cursor-pointer"
                            >
                                <div className="flex items-start gap-3">
                                    {/* Indicador de color según Type */}
                                    <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${getTypeColor(notification.Type)}`} />
 
                                    <div className="flex-1">
                                        {/* Type como badge */}
                                        <span className="text-[10px] font-bold uppercase text-gray-400 tracking-wide">
                                            {notification.Type}
                                        </span>
 
                                        <p className="text-sm font-semibold text-gray-700 mt-0.5">
                                            {notification.Message}
                                        </p>
 
                                        {/* Usuario al que va dirigida */}
                                        {notification.userId?.firstName && (
                                            <p className="text-xs text-gray-400 mt-0.5">
                                                Para: {notification.userId.firstName} {notification.userId.lastName}
                                            </p>
                                        )}
 
                                        <p className="text-xs text-gray-400 mt-1">
                                            {formatRelativeTime(notification.createdAt)}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
 
                    {/* Footer */}
                    <div className="p-3 bg-gray-50">
                        <Link
                            to="/dashboard/dashboard"
                            className="w-full text-sm font-medium text-blue-600 hover:text-blue-700 transition"
                        >
                            Ver todas las notificaciones
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
};