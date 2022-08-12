import React from 'react';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import AppRoutes from './Routes/index';
import './app.scss';
import 'antd/dist/antd.min.css';
import InsightContext from './contexts/InsightContext';

const version = 'v.0.0.4';

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
