import { useNotificationStore } from "../../../features/users/Store/adminStore.js";
 
export const useSaveNotification = () => {
    const createNotification = useNotificationStore((state) => state.createNotification);
    const updateNotification = useNotificationStore((state) => state.updateNotification);

    const saveNotification = async (data, notificationId = null) => {
        const payload = {
            userId: data.userId,
            Message: data.Message,
            Type: data.Type,
        };
 
        if (notificationId) {
            // PUT /notification/:id
            await updateNotification(notificationId, payload);
        } else {
            // POST /notification
            return await createNotification(payload);
        }
    };
 
    return { saveNotification };
};
 