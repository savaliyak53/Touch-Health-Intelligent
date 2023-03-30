import React, { useEffect } from 'react';
import SiteHeader from '../../components/SiteHeader/SiteHeader';
import './Layout.scss';
import { useLocation, useNavigate } from 'react-router';
import { getUser} from '../../services/authservice';
import { getSubscriptionStatus } from '../../services/subscriptionService';
import { signupFlow } from '../../utils/lib';
type Props = {
  defaultHeader: boolean;
  hamburger: boolean;
  dashboard?: boolean;
  signupLogin?: string;
  children?: React.ReactChild | React.ReactChild[];
};
const Layout = ({ children, defaultHeader, hamburger, dashboard, signupLogin }: Props) => {
  const navigate=useNavigate()
  const location = useLocation();
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
        })
        .catch((error) => {
          console.log('Error while getting user plan. ', error);
        });
    };
    useEffect(() => {    
          if(!signupFlow(location.pathname)){
            checkUserData()
          }
  }, []);
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