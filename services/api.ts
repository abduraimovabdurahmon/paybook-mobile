
// services/api.ts
import axios from 'axios';
import { getAccessToken, getRefreshToken, removeAccessToken, removeRefreshToken, setAccessToken } from './storage';

const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL;
console.log('API_BASE_URL:', API_BASE_URL);

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'ngrok-skip-browser-warning': 'true' 
  },
});

let isRefreshing = false;
let failedQueue: { resolve: (value: any) => void; reject: (reason?: any) => void }[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

api.interceptors.request.use(
  async config => {
    const token = await getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    
    // 401 (Unauthorized) YOKI 403 (Forbidden) holatlarda token yangilashga urinish
    if ((error.response?.status === 403) && !originalRequest._retry) {
      console.log('Access token eskirgan (403). Tokenni yangilashga urinish...');
      
      if (isRefreshing) {
        // Agar token yangilanayotgan bo'lsa, so'rovni navbatga qo'shish
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(token => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return api(originalRequest);
          })
          .catch(err => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshToken = await getRefreshToken();
        if (!refreshToken) {
          throw new Error('Yangilash tokeni mavjud emas');
        }

        console.log('Refresh token bilan yangi access token so\'ralmoqda...');
        const response = await axios.post(`${API_BASE_URL}/api/auth/refresh`, { refreshToken });
        const { accessToken } = response.data.data;
        
        if (!accessToken) {
          throw new Error('Yangi access token olinmadi');
        }

        console.log('Yangi access token olindi:', accessToken);
        await setAccessToken(accessToken);
        api.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        
        processQueue(null, accessToken);
        return api(originalRequest);
      } catch (refreshError) {
        console.error('Token yangilashda xato:', refreshError);
        processQueue(refreshError, null);
        await removeAccessToken();
        await removeRefreshToken();
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;