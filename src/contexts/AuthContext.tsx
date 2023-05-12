import { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginService } from '../services/authservice';
import { getTokenExpiration, getUser } from '../utils/lib';

export interface AuthContextData {
  user: any;
  authTokens: any;
  expiration: any;
  setExpiration: (expiration: any) => void;
  setAuthTokens: (tokens: any) => void;
  setUser: (user: any) => void;
  loginUser: (
    username: string,
    password: string,
    recaptchaToken: string
  ) => any;
  logoutUser: () => void;
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
  const [expiration, setExpiration] = useState<any>(() => {
    const expiration = localStorage.getItem('expiration');
    return expiration ? expiration : null;
  });
  const [loading, setLoading] = useState<boolean>(true);

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
      const expiration = getTokenExpiration(response.token);
      setExpiration(expiration);
      localStorage.setItem('token', response.token);
      localStorage.setItem('userId', userId);
      localStorage.setItem('expiration', expiration);
      navigate('/');
      return response;
    } else if (response.status === 429) {
      return response;
    } else {
      alert('Something went wrong!');
      return response;
    }
  };

  const logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    setExpiration(null);
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('expiration');
    navigate('/login');
  };

  useEffect(() => {
    if (authTokens) {
      setUser(getUser(authTokens));
    }
    setLoading(false);
  }, [authTokens]);

  const contextData: AuthContextData = {
    user,
    authTokens,
    expiration,
    setAuthTokens,
    setExpiration,
    setUser,
    loginUser,
    logoutUser,
  };
  return (
    // eslint-disable-next-line react/react-in-jsx-scope
    <AuthContext.Provider value={contextData}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};
