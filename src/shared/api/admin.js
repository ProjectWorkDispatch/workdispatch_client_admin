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
 