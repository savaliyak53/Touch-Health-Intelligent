import { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginService, logoutService, tokenService } from '../services/authservice';
import { getTokenExpiration, getUser, getSession } from '../utils/lib';

export interface AuthContextData {
  user: any;
  authTokens: any;
  setAuthTokens: (tokens: any) => void;
  session: string;
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
  const [session, setSession] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const getToken = () => {
    const location = window.location.pathname
    if(location !== '/login'){
      setLoading(true);
      tokenService()
      .then(res => {
        if(res.token){
          setLoading(false);
          setAuthTokens(res.token);
          setUser(getUser(res.token));
          setSession(getSession(res.token));

        }
      })
    }
  };

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
    } else if (response.status === 429) {
      return response;
    } else {
      alert('Something went wrong!');
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
      console.log(err);
    })
  };

  useEffect(() => {
    if (authTokens) {
      setUser(getUser(authTokens));
    } else {
      // getToken()
    }
  }, []);

  const contextData: AuthContextData = {
    user,
    authTokens,
    setAuthTokens,
    session,
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
