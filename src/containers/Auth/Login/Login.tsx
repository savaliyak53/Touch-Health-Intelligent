import React, { useRef, useEffect, useContext, useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import LoginForm from './LoginForm';
import styles from './Login.module.scss';
import { useNavigate } from 'react-router';
import AuthContext, { AuthContextData } from '../../../contexts/AuthContext';
import SplashScreen from './SplashScreen';
import useLocalStorage from '../../../hooks/useLocalStorage';

type IFormInputs = {
  username: string;
  password: string;
};

const Login = () => {
  const refCaptcha = useRef<any>(null)
  const navigate= useNavigate()
  const onSubmit: SubmitHandler<IFormInputs> = (data) => {
    refCaptcha.current.reset();
  };
  const context = useContext<AuthContextData | undefined>(AuthContext);
  const [showLoginForm, setShowLoginForm] = useState<boolean>(false);
  const [isVisited, setVisited] = useLocalStorage("isVisited");

  useEffect(() => {
    const token = context?.authTokens ?? localStorage.getItem('token')
    if(token) navigate('/')
    else setShowLoginForm(true)
  },[])


  return (
    <>
      {isVisited ? (
        <div className={styles.SignupBGWrap}>
          <div className={styles.LoginView}>
            <div className={styles.LogoWrap}>
            <img src={`${process.env.PUBLIC_URL}/assets/logo/auth/cur8-health-desktop-logo.svg`} className={styles.LogoDesktoop} alt="App Logo" />
              <img src={`${process.env.PUBLIC_URL}/assets/logo/auth/cur8-health-mobile-logo.svg`} className={styles.LogoMobile} alt="App Logo" />
            </div>

          {showLoginForm && (
            <LoginForm
              onSubmit={onSubmit}
              refCaptcha={refCaptcha}
            />)}

            <img src={`${process.env.PUBLIC_URL}/assets/logo/auth/touch-powered-logo.svg`} className={styles.LogoMobile} alt="Powered by Touch" />
          </div>
        </div>
      ) : (
        <SplashScreen setVisited={setVisited} />
      )}
    </>
  );
};

export default Login;
