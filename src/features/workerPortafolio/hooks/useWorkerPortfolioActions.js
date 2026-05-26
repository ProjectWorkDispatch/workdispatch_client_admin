import { useWorkerPortfolioStore } from '../../users/Store/adminStore.js';
import toast from 'react-hot-toast';

export const useWorkerPortfolioActions = () => {
    const getAllPortfolios      = useWorkerPortfolioStore((state) => state.getAllPortfolios);
    const moderatePortfolio    = useWorkerPortfolioStore((state) => state.moderatePortfolio);
    const updatePortfolioImage = useWorkerPortfolioStore((state) => state.updatePortfolioImage);
    const clearError           = useWorkerPortfolioStore((state) => state.clearError);

    const handleFetch = async () => {
        await getAllPortfolios();
    };

    const handleModerate = async (portfolio, onSuccess) => {
        try {
            const result = await moderatePortfolio(portfolio._id);
            const newStatus = result.data?.status;
            toast.success(newStatus === 'INACTIVE' ? 'Registro desactivado' : 'Registro reactivado');
            onSuccess?.(result.data);
        } catch {
            toast.error('Error al cambiar el estado del registro');
        }
    };

    const handleUpdateImage = async (portfolioId, imageFile, onSuccess) => {
        if (!(imageFile instanceof File)) return;
        const formData = new FormData();
        formData.append('portfolioImage', imageFile);
        try {
            const result = await updatePortfolioImage(portfolioId, formData);
            onSuccess?.(result.imageUrl);
        } catch {
            toast.error('Error al actualizar la imagen');
        }
    };

    const handleClearError = () => clearError();

    return { handleFetch, handleModerate, handleUpdateImage, handleClearError };
};