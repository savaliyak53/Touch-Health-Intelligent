import moment from 'moment';
import React from 'react';
import { useNavigate } from 'react-router';
import SiteHeader from '../../components/SiteHeader/SiteHeader';
import { getInteractionServiceByType, getUser, preferencesService, updatePreference } from '../../services/authservice';
import { getSubscriptionStatus } from '../../services/subscriptionService';
import './Layout.scss';

type Props = {
  defaultHeader: boolean;
  hamburger: boolean;
  dashboard?: boolean;
  signupLogin?: string;
  children?: React.ReactChild | React.ReactChild[];
};
const Layout = ({ children, defaultHeader, hamburger, dashboard, signupLogin }: Props) => {
  const navigate=useNavigate()
  if(location.pathname=="/dashboard" || location.pathname=="/add-goals" || location.pathname=="/intro-goals" || location.pathname=="/goals/:id" || location.pathname=="/insights" || location.pathname=="/auth/google/code" || location.pathname=="/dashboard" || location.pathname=="/insights/guideline" || location.pathname=="/diamond" || location.pathname=="/questionnaire" || location.pathname=="/c/:reason" || location.pathname=="/questionnaire-submit" || location.pathname=="/preferences" || location.pathname=="/integrations" || location.pathname=="/introvideo" ){
    const handleRedirect = (response:any) => {
      if (response) {
        location.pathname!=="/questionnaire"? navigate('/questionnaire') : null;
        return;
      } else {
        location.pathname!=="/dashboard"? navigate('/dashboard') : null;
        return;
      }
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
        .then((preferencesResponse:any) => {
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
              .catch((error:any) => {
                location.pathname!=="/dashboard"? navigate('/dashboard') : null;
                return;
              });
          } else {
            location.pathname!=="/dashboard"? navigate('/dashboard') : null;
            return;
          }
        })
        .catch((error:any) => {
         console.log(error)
        });
    };
    const checkUserData = () => {
      const userId = localStorage.getItem('userId');
      if (userId) {
        getUser(userId)
          .then((response:any) => {
            getUserSubscription(response)
          })
          .catch((error:any) => {
            console.log(error);
          });
      }
    }; 
    const getUserSubscription = (response:any) => {
      getSubscriptionStatus()
        .then((res) => {
          if (response.data.signup_status === 'new' && res.data.isSubscribed===false) {
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
                .then((response:any) => {
                  handleRedirect(response);
                })
                .catch((error:any) => {
                  location.pathname!=="/dashboard"? navigate('/dashboard') : null;
                  return;
                });
            } else if (
              response.data.signup_status === 'done'
            ) {
                return;
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
                .catch((error:any) => {
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
  }
  return (
    <div className={`Layout ${signupLogin}`}>
      <div
        className={
          dashboard ? 'Layout-Transparent header-transp' : 'Layout-Transparent'
        }
      >
        <SiteHeader defaultHeader={defaultHeader} hamburger={hamburger} />
        <div className={defaultHeader ? 'MobileScreen' : 'MobileScreen bg'}>
          <div className="Layout-main">{children}</div>
        </div>
      </div>
      <div className="Layout-graphics" />
    </div>
  );
};

export default Layout;
