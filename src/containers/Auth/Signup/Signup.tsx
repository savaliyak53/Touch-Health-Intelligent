import React, { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { requestPhoneOTP } from '../../../services/authservice';
import { toast } from 'react-toastify';
import Button from '../../../components/Button';
import { signUpService } from '../../../services/authservice';
import { AiOutlineEye } from 'react-icons/ai';
import Layout from '../../../layouts/Layout/Layout';
import { Checkbox, Tooltip } from 'antd';
// import './index.scss';
import '../index.scss';
import styles from "./Signup.module.scss"
import Authstyles from "../Auth.module.scss"
import CountryCode from '../Country/CountryCode';
import { onlyNumbers } from '../../../utils/lib';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import Recaptcha from 'react-google-invisible-recaptcha';

type IFormInputs = {
  name: string;
  phone: string;
  confirmPhone: string;
  password: string;
  confirmPassword: string;
};

const SignUp = () => {
  const navigate = useNavigate();
  const [passwordShown, setPasswordShown] = useState(false);
  const [confirmPasswordShown, setConfirmPasswordShown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [termsAndConditions, setTermAndConditions] = useState(false);
  const [highlight, setHighlight] = useState(false);
  const refCaptcha = useRef<any>(null)
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
  const onSubmit = async (data: any) => {
    setIsLoading(true);
    setIsDisabled(true);
    if(data){
      refCaptcha.current.callbacks.execute()
    } else {
      refCaptcha.current.callbacks.reset()
    }
    signUpService({
      phone: onlyNumbers(data.phone),
      name: data.name,
      password: data.password,
    })
      .then((response) => {
        if (response?.id) {
          localStorage.setItem('userId', response.id);
          navigate(`/terms-and-conditions`);
        } else {
          setIsDisabled(false);
          setIsLoading(false);
          toast.error(response?.response?.data?.details?.message);
        }
      })
      .catch((error: any) => {
        toast('Unknown error');
      });
  };

  const onVerify = () => {
    console.log(refCaptcha.current.callbacks.getResponse());
    const token = refCaptcha.current.callbacks.getResponse()
  }

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  const toggleConfirmPassword = () => {
    setConfirmPasswordShown(!confirmPasswordShown);
  };

  const isConfirmPhone = () => {
    return getValues('phone') !== getValues('confirmPhone') &&
      errors.confirmPhone
      ? true
      : false;
  };
  const onChange = (e: CheckboxChangeEvent) => {
    setTermAndConditions(e.target.checked);
    setHighlight(false);
  };
  return (
    <Layout defaultHeader={false} hamburger={false} signupLogin="Signup-bg">
      <div className={styles["Auth-wrap"]}>
        <form onSubmit={handleSubmit(onSubmit)} className={styles["Auth-form"]}>
          <h2 className={`${styles["Auth-title"]} ${Authstyles["Auth-title"]}`}>Find your path to health</h2>
          <div className={Authstyles["input-element-wrapper"]}>
            <Tooltip
              color="orange"
              placement="bottomLeft"
              title={errors.name?.message}
              visible={errors.name ? true : false}
            >
              <input
                id="name"
                {...register('name', {
                  required: 'Username is required.',
                  maxLength: {
                    value: 50,
                    message: 'Username can have maximum 50 characters.',
                  },
                })}
                placeholder="Username"
                type="text"
                className={Authstyles["app-Input"]}
              />
            </Tooltip>
          </div>
          <CountryCode
            errors={errors.phone}
            control={control}
            fieldName="phone"
          />
          <CountryCode
            errors={errors.confirmPhone}
            control={control}
            fieldName="confirmPhone"
            isConfirmPhone={isConfirmPhone}
            phone={getValues('phone')}
          />
          <div className={Authstyles["input-element-wrapper-password"]}>
            <Tooltip
              color="orange"
              placement="bottomLeft"
              title={errors.password?.message}
              visible={errors.password ? true : false}
            >
              <input
                id="password"
                placeholder="Enter password here"
                type={passwordShown ? 'text' : 'password'}
                className={Authstyles["app-Input"]}
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 8,
                    message: 'Password should be of at least 8 characters.',
                  },
                  pattern: {
                    value: /^(?=.*?[#?!@$%^&*-])/,
                    message: 'Need a special character.',
                  },
                })}
              />
            </Tooltip>
            <button className={Authstyles["btn"]} onClick={togglePassword} type="button">
              <AiOutlineEye />
            </button>
          </div>
          <div className={Authstyles["input-element-wrapper-password"]}>
            <Tooltip
              color="orange"
              placement="bottomLeft"
              title={errors.confirmPassword?.message}
              visible={errors.confirmPassword ? true : false}
            >
              <input
                id="confirmPassword"
                placeholder="Confirm password here"
                type={confirmPasswordShown ? 'text' : 'password'}
                className={Authstyles["app-Input"]}
                {...register('confirmPassword', {
                  required: 'Confirm password is required',
                  validate: (value: string) => {
                    return (
                      value === getValues('password') ||
                      'Passwords do not match.'
                    );
                  },
                })}
              />
            </Tooltip>
            <button
              className={Authstyles["btn"]}
              onClick={toggleConfirmPassword}
              type="button"
            >
              <AiOutlineEye />
            </button>
          </div>
          <Button
            className="Auth-submit"
            onClick={handleSubmit(onSubmit)}
            loading={isLoading}
            disabled={isDisabled}
          >
            Sign Up
          </Button>
          <Recaptcha
            ref={refCaptcha}
            sitekey="6LfsSycjAAAAACb51JemEI_r8vSka1WLI0iZQ19X"
            onResolved={onVerify} />
        </form>
        <div className={Authstyles['Links-wrap']}>
          <div className={Authstyles["Auth-terms-signup"]}>
          For customer support, please follow this <a href="https://www.touchmedical.ca/customer-care">link</a>
          </div>
          <div className={Authstyles["Auth-terms-signup"]}>
            <Link to="/login">Already have an account?</Link>
          </div>
        </div>
        
      </div>
    </Layout>
  );
};

export default SignUp;
