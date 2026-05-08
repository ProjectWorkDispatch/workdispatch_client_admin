import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

export const Notifications = () => {

    const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null);

    const toggleMenu = () => setOpen((prev) => !prev);

    useEffect(() => {

        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };

    }, []);

    // Notificaciones temporales
    const notifications = [
        {
            id: 1,
            title: "Nuevo usuario registrado",
            description: "Juan Pérez creó una cuenta",
            time: "Hace 2 min"
        },
        {
            id: 2,
            title: "Nueva verificación enviada",
            description: "Un trabajador envió documentos",
            time: "Hace 15 min"
        },
        {
            id: 3,
            title: "Trabajo reportado",
            description: "Un cliente reportó un problema",
            time: "Hace 1 hora"
        }
    ];

    return (
        <div className="relative" ref={dropdownRef}>

            <button
                onClick={toggleMenu}
                className=" relative text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition duration-300 text-xl rounded-lg p-1">
                🔔

                <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border border-white animate-ping" />
                <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border border-white" />
            </button>

            {/* Dropdown */}
            {open && (
                <div
                    className="absolute right-0 mt-3 w-80 bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden z-50">

                    {/* Header */}
                    <div className="px-4 py-3 border-b border-gray-100">

                        <h3 className="font-semibold text-gray-800">
                            Notificaciones
                        </h3>

                        <p className="text-xs text-gray-400 mt-1">
                            Actividad reciente del sistema
                        </p>
                    </div>

                    <div className="max-h-96 overflow-y-auto">

                        {notifications.map((notification) => (

                            <div
                                key={notification.id}
                                className="px-4 py-3 border-b border-gray-100 hover:bg-gray-50 transition cursor-pointer">

                                <div className="flex items-start gap-3">

                                    {/* Indicador */}
                                    <div className="w-2 h-2 rounded-full bg-blue-500 mt-2" />

                                    <div className="flex-1">

                                        <p className="text-sm font-semibold text-gray-700">
                                            {notification.title}
                                        </p>

                                        <p className="text-sm text-gray-500 mt-1">
                                            {notification.description}
                                        </p>

                                        <p className="text-xs text-gray-400 mt-2">
                                            {notification.time}
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
                            className="w-full text-sm font-medium text-blue-600 hover:text-blue-700 transition">
                            Ver todas las notificaciones
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
};