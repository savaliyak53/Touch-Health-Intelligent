import React, { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import Button from '../../../components/Button';
import InputField from '../../../components/Input';
import Layout from '../../../layouts/Layout/Layout';

import {
  getInteractionService,
  getUser,
  loginService,
} from '../../../services/authservice';
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

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const userId = localStorage.getItem('userId');
      getUserInfo(userId);
    }
  }, []);
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
      getUserInfo(userId);
    } else {
      setIsDisabled(false);
      setIsLoading(false);
      toast.error(loginResponse?.response?.data?.details);
    }
  };

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  const getUserInfo = (userId: string | null | undefined) => {
    getUser(userId)
      .then((response: any) => {
        if (!response?.data?.security_questions?.length) {
          return navigate('/security');
        }
        if (response?.data?.preferences?.timezone) {
          getInteractionService()
            .then((response) => {
              if (response?.data?.question) {
                navigate('/questionnaire');
              } else {
                navigate('/dashboard');
              }
            })
            .catch((error) => {
              toast(error.response.data.details.message);
            });
        } else {
          navigate('/preferences');
        }
      })
      .catch((error) => {
        toast('Unknown error');
      });
  };
  return (
    <Layout defaultHeader={false} hamburger={false}>
      <div className="Auth-wrap">
        <form onSubmit={handleSubmit(onSubmit)} className="Auth-form">
          <h2 className="Auth-title">Login</h2>
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
            style={{ color: 'white' }}
          >
            Login
          </Button>
        </form>
        <div className="Auth-terms-reset">
          <Link to="/reset-password" className="Auth-signup">
            Reset Password?
          </Link>
        </div>
        <div className="Auth-terms">
          <Link to="/signup" className="Auth-signup">
            Create an Account?
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
