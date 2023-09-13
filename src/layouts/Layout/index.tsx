import React, { useContext, useEffect, useState } from 'react';
import { Spin } from 'antd';
import moment from 'moment';
import SiteHeader from 'components/SiteHeader/SiteHeader';
import { useLocation, useNavigate } from 'react-router';
import { getUser } from 'services/authservice';
import { getUserSubscription } from 'services/subscriptionService';
import { signupFlow } from 'utils/lib';
import ErrorInteractionModal from 'components/Modal/ErrorInteractionModal';
import AuthContext from 'contexts/AuthContext';
import ConfirmModal from 'components/Modal/ConfirmModal';
import { backButtonContent } from '../../constants';
import { backButtonPreventionRoutes } from 'Routes/Constants';
import LogoDesktop from 'components/Icons/LogoDesktop';
import useLocalStorage from 'hooks/useLocalStorage';
// import CongratulationModal from 'components/Modal/CongratulationModal';

type Props = {
  defaultHeader: boolean;
  hamburger: boolean;
  setDisableAllButtons?: React.Dispatch<React.SetStateAction<boolean>>;
  dashboard?: boolean;
  signupLogin?: string;
  title?: string;
  children?: React.ReactChild | React.ReactChild[];
  withoutMargin?: boolean;
  streak?: number;
  addPadding?: boolean;
  mobileHeight?: boolean;
  whitBackArrow?: boolean;
  onBack?: () => void;
};
const Index = ({
  children,
  defaultHeader,
  hamburger,
  dashboard,
  title,
  withoutMargin = false,
  streak,
  addPadding,
  whitBackArrow,
  mobileHeight,
  onBack
}: Props) => {
  const [exception, setException] = useState<boolean>(false);
  const [trialRemaining, setTrialRemaining] = useState<string>('');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isSubscribed, setIsSubscribed] = useState<boolean>(true);
  const [signupStatus, setSignupStatus] = useState<string>('');
  const [isOnboarding, setIsOnboarding] = useLocalStorage("isOnboarding");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>();
  const navigate = useNavigate();
  const location = useLocation();
  // const [openCongratsModal, setOpenCongratsModal] = useState<boolean>(false)
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
        if (
          res?.data?.data?.trialData?.trialEndDate &&
          moment(res?.data?.data?.trialData?.trialEndDate).isAfter(moment())
        ) {
          setTrialRemaining(res?.data?.data?.trialData?.trialRemaining);
        } else if (
          res.data.state == 'trial_expired' ||
          res.data.state == 'subscription_expired'
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
    if (signupStatus === 'onboarding') {
      setIsOnboarding(true);
      navigate('/questionnaire');
    } else if (isSubscribed){
      setIsOnboarding(false);
      navigate('/dashboard');
    } else {
      setIsOnboarding(false);
      navigate('/subscription');
    }
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
    <div className={`w-full max-w-[100%] flex overflow-hidden relative min-h-screen ${mobileHeight && "sm:min-h-screen !min-h-[100svh]"}`}>
      {loading ? (
        <Spin size="large" className=" Spinner" />
      ) : (
        <>
          <div className={`w-full h-full flex-1 flex items-center justify-center ${withoutMargin ? '' : 'px-4'}`}>
            <div
              className={`${dashboard ? "bg-[#F6F3F0]" : "bg-white"} bg-cover bg-no-repeat h-[100%] z-0 absolute top-0 left-0 main-layout-dashboard-background`}
              style={{
                backgroundImage: `${
                  withoutMargin
                    ? ''
                    : dashboard && `url(${process.env.PUBLIC_URL}/assets/images/background-status-overview.svg)`
                }`,
              }}
            />
            <div
              className={`w-full ${
                withoutMargin || addPadding ? '' : 'max-w-[390px]'
              } relative flex text-center `}
            >
              <SiteHeader
                defaultHeader={defaultHeader}
                hamburger={hamburger}
                trialRemaining={trialRemaining}
                title={title}
                streak={streak}
                onBack={onBack}
                whitBackArrow={whitBackArrow}
              />
              <div className="max-w-full w-full h-full pt-13">
                {dashboard || withoutMargin ? (
                  <></>
                ) : (
                  <>
                    <div className="h-[90px] z-0 mt-5" />
                  </>

                )}

                <div className="flex flex-col h-full">{children}</div>
              </div>
            </div>
            {/*<CongratulationModal type={'data-points'} setClose={setOpenCongratsModal} isOpen={openCongratsModal} value={16} />*/}
          </div>
          <div className="w-full max-w-[50%] bg-right bg-fit bg-no-repeat main-layout-background">
            <LogoDesktop className="float-right mr-12 mt-10" />
          </div>
        </>
      )}
      <ConfirmModal
        title={'Confirmation'}
        open={isOpen}
        handleCancel={handleCancel}
        handleOk={handleOk}>
        <div className="text-3 text-oldBurgundy leading-[23px] text-left">
          {getBackButtonContent(location.pathname)}
        </div>
      </ConfirmModal>
      {exception && (
        <div>
          <ErrorInteractionModal
            title={'Error'}
            open={true}
            showTryButton={!exception}>
            <div className='text-3 text-oldBurgundy leading-[23px] text-left'>
              Oops! Something went wrong
              <br />
              Try again later.
            </div>
          </ErrorInteractionModal>
        </div>
      )}
    </div>
  );
};

export default Index;
