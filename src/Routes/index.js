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
// Mobile Components
import SignUpMobile from '../Mobile/containers/Auth/Signup'
import LoginMobile from '../Mobile/containers/Auth/Login'
import Preference from '../Mobile/containers/Preferences/Preferences'

const AppRoutes = () => {
    return (
        <React.Suspense fallback={<LoadingLayout>Loading...</LoadingLayout>}>
            <Routes>
                <Route path={ROUTES.signUp} element={<SignUp />} />
                <Route path={ROUTES.login} element={<Login />} />
                {/* <Route path="/" element={<SignUp />} /> */}
                <Route path="/S" element={<SignUpMobile />} />{' '}
                {/* Mobile Screen Route*/}
                <Route path="/L" element={<LoginMobile />} />{' '}
                {/* Mobile Screen Route*/}
                <Route path="/P" element={<Preference />} />{' '}
                {/* Mobile Screen Route*/}
                <Route path="*" element={<SignUp />} />
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
                    <Route path="/questionnaire" element={<UserCondition />} />
                    <Route
                        path="/questionnaire-submit"
                        element={<ThankyouForSubmiting />}
                    />
                    <Route
                        path="/dashboard"
                        element={<h1>This will be a dashboard</h1>}
                    />
                    <Route path="/preferences" element={<Preferences />} />
                    <Route path="/introvideo" element={<IntroVideo />} />
                </Route>
            </Routes>
        </React.Suspense>
    )
}

export default AppRoutes
