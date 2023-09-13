import React, { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AppRoutes from './Routes/index';
import './app.scss';
import 'antd/dist/antd.min.css';
import ErrorBoundary from 'components/ErrorBoundary';
import useSocket from 'hooks/useSocket';
import useDashboardData from 'hooks/useDashboardData';

const version = 'v.0.0.5';
console.log(version);

const Application = () => {
  useDashboardData();
  useSocket();
  return (
    <ErrorBoundary>
      <AppRoutes />
      <ToastContainer />
    </ErrorBoundary>
  );
};
export default Application;
