import React from 'react';

interface IProps {
  children?: React.ReactNode;
  isSignup?: boolean;
}

const AuthLayout: React.FC<IProps> = ({children, isSignup}) => {

  return (
    <div className='SignupBGWrap'>
      <div className={`${isSignup ? 'SignupView' : 'LoginView'}`}>
        <div className='LogoWrap'>
          <img src={`${process.env.PUBLIC_URL}/assets/logo/auth/cur8-health-desktop-logo.svg`} className='LogoDesktoop' alt="App Logo" />
          <img src={`${process.env.PUBLIC_URL}/assets/logo/auth/cur8-health-mobile-logo.svg`} className='LogoMobile' alt="App Logo" />
        </div>
        {children}
        <img src={`${process.env.PUBLIC_URL}/assets/logo/auth/touch-powered-logo.svg`} className='LogoMobile' alt="Powered by Touch" />
      </div>
    </div>
  )
};

export default AuthLayout;
