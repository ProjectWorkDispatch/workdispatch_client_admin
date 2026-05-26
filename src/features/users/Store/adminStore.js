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
            set({
                proposals: get().proposals.map((p) =>
                    p._id === id ? res.data.proposal : p
                ),
                loading: false,
            });
            return true;
        } catch (error) {
            set({ error: error.response?.data?.message || "Error al desactivar propuesta", loading: false });
            return false;
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
            set({ reports: res.data.reports, loading: false });
        } catch (error) {
            set({ error: error.response?.data?.message || "Error al obtener reportes", loading: false });
        }
    },

    resolveReport: async (id) => {
        try {
            set({ loading: true, error: null });
            await api.resolveReport(id);
            const res = await api.getReports();
            set({ reports: res.data.reports, loading: false });
        } catch (error) {
            set({ error: error.response?.data?.message || "Error al resolver reporte", loading: false });
        }
    },
}));

// ================= USERS STORE (Entidad: Usuarios) =================
export const useUserStore = create((set, get) => ({
    users: [],
    loading: false,
    error: null,
 
    getUsers: async () => {
        set({ loading: true, error: null });
        try {
            const res = await api.getUsers();
            const data = res.data?.users || res.data?.data || (Array.isArray(res.data) ? res.data : []);
            set({ users: data, loading: false });
        } catch (error) {
            set({ loading: false, error: error.response?.data?.message || "Error al obtener usuarios" });
            console.error("Error al obtener usuarios:", error);
        }
    },
 
    addUser: async (formData) => {
        try {
            set({ loading: true });
            await api.createUser(formData);
            await get().getUsers();
        } catch (error) {
            set({ loading: false });
            throw error;
        }
    },
 
    // ← NUEVO: actualiza un usuario por ID
    updateUser: async (id, data) => {
        try {
            set({ loading: true });
            await api.updateUser(id, data);
            await get().getUsers(); // recarga la lista para reflejar cambios
        } catch (error) {
            set({ loading: false });
            throw error;
        }
    },
 
    toggleUserStatus: async (id, currentStatus) => {
        try {
            set({ loading: true, error: null });
            // El backend hace toggle solo (ignora el body), así que solo mandamos el PATCH
            await api.changeUserStatus(id, !currentStatus);
            set((state) => ({
                users: state.users.map((u) =>
                    u._id === id
                        ? { ...u, active: !currentStatus, isActive: !currentStatus }
                        : u
                ),
                loading: false,
            }));
            return true;
        } catch (error) {
            set({ loading: false, error: error.response?.data?.message || "Error al cambiar estado" });
            console.error("Error al cambiar estado:", error.response?.data || error);
            return false;
        }
    },
}));

// ================= SKILLS STORE (Entidad: Catálogo de Habilidades) =================
export const useSkillStore = create((set, get) => ({
    skills: [],
    loading: false,

    getSkills: async () => {
        set({ loading: true });
        try {
            const res = await api.getSkills();
            const skillsArray = res.data?.skills || res.data?.data || (Array.isArray(res.data) ? res.data : []);
            set({ skills: skillsArray, loading: false });
        } catch (error) {
            set({ loading: false });
            console.error("Error al obtener habilidades:", error);
        }
    },

    addSkill: async (data) => {
        try {
            const res = await api.createSkill(data);
            await get().getSkills();
            return res;
        } catch (error) {
            set({ loading: false });
            console.error("Error al crear habilidad:", error);
            throw error;
        }
    }
}));

// ================= USER SKILLS STORE (Entidad: Relación Usuario-Habilidad) =================
export const useUserSkillStore = create((set, get) => ({
    userSkills: [],
    loading: false,

    getUserSkills: async () => {
        set({ loading: true });
        try {
            const res = await api.getUserSkills();
            const data = res.data?.userSkills || res.data?.data || (Array.isArray(res.data) ? res.data : []);
            set({ userSkills: data, loading: false });
        } catch (error) {
            set({ loading: false });
            console.error("Error al obtener relaciones usuario-habilidad:", error);
        }
    },

    assignSkill: async (data) => {
        try {
            await api.assignSkillToUser(data);
            await get().getUserSkills();
        } catch (error) {
            console.error("Error al asignar habilidad:", error);
            throw error;
        }
    }
}));

// ================= CATEGORIES STORE =================
export const useCategoryStore = create((set, get) => ({
    categories: [],
    loading: false,
    error: null,

    getCategories: async () => {
        try {
            set({ loading: true, error: null });
            const res = await api.getCategories();
            
            // Extraer la data según la estructura de la respuesta
            const data = res.data?.categories || res.data?.data || (Array.isArray(res.data) ? res.data : []);
            
            set({ categories: data, loading: false });
        } catch (error) {
            const errorMsg = error.response?.data?.message || "Error al obtener las categorías del servidor";
            set({ categories: [], loading: false, error: errorMsg });
            console.error("Error de conexión:", errorMsg);
        }
    },

    createCategory: async (categoryData) => {
        try {
            set({ loading: true, error: null });
            const res = await api.createCategory(categoryData);
            
            const newCategory = res.data?.category || res.data?.data || res.data;
            
            set((state) => ({ 
                categories: [...state.categories, newCategory], 
                loading: false 
            }));
            
            return res.data;
        } catch (error) {
            const errorMsg = error.response?.data?.message || "No se pudo crear la categoría";
            set({ loading: false, error: errorMsg });
            throw error; 
        }
    },

    updateCategory: async (id, categoryData) => {
        try {
            set({ loading: true, error: null });
            const res = await api.updateCategory(id, categoryData);
            
            const updatedCategory = res.data?.category || res.data?.data || res.data;
            
            set((state) => ({
                categories: state.categories.map((cat) => (cat._id === id ? updatedCategory : cat)),
                loading: false
            }));
            
            return updatedCategory;
        } catch (error) {
            const errorMsg = error.response?.data?.message || "Error al actualizar la categoría";
            set({ error: errorMsg, loading: false });
            throw error;
        }
    },

    toggleCategoryStatus: async (id, currentStatus) => {
        try {
            const newStatus = currentStatus === "ACTIVE" ? "INACTIVE" : "ACTIVE";
            const res = await api.changeCategoryStatus(id, newStatus);
            
            const updatedCategory = res.data?.category || res.data?.data || res.data;
            
            set((state) => ({
                categories: state.categories.map((cat) => (cat._id === id ? updatedCategory : cat))
            }));
        } catch (error) {
            console.error("Error al intentar cambiar el estado de la categoría:", error);
            set({ error: "No se pudo cambiar el estado en el servidor" });
        }
    },
}));

