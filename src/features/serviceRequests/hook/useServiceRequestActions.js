import { useServiceRequestStore } from '../../users/Store/adminStore.js';

export const useServiceRequestActions = () => {
    const fetchServiceRequests       = useServiceRequestStore((s) => s.fetchServiceRequests);
    const changeServiceRequestStatus = useServiceRequestStore((s) => s.changeServiceRequestStatus);
    const clearError                 = useServiceRequestStore((s) => s.clearError);

    const handleFetchAll = async () => {
        await fetchServiceRequests();
    };

    const handleChangeRequestStatus = async (requestId, status, onSuccess) => {
        try {
            await changeServiceRequestStatus(requestId, status);
            onSuccess?.();
        } catch {
            // El error queda en el store
        }
    };

    const handleClearError = () => clearError();

    return {
        handleFetchAll,
        handleChangeRequestStatus,
        handleClearError,
    };
};