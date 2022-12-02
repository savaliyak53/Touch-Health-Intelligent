import React, { useRef } from 'react';
import { SubmitHandler } from 'react-hook-form';
import Layout from '../../../layouts/Layout/Layout';
// import './index.scss';
// import '../index.scss';
import SignupForm from './SignupForm'

type IFormInputs = {
  name: string;
  phone: string;
  confirmPhone: string;
  password: string;
  confirmPassword: string;
  
};

const SignUp = () => {
  const refCaptcha = useRef<any>(null)


  const onSubmit: SubmitHandler<IFormInputs> = async (data) => {

    refCaptcha.current.callbacks.execute();
  };

  return (
    <Layout defaultHeader={false} hamburger={false} signupLogin="Signup-bg">
     <SignupForm 
        onSubmit={onSubmit}
        refCaptcha={refCaptcha}
      />
    </Layout>
  );
};

export default SignUp;
