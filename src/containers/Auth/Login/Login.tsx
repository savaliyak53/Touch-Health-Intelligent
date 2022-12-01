import React, { useRef } from 'react';
import { SubmitHandler } from 'react-hook-form';
import Layout from '../../../layouts/Layout/Layout';
// import './index.scss';
import '../index.scss';
import styles from "./Login.module.scss"
import Authstyles from "../Auth.module.scss"
import { Tooltip } from 'antd';
import CountryCode from '../Country/CountryCode';
import { ILogin } from '../../../interfaces';
import { onlyNumbers } from '../../../utils/lib';
import LoginForm from './LoginForm'

type IFormInputs = {
  username: string;
  password: string;
};


const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [passwordShown, setPasswordShown] = useState(false);
  const navigate = useNavigate();


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


  return (
    <Layout defaultHeader={false} hamburger={false} signupLogin="Login-bg">
      <>
      <LoginForm 
        onSubmit={onSubmit}
        refCaptcha={refCaptcha}
        />
      </>

    </Layout>
  );
};

export default Login;
