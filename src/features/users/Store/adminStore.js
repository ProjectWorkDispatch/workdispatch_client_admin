import { create } from "zustand";
import * as api from "../../../shared/api/admin.js";

// ================= NOTIFICATIONS STORE =================
export const useNotificationStore = create((set, get) => ({
    notifications: [],
    loading: false,
    error: null,

    getNotifications: async () => {
        try {
            set({ loading: true, error: null });
            const res = await api.getNotifications();
            // El controlador devuelve { success: true, notifications: [...] }
            set({ notifications: res.data.notifications, loading: false });
        } catch (error) {
            set({ error: error.response?.data?.message || "Error al obtener notificaciones", loading: false });
        }
    },

    createNotification: async (data) => {
        try {
            set({ loading: true, error: null });
            const res = await api.createNotification(data);
            // El controlador devuelve { success: true, notification: {...} }
            set({ notifications: [res.data.notification, ...get().notifications], loading: false });
            return res.data;
        } catch (error) {
            set({ error: error.response?.data?.message || "Error al crear notificación", loading: false });
            throw error;
        }
    },

    updateNotification: async (id, data) => {
        try {
            set({ loading: true, error: null });
            const res = await api.updateNotification(id, data);
            // El controlador devuelve { success: true, notification: {...} }
            set({
                notifications: get().notifications.map((n) =>
                    n._id === id ? res.data.notification : n
                ),
                loading: false,
            });
        } catch (error) {
            set({ error: error.response?.data?.message || "Error al actualizar notificación", loading: false });
            throw error;
        }
    },
}));

// ================= PROPOSALS STORE =================
// Admin solo puede listar y desactivar propuestas (no crear ni editar)
export const useProposalStore = create((set, get) => ({
    proposals: [],
    loading: false,
    error: null,

    getProposals: async (params) => {
        try {
            set({ loading: true, error: null });
            const res = await api.getProposals(params);
            // El controlador devuelve { success: true, proposals: [...] }
            set({ proposals: res.data.proposals, loading: false });
        } catch (error) {
            set({ error: error.response?.data?.message || "Error al obtener propuestas", loading: false });
        }
    },

    deactivateProposal: async (id) => {
        try {
            set({ loading: true, error: null });
            const res = await api.deactivateProposal(id);
            // El controlador devuelve { success: true, proposal: {...} } con status: 'CANCELLED'
            // Actualizamos el objeto en el store localmente para no hacer refetch
            set({
                proposals: get().proposals.map((p) =>
                    p._id === id ? res.data.proposal : p
                ),
                loading: false,
            });
        } catch (error) {
            set({ error: error.response?.data?.message || "Error al desactivar propuesta", loading: false });
        }
    },
}));

// ================= REPORTS STORE =================
// Admin solo puede listar y marcar como resueltos (no crear ni editar)
export const useReportStore = create((set, get) => ({
    reports: [],
    loading: false,
    error: null,

    getReports: async (params) => {
        try {
            set({ loading: true, error: null });
            const res = await api.getReports(params);
            // El controlador devuelve { success: true, reports: [...] }
            set({ reports: res.data.reports, loading: false });
        } catch (error) {
            set({ error: error.response?.data?.message || "Error al obtener reportes", loading: false });
        }
    },

    resolveReport: async (id) => {
        try {
            set({ loading: true, error: null });
            await api.resolveReport(id);
            const res = await api.getReports();          // ← recarga con populate
            set({ reports: res.data.reports, loading: false });
        } catch (error) {
            set({ error: error.response?.data?.message || "Error al resolver reporte", loading: false });
        }
    },
}));