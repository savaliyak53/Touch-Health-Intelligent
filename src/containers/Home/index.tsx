import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  getInteractionServiceByType,
  getUser,
  preferencesService,
  updatePreference,
} from '../../services/authservice';
import { getSubscriptionStatus } from '../../services/subscriptionService';
import { Spin } from 'antd';
import moment from 'moment';
import ErrorInteractionModal from '../../components/Modal/ErrorInteractionModal';
import AuthContext, { AuthContextData } from '../../contexts/AuthContext';
import FreeTrialModal from '../../components/Modal/FreeTrial';

const Home = () => {
  const navigate = useNavigate();
  const [exception, setException] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);
  const context = useContext<AuthContextData | undefined>(AuthContext);
  const [trialModal, setTrialModal] = useState<boolean>(false);
  const [error, setError] = useState<any>();

  useEffect(() => {
    const token = context?.authTokens
      ? context?.authTokens
      : localStorage.getItem('token');
    if (token) {
      checkUserData();
    } else {
      navigate('/login');
    }
  }, []);
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  const handleRedirect = (response: any) => {
    if (response) {
      navigate('/questionnaire');
    } else {
      navigate('/dashboard');
    }
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
        setError({
          code: error.response.status,
          message: error.response.data.details ?? 'Something went wrong.',
        });
      });
  };
  const handleInitialIntake = () => {
    const userId = context?.user ?? localStorage.getItem('userId');
    // const userId=context?.user;
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
              setLoading(false);
              if (response) {
                navigate('/questionnaire');
              } else {
                navigate('/');
              }
            })
            .catch((error) => {
              setError({
                code: error.response.status,
                message: error.response.data.details ?? 'Something went wrong.',
              });
              // navigate('/dashboard');
            });
        } else {
          // console.log('navigate to dashboard');
          navigate('/dashboard');
        }
      })
      .catch((error) => {
        setError({
          code: error.response.status,
          message: error.response.data.details ?? 'Something went wrong.',
        });
        // toast.error(
        //   `${error.response?.data?.title} Please check values and try again.`
        // );
      });
  };
  const checkUserData = () => {
    const userId = context?.user
      ? context?.user
      : localStorage.getItem('userId');
    // const userId = localStorage.getItem('userId');
    if (userId) {
      getUser(userId)
        .then((response) => {
          if (response.data.security_questions) {
            getUserSubscription(response);
          } else if (response.data && !response.data.security_questions) {
            navigate('/security');
          } else {
            setException(true);
            //show modal that something went wrong
          }
        })
        .catch((error) => {
          setError({
            code: error.response.status,
            message: error.response.data.details ?? 'Something went wrong.',
          });
        });
    }
  };
  const getUserSubscription = (response: any) => {
    getSubscriptionStatus()
      .then((res) => {
        if (
          response?.data?.trial_end_date &&
          moment(response?.data?.trial_end_date).isBefore(moment())
        ) {
          navigate('/subscription');
        } else if (
          response.data.signup_status === 'new' &&
          res.data.isSubscribed === false
        ) {
          handleTrialIntake();
        } else {
          if (response.data.signup_status === 'onboarding') {
            getInteractionServiceByType('onboarding')
              .then((response: any) => {
                handleRedirect(response);
              })
              .catch((error) => {
                setError({
                  code: error.response.status,
                  message:
                    error.response.data.details ?? 'Something went wrong.',
                });
              });
          } else if (
            response.data.signup_status === 'goal-characterization' ||
            response.data.signup_status === 'goal-selection'
          ) {
            getInteractionServiceByType('goal_characterization')
              .then((response: any) => {
                handleRedirect(response);
              })
              .catch((error) => {
                setError({
                  code: error.response.status,
                  message:
                    error.response.data.details ?? 'Something went wrong.',
                });
              });
          } else if (response.data.signup_status === 'done') {
            getInteractionByType('checkup');
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
                  message:
                    error.response.data.details ?? 'Something went wrong.',
                });
              });
          }
        }
      })
      .catch((error) => {
        setError({
          code: error.response.status,
          message: error.response.data.details ?? 'Something went wrong.',
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
          message: error.response.data.details ?? 'Something went wrong.',
        });
      });
  };
  return (
    <div className="Btn-group">
      <Spin size="large" className=" Spinner" />
      {exception && (
        <div>
          <ErrorInteractionModal
            title={'Error'}
            open={true}
            showTryButton={!exception}
            renderData={
              <div className={'Description'}>
                Oops! Something went wrong
                <br />
                Try again later.
              </div>
            }
          />
        </div>
      )}
    </div>
  );
};
export default Home;
