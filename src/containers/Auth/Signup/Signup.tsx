import React, { useContext, useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from 'layouts/AuthLayout';
import TouchInput from 'components/UI/TouchInput';
import ReCAPTCHA from 'react-google-recaptcha';
import TouchButton from 'components/UI/TouchButton';
import useLocalStorage from 'hooks/useLocalStorage';
import AuthContext, { AuthContextData } from 'contexts/AuthContext';
import InputGroup from 'components/InputGroup';

const SignUp: React.FC = () => {
  const refCaptcha = useRef<ReCAPTCHA>(null)
  const [value, setIsOnboarding] = useLocalStorage("isOnboarding");

  const [username, setUsername] = useState<string>('');
  const [usernameError, setUsernameError] = useState<string>('');
  const [usernameVerified, setUsernameVerified] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [emailVerified, setEmailVerified] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');
  const [passwordVerified, setPasswordVerified] = useState<boolean>(false);

  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);

  const [error, setError] = useState<any>();
  const authContext = useContext<AuthContextData | undefined>(AuthContext);
  const { signupUser } = authContext as AuthContextData;
  const navigate = useNavigate();

  const onVerify = async () => {
    setIsLoading(true);
    setIsDisabled(true);
    const token = refCaptcha?.current?.getValue();
    refCaptcha?.current?.reset();
    localStorage.setItem('captchaToken', token || '');
    localStorage.setItem('email', email);
    const signupResponse = await signupUser(
      {
        email: email,
        name: username,
        password,
      },
      token || ''
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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  return (
    <AuthLayout isSignup={true}>
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

            <InputGroup
              email={email}
              password={password}
              setEmail={setEmail}
              setPassword={setPassword}
              approveEmailVerified={setEmailVerified}
              approvePasswordVerified={setPasswordVerified} />

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
              isDisabled={(isDisabled || !usernameVerified || !emailVerified || !passwordVerified)}>
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
