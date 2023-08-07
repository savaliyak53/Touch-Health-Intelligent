import React, { useContext, useEffect, useState } from 'react';
import SiteHeader from '../../components/SiteHeader/SiteHeader';
import './Layout.scss';
import { useLocation, useNavigate } from 'react-router';
import { getUser } from '../../services/authservice';
import { getUserSubscription } from '../../services/subscriptionService';
import { signupFlow } from '../../utils/lib';
import ErrorInteractionModal from '../../components/Modal/ErrorInteractionModal';
import AuthContext from '../../contexts/AuthContext';
import moment from 'moment';
import ConfirmModal from '../../components/Modal/ConfirmModal';
import { backButtonContent } from '../../constants';
import { backButtonPreventionRoutes } from '../../Routes/Constants';
import { Spin } from 'antd';

type Props = {
  defaultHeader: boolean;
  hamburger: boolean;
  setDisableAllButtons?: React.Dispatch<React.SetStateAction<boolean>>;
  dashboard?: boolean;
  signupLogin?: string;
  children?: React.ReactChild | React.ReactChild[];
};
const Layout = ({
  children,
  defaultHeader,
  hamburger,
  dashboard,
  signupLogin,
}: Props) => {
  const [exception, setException] = useState<boolean>(false);
  const [trialRemaining, setTrialRemaining] = useState<string>('');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isSubscribed, setIsSubscribed] = useState<boolean>(true);
  const [signupStatus, setSignupStatus] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>();
  const navigate = useNavigate();
  const location = useLocation();
  const context = useContext(AuthContext);
  const checkUserData = () => {
    const userId = context?.user;
    if (userId) {
      getUser(userId)
        .then((response: any) => {
          if (response.data.security_questions) {
            setUserSubscription(response);
            setSignupStatus(response?.data?.signup_status);
            if (
              response?.data?.signup_status === 'onboarding' &&
              location.key === 'default'
            ) {
              navigate('/');
            }
          } else if (response.data && !response.data.security_questions) {
            setLoading(false);
            navigate('/security');
          } else {
            setLoading(false);
            setException(true);
          }
        })
        .catch((error: any) => {
          setLoading(false);
          setError({
            code: error.response.status,
            message: error.response.data.details,
          });
        });
    }
  };
  const setUserSubscription = (response: any) => {
    getUserSubscription()
      .then((res) => {
        setLoading(false);
        if (res?.data?.data?.trialData?.trialEndDate && moment(res?.data?.data?.trialData?.trialEndDate).isAfter(moment())) {
          setTrialRemaining(res?.data?.data?.trialData?.trialRemaining);
        }
        else if (
          res.data.state == 'trial_expired' || res.data.state == 'subscription_expired'
        ) {
          setIsSubscribed(false);
          location.pathname !== '/subscription'
            ? navigate('/subscription')
            : null;
          return;
        }
      })
      .catch((error) => {
        setError({
          code: error.response.status,
          message: error.response.data.details,
        });
      });
  };
  const onBackButtonEvent = (e: any) => {
    e.preventDefault();
    if (!isOpen) {
      setIsOpen(true);
    } else {
      window.history.pushState(null, '', window.location.pathname);
    }
    window.history.pushState(null, '', window.location.pathname);
  };
  const pageBackEvent = () => {
    window.history.pushState(null, '', window.location.pathname);
    window.addEventListener('popstate', onBackButtonEvent);
  };
  const getBackButtonContent = (pathname: string) => {
    if (pathname === '/dashboard') {
      return backButtonContent.dashboardText;
    } else if (
      (pathname === '/subscription' && !isSubscribed) ||
      (pathname === '/questionnaire' && signupStatus === 'onboarding')
    ) {
      return backButtonContent.preventText;
    } else {
      return backButtonContent.layoutText;
    }
  };
  const handleOk = () => {
    setIsOpen(false);
    if (signupStatus === 'onboarding') navigate('/questionnaire')
    else if (isSubscribed) navigate('/dashboard')
    else navigate('/subscription');
  };
  const handleCancel = () => {
    setIsOpen(false);
    pageBackEvent();
  };
  useEffect(() => {
    if (!signupFlow(location.pathname)) {
      checkUserData();
    } else {
      setLoading(false);
    }
    if (
      Object.values(backButtonPreventionRoutes).includes(location.pathname) ||
      backButtonPreventionRoutes.checkup.test(location.pathname)
    ) {
      pageBackEvent();
      return () => {
        window.removeEventListener('popstate', onBackButtonEvent);
      };
    }
  }, []);

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  return (
    <div className={`Layout ${signupLogin}`}>
      <div
        className={
          dashboard ? 'Layout-Transparent header-transp' : 'Layout-Transparent'
        }
      >
        {loading ? (
          <Spin size="large" className=" Spinner" />
        ) : (
          <>
            <SiteHeader
              defaultHeader={defaultHeader}
              hamburger={hamburger}
              trialRemaining={trialRemaining}
            />
            <div className={defaultHeader ? 'MobileScreen' : 'MobileScreen bg'}>
              <div className="Layout-main">{children}</div>
            </div>
          </>
        )}
      </div>
      <div className="Layout-graphics" />
      <ConfirmModal
        title={'Confirmation'}
        open={isOpen}
        handleCancel={handleCancel}
        handleOk={handleOk}
        className="Addgoal-Confirm-Modal"
        renderData={
          <div className="Description">
            {getBackButtonContent(location.pathname)}
          </div>
        }
      />
      {exception && (
        <div>
          <ErrorInteractionModal
            title={'Error'}
            open={true}
            showTryButton={!exception}
            renderData={
              <div className={'Description'}>
                Oops! Something went wrong
                <br />
                Try again later.
              </div>
            }
          />
        </div>
      )}
    </div>
  );
};

export default Layout;
