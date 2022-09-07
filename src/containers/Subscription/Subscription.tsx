import React, { useEffect, useState } from 'react';
import { DatePicker, Modal } from 'antd';
import moment from 'moment';
import Layout from '../../layouts/Layout/Layout';
import { Button, Spin } from 'antd';
import './Subscription.scss';
import {
  checkoutPlan,
  getPlansService,
  getSubscriptionStatus,
  getUserSubscription,
  pauseSubscription,
  cancelSubscription,
  uncancelSubscription,
  resumeSubscription,
} from '../../services/subscriptionService';
import { Card, Carousel, Tag } from 'antd';
import { toast } from 'react-toastify';
import { Navigate, useNavigate } from 'react-router';

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [endDate, setEndDate] = useState(0);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

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
        console.log('user plan ', response);
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
        console.log('user plan status ', response);
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
        if (
          location.pathname === '/subscription' &&
          response.data.status === 'active'
        ) {
          localStorage.removeItem('userId');
          localStorage.removeItem('token');
          navigate('/login');
        } else {
          window.location.assign(response.data.url);
        }
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
    setUserPlan({ status: 'cancel' });
    cancelSubscription()
      .then((response) => {
        setLoading(false);
        setDisableButton(false);
        console.log('cancel response', response);
        toast.info('Subscription Cancelled');
        fetchUserSubscription();
      })
      .catch((error) => {
        setLoading(false);
        setDisableButton(false);
        console.log('error while subscribing ', error);
        // toast.error('Something went wrong while subscribing');
        toast.info('Subscription Cancelled');
      });
  };

  const handlePauseClick = (endDate: number) => {
    setLoading(true);
    setDisableButton(true);
    setUserPlan({ status: 'pause' });
    showModal();
    pauseSubscription(endDate)
      .then((response) => {
        setLoading(false);
        setDisableButton(false);
        console.log('pause response', response);
        toast.info('Subscription Paused');
        fetchUserSubscription();
      })
      .catch((error) => {
        setLoading(false);
        setDisableButton(false);
        console.log('error while subscribing ', error);
        toast.error(error.response.data.details);
      });
  };
  const handleRenewClick = () => {
    setLoading(true);
    setDisableButton(true);
    setUserPlan({ status: 'active' });
    uncancelSubscription()
      .then((response) => {
        setLoading(false);
        setDisableButton(false);
        console.log('renew response', response);
        toast.info('Subscription Renewed');
        fetchUserSubscription();
      })
      .catch((error) => {
        setLoading(false);
        setDisableButton(false);
        console.log('error while subscribing ', error);
        // toast.error('Something went wrong while subscribing');
        toast.info('Subscription Renewed');
      });
  };
  const handleResumeClick = () => {
    setLoading(true);
    setDisableButton(true);
    setUserPlan({ status: 'active' });
    resumeSubscription()
      .then((response) => {
        setLoading(false);
        setDisableButton(false);
        console.log('resume response', response);
        toast.info('Subscription Resumed');
        fetchUserSubscription();
      })
      .catch((error) => {
        setLoading(false);
        setDisableButton(false);
        console.log('error while subscribing ', error);
        // toast.error('Something went wrong while subscribing');
        toast.info('Subscription Resumed');
      });
  };

  const getDate = (dateObj: any, dateString: string) => {
    // console.log('date', dateObj);
    const date = new Date(dateString);

    // console.log('date obj ', dateObj.getMilliSeconds());

    const timestampInMs = date.getTime();
    console.log('date class ', timestampInMs);
    setEndDate(timestampInMs);
  };

  const handleOk = () => {
    handlePauseClick(endDate);
    setIsModalOpen(false);
  };

  return (
    <Layout
      defaultHeader={true}
      hamburger={location.pathname === '/subscription' ? false : true}
      dashboard={false}
    >
      <div className="Content-wrap Sub">
        <h2 className="Sub-title">
          Subscription <Spin spinning={loading} />
        </h2>
        <Card>
          <Meta
            title={<h3 className="Question-title"> Current Plan:</h3>}
            description={
              <div className="Question">
                {userPlanStatus === 'NOT_SUBSCRIBED' ? (
                  <p className="Description">Not Subscribed to any Plan</p>
                ) : userPlanStatus === 'ACTIVE' &&
                  (userPlan.status === 'trialing' ||
                    userPlan.status === 'active') ? (
                  <>
                    <p className="Description">
                      {/* {userPlan?.plan.interval_count} &nbsp;
                      {userPlan?.plan.interval}&nbsp;{userPlan?.plan.object}
                      <br />
                      {userPlan?.plan.amount / 100}
                      {userPlan?.plan.currency}/{userPlan?.plan.interval} */}
                      Subscription Active
                    </p>
                    <div className="Btn-group quest">
                      <Button
                        className="Next"
                        onClick={() => handleCancelClick()}
                      >
                        Cancel
                      </Button>
                      <Button className="Next" onClick={() => showModal()}>
                        Pause
                      </Button>
                      <Modal
                        title="Basic Modal"
                        visible={isModalOpen}
                        onOk={handleOk}
                        onCancel={handleCancel}
                      >
                        <DatePicker
                          onChange={(date: any, dateString: any) => {
                            getDate(date, dateString);
                          }}
                          disabledDate={(d) => d.isBefore(moment())}
                          className="Date-Select"
                        />
                      </Modal>
                    </div>
                  </>
                ) : userPlan.status === 'cancel' ? (
                  <>
                    <p className="Description">Subscription Cancelled</p>
                    <div className="Btn-group quest">
                      <Button
                        className="Next"
                        onClick={() => handleRenewClick()}
                      >
                        Renew
                      </Button>
                    </div>
                  </>
                ) : userPlan.status === 'pause' ? (
                  <>
                    <p className="Description">
                      {/* {userPlan.plan.interval_count} &nbsp;
                      {userPlan.plan.interval}&nbsp;{userPlan.plan.object}
                      <br />
                      {userPlan.plan.amount / 100}
                      {userPlan.plan.currency}/{userPlan.plan.interval} */}
                      Subscription Paused
                    </p>
                    <div className="Btn-group quest">
                      <Button
                        className="Next"
                        onClick={() => handleResumeClick()}
                      >
                        Resume
                      </Button>
                      <Button
                        className="Next"
                        onClick={() => handleCancelClick()}
                      >
                        Cancel
                      </Button>
                    </div>
                  </>
                ) : (
                  ''
                )}
              </div>
            }
          />
        </Card>
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
                        {userPlan?.plan?.id === plan.id
                          ? 'Subscribed'
                          : 'Subscribe'}
                      </Button>
                    </div>
                  </div>
                }
              />
            </Card>
          ))}
        </Carousel>
      </div>
    </Layout>
  );
};

export default Subscription;
