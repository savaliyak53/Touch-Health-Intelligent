import React, { useRef } from 'react';
import { SubmitHandler } from 'react-hook-form';
import Layout from '../../../layouts/Layout/Layout';
import LoginForm from './LoginForm'
import styles from "./Login.module.scss"
import { useNavigate } from 'react-router';

type IFormInputs = {
  username: string;
  password: string;
};


const Login = () => {
  const refCaptcha = useRef<any>(null)
const navigate= useNavigate()
  const onSubmit: SubmitHandler<IFormInputs> = (data) => {
    refCaptcha.current.callbacks.execute();
  };


  return (
    <Layout defaultHeader={false} hamburger={false} signupLogin="Login-bg">
      <div className={styles.SignupBGWrap}>
      <LoginForm 
        onSubmit={onSubmit}
        refCaptcha={refCaptcha}
        />
        <div className={styles.SignupBGShape1}></div>
        <div className={styles.SignupBGShape2}></div>
        {/* nayab reconsider Link */}
        <div className={styles.SignupBGShape3}></div>
      </div>

    </Layout>
  );
};

export default Login;
