import { useEffect, useRef, useState } from "react";
import { UserModal } from "./UserModal";
import * as api from "../../../shared/api/admin.js";

export const UsersActionsMenu = ({ user }) => {
    const [open, setOpen] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [freshUser, setFreshUser] = useState(null);
    const [loadingUser, setLoadingUser] = useState(false);

    const menuRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleViewProfile = async () => {
        setOpen(false);
        setLoadingUser(true);
        try {
            const res = await api.getUserById(user._id);
            // El backend devuelve { success, data: user }
            const userData = res.data?.data || res.data?.user || res.data;
            setFreshUser(userData);
            setOpenModal(true);
        } catch {
            // Si falla el fetch, abrimos con los datos que ya tenemos
            setFreshUser(user);
            setOpenModal(true);
        } finally {
            setLoadingUser(false);
        }
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        setFreshUser(null);
    };

    return (
        <>
            <div className="relative" ref={menuRef}>
                <button
                    onClick={() => setOpen(!open)}
                    disabled={loadingUser}
                    className="w-8 h-8 rounded-full text-gray-400 hover:bg-gray-100 font-bold disabled:opacity-50"
                >
                    {loadingUser ? "⋯" : "..."}
                </button>

                {open && (
                    <div className="absolute right-0 top-10 w-44 bg-white border border-gray-100 rounded-xl shadow-lg z-50 py-1">
                        <button
                            onClick={handleViewProfile}
                            className="block w-full text-left px-3 py-2 text-sm text-slate-700 hover:bg-gray-50"
                        >
                            Ver perfil completo
                        </button>
                        <button className="block w-full text-left px-3 py-2 text-sm text-slate-700 hover:bg-gray-50">
                            Enviar mensaje
                        </button>
                        <button className="block w-full text-left px-3 py-2 text-sm text-slate-700 hover:bg-gray-50">
                            Ver historial
                        </button>
                        <div className="my-1 border-t border-gray-100" />
                        <button className="block w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50">
                            Eliminar cuenta
                        </button>
                    </div>
                )}
            </div>

            {openModal && freshUser && (
                <UserModal
                    open={openModal}
                    onClose={handleCloseModal}
                    user={freshUser}
                    onRefresh={async () => {
                        try {
                            const res = await api.getUserById(user._id);
                            const userData = res.data?.data || res.data?.user || res.data;
                            setFreshUser(userData);
                        } catch {
                            // silencioso
                        }
                    }}
                />
            )}
        </>
    );
};