import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AppRoutes from './Routes/index';
import './app.scss';
import 'antd/dist/antd.min.css';
import ErrorBoundary from 'components/ErrorBoundary';

const version = 'v.0.0.5';
console.log(version);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Application = () => {
  return (
    <ErrorBoundary>
      <AppRoutes />
      <ToastContainer />
    </ErrorBoundary>
  );
};
export default Application;
