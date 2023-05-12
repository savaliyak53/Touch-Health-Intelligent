import React, { useEffect, useState } from 'react';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import AppRoutes from './Routes/index';
import './app.scss';
import 'antd/dist/antd.min.css';
import InsightContext from './contexts/InsightContext';
import { setUpAxios } from './utils/axiosNew';
import { getTokenExpiration } from './utils/lib';

const version = 'v.0.0.5';

console.log(version);

const Application = () => {
  return (
    <>
      <InsightContext>
        <AppRoutes />
      </InsightContext>
      <ToastContainer />
    </>
  );
};

export default Application;

// import React, { useEffect } from 'react';
// import axios, { AxiosRequestConfig } from 'axios';

// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// import AppRoutes from './Routes/index';
// import './app.scss';
// import 'antd/dist/antd.min.css';
// import InsightContext from './contexts/InsightContext';
// import { setUpAxios } from './utils/axiosNew';
// import jwt_decode from 'jwt-decode';

// const version = 'v.0.0.5';

// console.log(version);

// const Application = () => {
//   useEffect(() => {
//     const getInitialToken = async () => {
//       const isLoginPage = window.location.pathname === '/login'; // Check if user is on the login page
//       const token = localStorage.getItem('token');
//       const expiration = localStorage.getItem('expiration');
//       if (!isLoginPage && !token && !expiration) {
//         // Skip token retrieval if user is on the login page

//         try {
//           const response = await axios.get('/auth/token', {
//             credentials: 'include',
//           } as AxiosRequestConfig<{ credentials: string }>);
//           const token = response?.data?.token;
//           const decodedToken: any = jwt_decode(token);
//           console.log('decoded_token', decodedToken);
//           const expiration = decodedToken.exp;
//           // const expiration = response?.data?.session?.expire_at;
//           localStorage.setItem('token', token);
//           localStorage.setItem('expiration', expiration);
//           console.log('auth/token called');
//         } catch (error) {
//           // Handle error
//         }
//       }
//       setUpAxios(axios);
//     };

//     getInitialToken();
//   }, []);

//   return (
//     <>
//       <InsightContext>
//         <AppRoutes />
//       </InsightContext>
//       <ToastContainer />
//     </>
//   );
// };

// export default Application;
