import axios from 'axios';
import jwt_decode from 'jwt-decode';
import dayjs from 'dayjs';
import { handleRefreshToken, getTokenExpiration } from '../utils/lib';

// eslint-disable-next-line no-undef
const baseURL = process.env.REACT_APP_API_HOST;
// const token = localStorage.getItem('token')?
//    localStorage.getItem('token')
//    : null;

const axiosInstance = axios.create({
  baseURL,
  // headers: { Authorization: `Bearer ${token}` },
});

axiosInstance.interceptors.request.use(async (config) => {
  const token = localStorage.getItem('token');

  if (token) {
    const expiration = getTokenExpiration(token);
    const now = Math.floor(Date.now() / 1000);
    console.log('expiration', expiration, 'now', now);
    if (expiration - now < 10) {
      // await handleRefreshToken(setToken); // Implement your token refresh logic
      const newToken = localStorage.getItem('token');
      config.headers.Authorization = `Bearer ${newToken}`;
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
    if (error.response.status === 409) {
      return Promise.reject(error);
    } else if (error.response.status === 401) {
      localStorage.removeItem('userId');
      localStorage.removeItem('token');
      localStorage.clear();
      window.location = '/login';
      return Promise.reject(error);
    } else if (error.response.status === 403) {
      return Promise.reject(error);
    } else if (error.response.status === 429) {
      return Promise.reject(error);
    } else if (error.response.status === 422) {
      return Promise.reject(error);
    }
  }
);

export default axiosInstance;
