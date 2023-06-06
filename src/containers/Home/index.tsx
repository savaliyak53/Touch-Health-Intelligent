import React, { useState, useEffect, useContext } from 'react';
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
import { Spin, Typography } from 'antd';
import moment from 'moment';
import ErrorInteractionModal from '../../components/Modal/ErrorInteractionModal';
import axios, { AxiosRequestConfig } from 'axios';
import { getTokenExpiration } from '../../utils/lib';
import AuthContext, {AuthContextData} from '../../contexts/AuthContext';
import FreeTrialModal from '../../components/Modal/FreeTrial';
const { Paragraph, Text } = Typography;
const Home = () => {
  const navigate = useNavigate();
  const [exception, setException] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);
  const context = useContext<AuthContextData | undefined>(AuthContext); 
  const [trialModal, setTrialModal] = useState<boolean>(false);

  const axiosConfig: any = {
    withCredentials: true,
  };

  async function fetchToken(): Promise<string> {
    return axios
      .get('/auth/token', axiosConfig)
      .then((response) => {
        setLoading(false);
        return response.data.token; // Handle success
      })
      .catch((error) => {
        // Handle error
      });
  }

  useEffect(() => {
    // const token = localStorage.getItem('token');
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
    // const getInitialToken = async () => {
    //   console.log('auth/token called');
    //   const isLoginPage = window.location.pathname === '/login';
    //   if (!isLoginPage) {
    //     try {
    //       // const response = await axios.get('/auth/token', {
    //       //   credentials: 'include',
    //       // } as AxiosRequestConfig<{ credentials: string }>);
    //       const token = await fetchToken();
    //       localStorage.setItem('token', token);
    //       localStorage.setItem('expiration', getTokenExpiration(token));
    //       setUpAxios(axios, token, getTokenExpiration(token))
    //         .then(() => {
    //           if (token) {
    //             console.log('check user now');
    //             checkUserData();
    //             setLoading(false);
    //           } else {
    //             navigate('/login');
    //           }
    //           return; // Handle success
    //         })
    //         .catch((error: any) => {
    //           // Handle error
    //         });
    //     } catch (error) {
    //       // Handle error
    //     }
    //   }
    //   //setUpAxios(axios);
    // };
    // getInitialToken();
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
          console.log(error);
        });
    }
  };
  const getUserSubscription = (response: any) => {
    getSubscriptionStatus()
      .then((res) => {
        if (moment(response?.data?.trial_end_date).isBefore(moment())) {
          navigate('/subscription');
        } else if (
          response.data.signup_status === 'new' &&
          res.data.isSubscribed === false
        ) {
          setTrialModal(true);
          setLoading(false);
        } else {
          if (response.data.signup_status === 'onboarding') {
            getInteractionServiceByType('onboarding')
              .then((response: any) => {
                handleRedirect(response);
              })
              .catch((error) => {
                toast.error(
                  `Something went wrong. Cannot initiate interaction at the moment`
                );
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
                toast.error(
                  `Something went wrong. Cannot initiate interaction at the moment`
                );
                navigate('/dashboard');
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
  const handleTrialIntake = () => {
    setTrialModal(false);
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
  };
  return (
    <div className="Btn-group">
      <Spin size="large" className=" Spinner" />
      <FreeTrialModal
        handleOk={handleTrialIntake}
        open={trialModal}
        title="Free Trial"
        buttonText="Let's get started!"
        renderData={
          <>
            <Paragraph>Dear Valued User,</Paragraph>
            <Text>
              You are currently on a free trial!
              <Text strong italic>
                We want to assure you that there is no need to provide any
                payment details at this moment.
              </Text>
            </Text>
            <Paragraph>
              Enjoy exploring our services without any obligation. Take this
              opportunity to fully experience what we have to offer. We&apos;ll
              guide you through the subscription process if you decide to
              continue after the trial period. Enjoy your journey with us!
            </Paragraph>
          </>
        }
      />

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
