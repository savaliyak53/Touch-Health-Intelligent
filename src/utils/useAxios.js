import axios from 'axios';
import { getTokenExpiration, getUser } from './lib';

// eslint-disable-next-line no-undef
const baseURL = process.env.REACT_APP_API_HOST;

const useAxios = (authTokens, setAuthTokens, setUser, logoutUser ) => {
  let token = authTokens;
  async function fetchToken(axiosConfig) {
    const response = await fetch(`${baseURL}/auth/token`, axiosConfig)
    return response.json();
  }
 
  axios.interceptors.request.use(async (req) => {
      if (token) {
        req.headers.Authorization = `Bearer ${authTokens}`;
        const expiration = getTokenExpiration(token);
        const now = Math.floor(Date.now() / 1000);
  
        if (expiration - now < 10 || now > expiration) {
          console.log('im in expired');
          const axiosConfig = {
            method: "GET",
            'credentials': 'include',
          }; 
          await fetchToken(axiosConfig)
          .then(response => {
            console.log(response);
            if (response) {
              const newToken = response.token;
              setAuthTokens(newToken);
              const userId = getUser(newToken);
              setUser(userId);
              req.headers.Authorization = `Bearer ${newToken}`;
              return req;
            }
          })
          .catch(err => {
            console.log(err);
          });
          return req;
        } else {
          req.headers.Authorization = `Bearer ${token}`;
          return req;
        }
      } else {
        console.log('token not found');
        return req;
      }
  });
  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      console.log(error);
      if (error.response.status === 409) {
        return Promise.reject(error);
      } else if (error.response.status === 401) {
          logoutUser();
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
};

export default useAxios;
