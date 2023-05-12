import React, { useEffect, useState } from 'react';
import SiteHeader from '../../components/SiteHeader/SiteHeader';
import './Layout.scss';
import { useLocation, useNavigate } from 'react-router';
import { getUser } from '../../services/authservice';
import { getSubscriptionStatus } from '../../services/subscriptionService';
import { signupFlow, sleep } from '../../utils/lib';
import { toast } from 'react-toastify';
import ErrorInteractionModal from '../../components/Modal/ErrorInteractionModal';
type Props = {
  defaultHeader: boolean;
  hamburger: boolean;
  setDisableAllButtons?: React.Dispatch<React.SetStateAction<boolean>>;
  dashboard?: boolean;
  signupLogin?: string;
  children?: React.ReactChild | React.ReactChild[];
};
const Layout = ({
  children,
  defaultHeader,
  hamburger,
  dashboard,
  signupLogin,
  setDisableAllButtons,
}: Props) => {
  const [exception, setException] = useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();
  const checkUserData = () => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      getUser(userId)
        .then((response: any) => {
          // const { security_questions } = response.data;
          if (response.data.security_questions) {
            getUserSubscription(response);
          } else if (response.data && !response.data.security_questions) {
            navigate('/security');
          } else {
            setException(true);
            //show modal that something went wrong
          }
        })
        .catch((error: any) => {
          console.log(error);
        });
    }
  };
  const getUserSubscription = (response: any) => {
    getSubscriptionStatus()
      .then((res) => {
        if (
          response.data.signup_status === 'new' &&
          res.data.isSubscribed === false
        ) {
          location.pathname !== '/subscription'
            ? navigate('/subscription')
            : null;
          return;
        }
      })
      .catch((error) => {
        console.log('Error while getting user plan. ', error);
      });
  };
  useEffect(() => {
    if (!signupFlow(location.pathname)) {
      checkUserData();
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

export default Layout;
