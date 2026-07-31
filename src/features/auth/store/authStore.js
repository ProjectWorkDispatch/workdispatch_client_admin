import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import toast from 'react-hot-toast';

import {
    login as loginRequest
} from "../../../shared/api";


export const useAuthStore = create(
    persist(
        (set, get) => ({
            user: null,
            token: null,
            refreshToken: null,
            expiresAt: null,
            loading: false,
            error: null,
            isLoadingAuth: true,
            isAuthenticated: false,

            checkAuth: () => {
                const token = get().token;
                const user = get().user;
                const isAdmin = user?.role === "ADMIN";

                set({ loading: false, error: null, isLoadingAuth: false });

                if (token && !isAdmin) {
                    get().logout();
                    set({
                        user: null,
                        token: null,
                        refreshToken: null,
                        expiresAt: null,
                        isAuthenticated: false,
                        isLoadingAuth: false,
                        error: "No tienes permiso para acceder como administrador"
                    })
                }
            },

            logout: () => {
                set({
                    user: null,
                    token: null,
                    refreshToken: null,
                    expiresAt: null,
                    isAuthenticated: false,
                })
            },

            // ----------------------------------------------------------------
            login: async ({ email, password }) => {

                try {

                    set({ loading: true, error: null });

                    const { data } = await loginRequest({ email, password });
                    const user = data?.user || data?.userDetails || data;
                    const role = (user?.role || user?.roleName || "").toString().toUpperCase();
                    const accessToken = data?.accessToken || data?.token;
                    const refreshToken = data?.refreshToken || data?.refresh_token;
                    const rawExpires = data?.expiresIn || data?.expiresAt || data?.expiration;
                    const expiresAt = typeof rawExpires === 'number' && rawExpires < 1e12
                        ? Date.now() + rawExpires * 1000
                        : rawExpires;

                    if (role !== "ADMIN") {
                        const message = "No tienes permisos para acceder como administrador";

                        set({
                            user: null,
                            token: null,
                            refreshToken: null,
                            expiresAt: null,
                            isAuthenticated: false,
                            loading: false,
                            error: message,
                        });

                        toast.error(message);
                        return { success: false, error: message };
                    }

                    set({
                        user,
                        token: accessToken,
                        refreshToken,
                        expiresAt,
                        isAuthenticated: !!accessToken,
                        loading: false,
                    });

                    return { success: true };

                } catch (error) {
                    let errorMessage = "Credenciales inválidas o error de conexión";

                    if (error.response?.status === 401) {
                        errorMessage = "Credenciales inválidas";
                    }

                    set({ error: errorMessage, loading: false });
                    toast.error(errorMessage);
                    return { success: false, error: errorMessage };
                }

            },
            // ----------------------------------------------------------------
        }),
        { name: "auth-store" }
    )
);