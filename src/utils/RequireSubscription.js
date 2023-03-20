import moment from 'moment'
import React from 'react'
import { useLocation, Navigate, Outlet, useNavigate } from 'react-router-dom'
import { getInteractionServiceByType, getUser, preferencesService, updatePreference } from '../services/authservice'
import { getSubscriptionStatus } from '../services/subscriptionService'

export const RequireSubscription = () => {
  const location=useLocation()
    const navigate=useNavigate()
    let done=true;
    const handleRedirect = (response) => {
        if (response) {
          location.pathname!=="/questionnaire"? navigate('/questionnaire') : null;
          return;
        } else {
          location.pathname!=="/dashboard"? navigate('/dashboard') : null;
          return;
        }
      };
      // const getInteractionByType = (type) => {
      //   getInteractionServiceByType(type)
      //     .then((response) => {
      //       if (response.data) {
      //         navigate('/questionnaire');
      //       } else {
      //         navigate('/dashboard');
      //       }
      //     })
      //     .catch((error) => {
      //       navigate('/dashboard');
      //     });
      // };
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
                .then((response) => {
                  if (response) {
                    location.pathname!=="/questionnaire"? navigate('/questionnaire') : null;
                    return;
                  } else {
                    navigate('/');
                  }
                })
                .catch((error) => {
                  location.pathname!=="/dashboard"? navigate('/dashboard') : null;
                  return;
                });
            } else {
              location.pathname!=="/dashboard"? navigate('/dashboard') : null;
              return;
            }
          })
          .catch((error) => {
           console.log(error)
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
      const getUserSubscription = (response) => {
        getSubscriptionStatus()
          .then((res) => {
            console.log("response : ", response)
            console.log("res :", res)
            if (response.data.signup_status === 'new' && res.data.isSubscribed===false) {
              console.log("is subscribed false")
              location.pathname!=="/subscription"? navigate('/subscription') : null;
              return;
            }
            else {
              if (response.data.signup_status === 'onboarding') {
                getInteractionServiceByType('onboarding')
                  .then((response) => {
                    handleRedirect(response);
                  })
                  .catch((error) => {
                    location.pathname!=="/dashboard"? navigate('/dashboard') : null;
                    return;
                  });
              } else if (response.data.signup_status === 'goal-selection') {
                location.pathname!=="/add-goals"? navigate('/add-goals') : null;
                return;
              } else if (response.data.signup_status === 'goal-characterization') {
                getInteractionServiceByType('goal_characterization')
                  .then((response) => {
                    handleRedirect(response);
                  })
                  .catch((error) => {
                    location.pathname!=="/dashboard"? navigate('/dashboard') : null;
                    return;
                  });
              } else if (
                response.data.signup_status === 'done'
              ) {
                {console.log("here")}
                  done=true
                  return;
                  // navigate('/');
                //  return <Outlet/>
                // return <Outlet/>;
                // return true;
                // getInteractionByType('checkup');
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
                    console.log(error);
                  });
              }
            }
          })
          .catch((error) => {
            console.log('Error while getting user plan. ', error);
          });
      };
    checkUserData()
    return done ? (
        <Outlet />
    ) : (
      <Navigate to="/" state={{ from: location }} replace />
  )
}


