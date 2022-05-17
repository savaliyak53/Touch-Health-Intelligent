import React from 'react'
import { Route, Routes } from 'react-router-dom'
import LoadingLayout from '../layouts/loading-layout/LoadingLayout'
import { SignUp, Login, Verify } from './Lazycontainers'
import Preferences from '../containers/Preferences'
import ROUTES from './Constants'
import UserCondition from '../containers/UserCondition'
import { RequireAuth } from '../utils/RequireAuth'

const AppRoutes = () => {
    return (
        <React.Suspense fallback={<LoadingLayout>Loading...</LoadingLayout>}>
            <Routes>
                <Route path={ROUTES.signUp} element={<SignUp />} />
                <Route path={ROUTES.login} element={<Login />} />
                <Route path="/" element={<SignUp />} />
                <Route path="*" element={<SignUp />} />
                <Route path="/verify/:userId" element={<Verify />} />

                {/* Protected Routes */}
                <Route element={<RequireAuth />}>
                    <Route path="/preferences/:userId" element={<Preferences />} />
                    <Route path="/usercondition/:userId" element={<UserCondition />} />
                </Route>

                
            </Routes>
        </React.Suspense>
    )
}

export default AppRoutes
