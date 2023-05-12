import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { getUser } from '../services/authservice';
import { useContext } from 'react';
import AuthContext from '../contexts/AuthContext';

// eslint-disable-next-line no-undef
const baseURL = process.env.REACT_APP_API_HOST;

const useAxios = () => {
  const { authTokens, setUser, setAuthTokens, expiration } =
    useContext(AuthContext);

  const axiosInstance = axios.create({
    baseURL,
    headers: { Authorization: `Bearer ${authTokens}` },
  });

  axiosInstance.interceptors.request.use(async (req) => {
    const user = getUser(authTokens);
    const now = Math.floor(Date.now() / 1000);
    const isExpired = expiration - now < 10;

    if (!isExpired) return req;

    const response = await axios.post(`${baseURL}/auth/token`, {
      withCredentials: true,
    });

    localStorage.setItem('token', response.data.token);

    setAuthTokens(response.data.token);
    setUser(getUser(response.data.token));

    req.headers.Authorization = `Bearer ${response.data.access}`;
    return req;
  });

  return axiosInstance;
};

export default useAxios;
