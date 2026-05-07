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

                    const { data } = await loginRequest({ email, password })

                    // Sólo administradores pueden inciar sesión en cliente-admin
                    const role = data?.userDetails?.role;

                    console.log(data);
                    console.log(data.userDetails);
                    console.log(data.userDetails?.role);

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

                    set(
                        {
                            user: data.userDetails,
                            token: data.accessToken || data.token,
                            refreshToken: data.refreshToken,
                            expiresAt: data.expiresIn || data.expiresAt,
                            isAuthenticated: true,
                            loading: false,
                        }
                    );

                    return { success: true }

                } catch (error) {
                    let errorMessage = "Credenciales inválidas o error de conexión";

                    if (error.response?.status === 401) {
                        errorMessage = "Credenciales inválidas";
                    }

                    set({ loading: false, error: errorMessage });
                    toast.error(errorMessage);
                    return { success: false, error: errorMessage };
                } finally {
                    set({ loading: false });
                }

            },
            // ----------------------------------------------------------------
        }),
        { name: "auth-store" }
    )
);