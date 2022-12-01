import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SubmitHandler } from 'react-hook-form';
import { toast } from 'react-toastify';
import { signUpService } from '../../../services/authservice';
import Layout from '../../../layouts/Layout/Layout';
// import './index.scss';
// import '../index.scss';

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
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [termsAndConditions, setTermAndConditions] = useState(false);
  const [highlight, setHighlight] = useState(false);


  const onSubmit: SubmitHandler<IFormInputs> = async (data) => {
    setIsLoading(true);
    setIsDisabled(true);
    signUpService({
      phone: onlyNumbers(data.phone),
      name: data.name,
      password: data.password,
    })
      .then((response) => {
        console.log(response);
        if (response?.id) {
          localStorage.setItem('userId', response.id);
          navigate(`/terms-and-conditions`);
        } else {
          setIsDisabled(false);
          setIsLoading(false);
          toast.error(response?.response?.data?.details);
        }
      })
      .catch((error: any) => {
        toast.error('Unknown error');
      });
  };

  const onChange = (e: CheckboxChangeEvent) => {
    setTermAndConditions(e.target.checked);
    setHighlight(false);
  };
  return (
    <Layout defaultHeader={false} hamburger={false} signupLogin="Signup-bg">
     <SignupForm 
        onSubmit={onSubmit}
        isDisabled={isDisabled}
        isLoading={isLoading}
      />
    </Layout>
  );
};

export default SignUp;
