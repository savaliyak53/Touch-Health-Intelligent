import React from 'react'
import { Route, Routes } from 'react-router-dom'
import LoadingLayout from '../layouts/loading-layout/LoadingLayout'
import { SignUp, Login, Verify } from './Lazycontainers'
import Preferences from '../containers/Preferences'
import ROUTES from './Constants'
import UserCondition from '../containers/Questionnaire'
import { RequireAuth } from '../utils/RequireAuth'
import ThankyouForSubmiting from '../containers/ThankyouForSubmiting'
import IntroVideo from '../containers/Introvideo'
import EmailVerification from '../containers/EmailVerification'
import VerificationMessage from '../containers/VerificationMessage'
import PhoneVerification from '../containers/PhoneVerification'

const AppRoutes = () => {
    return (
        <React.Suspense fallback={<LoadingLayout>Loading...</LoadingLayout>}>
            <Routes>
                <Route path={ROUTES.signUp} element={<SignUp />} />
                <Route path={ROUTES.login} element={<Login />} />
                <Route path="/" element={<SignUp />} />
                <Route path="*" element={<SignUp />} />
                <Route path="/verify/:userId" element={<Verify />} />
                <Route
                    path="/verification-message"
                    element={<VerificationMessage />}
                />
                <Route
                    path="/verify-email/:userId/:code"
                    element={<EmailVerification />}
                />
                <Route
                    path="/verify-phone/:userId/:code"
                    element={<PhoneVerification />}
                />
                {/* Protected Routes */}
                <Route element={<RequireAuth />}>
                    <Route path="/introvideo" element={<IntroVideo />} />
                    <Route
                        path="/questionnaire/:userId"
                        element={<UserCondition />}
                    />
                    <Route
                        path="/preferences/:userId"
                        element={<Preferences />}
                    />
                    <Route
                        path="/questionnaire-submit"
                        element={<ThankyouForSubmiting />}
                    />
                </Route>
            </Routes>
        </React.Suspense>
    )
}

export default AppRoutes
