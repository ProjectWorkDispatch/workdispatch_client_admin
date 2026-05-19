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

    // ── GET /verifications ───────────────────────────────────────
    // El controlador responde { success: true, data: [...] }
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

    // ── PUT /verifications/:id ───────────────────────────────────
    // Acepta FormData (con imágenes) o un objeto plano (solo texto).
    // El controlador responde { success: true, data: {...} }
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

    // ── PATCH /verifications/:id/status ─────────────────────────
    // statusData: { status, reviewedBy, rejectionReason? }
    // El controlador responde { success: true, message: '...' }
    // y NO devuelve el documento actualizado, así que recargamos
    // la lista completa para reflejar el cambio en la UI.
    updateVerificationStatus: async (id, statusData) => {
        try {
            set({ loading: true, error: null });
            await api.updateVerificationStatus(id, statusData);
            // Recarga la lista completa para sincronizar el estado real de la BD
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

    // ── Limpiar error manualmente desde la UI ────────────────────
    clearError: () => set({ error: null })
}));

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// WORKER PORTFOLIO STORE
// Acciones del Admin: listar, moderar (toggle ACTIVE/INACTIVE),
// actualizar imagen de un registro.
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const useWorkerPortfolioStore = create((set, get) => ({
    portfolios: [],
    loading: false,
    error: null,

    // ── GET /PortFolio ───────────────────────────────────────────
    // El controlador responde { success: true, portfolios: [...] }
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

    // ── PATCH /PortFolio/moderate/:id ────────────────────────────
    // Toggle ACTIVE ↔ INACTIVE. El controlador responde { success: true, record: {...} }
    // Actualizamos solo el registro afectado en el array local (sin recargar todo).
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

    // ── PATCH /PortFolio/:id/image ───────────────────────────────
    // formData debe contener el campo portfolioImage (File).
    // El controlador responde { success: true, imageUrl: '...' }
    // Actualizamos solo el imageUrl del registro afectado.
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

    // ── Limpiar error manualmente desde la UI ────────────────────
    clearError: () => set({ error: null })
}));

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SERVICE REQUEST STORE
//
// Orquestación frontend:
//   1. Llama a GET /service-requests  → array de solicitudes
//   2. Llama a GET /services          → array de trabajos en ejecución
//   3. Cruza ambos arrays por serviceRequest._id === service.serviceRequestId
//      y construye `enrichedRequests`: cada solicitud lleva opcionalmente
//      un campo `service` con el trabajo activo vinculado.
//
// El admin solo puede cambiar status en ambas entidades (no crear ni editar).
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const useServiceRequestStore = create((set, get) => ({
    // ── Estado ───────────────────────────────────────────────────
    serviceRequests:  [],   // raw de /service-requests
    services:         [],   // raw de /services
    enrichedRequests: [],   // resultado del cruce (fuente de la tabla)
    loading:          false,
    error:            null,

    // ── Helpers privados (no expuestos como acciones) ─────────────

    /** Cruza serviceRequests con services y devuelve el array enriquecido. */
    _buildEnriched: (serviceRequests, services) => {
        // Construimos un mapa serviceRequestId → service para O(1) lookup
        const serviceMap = services.reduce((acc, svc) => {
            const key = svc.serviceRequestId?._id ?? svc.serviceRequestId;
            if (key) acc[key] = svc;
            return acc;
        }, {});

        return serviceRequests.map((req) => ({
            ...req,
            // Si existe un Service vinculado a esta solicitud, lo adjuntamos
            service: serviceMap[req._id] ?? null,
        }));
    },

    // ── Acciones públicas ─────────────────────────────────────────

    /**
     * Carga AMBAS entidades en paralelo y construye enrichedRequests.
     * Llamar desde el componente en el useEffect inicial.
     */
    fetchAll: async () => {
        try {
            set({ loading: true, error: null });

            // Peticiones en paralelo → menor latencia
            const [srRes, svcRes] = await Promise.all([
                api.getServiceRequests(),
                api.getServices(),
            ]);

            // Normalización defensiva — el backend puede devolver distintas shapes
            const serviceRequests =
                srRes.data?.serviceRequests ??
                srRes.data?.data ??
                (Array.isArray(srRes.data) ? srRes.data : []);

            const services =
                svcRes.data?.services ??
                svcRes.data?.data ??
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

    /**
     * Cambia el status de una ServiceRequest.
     * Actualiza la lista local sin recargar todo.
     * @param {string} id      - _id de la ServiceRequest
     * @param {string} status  - nuevo estado (ej. "CANCELLED", "CLOSED")
     */
    changeServiceRequestStatus: async (id, status) => {
        try {
            set({ loading: true, error: null });
            const res = await api.updateServiceRequestStatus(id, status);

            // El backend puede devolver el doc actualizado o solo { success: true }
            const updated = res.data?.serviceRequest ?? res.data?.data ?? null;

            set((state) => {
                const serviceRequests = updated
                    ? state.serviceRequests.map((r) => (r._id === id ? updated : r))
                    : state.serviceRequests.map((r) =>
                          r._id === id ? { ...r, status } : r
                      );

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

    /**
     * Cambia el status de un Service (trabajo en ejecución).
     * Actualiza la lista local sin recargar todo.
     * @param {string} id      - _id del Service
     * @param {string} status  - nuevo estado (ej. "COMPLETED", "CANCELLED")
     */
    changeServiceStatus: async (id, status) => {
        try {
            set({ loading: true, error: null });
            const res = await api.updateServiceStatus(id, status);

            const updated = res.data?.service ?? res.data?.data ?? null;

            set((state) => {
                const services = updated
                    ? state.services.map((s) => (s._id === id ? updated : s))
                    : state.services.map((s) =>
                          s._id === id ? { ...s, status } : s
                      );

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

    // ── Utilidades ────────────────────────────────────────────────
    clearError: () => set({ error: null }),
}));