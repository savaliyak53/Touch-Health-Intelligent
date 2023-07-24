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
    <Layout defaultHeader={false} hamburger={false} signupLogin="Signup-bg">
      <div className={styles.SignupBGWrap}>
        <SignupForm onSubmit={onSubmit} refCaptcha={refCaptcha} />
      </div>
    </Layout>
  );
};

export default SignUp;
