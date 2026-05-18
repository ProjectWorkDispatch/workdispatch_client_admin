// src/features/serviceRequests/hook/useServiceRequestActions.js
import { useServiceRequestStore } from '../../users/Store/adminStore.js';

/**
 * Hook de acciones para el módulo "Trabajos" (ServiceRequest + Service).
 * Encapsula la lógica de llamadas al store para que los componentes
 * solo importen este hook y no el store directamente.
 */
export const useServiceRequestActions = () => {
    const fetchAll                   = useServiceRequestStore((s) => s.fetchAll);
    const changeServiceRequestStatus = useServiceRequestStore((s) => s.changeServiceRequestStatus);
    const changeServiceStatus        = useServiceRequestStore((s) => s.changeServiceStatus);
    const clearError                 = useServiceRequestStore((s) => s.clearError);

    /**
     * Carga inicial: ServiceRequests + Services en paralelo.
     * Llamar en el useEffect del componente raíz del módulo.
     */
    const handleFetchAll = async () => {
        await fetchAll();
    };

    /**
     * Cancela o cierra una solicitud (ServiceRequest).
     * @param {string}   requestId - _id de la ServiceRequest
     * @param {string}   status    - "CANCELLED" | "CLOSED"
     * @param {Function} [onSuccess]
     */
    const handleChangeRequestStatus = async (requestId, status, onSuccess) => {
        try {
            await changeServiceRequestStatus(requestId, status);
            onSuccess?.();
        } catch {
            // El error queda en el store; el componente lo lee con el selector
        }
    };

    /**
     * Marca un trabajo en ejecución como completado o cancelado (Service).
     * @param {string}   serviceId - _id del Service
     * @param {string}   status    - "COMPLETED" | "CANCELLED"
     * @param {Function} [onSuccess]
     */
    const handleChangeServiceStatus = async (serviceId, status, onSuccess) => {
        try {
            await changeServiceStatus(serviceId, status);
            onSuccess?.();
        } catch {
            // El error queda en el store
        }
    };

    const handleClearError = () => clearError();

    return {
        handleFetchAll,
        handleChangeRequestStatus,
        handleChangeServiceStatus,
        handleClearError,
    };
};