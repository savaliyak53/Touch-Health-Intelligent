import React, { useEffect, useState } from 'react';
import Layout from '../../layouts/Layout/Layout';
import { Button, Spin, Typography, Tag } from 'antd';
import styles from './Subscription.module.scss';
import { Alert } from 'antd';
import v from '../../variables.module.scss';
import {
  checkoutPlan,
  getPlansService,
  getSubscriptionStatus,
  getUserSubscription,
  cancelSubscription,
  updateUserSubscription,
  calculateSubscriptionProration,
  getStatus,
  managePayment,
} from '../../services/subscriptionService';
import { Card } from 'antd';
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router';
import { dateFormatRenewal, sleep } from '../../utils/lib';
import ConfirmModal from '../../components/Modal/ConfirmModal';
import { ISubscriptionPlan, IUserSubscription } from './Interfaces';
import { Link } from 'react-router-dom';
import { LoadingOutlined , InfoCircleOutlined } from '@ant-design/icons';
import {
  getInteractionServiceByType,
  getUser,
  preferencesService,
  updatePreference,
} from '../../services/authservice';
import moment from 'moment';
import { ReloadOutlined } from '@ant-design/icons';
const { Meta } = Card;
const antIcon = <LoadingOutlined style={{ fontSize: 24, color: 'white' }} spin />;
const Subscription = () => {
  const navigate = useNavigate();
  let retries = 0;
  const location = useLocation();
  const [plans, setPlans] = useState<ISubscriptionPlan[] | undefined>([]);
  const [freeTrial, setFreeTrial] = useState<boolean | undefined>(false);
  const [loading, setLoading] = useState(false);
  const [loadingManageBtn, setLoadingManageBtn] = useState(false);
  const [spin, setSpin] = useState(false);
  const [userPlan, setUserPlan] = useState<IUserSubscription | undefined>();
  const [disableButton, setDisableButton] = useState(false);
  const [userPlanStatus, setUserPlanStatus] = useState(false);
  const [userSignupStatus, setUserSignupStatus] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showSwitchModal, setShowSwitchModal] = useState(false);
  const [switchPlanId, setSwitchPlanId] = useState<string>();
  const [stripeStatus, setStripeStatus] = useState<any>(null);
  const [retry, setRetry] = useState<any>(false);
  const [disableAllButtons, setDisableAllButtons] = useState<boolean>(false);

  const [estimateAmount, setEstimateAmount] = useState();
  const showModal = () => {
    setShowCancelModal(true);
  };

  const fetchPlans = () => {
    setLoading(true);
    getPlansService()
      .then(({ data }) => {
        setLoading(false);
        data.freeTrial && setFreeTrial(data.freeTrial);
        setPlans(data.plans);
      })
      .catch((error) => {
        setLoading(false);
        console.log('errors are ', error);
      });
  };

  const fetchUserSubscription = () => {
    setLoading(true);
    getUserSubscription()
      .then((response: any) => {
        setLoading(false);
        if (response.data.renewalDate) {
          const renewalDate = dateFormatRenewal(
            new Date(response.data.renewalDate).toUTCString()
          );
          setUserPlan({
            ...response.data,
            renewalDate: renewalDate,
          });
        } else {
          setUserPlan(response.data);
        }
      })
      .catch((error) => {
        setLoading(false);
        console.log('error while getting user plan');
      });
  };

  const userSubscriptionStatus = () => {
    getSubscriptionStatus()
      .then((response) => {
        setUserPlanStatus(response.data.isSubscribed);
        if (
          location.pathname === '/subscription' &&
          response.data.status === 'active'
        ) {
          localStorage.removeItem('userId');
          localStorage.removeItem('token');
          localStorage.clear();
          navigate('/login');
        }
      })
      .catch((error) => {
        console.log('Error while getting user plan. ', error);
      });
  };
  const delay = (ms:any) => new Promise(
    resolve => setTimeout(resolve, ms)
  );
  const userCheckoutStatus = () => {
    setSpin(true);
    getStatus()
      .then(async(response: any) => {
        setStripeStatus(response.data.status);
        setSpin(false);
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
        return null;
        console.log('Error while getting user plan. ', error);
      });
    return null;
  };
  useEffect(() => {
    const checkout_status: string | null = userCheckoutStatus();
    if (checkout_status === null) {
      userSubscriptionStatus();
      fetchPlans();
      fetchUserSubscription();
      setSpin(false);
    } else if (checkout_status === 'complete') {
      userSubscriptionStatus();
      fetchPlans();
      fetchUserSubscription();
      setSpin(false);
      const userId = localStorage.getItem('userId');
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
                toast.error(
                  `${error.response?.data?.title} Something went wrong while updating preference`
                );
              });
          } else if (response.data.signup_status == 'done') {
            setUserSignupStatus(true);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);
  useEffect(() => {
    if (stripeStatus === 'complete') {
      userSubscriptionStatus();
      fetchPlans();
      fetchUserSubscription();
      setSpin(false);
      const userId = localStorage.getItem('userId');
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
                toast.error(
                  `${error.response?.data?.title} Something went wrong while updating preference`
                );
              });
          } else if (response.data.signup_status == 'done') {
            setUserSignupStatus(true);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [stripeStatus]);
  useEffect(() => {
    if (location.search === '?success') {
      !disableAllButtons && setDisableAllButtons(true);
      toast.success('Subscription confirmed.', {autoClose: 3000})
      sleep(3000).then(() => {
        navigate('/questionnaire');
      })
      userCheckoutStatus();
    }
  }, [location]);
  const handleRetry = () => {
    setRetry(false);
    retries = 1;
    userCheckoutStatus();
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
            });
        } else {
          console.log('navigate to dashboard');
          //navigate('/dashboard');
        }
      })
      .catch((error) => {
        toast.error(
          `${error.response?.data?.title} Please check values and try again.`
        );
      });
  };
  const handleSubscribeClick = (id: string) => {
    setLoading(true);
    setDisableButton(true);
    checkoutPlan(id)
      .then((response) => {
        setLoading(false);
        setDisableButton(false);
        window.location.assign(response.data.url);
      })
      .catch((error) => {
        setLoading(false);
        setDisableButton(false);
        console.log('error while subscribing ', error);
        toast.error('Something went wrong while subscribing');
      });
  };
  const userCancelledPlan = (plan: any) => {
    if (
      userPlan?.plan?.id === plan.id &&
      userPlanStatus &&
      (userPlan?.renewalDate === null || userPlan?.nextPhase)
    ) {
      return true;
    }
    return false;
  };
  const userIsOnTrial = (plan: any) => {
    if (
      freeTrial === false &&
      !userCancelledPlan(plan) &&
      userPlan?.trialing &&
      userPlan?.plan?.id === plan.id &&
      plan.trialPeriod
    ) {
      return true;
    }
    return false;
  };
  const isNextPhase = (plan: any) => {
    if (userPlan?.nextPhase && userPlan?.nextPhase.plan?.id === plan.id) {
      return true;
    }
    return false;
  };
  const isActivePlan = (plan: any) => {
    if (userPlan?.plan?.id === plan.id) {
      return true;
    }
    return false;
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
        userSubscriptionStatus();
      })
      .catch((error) => {
        setLoading(false);
        setDisableButton(false);
        console.log('error while subscribing ', error);
        toast.error('Something went wrong while subscribing');
      });
  };
  const handleSwitch = () => {
    setLoading(true);
    setDisableButton(true);
    if (switchPlanId) {
      updateUserSubscription(switchPlanId).then((response) => {
        setShowSwitchModal(false);
        setLoading(false);
        setDisableButton(false);
        fetchPlans();
        fetchUserSubscription();
      });
    }
  };
  const handleOk = () => {
    handleCancelClick();
    setShowCancelModal(false);
  };
  const handleCancelModal = () => {
    setShowSwitchModal(false);
    setShowCancelModal(false);
  };
  const handleSwitchModal = (id: string) => {
    setSwitchPlanId(id);
    setEstimateAmount(undefined);
    calculateSubscriptionProration(id)
      .then((response: any) => {
        setLoading(false);
        setEstimateAmount(response.data.amount);
      })
      .catch((error) => {
        setLoading(false);
        console.log('error while getting user plan');
      });
    setShowSwitchModal(true);
  };
  const handleManagePayment = () => { 
    setLoadingManageBtn(true)
    managePayment()
    .then((response) => {
      setLoadingManageBtn(false);
      setDisableButton(false);
      window.location.assign(response.data.url);
    })
    .catch((error) => {
      setLoadingManageBtn(false);
      setDisableButton(false);
      console.log('error while trying to redirect to manage payment ', error);
      toast.error('Something went wrong while subscribing');
    });
  }
  return (
    <Layout
      defaultHeader={true}
      hamburger={!userSignupStatus || retry ? false : true}
      dashboard={false}
      setDisableAllButtons={setDisableAllButtons}
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
              // userCheckoutStatus();
              //setStripeStatus('close');
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
            <h2 className={styles['Sub-title']}>
              Subscription <Spin spinning={loading} style={{marginLeft: 4}}/>
            </h2>
            <div> </div>
            {userPlanStatus &&
            <button
              className={styles['manage-btn']}
              onClick={handleManagePayment}
              disabled={disableButton || disableAllButtons}
            >
              Manage Payment
              <Spin spinning={loadingManageBtn} indicator={antIcon} />
            </button>}
            {!loading && !userPlan && (
                <div className={styles['description']}>
              <InfoCircleOutlined /> You are <b>not subscribed </b> to any plan.
              </div>
            )}
            <>
              {plans?.map((plan: ISubscriptionPlan) => (
                <Card
                  key={plan.id}
                  type="inner"
                  className={`${styles['Subspt-Card']}
                ${
                  isActivePlan(plan) && userPlanStatus
                    ? styles['card-bordered']
                    : ''
                }`}
                  style={{
                    backgroundColor:
                      isActivePlan(plan) && userPlanStatus ? '#ded7d721' : '',
                  }}
                >
                  <Meta
                    title={
                      <div className={styles['Question-title']}>{plan.name}</div>
                    }
                    className={styles['ant-card-meta']}
                    description={
                      <div className={styles['Question']}>
                        <p className={styles['Description']}>
                          {plan.description}
                        </p>
                        {/* if userPlan has nextPhase means user downgraded the plan */}
                        {isNextPhase(plan) && (
                          <>
                            <p className={styles['subDates']}>Starts</p>
                            <p className={styles['otherDates']}>
                              {dateFormatRenewal(
                                userPlan?.nextPhase?.currentPeriod?.starts
                              )}
                            </p>
                            {userPlan?.nextPhase?.renewalDate && (
                              <>
                                <p className={styles['subDates']}>
                                  Renewal Date
                                </p>
                                <p className={styles['otherDates']}>
                                  {dateFormatRenewal(
                                    userPlan?.nextPhase?.renewalDate
                                  )}
                                </p>
                              </>
                            )}
                          </>
                        )}

                        {/* if Plan is Active and was cancelled by user but the cancellation date is in future */}
                        {userCancelledPlan(plan) && (
                          <>
                            <p className={styles['subDates']}>Ends</p>
                            <p className={styles['otherDates']}>
                              {dateFormatRenewal(userPlan?.currentPeriod?.ends)}
                            </p>
                          </>
                        )}
                        {isActivePlan(plan) &&
                          userPlan?.renewalDate &&
                          !userPlan.nextPhase && (
                            <>
                              <p className={styles['subDates']}>Renewal Date</p>
                              <p className={styles['otherDates']}>
                                {dateFormatRenewal(userPlan.renewalDate)}
                              </p>
                            </>
                          )}
                        {freeTrial &&
                          !userCancelledPlan(plan) &&
                          plan.trialPeriod && (
                            <>
                              <p className={styles['subDates']}>Trial Period</p>
                              <p className={styles['otherDates']}>
                                {plan.trialPeriod && (
                                  <>
                                    {plan.trialPeriod.repetitions}{' '}
                                    {plan.trialPeriod.interval.toLowerCase()}{' '}
                                    {userPlan?.plan?.id === plan.id && 'left'}
                                  </>
                                )}
                              </p>
                            </>
                          )}
                        {userIsOnTrial(plan) && (
                          <>
                            <p className={styles['subDates']}>Trial Period</p>
                            <p className={styles['otherDates']}>
                              {plan.trialPeriod && (
                                <>
                                  {plan.trialPeriod.repetitions}{' '}
                                  {plan.trialPeriod.interval.toLowerCase()}{' '}
                                  {userPlan?.plan?.id === plan.id && 'left'}
                                </>
                              )}
                            </p>
                          </>
                        )}
                        {plan.interval && <p>{plan.interval}</p>}

                        {isActivePlan(plan) && userPlanStatus ? (
                          <>
                            <div className={styles['Btn-group']}>
                              {/* <div className="Btn-group"> */}
                              {userCancelledPlan(plan) ? (
                                <Button
                                  className={` ${styles['Modal-cancel-btn']} ${styles['Cancelled']} ${styles['Subscribe']} `}
                                  disabled={true}
                                >
                                  Cancelled
                                </Button>
                              ) : (
                                // <Tag color="red">
                                //   Plan will be cancelled automatically{' '}
                                // </Tag>
                                <Button
                                  className={` ${styles['Modal-cancel-btn']} ${styles['Subscribe']} `}
                                  onClick={() => showModal()}
                                  disabled={disableAllButtons}
                                >
                                  Cancel
                                </Button>
                              )}
                              <ConfirmModal
                                title={'Confirmation'}
                                open={showCancelModal}
                                handleCancel={handleCancelModal}
                                handleOk={handleOk}
                                className='Addgoal-Confirm-Modal'
                                renderData={
                                  <div>
                                    Your subscription will be cancelled
                                    {userPlan?.renewalDate
                                      ? ` and not renewed on ${userPlan?.renewalDate}`
                                      : userPlan?.currentPeriod?.ends
                                      ? ` and not renewed on ${dateFormatRenewal(
                                          userPlan.currentPeriod.ends
                                        )}`
                                      : ''}
                                    {/* {userPlan.trialing &&
                                  ' You will loose your free trial.'} */}
                                  </div>
                                }
                              />
                            </div>
                          </>
                        ) : (
                          <>
                            <div className={styles['Btn-group']}>
                              {/* <div className="Btn-group"> */}
                              {userPlan &&
                              userPlan?.plan?.id !== plan.id &&
                              userPlanStatus ? (
                                <>
                                  {isNextPhase(plan) ? (
                                    <Button
                                      className={` ${styles['Modal-cancel-btn']} Submit-Button `}
                                      onClick={() => showModal()}
                                    >
                                      Cancel
                                    </Button>
                                  ) : (
                                    <Button
                                      className={'Submit-Button'}
                                      onClick={() => handleSwitchModal(plan.id)}
                                      disabled={disableAllButtons}
                                    >
                                      Switch
                                    </Button>
                                  )}
                                </>
                              ) : (
                                <Button
                                  className={'Submit-Button'}
                                  onClick={() => handleSubscribeClick(plan.id)}
                                  disabled={
                                    disableButton ||
                                    loading ||
                                    isActivePlan(plan) ||
                                    disableAllButtons
                                  }
                                >
                                  Activate
                                </Button>
                              )}
                            </div>
                          </>
                        )}
                      </div>
                    }
                  />
                </Card>
              ))}
            </>
            <ConfirmModal
              title={'Confirmation'}
              open={showSwitchModal}
              handleCancel={handleCancelModal}
              handleOk={handleSwitch}
              className='Addgoal-Confirm-Modal'
              renderData={
                <div>
                  {estimateAmount ? (
                    estimateAmount !== '$0.00' ? (
                      <>
                        {' '}
                        Your subscription will be changed. <br /> You will be
                        charged {estimateAmount} plus applicable taxes. Do you
                        agree?
                      </>
                    ) : (
                      <>
                        {!userPlan?.trialing ? (
                          <>
                            Your subscription will be changed on $
                            {userPlan?.renewalDate
                              ? dateFormatRenewal(userPlan?.renewalDate)
                              : dateFormatRenewal(
                                  userPlan?.currentPeriod?.ends
                                )}
                          </>
                        ) : (
                          <>
                            {estimateAmount === '$0.00'
                              ? 'Your subscription will be changed.'
                              : '.'}
                          </>
                        )}
                      </>
                    )
                  ) : (
                    <>
                      <br />
                      <Spin spinning={estimateAmount} />
                    </>
                  )}
                </div>
              }
            />
          </div>
        </Spin>
      )}
    </Layout>
  );
};
export default Subscription;
