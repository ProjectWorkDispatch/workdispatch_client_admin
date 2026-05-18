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
export const getUsers = async () => {
    try {
        return await axiosAdmin.get('/users');
    } catch (err) {
        if (err.response?.status === 404) return await axiosAdmin.get('/user');
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

// ================= VERIFICATIONS (tus entidades) =================

// GET /verifications — listar todas
export const getVerifications = async () =>
    await axiosAdmin.get('/verifications');

// PUT /verifications/:id — actualización general
// Acepta FormData porque puede incluir documentImageFront y/o documentImageBack
// Si no hay imágenes, igual se puede enviar FormData con solo campos de texto,
// o pasar un objeto plano — la función detecta cuál es y ajusta el Content-Type.
export const updateVerification = async (id, data) => {
    const isFormData = data instanceof FormData;
    return await axiosAdmin.put(`/verifications/${id}`, data, {
        headers: isFormData
            ? { 'Content-Type': 'multipart/form-data' }
            : { 'Content-Type': 'application/json' }
    });
};

// PATCH /verifications/:id/status — aprobar o rechazar (JSON puro)
// Body esperado: { status, reviewedBy, rejectionReason? }
export const updateVerificationStatus = async (id, statusData) =>
    await axiosAdmin.patch(`/verifications/${id}/status`, statusData);

// ================= WORKER PORTFOLIO (tus entidades) =================

// GET /PortFolio — listar todos
export const getAllPortfolios = async () =>
    await axiosAdmin.get('/PortFolio');

// PATCH /PortFolio/moderate/:id — toggle ACTIVE/INACTIVE (JSON puro, sin body)
export const moderatePortfolio = async (id) =>
    await axiosAdmin.patch(`/PortFolio/moderate/${id}`);

// PATCH /PortFolio/:id/image — reemplazar imagen (FormData con campo portfolioImage)
export const updatePortfolioImage = async (id, formData) =>
    await axiosAdmin.patch(`/PortFolio/${id}/image`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });