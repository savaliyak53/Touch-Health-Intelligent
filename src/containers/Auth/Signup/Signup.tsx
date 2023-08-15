import React, { useRef } from 'react';
import { SubmitHandler } from 'react-hook-form';
import Layout from '../../../layouts/Layout/Layout';
import SignupForm from './SignupForm';
import styles from './Signup.module.scss';
type IFormInputs = {
  name: string;
  phone: string;
  confirmPhone: string;
  password: string;
  confirmPassword: string;
};

const SignUp = () => {
  const refCaptcha = useRef<any>(null);
  const onSubmit: SubmitHandler<IFormInputs> = async (data) => {
    refCaptcha.current.reset();
  };

  return (
    // <Layout defaultHeader={false} hamburger={false} signupLogin="Signup-bg">
    <div className={styles.SignupBGWrap}>
        <div className={styles.SignupView}>
          <div className={styles.LogoWrap}>
            <img src={`${process.env.PUBLIC_URL}/assets/logo/auth/cur8-health-desktop-logo.svg`} className={styles.LogoDesktoop} alt="App Logo" />
            <img src={`${process.env.PUBLIC_URL}/assets/logo/auth/cur8-health-mobile-logo.svg`} className={styles.LogoMobile} alt="App Logo" />
          </div>
        {/* <div className={styles.SignupBGWrap}> */}
        <SignupForm onSubmit={onSubmit} refCaptcha={refCaptcha} />

        <img src={`${process.env.PUBLIC_URL}/assets/logo/auth/touch-powered-logo.svg`} className={styles.LogoMobile} alt="Powered by Touch" />
        {/* </div> */}
      </div>
    </div>
    // </Layout>
  );
};

export default SignUp;
