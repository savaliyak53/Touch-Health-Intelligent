import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  getInteractionService,
  getInteractionServiceByType,
  getUser,
  preferencesService,
  updatePreference,
} from '../../services/authservice';
import { getSubscriptionStatus } from '../../services/subscriptionService';
import { toast } from 'react-toastify';
import { Spin } from 'antd';
import moment from 'moment';

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
  const handleInitialIntake = () => {
    const userId = localStorage.getItem('userId');
    //after successful subscription set signup_status to onboarding
    preferencesService(
      {
        signup_status: 'onboarding',
      },
      userId
    )
      .then((preferencesResponse) => {
        if (preferencesResponse) {
          //after successful subscription initiate onboarding interaction
          getInteractionServiceByType('onboarding')
            .then((response: any) => {
              if (response) {
                navigate('/questionnaire');
              } else {
                navigate('/');
              }
            })
            .catch((error) => {
              toast.error(
                `Something went wrong. Cannot initiate interaction at the moment `
              );
              navigate('/dashboard');
            });
        } else {
          // console.log('navigate to dashboard');
          navigate('/dashboard');
        }
      })
      .catch((error) => {
        toast.error(
          `${error.response?.data?.title} Please check values and try again.`
        );
      });
  };
  const checkUserData = () => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      getUser(userId)
        .then((response) => {
          getUserSubscription(response)
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  const getUserSubscription = (response:any) => {
    getSubscriptionStatus()
      .then((res) => {
        if (response.data.signup_status === 'new') {
          navigate('/subscription');
        } else {
          if (response.data.signup_status === 'onboarding') {
            getInteractionServiceByType('onboarding')
              .then((response: any) => {
                handleRedirect(response);
              })
              .catch((error) => {
                toast.error(`Something went wrong. Cannot initiate interaction at the moment`);
                navigate('/dashboard');
              });
          } else if (response.data.signup_status === 'goal-selection') {
            navigate('/add-goals');
          } else if (response.data.signup_status === 'goal-characterization') {
            getInteractionServiceByType('goal_characterization')
              .then((response: any) => {
                handleRedirect(response);
              })
              .catch((error) => {
                toast.error(`Something went wrong. Cannot initiate interaction at the moment`);
                navigate('/dashboard');
              });
          } else if (
            response.data.signup_status === 'done'
          ) {
            getInteractionByType('checkup');
          } else if (response.data.signup_status === 'new') {
            const zoneVal = moment()
              .tz(Intl.DateTimeFormat().resolvedOptions().timeZone)
              .format('Z');
            const preferenceData = {
              timezone: zoneVal,
            };
            updatePreference(preferenceData)
              .then((preferencesResponse) => {
                handleInitialIntake();
              })
              .catch((error) => {
                toast.error(
                  `${error.response?.data?.title} Something went wrong while updating preference`
                );
              });
          }
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
