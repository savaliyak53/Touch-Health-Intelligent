import React, { useEffect, useState } from 'react';
import moment from 'moment';
import Layout from '../../layouts/Layout/Layout';
import { Button, Spin, Popconfirm } from 'antd';
import './Subscription.scss';
import {
  checkoutPlan,
  getPlansService,
  getSubscriptionStatus,
  getUserSubscription,
  pauseSubscription,
  cancelSubscription,
  resumeSubscription,
  updateSubscription,
} from '../../services/subscriptionService';
import { Card, Carousel, Tag } from 'antd';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';

const { Meta } = Card;

export type ITrialPeriod = {
  interval: string;
  iterations: number;
};

export type ISubscriptionPlan = {
  id: string;
  currency: string;
  interval: string;
  periods: number;
  iterations: number;
  trialPeriod: ITrialPeriod | null;
  amount: string;
  description: string | null;
  name: string;
  priceAveraged: string | undefined;
};

const Subscription = () => {
  const navigate = useNavigate();
  const [plans, setPlans] = useState<ISubscriptionPlan[]>([]);
  const [loading, setLoading] = useState(false);
  const [userPlan, setUserPlan] = useState<any>({});
  const [disableButton, setDisableButton] = useState(false);
  const [userPlanStatus, setUserPlanStatus] = useState('');

  const fetchPlans = () => {
    setLoading(true);
    getPlansService()
      .then(({ data }) => {
        setLoading(false);
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
        setUserPlan(response.data);
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
    userPlan?.plan?.id != null
      ? updateSubscription(id)
      : checkoutPlan(id)
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

  const handlePauseClick = () => {
    setLoading(true);
    setDisableButton(true);
    pauseSubscription()
      .then((response) => {
        setLoading(false);
        setDisableButton(false);
        toast.info('Subscription Paused');
        fetchUserSubscription();
        userSubscriptionStatus();
      })
      .catch((error) => {
        setLoading(false);
        setDisableButton(false);
        console.log('error while subscribing ', error);
        toast.error(error.response.data.details);
      });
  };
  const handleResumeClick = () => {
    setLoading(true);
    setDisableButton(true);
    userSubscriptionStatus();
    resumeSubscription()
      .then((response) => {
        setLoading(false);
        setDisableButton(false);
        toast.info('Subscription Resumed');
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
        {userPlanStatus === 'NOT_SUBSCRIBED' ? (
          <Tag color="#3a4a7e">
            {'User is currently not subscribed to any plan'}
          </Tag>
        ) : (
          userPlan.subscription && (
            <Card>
              <Meta
                title={<h3 className="Question-title"> Current Plan:</h3>}
                description={
                  <>
                    <h3 className="Question-title">
                      {userPlan?.subscription?.plan?.interval_count}&nbsp;
                      {userPlan?.subscription?.plan?.interval}
                      &nbsp;{userPlan?.subscription?.plan?.object}
                    </h3>
                    <div className="Question">
                      <Tag color="#3a4a7e">{userPlanStatus}</Tag>

                      <p className="Description">
                        ${userPlan?.subscription?.plan?.amount / 100}
                        {userPlan?.subscription?.currency?.toUpperCase()}/
                        {userPlan?.subscription?.plan?.interval}
                      </p>
                      {userPlanStatus === 'ACTIVE' ? (
                        <>
                          <div className="Btn-group">
                            <Popconfirm
                              title={
                                'Are you sure you want to cancel subscription?'
                              }
                              onConfirm={handleCancelClick}
                              okText="Yes"
                              cancelText="No"
                            >
                              <Button className="Cancel-btn btn Subscribe">
                                Cancel
                              </Button>
                            </Popconfirm>

                            <Popconfirm
                              title={
                                'Are you sure you want to pause subscription?'
                              }
                              onConfirm={handlePauseClick}
                              okText="Yes"
                              cancelText="No"
                            >
                              {userPlan.canPause && (
                                <Button className="Subscribe">Pause</Button>
                              )}
                            </Popconfirm>
                          </div>
                        </>
                      ) : userPlanStatus === 'PAUSED' ? (
                        <>
                          <div className="Btn-group">
                            <Button
                              className="Cancel-btn btn ant-btn Subscribe"
                              onClick={() => handleCancelClick()}
                            >
                              Cancel
                            </Button>
                            <Button
                              className="Subscribe"
                              onClick={() => handleResumeClick()}
                            >
                              Resume
                            </Button>
                          </div>
                        </>
                      ) : (
                        ''
                      )}
                    </div>
                  </>
                }
              />
            </Card>
          )
        )}
        {userPlan.subscription && (
          <Carousel effect="fade">
            {plans.map((plan: ISubscriptionPlan) => (
              <Card key={plan.id} type="inner">
                <Meta
                  title={<h3 className="Question-title">{plan.name}</h3>}
                  description={
                    <div className="Question">
                      <p>{plan.description}</p>
                      {userPlan?.plan?.id === plan.id && (
                        <Tag color="#3a4a7e">{userPlanStatus}</Tag>
                      )}
                      <p className="Description">
                        {plan.amount}
                        {plan.currency}/{plan.interval}
                      </p>
                      {plan.trialPeriod?.interval && (
                        <p>Trial Period: {plan.trialPeriod?.interval}</p>
                      )}
                      {userPlan?.subscription?.plan?.id !== plan.id && (
                        <div className="Btn-group quest">
                          <Button
                            className="Next"
                            onClick={() => handleSubscribeClick(plan.id)}
                            disabled={
                              disableButton ||
                              loading ||
                              userPlan?.plan?.id === plan.id
                            }
                          >
                            Subscribe
                          </Button>
                        </div>
                      )}
                    </div>
                  }
                />
              </Card>
            ))}
          </Carousel>
        )}
      </div>
    </Layout>
  );
};

export default Subscription;
