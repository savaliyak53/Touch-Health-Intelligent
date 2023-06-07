import React, { useContext, useEffect, useState } from 'react';
import SiteHeader from '../../components/SiteHeader/SiteHeader';
import './Layout.scss';
import { useLocation, useNavigate } from 'react-router';
import { getUser } from '../../services/authservice';
import { getSubscriptionStatus } from '../../services/subscriptionService';
import { signupFlow, sleep } from '../../utils/lib';
import { toast } from 'react-toastify';
import ErrorInteractionModal from '../../components/Modal/ErrorInteractionModal';
import AuthContext from '../../contexts/AuthContext';
import moment from 'moment';
import FreeTrialModal from '../../components/Modal/FreeTrial';

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
  const [trialRemaining, setTrialRemaining] = useState<string>('');
  const [trialEndModal, setTrialEndModal] = useState<boolean>(false);
  const [trialEndDate, setTrialEndDate] = useState<string>("");
  const navigate = useNavigate();
  const location = useLocation(); 
  const context = useContext(AuthContext);
  const checkUserData = () => {
    const userId = context?.user;
    // const userId = localStorage.getItem('userId');
    if (userId) {
      getUser(userId)
        .then((response: any) => {
          // const { security_questions } = response.data;
          if (response.data.security_questions) {
            getUserSubscription(response);
            if (moment(response?.data?.trial_end_date).isAfter(moment())) {
              setTrialRemaining(response.data.trial_remaining);
            }
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
        localStorage.setItem('isSubscribed', res.data.isSubscribed.toString());
        if (
          res.data.isSubscribed === false &&
          moment(response?.data?.trial_end_date).isBefore(moment())
        ) {
          setTrialEndDate(response.data.trial_end_date)
          setTrialEndModal(true);
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
        <SiteHeader defaultHeader={defaultHeader} hamburger={hamburger} trialRemaining={trialRemaining} />
        <div className={defaultHeader ? 'MobileScreen' : 'MobileScreen bg'}>
          <div className="Layout-main">{children}</div>
        </div>
      </div>
      <div className="Layout-graphics" />
      <FreeTrialModal
        title="Subscription"
        handleOk={() => {
          setTrialEndModal(false);
        }}
        open={trialEndModal}
        buttonText="Subscribe Now!"
        trialEndDate={trialEndDate}
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

export default Layout;
