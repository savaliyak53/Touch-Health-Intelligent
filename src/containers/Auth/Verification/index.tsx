import React, { useEffect, useState, useContext, useRef } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import ConfirmModal from 'components/Modal/ConfirmModal';
import Layout from 'layouts/Layout';
import { requestPhoneOTP, verifyPhoneOTP } from 'services/authservice';
import AuthContext, { AuthContextData } from 'contexts/AuthContext';
import { getUser, getSession, onlyNumbers } from 'utils/lib';
import CodeEnterStep from 'containers/Auth/PasswordRecovery/CodeEnterStep';
import TouchButton from 'components/TouchButton';
import TouchModal from 'components/Modal/TouchModal';

const Verification = () => {
  const navigate = useNavigate();
  const refCaptcha = useRef<ReCAPTCHA>(null);
  const authContext = useContext<AuthContextData | undefined>(AuthContext);

  const [finishStatus, setfinishStatus] = useState(false);
  const [openErrorModal, setOpenErrorModal] = useState(false);
  const [error, setError] = useState<any>();
  const [code, setCode] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [disableSubmit, setDisableSubmit] = useState(true);

  const userId = localStorage.getItem('userId');
  const phone = localStorage.getItem('phone');


  useEffect(() => {
    window.scrollTo(0, 0);
    if (!userId) {
      navigate('/');
    }
    pageBackEvent();
    handleOTPRequest();
  }, []);

  const onSubmit = async () => {
    if (userId) {
      setIsLoading(true);
      const phoneVerificationResponse: any = await verifyPhoneOTP(
        code,
        userId
      );
      if (phoneVerificationResponse?.data?.id) {
        setIsLoading(false);
        toast.dismiss();
        authContext?.setAuthTokens(phoneVerificationResponse.data.token);
        authContext?.setUser(getUser(phoneVerificationResponse.data.token));
        authContext?.setSession(getSession(phoneVerificationResponse.data.token));
        localStorage.setItem(
          'sessionId',
          getSession(phoneVerificationResponse.data.token)
        );
        localStorage.setItem('token', phoneVerificationResponse.data.token);
        toast.success('Verified');
        navigate('/security');
      } else if (phoneVerificationResponse?.response?.status === 409) {
        navigate('/existing-user', {
          state: {
            username: phone,
            code: code,
          },
        });
        setIsLoading(false);
      } else {
        setError({
          code: phoneVerificationResponse.response.status,
          message: phoneVerificationResponse.response.data.details,
        });
        setOpenErrorModal(true);
        setIsLoading(false);
      }
    }
  };

  const logoutClick = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
    sessionStorage.removeItem('un-dash');
    localStorage.clear();
    navigate('/login');
  };

  const pageBackEvent = () => {
    window.history.pushState(null, '', window.location.pathname);
    window.addEventListener('popstate', onBackButtonEvent);
    return () => {
      window.removeEventListener('popstate', onBackButtonEvent);
    };
  };
  const onBackButtonEvent = (e: any) => {
    e.preventDefault();
    if (!finishStatus) {
      setfinishStatus(true);
    } else {
      window.history.pushState(null, '', window.location.pathname);
    }
  };

  const handleCancelFinishStatus = () => {
    setfinishStatus(false);
    pageBackEvent();
  }

  const handleOTPRequest = (isResendOTP = false): void => {
    setIsLoading(true);
    const token = isResendOTP
      ? localStorage.getItem('recaptcha-token')
      : localStorage.getItem('captchaToken');

    if (!onlyNumbers(phone || '') || !token) {
      setIsLoading(false);
      return;
    }

    requestPhoneOTP(onlyNumbers(phone || ''), token)
      .then((res: any) => {
        if (res && res.status !== 200) {
          if (
            res &&
            res.response &&
            res.response.data &&
            res.response.data.details
          ) {
            toast.error(res.response.data.details || 'Error');
          } else {
            toast.error('Something went wrong, try later.');
          }
        }
      })
      .catch((error) => {
        toast.error(error?.response?.data?.details || 'Error');
      })
      .finally(() => {
        setIsLoading(false);
        refCaptcha?.current?.reset();
      });
  };

  return (
    <Layout defaultHeader={true} hamburger={false} title={'Verification code'} mobileHeight={true}>
      <div className='flex flex-col items-center'>
        <CodeEnterStep
          code={code}
          setCode={setCode}
          onSubmitCode={onSubmit}
          isLoading={isLoading}
          setDisableSubmit={setDisableSubmit}
          handleOTPRequest={handleOTPRequest}
          disableSubmit={disableSubmit}
          refCaptcha={refCaptcha}
          afterSignUp={true}
        />
        <ConfirmModal
          title={'Confirmation'}
          open={finishStatus}
          handleCancel={() => handleCancelFinishStatus}
          handleOk={logoutClick}>
          <div className="text-3 text-oldBurgundy leading-[23px] text-left">
            Are you sure you want to navigate away from this page?
          </div>
        </ConfirmModal>
        <TouchModal setClose={setOpenErrorModal} isOpen={openErrorModal}>
          <div className='flex flex-col w-full my-[50px] px-[20px]'>
            <h3 className='text-[18px] mb-10 leading-[22px] flex items-center font-tilt-warp text-primary-delft-dark opacity-90'>
              Error
            </h3>
            <div className='text-3 text-oldBurgundy leading-[23px] text-left'>
              {error ? error.message : ''}
            </div>
          </div>
          <div className='mx-[25px] mb-[33px] px-10'>
            <TouchButton type={'default'} onClick={() => setOpenErrorModal(false)}>
              OK
            </TouchButton>
          </div>
        </TouchModal>
      </div>
    </Layout>
  );
};

export default Verification;
