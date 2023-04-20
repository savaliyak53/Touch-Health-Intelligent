import React, { useRef } from 'react';
import { SubmitHandler } from 'react-hook-form';
import Layout from '../../../layouts/Layout/Layout';
// import './index.scss';
// import '../index.scss';
import { useNavigate } from 'react-router';

import SignupForm from './SignupForm'
import styles from "./Signup.module.scss"
type IFormInputs = {
  name: string;
  phone: string;
  confirmPhone: string;
  password: string;
  confirmPassword: string;
  
};

const SignUp = () => {
  const refCaptcha = useRef<any>(null)
  const navigate= useNavigate()

  const onSubmit: SubmitHandler<IFormInputs> = async (data) => {
    const token = refCaptcha.current.getValue();
    refCaptcha.current.reset();
  };

  return (
    <Layout defaultHeader={false} hamburger={false} signupLogin="Signup-bg">
      <div className={styles.SignupBGWrap}>
        <SignupForm
          onSubmit={onSubmit}
          refCaptcha={refCaptcha}
        />
        <div className={styles.SignupBGShape1}></div>
        <div className={styles.SignupBGShape2}></div>
        <div className={styles.SignupBGShape3}></div>
      </div>

    </Layout>
  );
};

export default SignUp;
