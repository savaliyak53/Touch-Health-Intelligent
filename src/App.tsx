import React from 'react'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import AppRoutes from './Routes/index'
import './app.scss'
import 'antd/dist/antd.min.css'
import { StoreProvider } from './Store/store'

const Application = () => {
    return (
        <>
            <StoreProvider>
                <AppRoutes />
            </StoreProvider>
            <ToastContainer />
        </>
    )
}

export default Application
