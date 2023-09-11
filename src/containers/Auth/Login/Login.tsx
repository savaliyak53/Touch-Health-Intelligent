import React, { useEffect, useContext, useState } from 'react';
import LoginForm from './LoginForm';
import { useNavigate } from 'react-router';
import AuthContext, { AuthContextData } from 'contexts/AuthContext';
import SplashScreen from './SplashScreen';
import useLocalStorage from 'hooks/useLocalStorage';
import AuthLayout from 'layouts/AuthLayout';

const Login = () => {
  const navigate= useNavigate()

  const context = useContext<AuthContextData | undefined>(AuthContext);
  const [showLoginForm, setShowLoginForm] = useState<boolean>(false);
  const [isVisited, setVisited] = useLocalStorage("isVisited");

  useEffect(() => {
    const token = context?.session ?? localStorage.getItem('sessionId')
    if(token) navigate('/')
    else setShowLoginForm(true)
  },[])


  return (
    <>
      {isVisited ? (
          <AuthLayout>
            {showLoginForm && (
              <LoginForm />)}
          </AuthLayout>
      ) : (
        <SplashScreen setVisited={setVisited} />
      )}
    </>
  );
};

export default Login;
