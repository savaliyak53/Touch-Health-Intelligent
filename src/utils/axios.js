import axios from 'axios';
import { getTokenExpiration, getUser } from './lib';

// eslint-disable-next-line no-undef
const baseURL = process.env.REACT_APP_API_HOST;

let isRefreshing = false;
let tokenRefreshQueue = [];
const axiosInstance = axios.create({
  baseURL,
});

axiosInstance.interceptors.request.use(async (config) => {
  const token = localStorage.getItem('token');

  if (token) {
    const expiration = getTokenExpiration(token);
    const now = Math.floor(Date.now() / 1000);
    if (expiration - now < 10 || now > expiration) {
      if (!isRefreshing) {
        isRefreshing = true;
        try {
          const response = await axios.get(`${baseURL}/auth/token`, { withCredentials: true });
            const newToken = response.data.token;
            localStorage.setItem('token', newToken);
            localStorage.setItem('userId', getUser(newToken));
            config.headers.Authorization = `Bearer ${newToken}`;
            tokenRefreshQueue.forEach((req) => req.resolve(newToken));
            tokenRefreshQueue = [];
        } catch (error) {
          tokenRefreshQueue.forEach((req) => req.reject(error));
          tokenRefreshQueue = [];
          throw error;
        }
        isRefreshing = false;
      } else {
        await new Promise((resolve, reject) => {
          tokenRefreshQueue.push({ resolve, reject });
        });
        config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
      }
    } else {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {    
      return Promise.reject(error);
    }
);

export default axiosInstance;
