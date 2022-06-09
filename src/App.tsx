import React from 'react'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import AppRoutes from './Routes/index'
import './app.scss'
import 'antd/dist/antd.min.css'

const Application = () => {
    return (
        <>
            <AppRoutes />
            <ToastContainer />
        </>
    )
}

export default Application
