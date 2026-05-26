// src/shared/api/admin.js  — ARCHIVO MODIFICADO (se agregan las secciones al final)
import { axiosAdmin } from './api.js';

// ================= NOTIFICATIONS (NOTIFICACIONES) =================
export const getNotifications = async () => await axiosAdmin.get('/notifications');
export const createNotification = async (data) => await axiosAdmin.post('/notifications', data);
export const updateNotification = async (id, data) => await axiosAdmin.put(`/notifications/${id}`, data);

// ================= PROPOSALS (PROPUESTAS) =================
export const getProposals = async (params) => await axiosAdmin.get('/Proposal', { params });
export const deactivateProposal = async (id) => await axiosAdmin.patch(`/Proposal/${id}`);

// ================= REPORTS (REPORTES) =================
export const getReports = async (params) => await axiosAdmin.get('/reports', { params });
export const resolveReport = async (id) => await axiosAdmin.patch(`/reports/resolve/${id}`);
export const sanctionReport = async (id) => await axiosAdmin.patch(`/reports/sanction/${id}`);

// ================= SKILLS (Entidad 1) =================
export const getSkills = async () => {
    try {
        return await axiosAdmin.get('/skill');
    } catch (err) {
        if (err.response?.status === 404) return await axiosAdmin.get('/skills');
        throw err;
    }
};


export const createSkill = async (data) => {
    try {
        return await axiosAdmin.post('/skill', data);
    } catch (err) {
        if (err.response?.status === 404) return await axiosAdmin.post('/skills', data);
        throw err;
    }
};

export const updateSkill = async (id, data) => {
    try {
        return await axiosAdmin.put(`/skill/${id}`, data);
    } catch (err) {
        if (err.response?.status === 404) return await axiosAdmin.put(`/skills/${id}`, data);
        throw err;
    }
};

export const deleteSkill = async (id) => {
    try {
        return await axiosAdmin.patch(`/skill/${id}`);
    } catch (err) {
        if (err.response?.status === 404) return await axiosAdmin.patch(`/skills/${id}`);
        throw err;
    }
};

// ================= USERS (Entidad 2) =================
export const getUsers = async (params) => {
    try {
        return await axiosAdmin.get('/users', { params });
    } catch (err) {
        if (err.response?.status === 404) return await axiosAdmin.get('/user', { params });
        throw err;
    }
};

export const getUserById = async (id) => {
    try {
        return await axiosAdmin.get(`/users/${id}`);
    } catch (err) {
        if (err.response?.status === 404) return await axiosAdmin.get(`/user/${id}`);
        throw err;
    }
};

