import React from 'react';
import Layout from '../../layouts/Layout/Layout';
import { Button } from 'antd';
import './index.scss';
import { Link, useNavigate } from 'react-router-dom';
const index = () => {
  const navigate = useNavigate();
  return (
    <Layout defaultHeader={true} hamburger={true}>
      <div className="Content-wrap DayCon">
        <div className="Question">
          <h3 className="Question-title">You&apos;re done for the day!</h3>
        </div>
        <button className="submit">
          <Link to="/conditions">Manage conditions</Link>
        </button>
        {/* <button className="submit">
          <Link to="/concerns">Manage concerns</Link>
        </button> */}
        <button className="submit" onClick={() => navigate('/dashboard')}>
          Home
        </button>
      </div>
    </Layout>
  );
};

export default index;
