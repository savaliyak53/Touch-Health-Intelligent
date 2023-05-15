import axios from 'axios';
import { useContext } from 'react';
import AuthContext from '../contexts/AuthContext';
import { getTokenExpiration, getUser } from './lib';

// eslint-disable-next-line no-undef
const baseURL = process.env.REACT_APP_API_HOST;

const axiosInstance = axios.create({
  baseURL,
});

axiosInstance.interceptors.request.use(async (config) => {
  const context = useContext(AuthContext); 
  const {setUser, setAuthTokens, setExpiration} = context;
  const token = context?.authTokens;
  // const token = localStorage.getItem('token');

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
        setAuthTokens(newToken);
        const userId = getUser(newToken);
        setUser(userId);
        const expiration = getTokenExpiration(newToken);
        setExpiration(expiration);
        // localStorage.setItem('token', newToken);
        // localStorage.setItem('userId', getUser(newToken));
        // localStorage.setItem('expiration', getTokenExpiration(newToken));
        console.log('token refreshed');
        config.headers.Authorization = `Bearer ${newToken}`;
      } else {
        setAuthTokens(null);
        setUser(null);
        setExpiration(null);
        // localStorage.removeItem('userId');
        // localStorage.removeItem('token');
        // localStorage.clear();
        window.location = '/login';
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
    const context = useContext(AuthContext); 
    
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
