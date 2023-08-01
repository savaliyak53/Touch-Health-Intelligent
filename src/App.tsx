import React, { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AppRoutes from './Routes/index';
import './app.scss';
import 'antd/dist/antd.min.css';
import ErrorBoundary from './components/ErrorBoundary';
import {io} from "socket.io-client";

const ENDPOINT = '' + process.env.REACT_APP_SOCKET_HOST;

const version = 'v.0.0.5';
console.log(version);

const Application = () => {

  const [data, setData] = useState();

  useEffect(() => {
    const socket = io(ENDPOINT, {
      path: "/socket.io", forceNew: true, reconnectionAttempts: 3, timeout: 2000, withCredentials: true
    });
  
    socket.on('serverMessage', (data:any) => {
      setData(data)
    });

  }, [])

  return (
    <ErrorBoundary>
      <AppRoutes />
      <ToastContainer />
    </ErrorBoundary>
  );
};
export default Application;
