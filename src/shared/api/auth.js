import { axiosAuth } from "./api";

export const login = async (data)=>{
    return await axiosAuth.post("/Auth/login", data);
};

export const register = async (data)=>{
    return await axiosAuth.post("/Auth/register", data, {
        headers: { "Content-Type": "multipart/form-data" }
    });
};

export const forgotPassowrd = async (email)=>{
    return await axiosAuth.post("/Auth/forgot-password", { email });
};

export const resetPassword = async (token, newPassword)=>{
    return await axiosAuth.post("/Auth/reset-password", { token, newPassword });
};

export const verifyEmaill = async (token)=>{
    return await axiosAuth.post("/Auth/verify-email", { token });
};

export const updateUserRole = async (userId, roleName)=>{
    return await axiosAuth.put(`/users/${userId}/role`, { roleName });
};

export const getAllUsers = async ()=>{
    const { data } = await axiosAuth.get("/Auth/users");
    return { users: data };
};