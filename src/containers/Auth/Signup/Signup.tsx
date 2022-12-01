import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { SubmitHandler } from 'react-hook-form';
import { toast } from 'react-toastify';
import { signUpService } from '../../../services/authservice';
import Layout from '../../../layouts/Layout/Layout';
// import './index.scss';
import '../index.scss';
import styles from "./Signup.module.scss"
import Authstyles from "../Auth.module.scss"
import CountryCode from '../Country/CountryCode';
import { onlyNumbers } from '../../../utils/lib';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
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
