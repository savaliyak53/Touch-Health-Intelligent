import React, { useState, useEffect, useContext } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useNavigate, useLocation } from 'react-router-dom';
import Button from '../../../../components/Button';
import InputField from '../../../../components/Input';
import styles from '../Login.module.scss';
import Authstyles from '../../Auth.module.scss';
import { Tooltip } from 'antd';
import CountryCode from '../../Country/CountryCode';
import { ILogin } from '../../../../interfaces';
import { toast } from 'react-toastify';
import { getTokenExpiration, onlyNumbers, validateNumber } from '../../../../utils/lib';
import ReCAPTCHA from 'react-google-recaptcha';
import AccountLockModal from '../../../../components/Modal/AccountLockModal';
import AuthContext, { AuthContextData } from '../../../../contexts/AuthContext';
import { getSession, getUser } from '../../../../utils/lib';

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
  const navigate = useNavigate();
  const location: any = useLocation();
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    setValue,
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
      if (loginResponse?.response.status === 429) {
        setShowLockAccountModal(true);
        setModalText(loginResponse?.response?.data?.details);
      } else if (loginResponse?.response.status === 403) {
        toast.error(loginResponse?.response?.data?.details);
      } else {
        setError({code: loginResponse?.response?.status, message: loginResponse.response.data?.details})
      } 
    }
  };

  useEffect(() => {
    if(error) throw(error)
  },[error])

  useEffect(() => {
    window.scrollTo(0,0);
    if(location.state?.username) setValue('username',validateNumber(location.state.username));
  }, [])
  
  return (
    <div className={styles['Auth-wrap']}>
      <form
        role="login-form"
        onSubmit={handleSubmit(onSubmit)}
        className={styles['Auth-form']}
      >
        {/* <h2 className={`${styles["Auth-title"]} ${Authstyles["Auth-title"]}`}>Find your path to health</h2> */}
        <h2 className={`Title ${styles['Auth-title']} `}>
          Find your path to health
        </h2>

        <CountryCode
          errors={errors.username}
          control={control}
          fieldName="username"
        />
        <Tooltip
          color="orange"
          placement="bottomLeft"
          title={errors.password?.message}
          open={errors.password ? true : false}
        >
          <InputField
            id="password"
            data-testid="pwd"
            {...register('password', {
              required: 'Password is required',
            })}
            placeholder="Password"
            type={passwordShown ? 'text' : 'password'}
            className={Authstyles['app-Input']}
            isEye={true}
            togglePassword={togglePassword}
          />
        </Tooltip>
        <AccountLockModal
          title={'Too many retries'}
          open={showLockAccountModal}
          handleCancel={handleCancelModal}
          handleOk={handleCancelModal}
          renderData={<div>{modalText}</div>}
        />
        <ReCAPTCHA
          className={Authstyles['recaptcha']}
          ref={refCaptcha}
          sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY as string}
          onChange={() => {
            setIsDisabled(false);
          }}
        />
        <Button
          className={'Submit-Button'}
          onClick={handleSubmit(onSubmit)}
          loading={isLoading}
          disabled={isDisabled}
          data-testid="submit"
        >
          Login
        </Button>
      </form>

      <div className={Authstyles['Links-wrap']}>
        <div className={Authstyles['Auth-terms-signup']}>
          For customer support, please follow this{' '}
          <a href="https://www.touchmedical.ca/customer-care">link</a>
        </div>

        <div className={Authstyles['Auth-terms-signup']}>
          <Link to="/password-reset" className={Authstyles['Auth-signup']}>
            Reset password
          </Link>
        </div>

        <div className={Authstyles['Auth-terms-signup']}>
          <Link to="/signup" className={Authstyles['Auth-signup']}>
            Create an Account?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
