import axios from 'axios';
import { getUser } from '../services/authservice';
// eslint-disable-next-line no-undef
const baseURL = process.env.REACT_APP_API_HOST;

let authTokens = localStorage.getItem('token')
  ? localStorage.getItem('token')
  : null;
let expiration = localStorage.getItem('expiration')
  ? localStorage.getItem('expiration')
  : null;
const axiosInstance = axios.create({
  baseURL,
  headers: { Authorization: `Bearer ${authTokens?.access}` },
});

axiosInstance.interceptors.request.use(async (req) => {
  if (!authTokens) {
    authTokens = localStorage.getItem('authTokens')
      ? localStorage.getItem('authTokens')
      : null;
    req.headers.Authorization = `Bearer ${authTokens}`;
  }

  const user = getUser(authTokens);
  const now = Math.floor(Date.now() / 1000);
  const isExpired = expiration - now < 10;

  if (!isExpired) return req;

  const response = await axios.post(`${baseURL}/auth/token`, {
    withCredentials: true,
  });

  localStorage.setItem('token', response.data.token);
  req.headers.Authorization = `Bearer ${response.data.token}`;
  return req;
});

export default axiosInstance;
