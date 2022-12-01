import React, { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Link } from 'react-router-dom';
import Button from '../../../../components/Button';
import InputField from '../../../../components/Input';
// import './index.scss';
import '../index.scss';
import styles from "../Login.module.scss"
import Authstyles from "../../Auth.module.scss"
import { Tooltip } from 'antd';
import CountryCode from '../../Country/CountryCode';

type LoginFormProps = {
    resetForm: boolean
    onSubmit: SubmitHandler<IFormInputs>,
    isLoading: boolean,
    isDisabled: boolean
}

type IFormInputs = {
  username: string;
  password: string;
};

const LoginForm = ({onSubmit, resetForm, isDisabled, isLoading}: LoginFormProps) => {
  const [passwordShown, setPasswordShown] = useState(false);
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
  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  useEffect(() => {
    if(resetForm) {reset()}
  },[resetForm])
    return (
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
              data-testid='pwd'
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
            className={Authstyles["Auth-submit"]}
            onClick={handleSubmit(onSubmit)}
            loading={isLoading}
            disabled={isDisabled}
            data-testid="submit"
          >
            Login
          </Button>
        </form>
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
            <Link to="/signup" className={Authstyles["Auth-signup"]}>
              Create an Account?
            </Link>
          </div>
        </div>
      </div>
    )
}

export default LoginForm