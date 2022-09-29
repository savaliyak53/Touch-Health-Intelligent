import React, { useEffect, useState } from 'react';
import Layout from '../../layouts/Layout/Layout';
import { Button, Spin, Typography, Tag } from 'antd';
import './Subscription.scss';
import {
  checkoutPlan,
  getPlansService,
  getSubscriptionStatus,
  getUserSubscription,
  cancelSubscription,
  updateUserSubscription,
  calculateSubscriptionProration,
} from '../../services/subscriptionService';
import { Card } from 'antd';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import { dateFormatRenewal } from '../../utils/lib';
import ConfirmModal from './ConfirmModal';
import { ISubscriptionPlan, IUserSubscription } from './Interfaces';
const { Meta } = Card;

const Subscription = () => {
  const navigate = useNavigate();
  const [plans, setPlans] = useState<ISubscriptionPlan[] | undefined>([]);
  const [freeTrial, setFreeTrial] = useState<boolean | undefined>(false);
  const [loading, setLoading] = useState(false);
  const [userPlan, setUserPlan] = useState<IUserSubscription | undefined>();
  const [disableButton, setDisableButton] = useState(false);
  const [userPlanStatus, setUserPlanStatus] = useState('');
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showSwitchModal, setShowSwitchModal] = useState(false);
  const [estimateAmount, setEstimateAmount] = useState();
  const [switchPlanId, setSwitchPlanId] = useState<string>();
  const [endDate, setEndDate] = useState(0);

  const showModal = () => {
    setShowCancelModal(true);
  };

  const handleCancel = () => {
    setShowCancelModal(false);
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
        setUserPlanStatus(response.data.status);
        if (
          location.pathname === '/subscription' &&
          response.data.status === 'active'
        ) {
          localStorage.removeItem('userId');
          localStorage.removeItem('token');
          navigate('/login');
        }
      })
      .catch((error) => {
        console.log('Error while getting user plan. ', error);
      });
  };
  useEffect(() => {
    userSubscriptionStatus();
    fetchPlans();
    fetchUserSubscription();
  }, []);

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
  const handleSwitchModal = (id: string) => {
    setSwitchPlanId(id);
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
  return (
    <Layout
      defaultHeader={true}
      hamburger={userPlanStatus === 'NOT_SUBSCRIBED' ? false : true}
      dashboard={false}
    >
      <div className="Content-wrap Sub">
        <h2 className="Sub-title">
          Subscription <Spin spinning={loading} />
        </h2>
        {!loading && !userPlan && (
          <Tag color="orange" style={{ margin: '0px' }}>
            <Typography.Title
              level={5}
              style={{ color: 'inherit', textAlign: 'center' }}
            >
              You are not subscribed to any plan.
            </Typography.Title>
          </Tag>
        )}
        <>
          {plans?.map((plan: ISubscriptionPlan) => (
            <Card
              key={plan.id}
              type="inner"
              className={
                userPlan?.plan?.id === plan.id && userPlanStatus === 'ACTIVE'
                  ? 'card-bordered'
                  : ''
              }
            >
              <Meta
                title={<h3 className="Question-title">{plan.name}</h3>}
                description={
                  <div className="Question">
                    <p>{plan.description}</p>
                    <p className="Description">{plan.price?.amountFormatted}</p>
                    {freeTrial && (
                      <p className="subDescription">
                        {plan.trialPeriod?.repetitions}{' '}
                        {plan.trialPeriod?.interval.toLowerCase()} free trial
                      </p>
                    )}
                    {freeTrial === false &&
                      userPlan?.trialing &&
                      userPlan?.plan?.id === plan.id && (
                        <p className="subDescription">
                          {plan.trialPeriod?.repetitions}{' '}
                          {plan.trialPeriod?.interval.toLowerCase()} free trial
                        </p>
                      )}
                    {/* if Plan is Active and was cancelled by user but the cancellation date is in future */}
                    {userPlan?.plan?.id === plan.id &&
                      userPlanStatus === 'ACTIVE' &&
                      userPlan.renewalDate === null && (
                        <p className="subDescription">
                          Will Expire on{' '}
                          {dateFormatRenewal(userPlan.currentPeriod?.ends)}
                        </p>
                      )}
                    {userPlan?.plan?.id === plan.id &&
                      userPlan?.renewalDate && (
                        <p className="subDescription">
                          Renews on {userPlan.renewalDate}
                        </p>
                      )}
                    {plan.interval && <p>{plan.interval}</p>}
                    {userPlan?.plan?.id === plan.id &&
                    userPlanStatus === 'ACTIVE' ? (
                      <>
                        <div className="Btn-group">
                          {userPlan?.plan?.id === plan.id &&
                          userPlanStatus === 'ACTIVE' &&
                          userPlan.renewalDate === null ? (
                            // <Button
                            //   className="Modal-cancel-btn Subscribe"
                            //   disabled={true}
                            // >
                            //   Cancelled
                            // </Button>
                            <Tag color="red">
                              Plan will be cancelled automatically{' '}
                            </Tag>
                          ) : (
                            <Button
                              className="Modal-cancel-btn Subscribe"
                              onClick={() => showModal()}
                            >
                              Cancel
                            </Button>
                          )}
                          <ConfirmModal
                            title={'Cancel Subscription'}
                            visible={showCancelModal}
                            handleCancel={handleCancel}
                            handleOk={handleOk}
                            renderData={
                              <div>
                                Are you sure you want to cancel?{' '}
                                {userPlan.trialing &&
                                  'You will loose your free trial.'}
                              </div>
                            }
                          />
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="Btn-group">
                          {userPlan &&
                          userPlan?.plan?.id !== plan.id &&
                          userPlanStatus === 'ACTIVE' ? (
                            <Button
                              className="Subscribe"
                              onClick={() => handleSwitchModal(plan.id)}
                            >
                              Switch Plan
                            </Button>
                          ) : (
                            <Button
                              className="Subscribe"
                              onClick={() => handleSubscribeClick(plan.id)}
                              disabled={
                                disableButton ||
                                loading ||
                                userPlan?.plan?.id === plan.id
                              }
                            >
                              Subscribe
                            </Button>
                          )}
                          <ConfirmModal
                            title={'Switch Plan'}
                            visible={showSwitchModal}
                            handleCancel={() => setShowSwitchModal(false)}
                            handleOk={handleSwitch}
                            renderData={
                              <div>
                                Are you sure you want to switch plan?{' '}
                                {userPlan?.trialing
                                  ? 'You will loose your free trial.'
                                  : estimateAmount
                                  ? `You will be charged ${estimateAmount} plus applicable taxes. Do you agree?`
                                  : ''}
                              </div>
                            }
                          />
                        </div>
                      </>
                    )}
                  </div>
                }
              />
            </Card>
          ))}
        </>
      </div>
    </Layout>
  );
};

export default Subscription;
