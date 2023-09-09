import React, { ChangeEvent, useContext, useEffect, useRef, useState } from 'react';
import AuthLayout from 'layouts/AuthLayout';
import TouchInput from 'components/TouchInput';
import PhoneInput from 'components/PhoneInput';
import ReCAPTCHA from 'react-google-recaptcha';
import TouchButton from 'components/TouchButton';
import { Link, useNavigate } from 'react-router-dom';
import useLocalStorage from 'hooks/useLocalStorage';
import AuthContext, { AuthContextData } from 'contexts/AuthContext';
import { onlyNumbers } from 'utils/lib';
import { isValidPhoneNumber } from 'react-phone-number-input';

const SignUp: React.FC = () => {
  const refCaptcha = useRef<any>(null)
  const [setIsOnboarding] = useLocalStorage("isOnboarding");

  const [username, setUsername] = useState<string>('');
  const [usernameError, setUsernameError] = useState<string>('');
  const [usernameVerified, setUsernameVerified] = useState<boolean>(false);

  const [phone, setPhone] = useState<string>('');
  const [phoneError, setPhoneError] = useState<string>('');
  const [phoneVerified, setPhoneVerified] = useState<boolean>(false);
  const [confirmPhone, setConfirmPhone] = useState<string>('');
  const [confirmPhoneError, setConfirmPhoneError] = useState<string>('');
  const [confirmPhoneVerified, setConfirmPhoneVerified] = useState<boolean>(false);

  const [password, setPassword] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');
  const [passwordVerified, setPasswordVerified] = useState<boolean>(false);
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [confirmPasswordError, setConfirmPasswordError] = useState<string>('');
  const [confirmPasswordVerified, setConfirmPasswordVerified] = useState<boolean>(false);

  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);

  const [error, setError] = useState<any>();
  const authContext = useContext<AuthContextData | undefined>(AuthContext);
  const { signupUser } = authContext as AuthContextData;
  const navigate = useNavigate();

  const onVerify = async () => {
    setIsLoading(true);
    setIsDisabled(true);
    const token = refCaptcha.current.getValue();
    refCaptcha.current.reset();
    localStorage.setItem('captchaToken', token);
    localStorage.setItem('phone', onlyNumbers(phone));
    const signupResponse = await signupUser(
      {
        phone: onlyNumbers(phone),
        name: username,
        password,
      },
      token
    );
    if (signupResponse?.id) {
      setIsOnboarding(true);
      localStorage.setItem('userId', signupResponse.id);
      localStorage.setItem('token', signupResponse.token);
      navigate(`/terms-and-conditions`);
    } else {
      setIsDisabled(false);
      setIsLoading(false);
      setError({
        code: signupResponse.response.data.status,
        message: signupResponse.response.data.details,
      });
    }
  };

  const checkErrorUsername = (value: string) => {
    if (!value) {
      setUsernameError('Username is required.')
      setUsernameVerified(false);
      return;
    } else if (value.length > 24) {
      setUsernameError('Username can have maximum 24 characters.')
      setUsernameVerified(false);
      return;
    }
    setUsernameVerified(true);
  }

  const checkErrorPassword = (value: string) => {
    if (confirmPassword && confirmPassword !== value) {
      setConfirmPasswordError('Password do not match.');
      setConfirmPasswordVerified(false);
    } else if (confirmPassword && confirmPassword === value) {
      setConfirmPasswordError('');
      setConfirmPasswordVerified(true);
    }
    if (!value) {
      setPasswordError('Password is required.')
      setPasswordVerified(false);
      return;
    } else if (value.length < 8) {
      setPasswordError('Password should be of at least 8 characters.')
      setPasswordVerified(false);
      return;
    } else if (!value.match(/^(?=.*?[#?!@$%^&*-])/)) {
      setPasswordError('Need a special character.')
      setPasswordVerified(false);
      return;
    }
    setPasswordVerified(true);
  }

  const checkErrorConfirmPassword = (value: string) => {
    if (!value) {
      setConfirmPasswordError('Confirm password is required.');
      setConfirmPasswordVerified(false);
      return;
    } else if (value.length < 8) {
      setConfirmPasswordError('Password should be of at least 8 characters.')
      setConfirmPasswordVerified(false);
      return;
    } else if (!value.match(/^(?=.*?[#?!@$%^&*-])/)) {
      setConfirmPasswordError('Need a special character.')
      setConfirmPasswordVerified(false);
      return;
    } else if (value !== password) {
      setConfirmPasswordError('Passwords do not match.');
      setConfirmPasswordVerified(false);
      return;
    }
    setConfirmPasswordVerified(true);
  }

  const checkErrorPhone = (value: string) => {
    if (confirmPhone && confirmPhone !== value) {
      setConfirmPhoneError('Phones do not match.');
      setConfirmPhoneVerified(false);
    } else if (confirmPhone && confirmPhone === value) {
      setConfirmPhoneError('');
      setConfirmPhoneVerified(true);
    }
    if (!value) {
      setPhoneError('Phone is required.');
      setPhoneVerified(false);
      return;
    } else if (!isValidPhoneNumber(value || '')) {
      setPhoneError('Invalid Phone number');
      setPhoneVerified(false);
      return;
    }
    setPhoneVerified(true);
  }

  const checkErrorConfirmPhone = (value: string) => {
    if (!value) {
      setConfirmPhoneError('Confirm phone is required.');
      setConfirmPhoneVerified(false);
      return;
    } else if (value !== phone) {
      setConfirmPhoneError('Phones do not match.');
      setConfirmPhoneVerified(false);
      return;
    } else if (!isValidPhoneNumber(value || '')) {
      setConfirmPhoneError('Invalid Phone number');
      setConfirmPhoneVerified(false);
      return;
    }
    setConfirmPhoneVerified(true);
  }

  const handleChangeConfirmPassword = (e: ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  }

  const handleChangeConfirmPhone = (value: string) => {
    setConfirmPhone(value);
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  return (
    <AuthLayout>
      <div className='w-full'>
        <div className='rounded-[5px] bg-white shadow-primaryTop w-full p-4'>
          <form
            onSubmit={onVerify}
            className='flex flex-col items-center justify-center'
          >
            <h1 className='text-primary-delft-dark font-tilt-warp font-normal text-[22px] leading-[36px] opacity-80 text-center mb-4'>
              Create an account
            </h1>

            <TouchInput
              type={'text'}
              value={username}
              errorMessage={usernameError}
              isVerified={usernameVerified}
              resetError={setUsernameError}
              checkError={checkErrorUsername}
              onChange={(e) => setUsername(e.target.value)}
              placeholder='Username'
              className='mb-4'
            />

            <PhoneInput
              value={phone}
              className='mb-4'
              isVerified={phoneVerified}
              errorMessage={phoneError}
              checkError={checkErrorPhone}
              resetError={setPhoneError}
              onChange={setPhone}
              placeholder='Mobile phone number'/>
            <PhoneInput
              value={confirmPhone}
              className='mb-4'
              isVerified={confirmPhoneVerified}
              errorMessage={confirmPhoneError}
              checkError={checkErrorConfirmPhone}
              resetError={setConfirmPhoneError}
              onChange={handleChangeConfirmPhone}
              placeholder='Confirm phone number'/>

            <TouchInput
              type={'password'}
              className='mb-4'
              isVerified={passwordVerified}
              errorMessage={passwordError}
              resetError={setPasswordError}
              checkError={checkErrorPassword}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Password'
              value={password}/>
            <TouchInput
              type={'password'}
              className='mb-4'
              isVerified={confirmPasswordVerified}
              errorMessage={confirmPasswordError}
              resetError={setConfirmPasswordError}
              onChange={handleChangeConfirmPassword}
              checkError={checkErrorConfirmPassword}
              placeholder='Repeat password'
              value={confirmPassword}/>

            <ReCAPTCHA
              className='mt-[25px] mx-auto mb-0'
              ref={refCaptcha}
              sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY as string}
              onChange={() => setIsDisabled(false)}
            />
            <TouchButton
              type={'auth'}
              className='mt-8'
              onClick={onVerify}
              isLoading={isLoading}
              isDisabled={isDisabled && !usernameVerified && !usernameVerified && !usernameVerified && !usernameVerified && !usernameVerified}>
              Create an account
            </TouchButton>
          </form>

          <div className='text-high-dark text-center font-roboto text-xs font-normal leading-4 mt-5'>
            <span>Already have an account? </span>
            <Link to="/login" className='underline hover:text-high-dark hover:underline'>
              Log in
            </Link>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default SignUp;
