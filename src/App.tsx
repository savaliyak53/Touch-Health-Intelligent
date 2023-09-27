import React from 'react';
import { ToastContainer } from 'react-toastify';
import AppRoutes from './Routes/index';
import './app.scss';
import 'antd/dist/antd.min.css';
import ErrorBoundary from 'components/ErrorBoundary';
import useSocket from 'hooks/useSocket';
import useDashboardData from 'hooks/useDashboardData';
import 'react-toastify/dist/ReactToastify.min.css';

const version = 'v.0.0.5';

const Application = () => {
  useDashboardData();
  useSocket();
  return (
    <ErrorBoundary>
      <AppRoutes />
      <ToastContainer 
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        theme="light" />
    </ErrorBoundary>
  );
};
export default Application;
