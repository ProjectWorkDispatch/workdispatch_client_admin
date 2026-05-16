import { useEffect, useRef, useState } from "react";
import { UserModal } from "./UserModal";

export const UsersActionsMenu = ({ user }) => {
    const [open, setOpen] = useState(false);
    const [openModal, setOpenModal] = useState(false);

    const menuRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleViewProfile = () => {
        setOpenModal(true);
        setOpen(false);
    };

    return (
        <>
            <div className="relative" ref={menuRef}>
                <button
                    onClick={() => setOpen(!open)}
                    className="w-8 h-8 rounded-full text-gray-400 hover:bg-gray-100 font-bold"
                >
                    ...
                </button>

                {open && (
                    <div className="absolute right-0 top-10 w-44 bg-white border border-gray-100 rounded-xl shadow-lg z-50 py-1">
                        <button
                            onClick={handleViewProfile}
                            className="block w-full text-left px-3 py-2 text-sm text-slate-700 hover:bg-gray-50"
                        >
                            Ver perfil completo
                        </button>

                        <button
                            className="block w-full text-left px-3 py-2 text-sm text-slate-700 hover:bg-gray-50"
                        >
                            Enviar mensaje
                        </button>

                        <button
                            className="block w-full text-left px-3 py-2 text-sm text-slate-700 hover:bg-gray-50"
                        >
                            Ver historial
                        </button>

                        <div className="my-1 border-t border-gray-100" />

                        <button
                            className="block w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                        >
                            Eliminar cuenta
                        </button>
                    </div>
                )}
            </div>

            <UserModal
                open={openModal}
                onClose={() => setOpenModal(false)}
                user={user}
            />
        </>
    );
};