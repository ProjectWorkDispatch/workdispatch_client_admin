import { axiosAdmin } from "./api";
 
// ================= NOTIFICATIONS (NOTIFICACIONES) =================
export const getNotifications = async () => await axiosAdmin.get("/notifications");
export const createNotification = async (data) => await axiosAdmin.post("/notifications", data);
export const updateNotification = async (id, data) => await axiosAdmin.put(`/notifications/${id}`, data);
 
// ================= PROPOSALS (PROPUESTAS) =================
// Admin: solo puede listar y desactivar
export const getProposals = async (params) => await axiosAdmin.get("/Proposal", { params });
export const deactivateProposal = async (id) => await axiosAdmin.patch(`/Proposal/${id}`);
 
// ================= REPORTS (REPORTES) =================
// Admin: solo puede listar y marcar como resuelto
export const getReports = async (params) => await axiosAdmin.get("/reports", { params });
export const resolveReport = async (id) => await axiosAdmin.patch(`/reports/resolve/${id}`);
 
// ================= SKILLS (Entidad 1) =================
export const getSkills = async () => {
  try {
    return await axiosAdmin.get("/skill");
  } catch (err) {
    if (err.response?.status === 404) return await axiosAdmin.get("/skills");
    throw err;
  }
};

export const createSkill = async (data) => {
  try {
    return await axiosAdmin.post("/skill", data);
  } catch (err) {
    if (err.response?.status === 404) return await axiosAdmin.post("/skills", data);
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
}; // Es el de desactivar

// ================= USERS (Entidad 2) =================
export const getUsers = async () => {
  try {
    return await axiosAdmin.get("/users");
  } catch (err) {
    if (err.response?.status === 404) return await axiosAdmin.get("/user");
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

// ================= CATEGORIES (Entidad 0 - Requerida para Skills) =================
export const getCategories = async () => {
  try {
    return await axiosAdmin.get("/categories");
  } catch (err) {
    if (err.response?.status === 404) return await axiosAdmin.get("/category");
    throw err;
  }
};

export const createCategory = async (data) => {
  try {
    return await axiosAdmin.post("/categories", data);
  } catch (err) {
    if (err.response?.status === 404) return await axiosAdmin.post("/category", data);
    throw err;
  }
};

// ================= USER SKILLS (Entidad 3 - Conexión) =================
export const getUserSkills = async () => {
  try {
    return await axiosAdmin.get("/userSkill");
  } catch (err) {
    if (err.response?.status === 404) return await axiosAdmin.get("/userSkills");
    throw err;
  }
};

export const assignSkillToUser = async (data) => {
  try {
    return await axiosAdmin.post("/userSkill", data);
  } catch (err) {
    if (err.response?.status === 404) return await axiosAdmin.post("/userSkills", data);
    throw err;
  }
};