export const useVerificationStore = create((set, get) => ({
    verifications: [],
    loading: false,
    error: null,

    getVerifications: async () => {
        try {
            set({ loading: true, error: null });
            const res = await api.getVerifications();
            set({ verifications: res.data.data, loading: false });
        } catch (error) {
            set({
                error: error.response?.data?.message || 'Error al obtener verificaciones',
                loading: false
            });
        }
    },

    updateVerification: async (id, data) => {
        try {
            set({ loading: true, error: null });
            const res = await api.updateVerification(id, data);
            const updated = res.data.data;
            set({
                verifications: get().verifications.map((v) =>
                    v._id === id ? updated : v
                ),
                loading: false
            });
            return { success: true, data: updated };
        } catch (error) {
            set({
                error: error.response?.data?.message || 'Error al actualizar verificación',
                loading: false
            });
            throw error;
        }
    },

    updateVerificationStatus: async (id, statusData) => {
        try {
            set({ loading: true, error: null });
            await api.updateVerificationStatus(id, statusData);
            await get().getVerifications();
            return { success: true };
        } catch (error) {
            set({
                error: error.response?.data?.message || 'Error al actualizar estado de verificación',
                loading: false
            });
            throw error;
        }
    },

    clearError: () => set({ error: null })
}));

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// WORKER PORTFOLIO STORE
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const useWorkerPortfolioStore = create((set, get) => ({
    portfolios: [],
    loading: false,
    error: null,

    getAllPortfolios: async () => {
        try {
            set({ loading: true, error: null });
            const res = await api.getAllPortfolios();
            set({ portfolios: res.data.portfolios, loading: false });
        } catch (error) {
            set({
                error: error.response?.data?.message || 'Error al obtener portafolios',
                loading: false
            });
        }
    },

    moderatePortfolio: async (id) => {
        try {
            set({ loading: true, error: null });
            const res = await api.moderatePortfolio(id);
            const moderated = res.data.record;
            set({
                portfolios: get().portfolios.map((p) =>
                    p._id === id ? moderated : p
                ),
                loading: false
            });
            return { success: true, data: moderated };
        } catch (error) {
            set({
                error: error.response?.data?.message || 'Error al moderar el portafolio',
                loading: false
            });
            throw error;
        }
    },

    updatePortfolioImage: async (id, formData) => {
        try {
            set({ loading: true, error: null });
            const res = await api.updatePortfolioImage(id, formData);
            const newImageUrl = res.data.imageUrl;
            set({
                portfolios: get().portfolios.map((p) =>
                    p._id === id ? { ...p, imageUrl: newImageUrl } : p
                ),
                loading: false
            });
            return { success: true, imageUrl: newImageUrl };
        } catch (error) {
            set({
                error: error.response?.data?.message || 'Error al actualizar imagen del portafolio',
                loading: false
            });
            throw error;
        }
    },

    clearError: () => set({ error: null })
}));

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SERVICE REQUEST STORE
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const useServiceRequestStore = create((set, get) => ({
    serviceRequests: [],
    services: [],
    enrichedRequests: [],
    loading: false,
    error: null,

    _buildEnriched: (serviceRequests, services) => {
        const serviceMap = services.reduce((acc, svc) => {
            const key = svc.serviceRequestId?._id ?? svc.serviceRequestId;
            if (key) acc[key] = svc;
            return acc;
        }, {});
        return serviceRequests.map((req) => ({
            ...req,
            service: serviceMap[req._id] ?? null,
        }));
    },

    fetchAll: async () => {
        try {
            set({ loading: true, error: null });
            const [srRes, svcRes] = await Promise.all([
                api.getServiceRequests(),
                api.getServices(),
            ]);
            const serviceRequests =
                srRes.data?.serviceRequests ?? srRes.data?.data ??
                (Array.isArray(srRes.data) ? srRes.data : []);
            const services =
                svcRes.data?.services ?? svcRes.data?.data ??
                (Array.isArray(svcRes.data) ? svcRes.data : []);
            const enrichedRequests = get()._buildEnriched(serviceRequests, services);
            set({ serviceRequests, services, enrichedRequests, loading: false });
        } catch (error) {
            set({
                error: error.response?.data?.message ?? 'Error al obtener los trabajos',
                loading: false,
            });
        }
    },

    changeServiceRequestStatus: async (id, status) => {
        try {
            set({ loading: true, error: null });
            const res = await api.updateServiceRequestStatus(id, status);
            const updated = res.data?.serviceRequest ?? res.data?.data ?? null;
            set((state) => {
                const serviceRequests = updated
                    ? state.serviceRequests.map((r) => (r._id === id ? updated : r))
                    : state.serviceRequests.map((r) => r._id === id ? { ...r, status } : r);
                const enrichedRequests = state._buildEnriched(serviceRequests, state.services);
                return { serviceRequests, enrichedRequests, loading: false };
            });
            return { success: true };
        } catch (error) {
            set({
                error: error.response?.data?.message ?? 'Error al cambiar estado de la solicitud',
                loading: false,
            });
            throw error;
        }
    },

    changeServiceStatus: async (id, status) => {
        try {
            set({ loading: true, error: null });
            const res = await api.updateServiceStatus(id, status);
            const updated = res.data?.service ?? res.data?.data ?? null;
            set((state) => {
                const services = updated
                    ? state.services.map((s) => (s._id === id ? updated : s))
                    : state.services.map((s) => s._id === id ? { ...s, status } : s);
                const enrichedRequests = state._buildEnriched(state.serviceRequests, services);
                return { services, enrichedRequests, loading: false };
            });
            return { success: true };
        } catch (error) {
            set({
                error: error.response?.data?.message ?? 'Error al cambiar estado del trabajo',
                loading: false,
            });
            throw error;
        }
    },

    clearError: () => set({ error: null }),
}));

// ================= CONVERSATIONS STORE =================

export const useConversationStore = create((set, get) => ({
    conversations: [],
    selectedConversation: null,
    loading: false,
    error: null,

    getConversations: async () => {
        try {
            set({ loading: true, error: null });
            const res = await api.getConversations();
            const data = res.data?.data || res.data?.conversations || [];
            set({ conversations: data, loading: false });
        } catch (error) {
            set({ error: error.response?.data?.message || "Error obteniendo conversaciones", loading: false });
        }
    },

    createConversation: async (user1Id, user2Id) => {
        try {
            set({ loading: true, error: null });
            const res = await api.createConversation({ user1Id, user2Id });
            const conversation = res.data?.data;
            const exists = get().conversations.some((c) => c._id === conversation._id);
            set({
                conversations: exists ? get().conversations : [conversation, ...get().conversations],
                selectedConversation: conversation,
                loading: false
            });
            return conversation;
        } catch (error) {
            set({ error: error.response?.data?.message || "Error creando conversación", loading: false });
            throw error;
        }
    },

    setSelectedConversation: (conversation) =>
        set({ selectedConversation: conversation })
}));