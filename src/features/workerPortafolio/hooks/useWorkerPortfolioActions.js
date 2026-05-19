// src/features/workerPortafolio/hook/useWorkerPortfolioActions.js
import { useWorkerPortfolioStore } from '../../users/Store/adminStore.js';

export const useWorkerPortfolioActions = () => {
    const getAllPortfolios      = useWorkerPortfolioStore((state) => state.getAllPortfolios);
    const moderatePortfolio    = useWorkerPortfolioStore((state) => state.moderatePortfolio);
    const updatePortfolioImage = useWorkerPortfolioStore((state) => state.updatePortfolioImage);
    const clearError           = useWorkerPortfolioStore((state) => state.clearError);

    // ── Cargar lista completa ────────────────────────────────────
    const handleFetch = async () => {
        await getAllPortfolios();
    };

    // ── Toggle ACTIVE / INACTIVE con confirmación ────────────────
    const handleModerate = async (portfolio, onSuccess) => {
        if (portfolio.status === 'ACTIVE') {
            const confirmed = window.confirm(
                `¿Confirmas que deseas desactivar este registro de ${portfolio.workerId?.firstName || 'este trabajador'}? Se notificará al usuario.`
            );
            if (!confirmed) return;
        }
        try {
            const result = await moderatePortfolio(portfolio._id);
            onSuccess?.(result.data);
        } catch {
            // El error queda en el store
        }
    };

    // ── Actualizar imagen de un registro ─────────────────────────
    const handleUpdateImage = async (portfolioId, imageFile, onSuccess) => {
        if (!(imageFile instanceof File)) {
            console.warn('useWorkerPortfolioActions: se requiere un objeto File válido');
            return;
        }
        const formData = new FormData();
        formData.append('portfolioImage', imageFile);
        try {
            const result = await updatePortfolioImage(portfolioId, formData);
            onSuccess?.(result.imageUrl);
        } catch {
            // El error queda en el store
        }
    };

    // ── Limpiar error del store desde la UI ──────────────────────
    const handleClearError = () => clearError();

    return {
        handleFetch,
        handleModerate,
        handleUpdateImage,
        handleClearError
    };
};