import React, { useRef } from 'react';
import { SubmitHandler } from 'react-hook-form';
import SignupForm from './SignupForm';
import useLocalStorage from 'hooks/useLocalStorage';
import AuthLayout from 'layouts/AuthLayout';

type IFormInputs = {
  name: string;
  phone: string;
  confirmPhone: string;
  password: string;
  confirmPassword: string;
};

const SignUp = () => {
  const [setIsOnboarding] = useLocalStorage("isOnboarding");
  const refCaptcha = useRef<any>(null);
  const onSubmit: SubmitHandler<IFormInputs> = async (data) => {
    refCaptcha.current.reset();
    setIsOnboarding(true);
  };

  return (
    <AuthLayout>
      <SignupForm onSubmit={onSubmit} refCaptcha={refCaptcha} />
    </AuthLayout>
  );
};

export default SignUp;
