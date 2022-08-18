import React, { useState } from 'react';
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
import './index.scss';

import CountryCode from '../Country/CountryCode';
import { onlyNumbers } from '../../../utils/lib';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
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
    const signUpResponse = await signUpService({
      phone: onlyNumbers(data.phone),
      name: data.name,
      password: data.password,
    });
    if (signUpResponse?.id) {
      reset();
      setIsDisabled(false);
      setIsLoading(false);
      localStorage.setItem('userId', signUpResponse.id);
      const isOtpSent = await sendPhoneOTP();
      if (isOtpSent) {
        navigate(`/verification-message/${signUpResponse.id}`);
      }
    } else {
      setIsDisabled(false);
      setIsLoading(false);
      toast.error(signUpResponse?.response?.data?.details?.message);
    }
  };

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  const toggleConfirmPassword = () => {
    setConfirmPasswordShown(!confirmPasswordShown);
  };

  const sendPhoneOTP = async () => {
    //api call to send email otp
    const userId = localStorage.getItem('userId');
    const phoneRequestResponse = await requestPhoneOTP(userId);
    if (phoneRequestResponse?.response?.data) {
      toast.error('Invalid Phone Number');
      return false;
    } else {
      toast.success('You have signed up successfully');
      toast.success('Phone verification link sent');
      return true;
    }
  };
  const isConfirmPhone = () => {
    return getValues('phone') !== getValues('confirmPhone') &&
      errors.confirmPhone
      ? true
      : false;
  };
  const onChange = (e: CheckboxChangeEvent) => {
    setTermAndConditions(e.target.checked);
  };
  return (
    <Layout defaultHeader={false} hamburger={false}>
      <div className="Auth-wrap">
        <form onSubmit={handleSubmit(onSubmit)} className="Auth-form">
          <h2 className="Auth-title">Sign up</h2>
          <div className="input-element-wrapper">
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
                className="app-Input"
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
          <div className="input-element-wrapper-password">
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
                className="app-Input"
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
            <button className="btn" onClick={togglePassword} type="button">
              <AiOutlineEye />
            </button>
          </div>
          <div className="input-element-wrapper-password">
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
                className="app-Input"
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
              className="btn"
              onClick={toggleConfirmPassword}
              type="button"
            >
              <AiOutlineEye />
            </button>
          </div>
          <div className="Auth-terms">
            <Checkbox
              id="termsAndConditions"
              checked={termsAndConditions}
              onChange={onChange}
            >
              By creating your account, you agree to the
              <Link to="#"> Terms & Conditions</Link>
            </Checkbox>
          </div>
          <Button
            onClick={handleSubmit(onSubmit)}
            loading={isLoading}
            disabled={isDisabled}
            className="Auth-submit"
            style={{ color: 'white' }}
          >
            Sign Up
          </Button>
        </form>
        <div className="Auth-terms-signup">
          <Link to="/login">Already have an account?</Link>
        </div>
      </div>
    </Layout>
  );
};

export default SignUp;
