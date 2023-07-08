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
import DashboardNew from '../containers/DashboardNew';
import Insights from '../containers/Insights';
import Timeline from '../containers/Timeline/index';
import ManageConditions from '../containers/Conditions';
import Subscription from '../containers/Subscription/Subscription';
import SecurityQuestion from '../containers/SecurityQuestion';
import ResetPassword from '../containers/Auth/ResetPassword';
import TermsAndCondtions from '../containers/TermsAndConditions';
import Verification from '../containers/Auth/Verification';
import HelpAndSupport from '../containers/HelpAndSupport';
import Success from '../containers/Success';
import Error from '../containers/Error';
import Home from '../containers/Home';
import AddGoals from '../containers/Goals/AddGoals';
import IntroGoals from '../containers/Goals/IntroGoals';
import GoalDetails from '../containers/Goals/Details/index';
import PasswordRecovery from '../containers/Auth/PasswordRecovery';
import GoogleFitSuccess from '../containers/GoogleFitSuccess/GoogleFitSuccess';
import Integrations from '../containers/Integeration';
import MockQuestionnaire from '../containers/MockQuestionnaire';
import ManageDevices from '../containers/ManageDevices';
import ExistingUser from '../containers/ExistingUser';

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
        <Route path="/security" element={<SecurityQuestion />} />
        <Route path={ROUTES.resetPassword} element={<ResetPassword />} />
        <Route path="/password-reset" element={<PasswordRecovery />} />
        <Route path="*" element={<Home />} />
        <Route path="/terms-and-conditions" element={<TermsAndCondtions />} />
        <Route element={<RequireSignup />}>
          <Route path="/existing-user" element={<ExistingUser />} />
          <Route path="/verification-code" element={<Verification />} />
        </Route>
        {/* Protected Routes */}
        <Route path="/questionnaire-poc" element={<MockQuestionnaire />} />
        <Route element={<RequireAuth />}>
          <Route path="/dashboard" element={<DashboardNew />} />
          <Route path="/add-goals" element={<AddGoals />} />
          <Route path="/intro-goals" element={<IntroGoals />} />
          <Route path="/goals/:id" element={<GoalDetails />} />

          <Route path="insights" element={<Insights />} />
          <Route path="/auth/google/code" element={<GoogleFitSuccess />} />
          <Route path="/insights/guideline" element={<Timeline />} />
          <Route path="/questionnaire" element={<UserCondition />} />
          <Route path="/c/:reason" element={<UserCondition />} />
          <Route
            path="/questionnaire-submit"
            element={<ThankyouForSubmiting />}
          />
          <Route path="/preferences" element={<Preferences />} />
          <Route path="/integrations" element={<Integrations />} />
          <Route path="/introvideo" element={<IntroVideo />} />
          <Route path="/manage-devices" element={<ManageDevices />} />
          <Route path="/subscription" element={<Subscription />} />
          <Route path="/subscription/:id" element={<Subscription />} />
          <Route path="/post-conditions" element={<ManageConditions />} />
          <Route path="/help-and-support" element={<HelpAndSupport />} />
          <Route path="/success" element={<Success />} />
          <Route path="/error" element={<Error />} />
        </Route>
      </Routes>
    </React.Suspense>
  );
};

export default AppRoutes;
