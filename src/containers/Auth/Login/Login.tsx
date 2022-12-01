import React, { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Layout from '../../../layouts/Layout/Layout';
import { loginService } from '../../../services/authservice';
import jwt from 'jwt-decode';
// import './index.scss';
// import '../index.scss';
import { ILogin } from '../../../interfaces';
import { onlyNumbers } from '../../../utils/lib';
import LoginForm from './LoginForm'

type IFormInputs = {
  username: string;
  password: string;
};

type User = {
  exp: string;
  iat: string;
  id: string;
};

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [resetForm, setResetForm] = useState(false)
  const navigate = useNavigate();


  const getId = (token: string) => {
    const user: User = jwt(token);
    return user.id;
  };
  const onSubmit: SubmitHandler<IFormInputs> = async (data) => {
    setIsLoading(true);
    setIsDisabled(true);
    const loginRequest: ILogin = {
      username: onlyNumbers(data.username),
      password: data.password,
    };
    const loginResponse = await loginService(loginRequest);
    if (loginResponse?.token) {
      setResetForm(true);
      setIsDisabled(false);
      setIsLoading(false);
      localStorage.setItem('token', `${loginResponse.token}`);
      const userId = getId(loginResponse.token);
      localStorage.setItem('userId', userId);
      navigate('/');
    } else {
      setIsDisabled(false);
      setIsLoading(false);
      toast.error(loginResponse?.response?.data?.details);
    }
  };

  return (
    <Layout defaultHeader={false} hamburger={false} signupLogin="Login-bg">
      <LoginForm 
        resetForm={resetForm}
        onSubmit={onSubmit}
        isLoading={isLoading}
        isDisabled={isDisabled}
        />
    </Layout>
  );
};

export default Login;
