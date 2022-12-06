import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getInteractionService, getUser } from '../../services/authservice';
import { getSubscriptionStatus } from '../../services/subscriptionService';
import { toast } from 'react-toastify';
import { Spin } from 'antd';

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      checkUserData();
    } else {
      navigate('/login');
    }
  }, []);
  const getInteraction = () => {
    getInteractionService()
      .then((response) => {
        if (response?.data?.question) {
          navigate('/questionnaire');
        } else {
          navigate('/dashboard');
        }
      })
      .catch((error) => {
        navigate('/dashboard');
        toast(error.response.data.details.message);
      });
  };

  const checkUserData = () => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      getUser(userId)
        .then((response) => {
          getUserSubscription();
          if (response.data.preferences == null) {
            navigate('/preferences');
          } else {
            getInteraction();
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  const getUserSubscription = () => {
    getSubscriptionStatus()
      .then((response) => {
        if (response.data.status == 'NOT_SUBSCRIBED') {
          navigate('/subscription');
        }
      })
      .catch((error) => {
        console.log('Error while getting user plan. ', error);
      });
  };
  return (
    <div className="Btn-group">
      <Spin size="large" className=" Spinner" />
    </div>
  );
};
export default Home;
