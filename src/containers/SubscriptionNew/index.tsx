import React, { useContext, useEffect, useState } from 'react';
import Layout from '../../layouts/Layout/Layout';
import { Button, Spin, Alert, Card } from 'antd';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { dateFormatRenewal, sleep } from '../../utils/lib';
import { useNavigate } from 'react-router';
import styles from './Subscription.module.scss';
import {
  getUserSubscription,
  getStatus,
  managePayment,
  cancelSubscription,
  checkoutPlan,
} from '../../services/subscriptionService';
import {
  getUser,
  invokeInteractionServiceByType,
  preferencesService,
  updatePreference,
} from '../../services/authservice';
import { ISubscriptionStateDataResponse } from './Interfaces';
import ConfirmModal from '../../components/Modal/ConfirmModal';
import FreeTrialModal from '../../components/Modal/FreeTrial';
import PriceModal from '../../components/Modal/PriceModal';
import {
  LoadingOutlined,
  InfoCircleOutlined,
  ReloadOutlined,
} from '@ant-design/icons';
import AuthContext, { AuthContextData } from '../../contexts/AuthContext';
import moment from 'moment';

const SubscriptionNew = () => {
  const navigate = useNavigate();
  const authContext = useContext<AuthContextData | undefined>(AuthContext);
  let retries = 0;
  const { Meta } = Card;
  const antIcon = (
    <LoadingOutlined style={{ fontSize: 24, color: 'white' }} spin />
  );
  const [disableAllButtons, setDisableAllButtons] = useState<boolean>(false);
  const [stripeStatus, setStripeStatus] = useState<any>(null);
  const [retry, setRetry] = useState<any>(false);
  const [error, setError] = useState<any>();
  const [onTrial, setOnTrial] = useState<boolean>(true);
  const [userPlanStatus, setUserPlanStatus] = useState('');
  const [userPlan, setUserPlan] = useState<ISubscriptionStateDataResponse>();
  const [userAccountState, setUserAccountState] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingManageBtn, setLoadingManageBtn] = useState(false);
  const [disableButton, setDisableButton] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [freeTrialModal, setFreeTrialModal] = useState(false);
  const [confirmSubscription, setConfirmSubscription] = useState(false);
  const [subscriptionEndDate, setSubscriiptionEndDate] = useState(new Date());

  const delay = (ms: any) => new Promise((resolve) => setTimeout(resolve, ms));

  const userCheckoutStatus = () => {
    getStatus()
      .then(async (response: any) => {
        setStripeStatus(response.data.status);
        if (response.data.status === 'open') {
          if (retries >= 20) {
            setRetry(true);
          } else {
            await delay(3000);
            userCheckoutStatus();
            retries++;
          }
        } else if (response.data.status === 'complete') {
          return response.data.status;
        }
      })
      .catch((error) => {
        setError({
          code: error.response.status,
          message: error.response.data.details,
        });
      });
    return null;
  };

  const fetchUserSubscription = () => {
    setLoading(true);
    getUserSubscription()
      .then((response: any) => {
        setLoading(false);
        setUserPlanStatus(response.data.state);
        setUserAccountState(response.data.standing);
        if (response.data.data.subscriptionData.endDate)
          setSubscriiptionEndDate(response.data.data.subscriptionData.endDate);
        if (
          response.data.state == 'trial_active' ||
          response.data.state == 'trial_expired'
        ) {
          setOnTrial(true);
          setFreeTrialModal(true);
        } else {
          setOnTrial(false);
        }
        if (response.data.data.subscriptionData.renewalDate) {
          const renewalDate = dateFormatRenewal(
            new Date(
              response.data.data.subscriptionData.renewalDate
            ).toUTCString()
          );
          setUserPlan({
            ...response.data.data,
            subscriptionData: {
              ...response.data.data.subscriptionData,
              renewalDate: renewalDate,
            },
          });
        } else {
          setUserPlan(response.data.data);
        }
      })
      .catch((error) => {
        setLoading(false);
        setError({
          code: error.response.status,
          message: error.response.data.details,
        });
      });
  };

  const handleManagePayment = () => {
    setLoadingManageBtn(true);
    managePayment()
      .then((response) => {
        setLoadingManageBtn(false);
        setDisableButton(false);
        window.location.assign(response.data.url);
      })
      .catch((error) => {
        setLoadingManageBtn(false);
        setDisableButton(false);
        setError({
          code: error.response.status,
          message: error.response.data.details,
        });
      });
  };
  const handleRetry = () => {
    setRetry(false);
    retries = 1;
    userCheckoutStatus();
  };

  const handleInitialIntake = () => {
    const userId = authContext?.user;
    //after successful subscription set signup_status to onboarding
    preferencesService(
      {
        signup_status: 'onboarding',
      },
      userId
    )
      .then(() => {
        //after successful subscription initiate onboarding interaction
        invokeInteractionServiceByType('onboarding')
          .then((response) => {
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
      })
      .catch((error) => {
        setError({
          code: error.response.status,
          message: error.response.data.details,
        });
      });
  };

  const handleCancelClick = () => {
    setLoading(true);
    setDisableButton(true);
    cancelSubscription()
      .then((response) => {
        setLoading(false);
        setDisableButton(false);
        toast.info('Subscription Cancelled');
        fetchUserSubscription();
      })
      .catch((error) => {
        setLoading(false);
        setDisableButton(false);
        setError({
          code: error.response.status,
          message: error.response.data.details,
        });
      });
  };

  const handleOk = () => {
    handleCancelClick();
    setShowCancelModal(false);
  };

  const handleSubscribeClick = () => {
    setLoading(true);
    setDisableButton(true);
    checkoutPlan()
      .then((response) => {
        setLoading(false);
        setDisableButton(false);
        window.location.assign(response.data.url);
      })
      .catch((error) => {
        setLoading(false);
        setDisableButton(false);
        setError({
          code: error.response.status,
          message: error.response.data.details,
        });
      });
  };

  const getPricePopupPlan = () => {
    if (userPlan?.subscriptionData.price) {
      const priceRegex = /\d+(\.\d+)?/;
      const matches = userPlan?.subscriptionData.price.match(priceRegex);
      if (matches && matches.length > 0) {
        const price = matches[0];
        return parseFloat(price);
      } else {
        return 0;
      }
    } else {
      return 0;
    }
  };

  useEffect(() => {
    fetchUserSubscription();
    const checkout_status: string | null = userCheckoutStatus();
    if (checkout_status === 'complete') {
      const userId = authContext?.user;
      getUser(userId)
        .then((response) => {
          if (response.data.signup_status === 'new') {
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
                setError({
                  code: error.response.status,
                  message: error.response.data.details,
                });
              });
          }
        })
        .catch((error) => {
          setError({
            code: error.response.status,
            message: error.response.data.details,
          });
        });
    }
  }, []);

  useEffect(() => {
    if (location.search === '?success') {
      !disableAllButtons && setDisableAllButtons(true);
      toast.success('Subscription confirmed.', { autoClose: 3000 });
      sleep(3000).then(() => {
        navigate('/questionnaire');
      });
      userCheckoutStatus();
    }
  }, [location]);

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  return (
    <Layout
      defaultHeader={true}
      hamburger={userPlanStatus == 'trial_expired' ? false : true}
      dashboard={false}
      setDisableAllButtons={setDisableAllButtons}
      title={'Subscription'}
    >
      {retry ? (
        <div className="Content-wrap DayCon">
          <div className="Question">
            <Alert message="Failed to verify your subscription" type="error" />
          </div>
          <button
            className="submit"
            onClick={() => {
              window.location.reload();
            }}
          >
            <Link to="/subscription">Check Subsciption</Link>
          </button>
          <button className="submit" onClick={handleRetry}>
            <ReloadOutlined />
            Retry
          </button>
        </div>
      ) : (
        <Spin
          spinning={stripeStatus === 'open'}
          tip={'Please wait, we are trying to verify your subscription'}
        >
          <div className="Content-wrap Sub">
            {userPlanStatus == 'subscription_active' ||
            (userPlanStatus == 'subscription_expired' &&
              userAccountState == 'past_due') ||
            (userPlanStatus == 'subscription_cancelled' &&
              userAccountState == 'past_due') ? (
              <button
                className={styles['manage-btn']}
                onClick={handleManagePayment}
                disabled={disableButton || disableAllButtons}
              >
                Manage Payment
                <Spin spinning={loadingManageBtn} indicator={antIcon} />
              </button>
            ) : (
              ''
            )}
            {!loading && onTrial && (
              <div className='font-normal text-primary-watermelons-dark text-xs leading-[130%] mt-5'>
                <InfoCircleOutlined /> You are <b>not subscribed </b> to any
                plan.
              </div>
            )}
            {/* {!onTrial && */}
            <>
              <Card
                type="inner"
                className={`${styles['Subspt-Card']}
                    ${
                      userPlanStatus == 'subscription_active'
                        ? styles['card-bordered']
                        : ''
                    }`}
                style={{
                  backgroundColor:
                    userPlanStatus == 'subscription_active' ? '#ded7d721' : '',
                }}
              >
                <Meta
                  title={
                    <div className={styles['Question-title']}>
                      {userPlan?.subscriptionData.name}
                    </div>
                  }
                  className={styles['ant-card-meta']}
                  description={
                    <div className={styles['Question']}>
                      <p className={styles['Description']}>
                        {userPlan?.subscriptionData.price}
                      </p>

                      {/* if Plan is Active and was cancelled by user but the cancellation date is in future */}
                      {userPlanStatus == 'subscription_expired' && (
                        <>
                          <p className={styles['subDates']}>Ended On</p>
                          <p className={styles['otherDates']}>
                            {dateFormatRenewal(subscriptionEndDate)}
                          </p>
                        </>
                      )}
                      {userPlanStatus == 'subscription_cancelled' && (
                        <>
                          <p className={styles['subDates']}>Ends On</p>
                          <p className={styles['otherDates']}>
                            {dateFormatRenewal(
                              userPlan?.subscriptionData.endDate
                            )}
                          </p>
                        </>
                      )}
                      {userPlanStatus == 'subscription_active' && (
                        <>
                          <p className={styles['subDates']}>Renewal Date</p>
                          <p className={styles['otherDates']}>
                            {dateFormatRenewal(
                              userPlan?.subscriptionData.renewalDate
                            )}
                          </p>
                        </>
                      )}
                    </div>
                  }
                />

                <div className={styles['Btn-group']}>
                  {userPlanStatus == 'subscription_active' ? (
                    <>
                      <Button
                        className={` ${styles['Modal-cancel-btn']} Submit-Button `}
                        onClick={() => {
                          setShowCancelModal(true);
                        }}
                      >
                        Cancel
                      </Button>
                    </>
                  ) : userPlanStatus == 'subscription_cancelled' ? (
                    <Button className={'Submit-Button'} disabled={true}>
                      Cancelled
                    </Button>
                  ) : (
                    <Button
                      className={'Submit-Button'}
                      onClick={() => handleSubscribeClick()}
                      disabled={disableButton || loading || disableAllButtons}
                    >
                      Subscribe Now!
                    </Button>
                  )}
                </div>
              </Card>
            </>
            <ConfirmModal
              title={'Confirmation'}
              open={showCancelModal}
              handleCancel={() => {
                setShowCancelModal(false);
              }}
              handleOk={handleOk}
              className="Addgoal-Confirm-Modal"
              renderData={
                <div className="Description">
                  {`Your subscription will be cancelled and not renewed on ${userPlan?.subscriptionData.renewalDate}`}
                </div>
              }
            />
            <FreeTrialModal
              title="Subscription"
              handleOk={() => {
                setFreeTrialModal(false);
                setConfirmSubscription(true);
                setLoading(false);
              }}
              open={freeTrialModal}
              primaryButtonText="Subscribe Now!"
              secondaryButtonText="Maybe Later"
              trialEndDate={userPlan?.trialData.trialEndDate}
              trialExpired={userPlanStatus == 'trial_expired' ? true : false}
              subscriptionExpired={
                userPlanStatus == 'subscription_expired' ? true : false
              }
            />
            <PriceModal
              open={confirmSubscription}
              className="Addgoal-Confirm-Modal"
              price={getPricePopupPlan()}
              handleCancel={() => setConfirmSubscription(false)}
              handleOk={() => handleSubscribeClick()}
            />
          </div>
        </Spin>
      )}
    </Layout>
  );
};
export default SubscriptionNew;
