import { useState, useRef, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuthStore } from "../../../features/auth/store/authStore.js";
import defaultAvatarImg from "../../../assets/img/wd_admin.png";

export const AvatarUser = () => {

    // Recuperación de datos del usuario autenticado
    const { user, logout } = useAuthStore();
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null);

    console.log("IMAGEN:" , user?.profilePhoto);

    const avatarSrc =
        user?.profilePhoto && user.profilePhoto.trim() !== ""
            ? user.profilePhoto
            : defaultAvatarImg;

    return (
        <div className="flex items-center gap-3">
            <img
                src={avatarSrc}
                alt={user?.username}
                className="w-10 h-10 rounded-full object-cover border border-white/10"
                onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = defaultAvatarImg;
                }}
            />
        </div>
    );
};