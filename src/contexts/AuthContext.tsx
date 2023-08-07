import { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  loginService,
  logoutService,
  signUpService,
} from '../services/authservice';
import { getUser, getSession } from '../utils/lib';
import { ISignUp } from '../interfaces';

export interface AuthContextData {
  user: any;
  authTokens: any;
  setAuthTokens: (tokens: any) => void;
  session: string;
  setUser: (user: any) => void;
  setSession: (user: any) => void;
  loginUser: (
    username: string,
    password: string,
    recaptchaToken: string
  ) => any;
  logoutUser: () => void;
  signupUser: (data: ISignUp, recaptchaToken: string) => any;
}

const AuthContext = createContext<AuthContextData | undefined>(undefined);
export default AuthContext;

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  // eslint-disable-next-line react/prop-types
  children,
}) => {
  const [authTokens, setAuthTokens] = useState<any>(() => {
    const token = localStorage.getItem('token');
    return token ? token : null;
  });
  const [user, setUser] = useState<any>(() => {
    const user = localStorage.getItem('userId');
    return user ? user : null;
  });
  const [session, setSession] = useState<any>(() => {
    const session = localStorage.getItem('sessionId');
    return session ? session : null;
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>();
  const navigate = useNavigate();
  const loginUser = async (
    username: string,
    password: string,
    recaptchaToken: string
  ) => {
    const response = await loginService({ username, password }, recaptchaToken);
    if (response.token) {
      setAuthTokens(response.token);
      const userId = getUser(response.token);
      setUser(userId);
      const sessionId = getSession(response.token);
      setSession(sessionId);
      return response;
    } else {
      return response;
    }
  };

  const signupUser = async (data: ISignUp, recaptchaToken: string) => {
    const response = await signUpService(data, recaptchaToken);
    if (response.token) {
      setAuthTokens(response.token);
      const userId = getUser(response.token);
      setUser(userId);
      const sessionId = getSession(response.token);
      setSession(sessionId);
      return response;
    } else {
      return response;
    }
  };

  const logoutUser = () => {
    logoutService(session)
    .then(res => {
      setAuthTokens(null);
      setUser(null);
      setSession(null);
      localStorage.removeItem('userId');
      localStorage.removeItem('token');
      localStorage.clear();
      navigate('/login');
    })
    .catch(err => {
      setError({code: err.response.status, message: err.response.data.details });
    })
  };

  useEffect(() => {
    if (authTokens) {
      setUser(getUser(authTokens));
    }
  }, []);

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  const contextData: AuthContextData = {
    user,
    authTokens,
    setAuthTokens,
    session,
    setUser,
    setSession,
    loginUser,
    logoutUser,
    signupUser,
  };
  return (
    // eslint-disable-next-line react/react-in-jsx-scope
    <AuthContext.Provider value={contextData}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};
