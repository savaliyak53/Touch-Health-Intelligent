import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AppRoutes from './Routes/index';
import './app.scss';
import 'antd/dist/antd.min.css';
import ErrorBoundary from './components/ErrorBoundary';
import {io} from "socket.io-client";

const ENDPOINT = '' + process.env.REACT_APP_API_HOST + process.env.SOCKET_ENDPOINT;

const version = 'v.0.0.5';
console.log(version);

const [data, setData] = useState();

const socket = io(ENDPOINT);

socket.on('response', (data:any) => {
  setData(data)
});

const Application = () => {
  return (
    <ErrorBoundary>
      <AppRoutes />
      <ToastContainer />
    </ErrorBoundary>
  );
};
export default Application;
