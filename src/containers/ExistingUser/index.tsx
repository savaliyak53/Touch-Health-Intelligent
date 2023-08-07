import React, { useEffect, useContext } from 'react';
import { Button } from 'antd';
import Layout from '../../layouts/Layout/Layout';
import styles from './ExistingUser.module.scss';
import { useLocation, useNavigate } from 'react-router';
import AuthContext, { AuthContextData } from '../../contexts/AuthContext';

const ExistingUser = () => {
  const navigate = useNavigate();
  const location: any = useLocation();
  const context = useContext<AuthContextData | undefined>(AuthContext);

  const handleSignin = () => {
    localStorage.clear();
    context?.setAuthTokens(null);
    context?.setSession(null);
    context?.setUser(null);
    navigate('/login', {
      state: {
        username: location.state.username,
      },
    });
  };
  const handleResetPwd = () => {
    navigate('/password-reset', {
      state: {
        username: location.state.username,
        code: location.state.code,
      },
    });
  };

  return (
    <Layout defaultHeader={true} hamburger={false}>
      <div className="Title">{`An account with your number already exists, would you like to...`}</div>
      <div className={styles['Device-Container']}>
        <Button className="Submit-Button" onClick={handleSignin}>
          Sign in
        </Button>
        <Button className="Submit-Button" onClick={handleResetPwd}>
          Reset Password
        </Button>
      </div>
    </Layout>
  );
};
export default ExistingUser;
