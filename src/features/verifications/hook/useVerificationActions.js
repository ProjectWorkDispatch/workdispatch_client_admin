// src/features/verifications/hook/useVerificationActions.js
import { useVerificationStore } from '../../users/Store/adminStore.js';
import { useAuthStore } from '../../auth/store/authStore.js';

export const useVerificationActions = () => {
    const getVerifications         = useVerificationStore((state) => state.getVerifications);
    const updateVerification       = useVerificationStore((state) => state.updateVerification);
    const updateVerificationStatus = useVerificationStore((state) => state.updateVerificationStatus);
    const clearError               = useVerificationStore((state) => state.clearError);

    const adminUser = useAuthStore((state) => state.user);

    const handleFetch = async () => {
        await getVerifications();
    };

    const handleApprove = async (verificationId, onSuccess) => {
        if (!adminUser?.id) { // ← era adminUser?._id
            console.error('useVerificationActions: no hay usuario admin en sesión');
            return;
        }
        try {
            await updateVerificationStatus(verificationId, {
                status: 'APPROVED',
                reviewedBy: adminUser.id // ← era adminUser._id
            });
            onSuccess?.();
        } catch {
            // El error queda en el store
        }
    };

    const handleReject = async (verificationId, rejectionReason, onSuccess) => {
        if (!adminUser?.id) { // ← era adminUser?._id
            console.error('useVerificationActions: no hay usuario admin en sesión');
            return;
        }
        if (!rejectionReason || rejectionReason.trim() === '') {
            console.warn('useVerificationActions: se recomienda proporcionar una razón de rechazo');
        }
        try {
            await updateVerificationStatus(verificationId, {
                status: 'REJECTED',
                reviewedBy: adminUser.id, // ← era adminUser._id
                rejectionReason: rejectionReason?.trim() || 'No especificada'
            });
            onSuccess?.();
        } catch {
            // El error queda en el store
        }
    };

    const handleUpdate = async (verificationId, data, onSuccess) => {
        try {
            const result = await updateVerification(verificationId, data);
            onSuccess?.(result.data);
        } catch {
            // El error queda en el store
        }
    };

    const handleUploadDocumentImages = async (verificationId, { documentImageFront, documentImageBack }, onSuccess) => {
        const formData = new FormData();

        if (documentImageFront instanceof File) {
            formData.append('documentImageFront', documentImageFront);
        }
        if (documentImageBack instanceof File) {
            formData.append('documentImageBack', documentImageBack);
        }

        if (!documentImageFront && !documentImageBack) {
            console.warn('useVerificationActions: handleUploadDocumentImages llamado sin archivos');
            return;
        }

        await handleUpdate(verificationId, formData, onSuccess);
    };

    const handleClearError = () => clearError();

    return {
        handleFetch,
        handleApprove,
        handleReject,
        handleUpdate,
        handleUploadDocumentImages,
        handleClearError
    };
};