import React, { useContext, useEffect, useState } from 'react';
import SiteHeader from '../../components/SiteHeader/SiteHeader';
import './Layout.scss';
import { useLocation, useNavigate } from 'react-router';
import { getUser } from '../../services/authservice';
import { getSubscriptionStatus } from '../../services/subscriptionService';
import { signupFlow, sleep } from '../../utils/lib';
import { toast } from 'react-toastify';
import ErrorInteractionModal from '../../components/Modal/ErrorInteractionModal';
import AuthContext from '../../contexts/AuthContext';
import moment from 'moment';
import FreeTrialModal from '../../components/Modal/FreeTrial';
import ConfirmModal from '../../components/Modal/ConfirmModal';
import { backButtonContent } from '../../constants';
import { backButtonExceptionRoutes } from '../../Routes/Constants';

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
  setDisableAllButtons,
}: Props) => {
  const [exception, setException] = useState<boolean>(false);
  const [trialRemaining, setTrialRemaining] = useState<string>('');
  const [trialEndModal, setTrialEndModal] = useState<boolean>(false);
  const [trialEndDate, setTrialEndDate] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isSubscribed, setIsSubscribed] = useState<boolean>(true);
  const navigate = useNavigate();
  const location = useLocation(); 
  const context = useContext(AuthContext);
  const checkUserData = () => {
    const userId = context?.user;
    if (userId) {
      getUser(userId)
        .then((response: any) => {
          // const { security_questions } = response.data;
          if (response.data.security_questions) {
            getUserSubscription(response);
            if (response?.data?.trial_end_date && moment(response?.data?.trial_end_date).isAfter(moment())) {
              setTrialRemaining(response.data.trial_remaining);
            }
          } else if (response.data && !response.data.security_questions) {
            navigate('/security');
          } else {
            setException(true);
            //show modal that something went wrong
          }
        })
        .catch((error: any) => {
          console.log(error);
        });
    }
  };
  const getUserSubscription = (response: any) => {
    getSubscriptionStatus()
      .then((res) => { 
        if (
          response?.data?.trial_end_date &&
          moment(response?.data?.trial_end_date).isBefore(moment()) &&
          res.data.isSubscribed === false 
        ) {
          setTrialEndDate(response.data.trial_end_date);
          setTrialEndModal(true);
          setIsSubscribed(false);
          location.pathname !== '/subscription'
            ? navigate('/subscription')
            : null;
          return;
        }
        else if (
          res.data.isSubscribed === false &&
          typeof response?.data?.trial_end_date === 'undefined'
        ) {
          setIsSubscribed(false);
          location.pathname !== '/subscription'
            ? navigate('/subscription')
            : null;
          return;
        }
      })
      .catch((error) => {
        console.log('Error while getting user plan. ', error);
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
  const getBackButtonContent = (pathname : string) => {
    if (pathname === '/dashboard') {
      return backButtonContent.dashboardText;
    } else if (pathname === '/subscription' && !isSubscribed) {
      return backButtonContent.subscriptionText;
    } else {
      return backButtonContent.layoutText;
    }
  };
  const handleOk = () => {
    setIsOpen(false);
    if (isSubscribed) navigate('/dashboard')
    else navigate('/subscription');
  };
  const handleCancel = () => {
    setIsOpen(false);
    pageBackEvent();
  };
  useEffect(() => {
    if (!signupFlow(location.pathname)) {
      checkUserData();
    }
    if (!Object.values(backButtonExceptionRoutes).includes(location.pathname)) {
      pageBackEvent();
      return () => {
        window.removeEventListener('popstate', onBackButtonEvent);
      };
    }
  }, []);
  return (
    <div className={`Layout ${signupLogin}`}>
      <div
        className={
          dashboard ? 'Layout-Transparent header-transp' : 'Layout-Transparent'
        }
      >
        <SiteHeader defaultHeader={defaultHeader} hamburger={hamburger} trialRemaining={trialRemaining} />
        <div className={defaultHeader ? 'MobileScreen' : 'MobileScreen bg'}>
          <div className="Layout-main">{children}</div>
        </div>
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
      <FreeTrialModal
        title="Subscription"
        handleOk={() => {
          setTrialEndModal(false);
        }}
        open={trialEndModal}
        buttonText="Subscribe Now!"
        trialEndDate={trialEndDate}
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
