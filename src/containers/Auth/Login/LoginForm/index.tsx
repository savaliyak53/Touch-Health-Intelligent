import React, { useState, useEffect, useContext } from 'react';
import { useForm, SubmitHandler, set } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useNavigate, useLocation } from 'react-router-dom';
import Button from 'components/Button';
import InputField from 'components/Input';
import styles from '../Login.module.scss';
import Authstyles from '../../Auth.module.scss';
import { Tooltip } from 'antd';
import CountryCode from '../../Country/CountryCode';
import { ILogin } from 'interfaces';
import {
  getTokenExpiration,
  onlyNumbers,
  validateNumber,
} from 'utils/lib';
import ReCAPTCHA from 'react-google-recaptcha';
import AccountLockModal from '../../../../components/Modal/AccountLockModal';
import AuthContext, { AuthContextData } from '../../../../contexts/AuthContext';
import { getSession, getUser } from '../../../../utils/lib';
import ConfirmModal from '../../../../components/Modal/ConfirmModal';
import FloatLabel from 'components/FloatLabel';


type LoginFormProps = {
  onSubmit: SubmitHandler<IFormInputs>;
  refCaptcha: any;
};

type IFormInputs = {
  username: string;
  password: string;
};

const LoginForm = ({ refCaptcha }: LoginFormProps) => {
  const [passwordShown, setPasswordShown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [modalText, setModalText] = useState('');
  const [showLockAccountModal, setShowLockAccountModal] = useState(false);
  const [error, setError] = useState<any>();
  const [isEye, setIsEye] = useState(true);
  const [activeClass, setActiveClass] = useState(styles.PasswordInput);
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const location: any = useLocation();
  const [wrongCredentialsModal, setWrongCredentialsModal] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    setValue,
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

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };
  const handleCancelModal = () => {
    setShowLockAccountModal(false);
  };
  const authContext = useContext<AuthContextData | undefined>(AuthContext); // Add the type parameter
  if (!authContext) return null;
  const { loginUser } = authContext;
  const onSubmit: SubmitHandler<IFormInputs> = async (data) => {
    setIsLoading(true);
    setIsDisabled(true);
    const submitData = getValues();
    const token = refCaptcha.current.getValue();
    refCaptcha.current.reset();
    const loginRequest: ILogin = {
      username: onlyNumbers(submitData.username),
      password: submitData.password,
    };
    const loginResponse = await loginUser(
      loginRequest.username,
      loginRequest.password,
      token
    );
    if (loginResponse?.token) {
      reset();
      setIsDisabled(false);
      setIsLoading(false);

      localStorage.setItem('token', `${loginResponse.token}`);
      localStorage.setItem(
        'expiration',
        getTokenExpiration(loginResponse.token)
      );
      const userId = getUser(loginResponse.token);
      localStorage.setItem('userId', userId);
      const sessionId = getSession(loginResponse.token);
      localStorage.setItem('sessionId', sessionId);
      navigate('/');
    } else {
      setIsLoading(false);
      if (loginResponse?.response?.status === 429) {
        setShowLockAccountModal(true);
        setModalText(loginResponse?.response?.data?.details);
      } else {
        setError({
          code: loginResponse?.response?.status,
          message: loginResponse.response.data?.details,
        });
        setWrongCredentialsModal(true);
      }
    }
  };
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
    if (errors.password?.message) {
      setIsEye(false);
    } else {
      setIsEye(true);
    }
  });

  // useEffect(() => {
  //    if (error) throw error;
  // }, [error]);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (location.state?.username)
      setValue('username', validateNumber(location.state.username));
  }, []);
  return (
    <div className={styles.Login}>
      <div className={styles.FormWrap}>
        <form
          role="login-form"
          onSubmit={handleSubmit(onSubmit)}
          className={styles.Form}
        >
          <h1 className={styles.Title}>Log in</h1>

          <FloatLabel isUsername={true} label="Mobile phone number" name="username" value={getValues('username')}>
            <CountryCode
              errors={errors.username}
              control={control}
              fieldName="username"
            />
          </FloatLabel>

          <Tooltip
            color="orange"
            placement="bottomLeft"
            title={errors.password?.message}
            open={isHovered ? true : false}
          >
          <FloatLabel isUsername={false} label="Password" name="password" value={getValues('password')}>    

            <InputField
              id="password"
              data-testid="pwd"
              {...register('password', {
                required: 'Password is required',
              })}
              placeholder="Password"
              type={passwordShown ? 'text' : 'password'}
              className={isEye ? activeClass : styles.PasswordInputIvalid}
              isEye={isEye}
              handleMouseEnter={handleMouseEnter}
              handleMouseLeave={handleMouseLeave}
              togglePassword={togglePassword}
            />
          </FloatLabel>

          </Tooltip>
          <AccountLockModal
            title={'Too many retries'}
            open={showLockAccountModal}
            handleCancel={handleCancelModal}
            isAuth={true}
            handleOk={handleCancelModal}>
            <div className={'text-3 text-oldBurgundy leading-[23px] text-left'}>{modalText}</div>
          </AccountLockModal>
          <ConfirmModal
            title={'Error'}
            open={wrongCredentialsModal}
            isAuth={true}
            handleCancel={() => setWrongCredentialsModal(false)}
            handleOk={() => setWrongCredentialsModal(false)}>
            <div className="text-3 text-oldBurgundy leading-[23px] text-left">
              <div>{error?.message}</div>
            </div>
          </ConfirmModal>
          <ReCAPTCHA
            className={Authstyles['recaptcha']}
            ref={refCaptcha}
            sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY as string}
            onChange={() => {
              setIsDisabled(false);
            }}
          />
          <Button
            className={styles.LoginButton}
            onClick={handleSubmit(onSubmit)}
            loading={isLoading}
            disabled={isDisabled}
            data-testid="submit"
          >
            Log in
          </Button>

          <div className={styles.ToSignup}>
            <span>Don’t have an account? </span>
            <Link to="/signup" className={styles.Link}>
              Sign up
            </Link>
          </div>
        </form>
      </div>
      <div className={styles.LinksWrap}>
        <a
          href="https://www.touchmedical.ca/customer-care"
          className={styles.OtherLink}
          target='blank'
        >
          Customer care
        </a>
        <Link to="/password-reset" className={styles.OtherLink}>
          Forgot password
        </Link>
      </div>
    </div>
  );
};

export default LoginForm;
