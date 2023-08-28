import React, { useState, useEffect, useContext } from 'react';
import styles from '../Signup.module.scss';
import Authstyles from '../../Auth.module.scss';
import CountryCode from '../../Country/CountryCode';
import { Tooltip } from 'antd';
import Button from 'components/Button';
import { Link, useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { onlyNumbers } from 'utils/lib';
import ReCAPTCHA from 'react-google-recaptcha';
import AuthContext, { AuthContextData } from 'contexts/AuthContext';
import InputField from 'components/Input';

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

const SignupForm = ({ refCaptcha }: SignupFormProps) => {
  const [passwordShown, setPasswordShown] = useState(false);
  const [activeClass, setActiveClass] = useState(styles.PasswordInput);
  const [activeClassConfirm, setActiveClassConfirm] = useState(
    styles.PasswordInput
  );
  const [userName, setUserName] = useState(styles.PasswordInput);
  const [isEye, setIsEye] = useState(true);
  const [isEyeConfirm, setIsEyeConfirm] = useState(true);
  const [isUserNameValid, setIsUserNameValid] = useState(true);
  const [confirmPasswordShown, setConfirmPasswordShown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [error, setError] = useState<any>();
  const [isHovered, setIsHovered] = useState(false);
  const [isHoveredConfirm, setIsHoveredConfirm] = useState(false);
  const [isHoveredUserName, setIsHoveredUserName] = useState(false);
  const authContext = useContext<AuthContextData | undefined>(AuthContext);
  const { signupUser } = authContext as AuthContextData;
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

  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  const handleMouseEnterConfirm = () => {
    setIsHoveredConfirm(true);
  };
  const handleMouseLeaveConfirm = () => {
    setIsHoveredConfirm(false);
  };
  const handleMouseEnterUser = () => {
    setIsHoveredUserName(true);
  };
  const handleMouseLeaveUser = () => {
    setIsHoveredUserName(false);
  };

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  const toggleConfirmPassword = () => {
    setConfirmPasswordShown(!confirmPasswordShown);
  };
  const onVerify = async () => {
    setIsLoading(true);
    setIsDisabled(true);
    const submitData = getValues();
    const token = refCaptcha.current.getValue();
    refCaptcha.current.reset();
    localStorage.setItem('captchaToken', token);
    localStorage.setItem('phone', onlyNumbers(submitData.phone));
    const signupResponse = await signupUser(
      {
        phone: onlyNumbers(submitData.phone),
        name: submitData.name,
        password: submitData.password,
      },
      token
    );
    if (signupResponse?.id) {
      localStorage.setItem('userId', signupResponse.id);
      localStorage.setItem('token', signupResponse.token);
      navigate(`/terms-and-conditions`);
    } else {
      setIsDisabled(false);
      setIsLoading(false);
      setError({
        code: signupResponse.response.data.status,
        message: signupResponse.response.data.details,
      });
    }
  };
  useEffect(() => {
    if (errors.password?.message) {
      setIsEye(false);
    } else {
      setIsEye(true);
    }
    if (errors.confirmPassword?.message) {
      setIsEyeConfirm(false);
    } else {
      setIsEyeConfirm(true);
    }
    if (errors.name?.message) {
      setIsUserNameValid(false);
    } else {
      setIsUserNameValid(true);
    }
  });
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  const watchedValues = watch();
  useEffect(() => {
    const debounceId = setTimeout(() => {
      setActiveClass(styles.PasswordInput);
    }, 500);
    if (
      watchedValues.password != undefined &&
      watchedValues.password.length !== 0
    )
      setActiveClass(styles.PasswordInputChange);
    return () => {
      clearTimeout(debounceId);
    };
  }, [watchedValues.password]);
  useEffect(() => {
    const debounceId = setTimeout(() => {
      setActiveClassConfirm(styles.PasswordInput);
    }, 500);
    if (
      watchedValues.confirmPassword != undefined &&
      watchedValues.confirmPassword.length !== 0
    )
      setActiveClassConfirm(styles.PasswordInputChange);
    return () => {
      clearTimeout(debounceId);
    };
  }, [watchedValues.confirmPassword]);
  useEffect(() => {
    const debounceId = setTimeout(() => {
      setUserName(styles.PasswordInput);
    }, 500);
    if (watchedValues.name != undefined && watchedValues.name.length !== 0)
      setUserName(styles.PasswordInputChange);
    return () => {
      clearTimeout(debounceId);
    };
  }, [watchedValues.name]);

  return (
    <div className={styles.Signup}>
      <div className={styles.FormWrap}>
        <form
          role="signup-form"
          onSubmit={handleSubmit(onVerify)}
          className={styles.Form}
        >
          <h1 className={styles.Title}>Create an account</h1>
          <div className={Authstyles['input-element-wrapper']}>
            <Tooltip
              color="orange"
              placement="bottomLeft"
              title={errors.name?.message}
              open={isHoveredUserName ? true : false}
            >
              <InputField
                id="name"
                {...register('name', {
                  required: 'Username is required.',
                  maxLength: {
                    value: 24,
                    message: 'Username can have maximum 24 characters.',
                  },
                })}
                placeholder="Username"
                type="text"
                className={
                  isUserNameValid
                    ? `${Authstyles['app-Input']} ${userName}`
                    : `${Authstyles['app-Input']} ${styles.PasswordInputIvalid}`
                }
                userName={isUserNameValid}
                handleMouseEnter={handleMouseEnterUser}
                handleMouseLeave={handleMouseLeaveUser}
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
            phone={getValues('phone')}
          />
          <div className={Authstyles['input-element-wrapper-password']}>
            <Tooltip
              color="orange"
              placement="bottomLeft"
              title={errors.password?.message}
              open={isHovered ? true : false}
            >
              <InputField
                id="password"
                placeholder="Password"
                type={passwordShown ? 'text' : 'password'}
                className={
                  isEye
                    ? `${Authstyles['app-Input']} ${activeClass}`
                    : `${Authstyles['app-Input']} ${styles.PasswordInputIvalid}`
                }
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
                isEye={isEye}
                handleMouseEnter={handleMouseEnter}
                handleMouseLeave={handleMouseLeave}
                togglePassword={togglePassword}
              />
            </Tooltip>
          </div>
          <div className={Authstyles['input-element-wrapper-password']}>
            <Tooltip
              color="orange"
              placement="bottomLeft"
              title={errors.confirmPassword?.message}
              open={isHoveredConfirm ? true : false}
            >
              <InputField
                id="confirmPassword"
                placeholder="Confirm password"
                type={confirmPasswordShown ? 'text' : 'password'}
                className={
                  isEyeConfirm
                    ? `${Authstyles['app-Input']} ${activeClassConfirm}`
                    : `${Authstyles['app-Input']} ${styles.PasswordInputIvalid}`
                }
                {...register('confirmPassword', {
                  required: 'Confirm password is required',
                  validate: (value: string) => {
                    return (
                      value === getValues('password') ||
                      'Passwords do not match.'
                    );
                  },
                })}
                isEye={isEyeConfirm}
                handleMouseEnter={handleMouseEnterConfirm}
                handleMouseLeave={handleMouseLeaveConfirm}
                togglePassword={toggleConfirmPassword}
              />
            </Tooltip>
          </div>
          <ReCAPTCHA
            className={Authstyles['recaptcha']}
            ref={refCaptcha}
            sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY as string}
            onChange={() => {
              setIsDisabled(false);
            }}
          />
          <Button
            onClick={handleSubmit(onVerify)}
            loading={isLoading}
            disabled={isDisabled}
            className={styles.SignupButton}
          >
            Create an account
          </Button>
        </form>
        <div className={styles.ToLogin}>
          <span>Already have an account? </span>
          <Link to="/login" className={styles.Link}>
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
};
export default SignupForm;
