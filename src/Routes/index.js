import React from 'react'
import { Route, Routes } from 'react-router-dom'
import LoadingLayout from '../layouts/loading-layout/LoadingLayout'
import { SignUp, Login } from './Lazycontainers'
import Preferences from '../containers/Preferences'
import ROUTES from './Constants'
import UserCondition from '../containers/Questionnaire'
import { RequireAuth, RequireSignup } from '../utils/RequireAuth'
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
                <Route
                    path="/verification-message/:userId"
                    element={<VerificationMessage />}
                />
                {/* Protected Routes */}
                <Route
                    path="/verify/email/:userId/:code"
                    element={<EmailVerification />}
                />
                <Route
                    path="/verify/phone/:userId/:code"
                    element={<PhoneVerification />}
                />
                <Route path="/questionnaire" element={<UserCondition />} />
                <Route element={<RequireAuth />}>
                    <Route path="/introvideo" element={<IntroVideo />} />
                    <Route path="/preferences" element={<Preferences />} />
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
