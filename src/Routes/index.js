import React from 'react'
import { Route, Routes } from 'react-router-dom'
import LoadingLayout from '../layouts/loading-layout/LoadingLayout'
import { SignUp, Login, Verify } from './Lazycontainers'
import Preferences from '../containers/Preferences'
import ROUTES from './Constants'

const AppRoutes = () => {
    return (
        <React.Suspense fallback={<LoadingLayout>Loading...</LoadingLayout>}>
            <Routes>
                <Route path={ROUTES.signUp} element={<SignUp />} />
                <Route path={ROUTES.login} element={<Login />} />
                <Route path="/" element={<SignUp />} />
                <Route path="/verify/:userId" element={<Verify />} />
                <Route path="*" element={<SignUp />} />
                <Route path="/preferences/:userId" element={<Preferences />} />
            </Routes>
        </React.Suspense>
    )
}

export default AppRoutes
