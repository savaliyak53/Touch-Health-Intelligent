import React from 'react'
import { Route, Routes } from 'react-router-dom'
import LoadingLayout from '../layouts/loading-layout/LoadingLayout'
import { SignUp, Login } from './Lazycontainers'
import Preferences from '../containers/Preferences'
import ROUTES from './Constants'
import UserCondition from '../containers/Questionnaire'
import { RequireAuth } from '../utils/RequireAuth'
import ThankyouForSubmiting from '../containers/ThankyouForSubmiting'
import IntroVideo from '../containers/Introvideo'
import VerificationMessage from '../containers/VerificationMessage'
import PhoneVerification from '../containers/PhoneVerification'
import Dashboard from '../containers/Dashboard'
import Insights from '../containers/Insights'
import Timeline from '../containers/Timeline/index'
import ManageConditions from '../containers/Conditions'
import Diamond from '../components/diamond'
const AppRoutes = () => {
    return (
        <React.Suspense fallback={<LoadingLayout>Loading...</LoadingLayout>}>
            <Routes>
                <Route path={ROUTES.login} element={<Login />} />
                <Route path={ROUTES.signUp} element={<SignUp />} />
                <Route path="*" element={<Login />} />
                <Route
                    path="/verification-message/:userId"
                    element={<VerificationMessage />}
                />
                <Route
                    path="/verify/phone/:userId/:code"
                    element={<PhoneVerification />}
                />

                {/* Protected Routes */}
                <Route element={<RequireAuth />}>
                    <Route path="insights" element={<Insights />} />
                    <Route path="/insights/guideline" element={<Timeline />} />
                    <Route path="/diamond" element={<Diamond />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/conditions" element={<ManageConditions />} />
                    <Route path="/questionnaire" element={<UserCondition />} />
                    <Route
                        path="/questionnaire-submit"
                        element={<ThankyouForSubmiting />}
                    />
                    <Route path="/preferences" element={<Preferences />} />
                    <Route path="/introvideo" element={<IntroVideo />} />
                </Route>
            </Routes>
        </React.Suspense>
    )
}

export default AppRoutes
