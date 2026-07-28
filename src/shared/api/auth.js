import { axiosAuth, axiosAdmin } from "./api";

const tryPostPaths = async (paths, data, config = {}) => {
    let lastError;
    for (const path of paths) {
        try {
            return await axiosAuth.post(path, data, config);
        } catch (error) {
            lastError = error;
            if (error.response?.status !== 404) {
                throw error;
            }
        }
    }
    throw lastError;
};

const tryGetPaths = async (paths, config = {}) => {
    let lastError;
    for (const path of paths) {
        try {
            return await axiosAuth.get(path, config);
        } catch (error) {
            lastError = error;
            if (error.response?.status !== 404) {
                throw error;
            }
        }
    }
    throw lastError;
};

const AUTH_BASE_PATH = "/api/v1/Auth";

const postAuth = async (endpoint, data, config = {}) => {
    const paths = [
        `${AUTH_BASE_PATH}/${endpoint}`,
        `/api/v1/auth/${endpoint}`,
        `/api/Auth/${endpoint}`,
        `/Auth/${endpoint}`,
    ];
    return await tryPostPaths(paths, data, config);
};

const getAuth = async (endpoint, config = {}) => {
    const paths = [
        `${AUTH_BASE_PATH}/${endpoint}`,
        `/api/v1/auth/${endpoint}`,
        `/api/Auth/${endpoint}`,
        `/Auth/${endpoint}`,
    ];
    return await tryGetPaths(paths, config);
};

export const login = async (data) => {
    return await axiosAdmin.post("/users/login", data);
};

export const register = async (data) => {
    return await postAuth("register", data, {
        headers: { "Content-Type": "multipart/form-data" },
    });
};

export const forgotPassowrd = async (email) => {
    return await postAuth("forgot-password", { email });
};

export const resetPassword = async (token, newPassword) => {
    return await postAuth("reset-password", { token, newPassword });
};

export const verifyEmaill = async (token) => {
    return await postAuth("verify-email", { token });
};

export const updateUserRole = async (userId, roleName)=>{
    return await axiosAuth.put(`/users/${userId}/role`, { roleName });
};

export const getAllUsers = async () => {
    const { data } = await getAuth("users");
    return { users: data };
};