import React, { useEffect, useState, useContext } from 'react';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import AppRoutes from './Routes/index';
import './app.scss';
import 'antd/dist/antd.min.css';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import useAxios from './utils/useAxios';
import AuthContext from './contexts/AuthContext';

const version = 'v.0.0.5';

console.log(version);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Application = () => {
    const context = useContext(AuthContext);
    // useAxios(context?.authTokens, context?.setAuthTokens, context?.setUser)
  return (
    <>
      <AppRoutes />

      <ToastContainer />
    </>
  );
};
export default Application;
