import React from 'react'
import { Route, Routes } from 'react-router-dom'

import LoadingLayout from '../layouts/loading-layout/LoadingLayout'
import { SignUp } from './Lazycontainers'
import ROUTES from './Constants'

const AppRoutes = () => {
    return (
        <React.Suspense fallback={<LoadingLayout>Loading...</LoadingLayout>}>
            <Routes>
                <Route path={ROUTES.signUp} element={<SignUp />} />
            </Routes>
        </React.Suspense>
    )
}

export default AppRoutes
