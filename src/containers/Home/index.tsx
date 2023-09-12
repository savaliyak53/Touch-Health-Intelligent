import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  invokeInteractionServiceByType,
  getUser,
  preferencesService,
  updatePreference,
} from 'services/authservice';
import { getUserSubscription } from 'services/subscriptionService';
import { Spin } from 'antd';
import moment from 'moment';
import ErrorInteractionModal from 'components/Modal/ErrorInteractionModal';
import AuthContext, { AuthContextData } from 'contexts/AuthContext';
import useLocalStorage from 'hooks/useLocalStorage';

const Home = () => {
  const context = useContext<AuthContextData | undefined>(AuthContext);
  const [isOnboarding, setIsOnboarding] = useLocalStorage("isOnboarding");

  const navigate = useNavigate();
  const userId = context?.user;

  const [exception, setException] = useState<boolean>(false);
  const [error, setError] = useState<any>();

  const handleRedirect = (response: any) => {
    if (response) {
      setIsOnboarding(true);
      navigate('/questionnaire');
    } else {
      setIsOnboarding(false);
      navigate('/dashboard');
    }
  };

  const getInteractionByType = (type: string) => {
    invokeInteractionServiceByType(type)
      .then((response: any) => {
        if (response.data) {
          navigate('/questionnaire');
        } else {
          navigate('/dashboard');
        }
      })
      .catch((error) => {
        setError({
          code: error.response.status,
          message: error.response.data.details,
        });
      });
  };
  const handleInitialIntake = () => {
    const userId = context?.user;
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
          invokeInteractionServiceByType('onboarding')
            .then((response: any) => {
              if (response) {
                navigate('/questionnaire');
              } else {
                navigate('/');
              }
            })
            .catch((error) => {
              setError({
                code: error.response.status,
                message: error.response.data.details,
              });
            });
        } else {
          navigate('/dashboard');
        }
      })
      .catch((error) => {
        setError({
          code: error.response.status,
          message: error.response.data.details,
        });
      });
  };
  const checkUserData = () => {
    const userId = context?.user;
    if (userId) {
      getUser(userId)
        .then((response) => {
          if (response.data.security_questions) {
            setUserSubscription(response);
          } else if (response.data && !response.data.security_questions) {
            navigate('/security');
          } else {
            setException(true);
            setError({ code: response.status, message: response.data.details });
          }
        })
        .catch((error) => {
          setError({
            code: error.response.status,
            message: error.response.data.details,
          });
        });
    }
  };
  const setUserSubscription = (response: any) => {
    getUserSubscription()
      .then((res) => {
        if (
          res.data.state == 'trial_expired' ||
          res.data.state == 'subscription_expired'
        ) {
          navigate('/subscription');
        } else if (
          response.data.signup_status === 'new' &&
          res.data.standing === null
        ) {
          handleTrialIntake();
        } else {
          if (response.data.signup_status === 'onboarding') {
            invokeInteractionServiceByType('onboarding')
              .then((response: any) => {
                handleRedirect(response);
              })
              .catch((error) => {
                setError({
                  code: error.response.status,
                  message: error.response.data.details,
                });
              });
          } else if (response.data.signup_status === 'done') {
              navigate('/dashboard')
          } else if (response.data.signup_status === 'new') {
            const zoneVal = moment()
              .tz(Intl.DateTimeFormat().resolvedOptions().timeZone)
              .format('Z');
            const preferenceData = {
              timezone: zoneVal,
            };
            updatePreference(preferenceData)
              .then(() => {
                handleInitialIntake();
              })
              .catch((error) => {
                setError({
                  code: error.response.status,
                  message: error.response.data.details,
                });
              });
          }
        }
      })
      .catch((error) => {
        setError({
          code: error.response.status,
          message: error.response.data.details,
        });
      });
  };
  const handleTrialIntake = () => {
    const zoneVal = moment()
      .tz(Intl.DateTimeFormat().resolvedOptions().timeZone)
      .format('Z');
    const preferenceData = {
      timezone: zoneVal,
    };
    updatePreference(preferenceData)
      .then(() => {
        handleInitialIntake();
      })
      .catch((error) => {
        setError({
          code: error.response.status,
          message: error.response.data.details,
        });
      });
  };

  useEffect(() => {
    const token = context?.authTokens;
    if (token) {
      checkUserData();
    } else {
      navigate('/login');
    }
  }, []);
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  return (
    <div className="Btn-group">
      <Spin size="large" className=" Spinner" />
      {exception && (
        <div>
          <ErrorInteractionModal
            title={'Error'}
            open={true}
            showTryButton={!exception}>
            <div className='text-3 text-oldBurgundy leading-[23px] text-left'>
              Oops! Something went wrong
              <br />
              Try again later.
            </div>
          </ErrorInteractionModal>
        </div>
      )}
    </div>
  );
};
export default Home;
