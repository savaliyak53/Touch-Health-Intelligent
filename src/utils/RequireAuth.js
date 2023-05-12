import { useLocation, Navigate, Outlet } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios, { AxiosRequestConfig } from 'axios';
import { getTokenExpiration } from '../utils/lib';
import { setUpAxios } from '../utils/axiosNew';

export const RequireAuth = () => {
  const token = localStorage.getItem('token');
  const location = useLocation();

  const [exception, setException] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isToken, setIsToken] = useState(false);

  const axiosConfig = {
    withCredentials: true,
  };

  async function fetchToken() {
    return axios
      .get('/auth/token', axiosConfig)
      .then((response) => {
        setLoading(false);
        return response.data.token; // Handle success
      })
      .catch((error) => {
        // Handle error
      });
  }

  useEffect(() => {
    const getInitialToken = async () => {
      console.log('auth/token called');
      const isLoginPage = window.location.pathname === '/login';
      if (!isLoginPage) {
        try {
          // const response = await axios.get('/auth/token', {
          //   credentials: 'include',
          // } as AxiosRequestConfig<{ credentials: string }>);
          const token = await fetchToken();
          localStorage.setItem('token', token);
          localStorage.setItem('expiration', getTokenExpiration(token));
          setUpAxios(axios, token, getTokenExpiration(token))
            .then(() => {
              if (token) {
                console.log('check user now');
                setIsToken(true);
              } else {
                // navigate('/login');
                setIsToken(false);
              }
              return; // Handle success
            })
            .catch((error) => {
              // Handle error
            });
        } catch (error) {
          // Handle error
        }
      }
      //setUpAxios(axios);
    };

    getInitialToken();
  }, []);
  return token ? (
    isToken ? (
      <Outlet />
    ) : (
      ''
    )
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};

export const RequireSignup = () => {
  const userId = localStorage.getItem('userId');
  const location = useLocation();

  return userId ? (
    <Outlet />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};
