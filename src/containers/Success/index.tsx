import React from 'react';
import { Alert } from 'antd';
import { useNavigate } from 'react-router';
import Layout from '../../layouts/Layout/Layout';
import '../ThankyouForSubmiting/index.scss';
import { Link } from 'react-router-dom';
const SubscriptionSuccess = () => {
  const navigate = useNavigate();

  const logoutClick = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <Layout defaultHeader={true} hamburger={true}>
      <div className="Content-wrap DayCon">
        <div className="Question">
          <Alert message="Subscription successful" type="success" />
        </div>
        <button className="submit">
          <Link to="/subscription">Check Subscription</Link>
        </button>
        <button className="submit" onClick={() => navigate('/dashboard')}>
          Home
        </button>
        <button className="submit" onClick={logoutClick}>
          Logout
        </button>
      </div>
    </Layout>
  );
};

export default SubscriptionSuccess;
