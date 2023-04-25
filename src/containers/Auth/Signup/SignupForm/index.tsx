import React, { useState, useEffect } from 'react';
import styles from '../Signup.module.scss';
import Authstyles from '../../Auth.module.scss';
import CountryCode from '../../Country/CountryCode';
import { Checkbox, Tooltip } from 'antd';
import { AiOutlineEye } from 'react-icons/ai';
import Button from '../../../../components/Button';
import { Link, useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { toast } from 'react-toastify';
import { signUpService } from '../../../../services/authservice';
import { onlyNumbers } from '../../../../utils/lib';
import  ReCAPTCHA from 'react-google-recaptcha';

type SignupFormProps = {
  onSubmit: SubmitHandler<IFormInputs>;
  refCaptcha: any;
};

type IFormInputs = {
  name: string;
  phone: string;
  confirmPhone: string;
  password: string;
  confirmPassword: string;
};

const SignupForm = ({ onSubmit, refCaptcha }: SignupFormProps) => {
  const [passwordShown, setPasswordShown] = useState(false);
  const [confirmPasswordShown, setConfirmPasswordShown] = useState(false);
  const [checked, setChecked] = useState(false);
  const [checkedError, setCheckedError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    getValues,
    watch,
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

  const toggleConfirmPassword = () => {
    setConfirmPasswordShown(!confirmPasswordShown);
  };
  const isConfirmPhone = () => {
    return getValues('phone') !== getValues('confirmPhone') &&
      errors.confirmPhone
      ? true
      : false;
  };
  const onVerify = async () => {
    setIsLoading(true);
    setIsDisabled(true);
    const submitData = getValues();
    //const token = refCaptcha.current.callbacks.getResponse();
    const token = refCaptcha.current.getValue();
    refCaptcha.current.reset();
    localStorage.setItem('captchaToken', token);
    localStorage.setItem('phone', onlyNumbers(submitData.phone));
    signUpService(
      {
        phone: onlyNumbers(submitData.phone),
        name: submitData.name,
        password: submitData.password,
      },
      token
    )
      .then((response) => {
        if (response?.id) {
          localStorage.setItem('userId', response.id);
          localStorage.setItem('token', response.token);
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

  const handleCheck = () => {
    setChecked(!checked);
    setCheckedError(checked);
  };
  return (
    <div className={styles['Auth-wrap']}>
      <form
        role="signup-form"
        onSubmit={handleSubmit(onVerify)}
        className={styles['Auth-form']}
      >
        <h2 className={`Title ${styles['Auth-title']} `}>Find your path to health</h2>
        <div className={Authstyles['input-element-wrapper']}>
          <Tooltip
            color="orange"
            placement="bottomLeft"
            title={errors.name?.message}
            open={errors.name ? true : false}
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
              placeholder="Username e.g. 🚀cosmic potato"
              type="text"
              className={Authstyles['app-Input']}
            />
          </Tooltip>
        </div>
        <CountryCode
          errors={errors.phone}
          control={control}
          fieldName="phone"
          phone={watch('phone')}
        />
        <CountryCode
          errors={errors.confirmPhone}
          control={control}
          fieldName="confirmPhone"
          isConfirmPhone={isConfirmPhone}
          phone={getValues('phone')}
        />
        <div className={Authstyles['input-element-wrapper-password']}>
          <Tooltip
            color="orange"
            placement="bottomLeft"
            title={errors.password?.message}
            open={errors.password ? true : false}
          >
            <input
              id="password"
              placeholder="Enter password here"
              type={passwordShown ? 'text' : 'password'}
              className={Authstyles['app-Input']}
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
          <button
            className={Authstyles['btn']}
            onClick={togglePassword}
            type="button"
          >
            <AiOutlineEye />
          </button>
        </div>
        <div className={Authstyles['input-element-wrapper-password']}>
          <Tooltip
            color="orange"
            placement="bottomLeft"
            title={errors.confirmPassword?.message}
            open={errors.confirmPassword ? true : false}
          >
            <input
              id="confirmPassword"
              placeholder="Confirm password here"
              type={confirmPasswordShown ? 'text' : 'password'}
              className={Authstyles['app-Input']}
              {...register('confirmPassword', {
                required: 'Confirm password is required',
                validate: (value: string) => {
                  return (
                    value === getValues('password') || 'Passwords do not match.'
                  );
                },
              })}
            />
          </Tooltip>
          <button
            className={Authstyles['btn']}
            onClick={toggleConfirmPassword}
            type="button"
          >
            <AiOutlineEye />
          </button>
        </div>
        <ReCAPTCHA
          className={Authstyles["recaptcha"]}
          ref={refCaptcha}
          sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY as string}           
          onChange={()=>{
          setIsDisabled(false) } } 
        />
        <Tooltip
          color="orange"
          placement="bottom"
          title={'Please check the terms and conditions checkbox to proceed'}
          open={checkedError}
        ></Tooltip>
        <div className={Authstyles['Auth-terms-signup']}>
          <Link to="/login">Already have an account?</Link>
        </div>
        <Button
          // className={`${styles['Auth-submit']} ${
          //   isDisabled ? Authstyles['disabled'] : ''
          // }`}
          onClick={handleSubmit(onVerify)}
          loading={isLoading}
          disabled={isDisabled}
          className={'Submit-Button'}
        >
          Register
        </Button>
      </form>
     
      <div className={Authstyles['Customer-support']}>
        Problems? Contact{' '}
        <a href="https://www.touchmedical.ca/customer-care">customer support</a>
      </div>
    </div>
  );
};
export default SignupForm;
