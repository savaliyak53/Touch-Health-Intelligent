import React, { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/Button';
import InputField from '../../../components/Input';
import Layout from '../../../layouts/Layout/Layout';

import { loginService } from '../../../services/authservice';
import jwt from 'jwt-decode';
import './index.scss';
import '../index.scss';
import { Tooltip } from 'antd';
import CountryCode from '../Country/CountryCode';
import { ILogin } from '../../../interfaces';
import { onlyNumbers } from '../../../utils/lib';

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
  const [passwordShown, setPasswordShown] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<IFormInputs>({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    shouldFocusError: true,
    shouldUnregister: false,
  });

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
      reset();
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

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  return (
    <Layout defaultHeader={false} hamburger={false} signupLogin="Login-bg">
      <div className="Auth-wrap">
        <form onSubmit={handleSubmit(onSubmit)} className="Auth-form">
          <h2 className="Auth-title">Find your path to health</h2>
          <CountryCode
            errors={errors.username}
            control={control}
            fieldName="username"
          />
          <Tooltip
            color="orange"
            placement="bottomLeft"
            title={errors.password?.message}
            visible={errors.password ? true : false}
          >
            <InputField
              id="password"
              {...register('password', {
                required: 'Password is required',
              })}
              placeholder="Password"
              type={passwordShown ? 'text' : 'password'}
              className="app-Input"
              isEye={true}
              togglePassword={togglePassword}
            />
          </Tooltip>

          <Button
            className="Auth-submit"
            onClick={handleSubmit(onSubmit)}
            loading={isLoading}
            disabled={isDisabled}
          >
            Login
          </Button>
        </form>
        <div className='Links-wrap'>
          <div className="Auth-terms-signup">
           For customer support, please follow this <a href="https://www.touchmedical.ca/customer-care">link</a>
          </div>

          <div className="Auth-terms-signup">
            <Link to="/password-reset" className="Auth-signup">
              Forgot Password?
            </Link>
          </div>

          <div className="Auth-terms-signup">
            <Link to="/signup" className="Auth-signup">
              Create an Account?
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
