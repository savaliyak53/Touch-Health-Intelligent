import React from 'react';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import AppRoutes from './Routes/index';
import './app.scss';

const Application = () => {
    return (
        <>
            <AppRoutes />
            <ToastContainer />
        </>
    );
}

export default Application
