import React, { useContext } from 'react';
import { Alert } from 'antd';
import { useNavigate } from 'react-router';
import Layout from 'layouts/Layout';
import '../ThankyouForSubmiting/index.scss';
import { Link } from 'react-router-dom';
import AuthContext, { AuthContextData } from '../../contexts/AuthContext';
const SubscriptionError = () => {
  const authContext = useContext<AuthContextData | undefined>(AuthContext);
  if (!authContext) return null;
  const { logoutUser } = authContext;

  const navigate = useNavigate();

  const logoutClick = () => {
    logoutUser();
    navigate('/login');
  };

  return (
    <Layout defaultHeader={true} hamburger={false} title={'Error'}>
      <div className="Content-wrap DayCon">
        <div className="Question">
          <Alert message="Failed to subscribe to a plan" type="error" />
        </div>
        <button className="submit" onClick={() => navigate('/subscription')}>
          <Link to="/subscription">Check Subscription</Link>
        </button>
        <button className="submit" onClick={logoutClick}>
          Logout
        </button>
      </div>
    </Layout>
  );
};

export default SubscriptionError;
