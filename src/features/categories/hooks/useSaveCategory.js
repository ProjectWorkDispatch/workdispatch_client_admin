import { useState } from "react";
import { useCategoryStore } from "../../../features/users/Store/adminStore";

export const useSaveCategory = ({
    category = null,
    onClose
}) => {
    const {
        createCategory,
        updateCategory
    } = useCategoryStore();

    const [form, setForm] = useState({
        name: category?.name || "",
        description: category?.description || ""
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        if (e?.preventDefault) {
            e.preventDefault();
        }

        try {
            setLoading(true);

            if (category) {
                await updateCategory(category._id, form);
            } else {
                await createCategory(form);
            }

            onClose();
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return {
        form,
        loading,
        handleChange,
        handleSubmit
    };
};