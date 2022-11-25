import React, { useState, useEffect, useRef } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/Button';
import InputField from '../../../components/Input';
import Layout from '../../../layouts/Layout/Layout';
import { loginService } from '../../../services/authservice';
import jwt from 'jwt-decode';
// import './index.scss';
import '../index.scss';
import styles from "./Login.module.scss"
import Authstyles from "../Auth.module.scss"
import { Tooltip } from 'antd';
import CountryCode from '../Country/CountryCode';
import { ILogin } from '../../../interfaces';
import { onlyNumbers } from '../../../utils/lib';
import Recaptcha from 'react-google-invisible-recaptcha';

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
  const refCaptcha = useRef<any>(null)
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    getValues,
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
  const onSubmit: SubmitHandler<IFormInputs> = (data) => {
    setIsLoading(true);
    setIsDisabled(true);
    refCaptcha.current.callbacks.execute();
  };

  const onVerify = async () => {
    const submitData = getValues()
    const token = refCaptcha.current.callbacks.getResponse()
    const loginRequest: ILogin = {
      username: onlyNumbers(submitData.username),
      password: submitData.password,
    };
    const loginResponse = await loginService(loginRequest, token);
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
  }

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  return (
    <Layout defaultHeader={false} hamburger={false} signupLogin="Login-bg">
  
      <div className={styles["Auth-wrap"]}>
        <form role="login-form" onSubmit={handleSubmit(onSubmit)} className={` ${styles["Auth-form"]} ${Authstyles["Auth-form"]} `}>
        <h2 className={`${styles["Auth-title"]} ${Authstyles["Auth-title"]}`}>Find your path to health</h2>

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
              className={Authstyles["app-Input"]}
              isEye={true}
              togglePassword={togglePassword}
            />
          </Tooltip>

          <Button
            className="Auth-submit"
            onClick={handleSubmit(onSubmit)}
            loading={isLoading}
            disabled={isDisabled}
            data-testid="button"
          >
            Login
          </Button>
        </form>
        <Recaptcha
            ref={refCaptcha}
            sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY ?? "6LdKGisjAAAAABJNmkJdR40OrfbpIIlIOAvzMiRe"}           
            onResolved={onVerify} />
        <div className={Authstyles['Links-wrap']}>
          <div className={Authstyles["Auth-terms-signup"]}>
           For customer support, please follow this <a href="https://www.touchmedical.ca/customer-care">link</a>
          </div>

          <div className={Authstyles["Auth-terms-signup"]}>
            <Link to="/password-reset" className={Authstyles["Auth-signup"]}>
              Forgot Password?
            </Link>
          </div>

          <div className={Authstyles["Auth-terms-signup"]}>
            {/* <Link to="/signup" className="Auth-signup"> */}
            <Link to="/signup" className={Authstyles["Auth-signup"]}>
              Create an Account?
            </Link>
          </div>
        </div>
      </div>
      </Layout>
  );
};

export default Login;
