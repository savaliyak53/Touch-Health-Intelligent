import React, { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import LoadingLayout from '../layouts/loading-layout/LoadingLayout';
import { SignUp, Login } from './Lazycontainers';
import Preferences from '../containers/Preferences';
import ROUTES from './Constants';
import UserCondition from '../containers/Questionnaire';
import { RequireAuth, RequireSignup } from '../utils/RequireAuth';
import ThankyouForSubmiting from '../containers/ThankyouForSubmiting';
import IntroVideo from '../containers/Introvideo';
import Dashboard from '../containers/Dashboard';
import Insights from '../containers/Insights';
import Timeline from '../containers/Timeline/index';
import ManageConditions from '../containers/Conditions';
import Diamond from '../components/diamond';
import PostPreferences from '../containers/PostPrefernces';
import ManageConcerns from '../containers/Concerns';
import Subscription from '../containers/Subscription/Subscription';
import SecurityQuestion from '../containers/SecurityQuestion';
import ResetPassword from '../containers/Auth/ResetPassword';
import TermsAndCondtions from '../containers/TermsAndConditions';
import Verification from '../containers/Auth/Verification';
import HelpAndSupport from '../containers/HelpAndSupport';
import Success from '../containers/Success';
import Error from '../containers/Error';

const AppRoutes = () => {
  const location = useLocation();
  useEffect(() => {
    if (location.pathname !== '/help-and-support') {
      window.Intercom('update', {
        hide_default_launcher: true,
      });
    }
  }, [location]);
  return (
    <React.Suspense fallback={<LoadingLayout>Loading...</LoadingLayout>}>
      <Routes>
        <Route path={ROUTES.login} element={<Login />} />
        <Route path={ROUTES.signUp} element={<SignUp />} />
        <Route path={ROUTES.resetPassword} element={<ResetPassword />} />
        <Route path="*" element={<Login />} />
        <Route element={<RequireSignup />}>
          <Route path="/terms-and-conditions" element={<TermsAndCondtions />} />
          <Route path="/verification-code" element={<Verification />} />
        </Route>
        {/* Protected Routes */}
        <Route element={<RequireAuth />}>
          <Route path="/security" element={<SecurityQuestion />} />
          <Route path="insights" element={<Insights />} />
          <Route path="/insights/guideline" element={<Timeline />} />
          <Route path="/diamond" element={<Diamond />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/conditions" element={<ManageConditions />} />
          {/* <Route path="/concerns" element={<ManageConcerns />} /> */}
          <Route path="/questionnaire" element={<UserCondition />} />
          <Route
            path="/questionnaire-submit"
            element={<ThankyouForSubmiting />}
          />
          <Route path="/preferences" element={<Preferences />} />
          <Route path="/introvideo" element={<IntroVideo />} />
          <Route path="/subscription" element={<Subscription />} />
          <Route path="/post-preferences" element={<PostPreferences />} />
          <Route path="/post-conditions" element={<ManageConditions />} />
          {/* <Route path="/post-concerns" element={<ManageConcerns />} /> */}
          <Route path="/help-and-support" element={<HelpAndSupport />} />
          <Route path="/success" element={<Success />} />
          <Route path="/error" element={<Error />} />
        </Route>
      </Routes>
    </React.Suspense>
  );
};

export default AppRoutes;
