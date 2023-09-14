import React, { useState, useEffect, useContext, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import {
  getTokenExpiration,
  onlyNumbers,
} from 'utils/lib';
import ReCAPTCHA from 'react-google-recaptcha';
import AccountLockModal from 'components/Modal/AccountLockModal';
import AuthContext, { AuthContextData } from 'contexts/AuthContext';
import { getSession, getUser } from 'utils/lib';
import ConfirmModal from 'components/Modal/ConfirmModal';
import PhoneInput from 'components/PhoneInput';
import TouchInput from 'components/TouchInput';
import TouchButton from 'components/TouchButton';

const LoginForm: React.FC = () => {
  const refCaptcha = useRef<ReCAPTCHA>(null)
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [error, setError] = useState<any>({code: '', message: ''});

  const [modalText, setModalText] = useState<string>('');
  const [showLockAccountModal, setShowLockAccountModal] = useState<boolean>(false);
  const [wrongCredentialsModal, setWrongCredentialsModal] = useState<boolean>(false);

  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleCancelModal = () => {
    setShowLockAccountModal(false);
  };

  const authContext = useContext<AuthContextData | undefined>(AuthContext); // Add the type parameter
  if (!authContext) return null;
  const { loginUser } = authContext;

  const onSubmit = async () => {
    if (onlyNumbers(username) && password) {

      setIsLoading(true);
      setIsDisabled(true);

      const token = refCaptcha?.current?.getValue();
      refCaptcha?.current?.reset();

      const loginResponse = await loginUser(
        onlyNumbers(username),
        password,
        token || ''
      );

      if (loginResponse?.token) {
        setIsDisabled(false);
        setIsLoading(false);

        localStorage.setItem('token', `${loginResponse.token}`);
        localStorage.setItem('expiration', getTokenExpiration(loginResponse.token));
        const userId = getUser(loginResponse.token);
        localStorage.setItem('userId', userId);
        const sessionId = getSession(loginResponse.token);
        localStorage.setItem('sessionId', sessionId);
        navigate('/');
      } else {
        setIsLoading(false);
        if (loginResponse?.response?.status === 429) {
          setShowLockAccountModal(true);
          setModalText(loginResponse?.response?.data?.details);
        } else {
          setError({
            code: loginResponse?.response?.status,
            message: loginResponse.response.data?.details,
          });
        }
      }
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);

  }, []);

  return (
    <div className='w-full'>
      <div className='flex flex-col items-center rounded-[5px] bg-white shadow-primaryTop w-full px-[16px] py-[20px] sm:pt-[42px] sm:pb-[54px]'>
        <h1 className='text-primary-delft-dark font-tilt-warp font-normal text-[22px] leading-[36px] opacity-80 text-center mb-4'>
          Log in
        </h1>

        <PhoneInput
          onChange={setUsername}
          placeholder="Mobile phone number"
          value={username}
          errorMessage={error.message}
        />

        <TouchInput
          className='mt-4'
          type={'password'}
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          errorMessage={error.message} />

        <AccountLockModal
          title={'Too many retries'}
          open={showLockAccountModal}
          handleCancel={handleCancelModal}
          isAuth={true}
          handleOk={handleCancelModal}>
          <div className={'text-3 text-oldBurgundy leading-[23px] text-left'}>{modalText}</div>
        </AccountLockModal>
        <ConfirmModal
          title={'Error'}
          open={wrongCredentialsModal}
          isAuth={true}
          handleCancel={() => setWrongCredentialsModal(false)}
          handleOk={() => setWrongCredentialsModal(false)}>
          <div className="text-3 text-oldBurgundy leading-[23px] text-left">
            <div>{error?.message}</div>
          </div>
        </ConfirmModal>
        <ReCAPTCHA
          className='mt-[25px] mx-auto mb-0'
          ref={refCaptcha}
          sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY as string}
          onChange={() => {
            setIsDisabled(false);
          }}
        />
        <TouchButton
          type={'auth'}
          className='mt-8'
          onClick={onSubmit}
          isLoading={isLoading}
          isDisabled={isDisabled}
        >
          Log in
        </TouchButton>
        <div className={'text-high-dark font-roboto text-xs font-normal leading-4 mt-5'}>
          <span>Don’t have an account? </span>
          <Link to='/signup' className='underline hover:text-high-dark hover:underline'>
            Sign up
          </Link>
        </div>
      </div>

      <div className='flex w-full items-center justify-center mt-[24px]'>
        <a
          href="https://www.touchmedical.ca/customer-care"
          className='text-dentist text-[14px] leading-[14px] underline my-0 mx-[8px]'
          target='blank'
        >
          Customer care
        </a>
        <Link to="/password-reset" className='text-dentist text-[14px] leading-[14px] underline my-0 mx-[8px]'>
          Forgot password
        </Link>
      </div>
    </div>
  );
};

export default LoginForm;
