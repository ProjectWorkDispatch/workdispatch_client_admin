import { create } from "zustand";
import * as api from "../../../shared/api/admin.js";

// ================= USUARIOS TEMPORALES (para desarrollo local) =================
const MOCK_CATEGORIES = [
    { _id: "646f83a7e527e4d9f8a4b111", name: "Electricidad", description: "Trabajos eléctricos", isActive: true },
    { _id: "646f83a7e527e4d9f8a4b112", name: "Diseño Gráfico", description: "Diseño y arte", isActive: true },
    { _id: "646f83a7e527e4d9f8a4b113", name: "Programación", description: "Desarrollo de software", isActive: true },
    { _id: "646f83a7e527e4d9f8a4b114", name: "Carpintería", description: "Trabajos en madera", isActive: true },
];

const MOCK_USERS = [
    { _id: "user_001", name: "Juan Pérez", email: "juan@example.com", role: "TRABAJADOR", verified: true, isActive: true, createdAt: new Date().toISOString() },
    { _id: "user_002", name: "María González", email: "maria@example.com", role: "TRABAJADOR", verified: true, isActive: true, createdAt: new Date().toISOString() },
    { _id: "user_003", name: "Carlos López", email: "carlos@example.com", role: "CLIENTE", verified: true, isActive: true, createdAt: new Date().toISOString() },
    { _id: "user_004", name: "Ana Martínez", email: "ana@example.com", role: "TRABAJADOR", verified: false, isActive: true, createdAt: new Date().toISOString() },
];

const MOCK_SKILLS = [
    { _id: "646f83a7e527e4d9f8a4b121", name: "Instalación de circuitos", categoryId: "646f83a7e527e4d9f8a4b111", isActive: true, createdAt: new Date().toISOString() },
    { _id: "646f83a7e527e4d9f8a4b122", name: "Reparación de luminarias", categoryId: "646f83a7e527e4d9f8a4b111", isActive: true, createdAt: new Date().toISOString() },
    { _id: "646f83a7e527e4d9f8a4b123", name: "Diseño web", categoryId: "646f83a7e527e4d9f8a4b113", isActive: true, createdAt: new Date().toISOString() },
    { _id: "646f83a7e527e4d9f8a4b124", name: "Edición de imágenes", categoryId: "646f83a7e527e4d9f8a4b112", isActive: true, createdAt: new Date().toISOString() },
    { _id: "646f83a7e527e4d9f8a4b125", name: "Puertas y ventanas", categoryId: "646f83a7e527e4d9f8a4b114", isActive: true, createdAt: new Date().toISOString() },
    { _id: "646f83a7e527e4d9f8a4b126", name: "Backend con Node.js", categoryId: "646f83a7e527e4d9f8a4b113", isActive: true, createdAt: new Date().toISOString() },
];

const MOCK_USER_SKILLS = [
    { _id: "us_001", userId: "user_001", skillId: "skill_001", experience: 5, isVerified: true },
    { _id: "us_002", userId: "user_001", skillId: "skill_002", experience: 3, isVerified: true },
    { _id: "us_003", userId: "user_002", skillId: "skill_003", experience: 7, isVerified: true },
    { _id: "us_004", userId: "user_002", skillId: "skill_006", experience: 4, isVerified: false },
    { _id: "us_005", userId: "user_004", skillId: "skill_004", experience: 2, isVerified: false },
];

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
    users: MOCK_USERS,
    loading: false,
    error: null,

    getUsers: async () => {
        set({ loading: true, error: null });
        try {
            const res = await api.getUsers();
            const data = res.data?.users || res.data?.data || (Array.isArray(res.data) ? res.data : []);
            set({ users: data, loading: false });
        } catch (error) {
            // Si falla API, usa mock data
            set({ users: MOCK_USERS, loading: false, error: null });
            console.warn("Usando usuarios mock (API no disponible)");
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

    toggleUserStatus: async (id, currentStatus) => {
        try {
            const newStatus = !currentStatus;
            await api.changeUserStatus(id, newStatus);
            set((state) => ({
                users: state.users.map((u) =>
                    u._id === id ? { ...u, active: newStatus } : u
                )
            }));
        } catch (error) {
            console.error("Error al cambiar estado:", error);
        }
    }
}));

// ================= SKILLS STORE (Entidad: Catálogo de Habilidades) =================
export const useSkillStore = create((set, get) => ({
    skills: MOCK_SKILLS,
    loading: false,

    getSkills: async () => {
        set({ loading: true });
        try {
            const res = await api.getSkills();
            const skillsArray = res.data?.skills || res.data?.data || (Array.isArray(res.data) ? res.data : []);
            set({ skills: skillsArray, loading: false });
        } catch (error) {
            // Si falla API, usa mock data
            set({ skills: MOCK_SKILLS, loading: false });
            console.warn("Usando habilidades mock (API no disponible)");
        }
    },

    addSkill: async (data) => {
        try {
            const res = await api.createSkill(data);
            await get().getSkills();
        } catch (error) {
            // Si falla API, agrega localmente con ID válido tipo MongoDB
            const idSuffix = Date.now().toString(16).slice(-12).padStart(12, "0");
            const newSkill = {
                _id: `646f83a7e527e4d9f8a4b${idSuffix}`,
                ...data,
                createdAt: new Date().toISOString()
            };
            set({ skills: [...get().skills, newSkill] });
            console.warn("Habilidad agregada localmente (API no disponible)");
        }
    }
}));

// ================= USER SKILLS STORE (Entidad: Relación Usuario-Habilidad) =================
export const useUserSkillStore = create((set, get) => ({
    userSkills: MOCK_USER_SKILLS,
    loading: false,

    getUserSkills: async () => {
        set({ loading: true });
        try {
            const res = await api.getUserSkills();
            const data = res.data?.userSkills || res.data?.data || (Array.isArray(res.data) ? res.data : []);
            set({ userSkills: data, loading: false });
        } catch (error) {
            // Si falla API, usa mock data
            set({ userSkills: MOCK_USER_SKILLS, loading: false });
            console.warn("Usando relaciones usuario-habilidad mock (API no disponible)");
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

// ================= CATEGORIES STORE (Requerido para Skills) =================
export const useCategoryStore = create((set, get) => ({
    categories: MOCK_CATEGORIES,
    loading: false,
    error: null,

    getCategories: async () => {
        try {
            set({ loading: true, error: null });
            const res = await api.getCategories();
            const data = res.data?.categories || res.data?.data || (Array.isArray(res.data) ? res.data : []);
            set({ categories: data, loading: false });
        } catch (error) {
            // Si falla, usa mock data
            set({ categories: MOCK_CATEGORIES, loading: false, error: null });
            console.warn("Usando categorías mock (API no disponible)");
        }
    },

    createCategory: async (data) => {
        try {
            set({ loading: true, error: null });
            const res = await api.createCategory(data);
            const newCategory = res.data?.category || res.data?.data || res.data;
            set({ categories: [...get().categories, newCategory], loading: false });
            return res.data;
        } catch (error) {
            // Si falla, agrega a mock data local
            const newCategory = { _id: `cat_${Date.now()}`, ...data, isActive: true };
            set({ categories: [...get().categories, newCategory], loading: false, error: null });
            console.warn("Categoría agregada localmente (API no disponible)");
            return { category: newCategory };
        }
}
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
    serviceRequests:  [],
    services:         [],
    enrichedRequests: [],
    loading:          false,
    error:            null,

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