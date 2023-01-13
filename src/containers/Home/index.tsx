import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  getInteractionService,
  getInteractionServiceByType,
  getUser,
} from '../../services/authservice';
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
  const handleRedirect = (response: any) => {
    if (response) {
      navigate('/questionnaire');
    } else {
      navigate('/dashboard');
    }
  };
  const getInteraction = () => {
    getInteractionService()
      .then((response) => {
        handleRedirect(response);
      })
      .catch((error) => {
        navigate('/dashboard');
        toast(error.response.data.details.message);
      });
  };
  const getInteractionByType = (type: string) => {
    getInteractionServiceByType(type)
      .then((response: any) => {
        if (response.data) {
          navigate('/questionnaire');
        } else {
          navigate('/dashboard');
        }
      })
      .catch((error) => {
        navigate('/dashboard');
        toast.error(`Something went wrong. `);
      });
  };
  const checkUserData = () => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      getUser(userId)
        .then((response) => {
          getUserSubscription();
          if (response.data.signup_status === 'onboarding') {
            getInteractionServiceByType('onboarding')
              .then((response: any) => {
                handleRedirect(response);
              })
              .catch((error) => {
                navigate('/dashboard');
                toast.error(`Something went wrong. `);
              });
          } else if (response.data.signup_status === 'goal-selection') {
            navigate('/add-goals');
          } else if (response.data.signup_status === 'goal_characterization') {
            getInteractionServiceByType('goal_characterization')
              .then((response: any) => {
                handleRedirect(response);
              })
              .catch((error) => {
                navigate('/dashboard');
                toast.error(`Something went wrong. `);
              });
          } else if (
            response.data.signup_status !== 'new' &&
            response.data.signup_status === 'done'
          ) {
            getInteractionByType('checkup');
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
        if (response.data.status == 'NOT_SUBSCRIBED' ) {
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