export const createUser = async (formData) => {
    try {
        return await axiosAdmin.post('/users', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
    } catch (err) {
        if (err.response?.status === 404) return await axiosAdmin.post('/user', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        throw err;
    }
};

export const changeUserStatus = async (id, active) => {
    try {
        return await axiosAdmin.patch(`/users/${id}/status`, { active });
    } catch (err) {
        if (err.response?.status === 404) return await axiosAdmin.patch(`/user/${id}/status`, { active });
        throw err;
    }
};

export const updateUser = async (id, data) => {
    try {
        return await axiosAdmin.put(`/users/${id}`, data, {
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (err) {
        if (err.response?.status === 404) {
            return await axiosAdmin.put(`/user/${id}`, data, {
                headers: { 'Content-Type': 'application/json' }
            });
        }
        throw err;
    }
};

// ================= CATEGORIES (Entidad 0) =================
export const getCategories = async () => {
    try {
        return await axiosAdmin.get('/categories');
    } catch (err) {
        if (err.response?.status === 404) return await axiosAdmin.get('/category');
        throw err;
    }
};

export const createCategory = async (data) => {
    try {
        return await axiosAdmin.post('/categories', data);
    } catch (err) {
        if (err.response?.status === 404) return await axiosAdmin.post('/category', data);
        throw err;
    }
};
export const updateCategory = async (id, data) => {
    try {
        return await axiosAdmin.put(`/categories/${id}`, data);
    } catch (err) {
        if (err.response?.status === 404) {
            return await axiosAdmin.put(`/category/${id}`, data);
        }
        throw err;
    }
};
export const changeCategoryStatus = async (id, status) => {
    try {
        return await axiosAdmin.patch(`/categories/${id}/status`, {
            status
        });
    } catch (err) {
        if (err.response?.status === 404) {
            return await axiosAdmin.patch(`/category/${id}/status`, {
                status
            });
        }
        throw err;
    }
};

// ================= USER SKILLS (Entidad 3) =================
export const getUserSkills = async () => {
    try {
        return await axiosAdmin.get('/userSkill');
    } catch (err) {
        if (err.response?.status === 404) return await axiosAdmin.get('/userSkills');
        throw err;
    }
};

export const assignSkillToUser = async (data) => {
    try {
        return await axiosAdmin.post('/userSkill', data);
    } catch (err) {
        if (err.response?.status === 404) return await axiosAdmin.post('/userSkills', data);
        throw err;
    }
};

export const removeUserSkill = async (id) => {
    try {
        return await axiosAdmin.delete(`/userSkill/${id}`);
    } catch (err) {
        if (err.response?.status === 404) return await axiosAdmin.delete(`/userSkills/${id}`);
        throw err;
    }
};

// ================= VERIFICATIONS =================

export const getVerifications = async () =>
    await axiosAdmin.get('/verifications');

export const updateVerification = async (id, data) => {
    const isFormData = data instanceof FormData;
    return await axiosAdmin.put(`/verifications/${id}`, data, {
        headers: isFormData
            ? { 'Content-Type': 'multipart/form-data' }
            : { 'Content-Type': 'application/json' }
    });
};

export const updateVerificationStatus = async (id, statusData) =>
    await axiosAdmin.patch(`/verifications/${id}/status`, statusData);

// ================= WORKER PORTFOLIO =================

export const getAllPortfolios = async () =>
    await axiosAdmin.get('/PortFolio');

export const moderatePortfolio = async (id) =>
    await axiosAdmin.patch(`/PortFolio/moderate/${id}`);

export const updatePortfolioImage = async (id, formData) =>
    await axiosAdmin.patch(`/PortFolio/${id}/image`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });

// ================= SERVICE REQUESTS =================

export const getServiceRequests = async (params) =>
    await axiosAdmin.get('/serviceRequest', { params });

export const getServiceRequestById = async (id) =>
    await axiosAdmin.get(`/serviceRequest/${id}`);

export const updateServiceRequestStatus = async (id, status) =>
    await axiosAdmin.patch(`/serviceRequest/${id}/status`, { status });

// ================= SERVICES =================

export const getServices = async (params) =>
    await axiosAdmin.get('/Service', { params });

export const getServiceById = async (id) =>
    await axiosAdmin.get(`/Service/${id}`);

export const updateServiceStatus = async (id, status) =>
    await axiosAdmin.patch(`/Service/${id}/status`, { status });

// ================= CONVERSATIONS =================

export const getConversations = async () => {
    try {
        return await axiosAdmin.get("/conversations");
    } catch (err) {
        if (err.response?.status === 404) return await axiosAdmin.get("/conversation");
        throw err;
    }
};

export const createConversation = async (data) => {
    try {
        return await axiosAdmin.post("/conversations", data);
    } catch (err) {
        if (err.response?.status === 404) return await axiosAdmin.post("/conversation", data);
        throw err;
    }
};

export const changeConversationStatus = async (id) => {
    try {
        return await axiosAdmin.patch(`/conversations/${id}/status`);
    } catch (err) {
        if (err.response?.status === 404) return await axiosAdmin.patch(`/conversation/${id}/status`);
        throw err;
    }
};
// ================= MESSAGES =================
export const getMessagesByConversation = async (conversationId) =>
    await axiosAdmin.get(`/messages/${conversationId}`);

export const sendMessage = async (data) =>
    await axiosAdmin.post('/messages', data);

export const getUnreadCount = async () =>
    await axiosAdmin.get('/messages/unread');
// ================= REVIEWS =================

export const getReviews = async () =>
    await axiosAdmin.get('/reviews');

export const deleteReview = async (id) =>
    await axiosAdmin.patch(`/reviews/${id}`);