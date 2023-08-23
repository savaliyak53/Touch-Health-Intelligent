import React from 'react';
import styles from '../Login/Login.module.scss';
import PasswordRecoveryForm from './PasswordRecoveryForm';

const PasswordRecovery = () => {
  return (
    // overall layout for Auth container
    <div className={styles.SignupBGWrap}>
      <div className={styles.LoginView}>
        <div className={styles.LogoWrap}>
          <img
            src={`${process.env.PUBLIC_URL}/assets/logo/auth/cur8-health-desktop-logo.svg`}
            className={styles.LogoDesktoop}
            alt="App Logo"
          />
          <img
            src={`${process.env.PUBLIC_URL}/assets/logo/auth/cur8-health-mobile-logo.svg`}
            className={styles.LogoMobile}
            alt="App Logo"
          />
        </div>
        <PasswordRecoveryForm />
        <img
          src={`${process.env.PUBLIC_URL}/assets/logo/auth/touch-powered-logo.svg`}
          className={styles.LogoMobile}
          alt="Powered by Touch"
        />
      </div>
    </div>
  );
};

export default PasswordRecovery;
