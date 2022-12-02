import React, { useRef } from 'react';
import { SubmitHandler } from 'react-hook-form';
import Layout from '../../../layouts/Layout/Layout';
// import './index.scss';
// import '../index.scss';
import LoginForm from './LoginForm'

type IFormInputs = {
  username: string;
  password: string;
};


const Login = () => {
  const refCaptcha = useRef<any>(null)

  const onSubmit: SubmitHandler<IFormInputs> = (data) => {
    refCaptcha.current.callbacks.execute();
  };


  return (
    <Layout defaultHeader={false} hamburger={false} signupLogin="Login-bg">
      <>
      <LoginForm 
        onSubmit={onSubmit}
        refCaptcha={refCaptcha}
        />
      </>

    </Layout>
  );
};

export default Login;
