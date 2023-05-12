import React, { useEffect, useState } from 'react';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import AppRoutes from './Routes/index';
import './app.scss';
import 'antd/dist/antd.min.css';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import InsightContext from './contexts/InsightContext';

// import { setUpAxios } from './utils/axiosNew';
// import { getTokenExpiration } from './utils/lib';

const version = 'v.0.0.5';

console.log(version);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Application = () => {
  return (
    <>
      <AppRoutes />

      <ToastContainer />
    </>
  );
};
export default Application;
