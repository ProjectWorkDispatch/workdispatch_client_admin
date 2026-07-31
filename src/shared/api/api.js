import axios from 'axios';

import { useAuthStore } from '../../features/auth/store/authStore.js';

// Instacia de axios
const DEFAULT_API_URL = "http://localhost:3001/workDispatch/v1";
const authBaseURL = import.meta.env.VITE_AUTH_URL || DEFAULT_API_URL;
const adminBaseURL = import.meta.env.VITE_ADMIN_URL || DEFAULT_API_URL;

if (!import.meta.env.VITE_AUTH_URL || !import.meta.env.VITE_ADMIN_URL) {
  console.warn(
    "Vite env variables VITE_AUTH_URL or VITE_ADMIN_URL are not defined. Using fallback:",
    { authBaseURL, adminBaseURL }
  );
}

const axiosAuth = axios.create({
  baseURL: authBaseURL,
  timeout: 8000,
  headers:{
      "Content-Type": "application/json",
  }
});

const axiosAdmin = axios.create({
  baseURL: adminBaseURL,
  timeout: 80000,
  headers:{
      "Content-Type": "application/json",
  }
});

axiosAdmin.interceptors.response.use(
    (response) => response,
    (error) => {
        const status = error.response?.status;
        const code   = error.response?.data?.error;

        if (status === 401 && (code === 'TOKEN_EXPIRED' || code === 'MISSING_TOKEN' || code === 'INVALID_TOKEN')) {
            // Limpia el store y redirige al login sin recargar la app
            useAuthStore.getState().logout();
            window.location.href = '/';
        }

        return Promise.reject(error);
    }
);

// Configuración de interceptores
axiosAuth.interceptors.request.use((config) => {
    config._axiosClient = "auth";
    const token = useAuthStore.getState().token;
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

axiosAdmin.interceptors.request.use((config) => {
  config._axiosClient = "admin";
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// configuración de documentación axios
let _isRefreshing = false;
let failedQueue = [];

function _processQueue(_error, token = null) {
  failedQueue.forEach(({ resolve, reject }) =>
    _error ? reject(_error) : resolve(token),
  );
  failedQueue = [];
}

const handleRefreshToken = async function (_error) {
  const _original = _error.config;
  if (!_original || _original._retry) {
    // Ya se reintentó o no hay config
    return Promise.reject(_error);
  }
  const status = _error.response?.status;
  const errorCode = _error.response?.data?.error;
  const requestUrl = _original.url || "";
  const isRefreshEndpoint =
    requestUrl.includes("/users/refresh") ||
    requestUrl.includes("/Auth/refresh") ||
    requestUrl.includes("/auth/refresh");
  const shouldAttemptRefresh =
    !isRefreshEndpoint &&
    // La mayoría de casos es 401 (TokenExpiredError)
    status === 401;

  // Algunos servicios pueden responder 403 con `error: TOKEN_EXPIRED`
  const shouldAttemptRefreshFrom403 =
    !isRefreshEndpoint && status === 403 && errorCode === "TOKEN_EXPIRED";

  const shouldRefresh = shouldAttemptRefresh || shouldAttemptRefreshFrom403;

  if (shouldRefresh) {
    const retryClient =
      _original._axiosClient === "admin" ? axiosAdmin : axiosAuth;
    if (_isRefreshing) {
      // Si ya hay un refresh en curso, encola la petición
      return new Promise(function (resolve, reject) {
        failedQueue.push({ resolve, reject });
      })
        .then((token) => {
          _original.headers["Authorization"] = "Bearer " + token;
          return retryClient(_original);
        })
        .catch((err) => Promise.reject(err));
    }
    _original._retry = true;
    _isRefreshing = true;
    const refreshToken = useAuthStore.getState().refreshToken;
    if (!refreshToken) {
      useAuthStore.getState().logout();
      return Promise.reject(_error);
    }
    try {
      let response;
      try {
        response = await axiosAdmin.post("/users/refresh", { refreshToken });
      } catch (refreshError) {
        if (refreshError.response?.status === 404) {
          response = await axiosAuth.post("/Auth/refresh", { refreshToken });
        } else {
          throw refreshError;
        }
      }
      const {
        accessToken,
        refreshToken: newRefreshToken,
        expiresIn,
        userDetails,
      } = response.data;
      useAuthStore.setState({
        token: accessToken,
        refreshToken: newRefreshToken,
        expiresAt: typeof expiresIn === 'number' && expiresIn < 1e12 ? Date.now() + expiresIn * 1000 : expiresIn,
        user: userDetails || useAuthStore.getState().user,
        isAuthenticated: true,
      });
      _processQueue(null, accessToken);
      _original.headers["Authorization"] = "Bearer " + accessToken;
      return retryClient(_original);
    } catch (err) {
      _processQueue(err, null);
      useAuthStore.getState().logout();
      return Promise.reject(err);
    } finally {
      _isRefreshing = false;
    }
  }
  return Promise.reject(_error);
};

axiosAuth.interceptors.response.use((res) => res, handleRefreshToken);

axiosAdmin.interceptors.response.use((res) => res, handleRefreshToken);

// ================= EXPORT AXIOS =================
export { axiosAuth, axiosAdmin };
export { handleRefreshToken };