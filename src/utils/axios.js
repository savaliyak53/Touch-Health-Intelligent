import axios from 'axios';
import { getTokenExpiration, getUser } from './lib';

// eslint-disable-next-line no-undef
const baseURL = process.env.REACT_APP_API_HOST;

const axiosInstance = axios.create({
  baseURL,
});

axiosInstance.interceptors.request.use(async (config) => {
  const token = localStorage.getItem('token');

  if (token) {
    const expiration = getTokenExpiration(token);
    const now = Math.floor(Date.now() / 1000);
    if (expiration - now < 10 || now > expiration) {
      const axiosConfig = {
        withCredentials: true,
      };

      const response = await axios.get(`${baseURL}/auth/token`, axiosConfig);
      if (response) {
        const newToken = response.data.token;
        localStorage.setItem('token', newToken);
        localStorage.setItem('userId', getUser(newToken));
        config.headers.Authorization = `Bearer ${newToken}`;
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
