import { useReportStore } from "../../users/Store/adminStore.js";
 
export const useReportActions = () => {
    const resolveReport = useReportStore((state) => state.resolveReport);
 
    /**
     * Resuelve un reporte (Status: false en el backend).
     * @param {string} reportId
     * @param {Function} onResolved - callback opcional para sincronizar el modal
     */
    const handleResolve = async (reportId, onResolved) => {
        await resolveReport(reportId);
        onResolved?.();
    };
 
    /**
     * Sanciona al usuario — confirma con window.confirm antes de resolver.
     * @param {string} reportId
     * @param {Function} onResolved - callback opcional para sincronizar el modal
     */
    const handleSanction = (reportId, onResolved) => {
        const confirmed = window.confirm("¿Confirmas la sanción al usuario reportado? El reporte quedará marcado como resuelto.");
        if (confirmed) handleResolve(reportId, onResolved);
    };
 
    /**
     * Ignora el reporte — confirma con window.confirm antes de resolver.
     * @param {string} reportId
     * @param {Function} onResolved - callback opcional para sincronizar el modal
     */
    const handleIgnore = (reportId, onResolved) => {
        const confirmed = window.confirm("¿Confirmas que deseas ignorar este reporte? Quedará marcado como resuelto.");
        if (confirmed) handleResolve(reportId, onResolved);
    };
 
    return { handleResolve, handleSanction, handleIgnore };
};
 