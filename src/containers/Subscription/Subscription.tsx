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
  const [switchPlanId, setSwitchPlanId] = useState<string>();
  const [endDate, setEndDate] = useState(0);
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
  const userCancelledPlan = (plan:any)=>{
    if(userPlan?.plan?.id === plan.id && userPlanStatus === 'ACTIVE' && (userPlan?.renewalDate === null || userPlan?.nextPhase)){
      return true;
    }
    return false;
  }
  const isNextPhase = (plan:any)=>{
    if(userPlan?.nextPhase && userPlan?.nextPhase.plan?.id === plan.id){
      return true;
    }
    return false;
  }
  const isActivePlan = (plan:any)=>{
    if(userPlan?.plan?.id === plan.id ){
      return true;
    }
    return false;
  }
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
          <Tag color="orange" className='Sub-alert' style={{ margin: '0px' }}>
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
              className={`${'Subspt-Card'}
                isActivePlan(plan) && userPlanStatus === 'ACTIVE'
                  ? 'card-bordered'
                  : ''`
              }
              style={{backgroundColor:isActivePlan(plan) && userPlanStatus === 'ACTIVE'?'#ded7d721':''}}
            >
              <Meta
                title={<h3 className="Question-title">{plan.name}</h3>}
                description={
                  <div className="Question">
                      <p>{plan.description}</p>
                      <p className="Description">{plan.price?.amountFormatted}</p>
                      {/* if userPlan has nextPhase means user downgraded the plan */}
                      {isNextPhase(plan) && (
                        <>
                        <p className="subDates">
                          Starts
                        </p>
                        <p className="otherDates">
                        {dateFormatRenewal(userPlan?.nextPhase?.currentPeriod?.starts)}
                        </p>
                        {userPlan?.nextPhase?.renewalDate && (
                          <>
                          <p className="subDates">
                            Renewal Date
                          </p>
                          <p className="otherDates">
                            {dateFormatRenewal(userPlan?.nextPhase?.renewalDate)}
                          </p>
                          </>
                        )}
                        </>
                      )}
                      
                      {/* if Plan is Active and was cancelled by user but the cancellation date is in future */}
                      {userCancelledPlan(plan) && userPlan?.currentPeriod?.ends && (
                          <>
                          <p className="subDates">
                            Ends
                          </p>
                          <p className="otherDates">
                          {dateFormatRenewal(userPlan?.currentPeriod?.ends)}
                          </p>
                          </>
                        )}
                      {isActivePlan(plan) &&
                        userPlan?.renewalDate && !userPlan.nextPhase && (
                          <>
                          <p className="subDates">
                            Renewal Date
                          </p>
                          <p className="otherDates">
                            {dateFormatRenewal(userPlan.renewalDate)}
                          </p>
                          </>
                        )}
                      {freeTrial && !userCancelledPlan(plan) && plan.trialPeriod && (
                        <>
                        <p className='subDates'>
                          Trial Period
                        </p>
                        <p className="otherDates">
                        {plan.trialPeriod && <> 
                        {plan.trialPeriod.repetitions} {plan.trialPeriod.interval.toLowerCase()} left</>} 
                      </p>
                      </>
                      )}
                      {freeTrial === false && !userCancelledPlan(plan) &&
                        userPlan?.trialing &&
                        userPlan?.plan?.id === plan.id && plan.trialPeriod && (
                          <>
                          <p className='subDates'>
                            Trial Period
                          </p>
                          <p className="otherDates">
                            {plan.trialPeriod && <> 
                            {plan.trialPeriod.repetitions} {plan.trialPeriod.interval.toLowerCase()} left</>} 
                          </p>
                          </>
                        )}
                      {plan.interval && <p>{plan.interval}</p>}

                    {isActivePlan(plan) &&
                    userPlanStatus === 'ACTIVE' ? (
                      <>
                        <div className="Btn-group">
                          {userPlan?.plan?.id === plan.id &&
                          userPlanStatus === 'ACTIVE' &&
                          (userPlan.renewalDate === null || userPlan?.nextPhase) ? (
                            <Button
                              className="Modal-cancel-btn Cancelled Subscribe"
                              disabled={true}
                            >
                              Cancelled
                            </Button>
                            // <Tag color="red">
                            //   Plan will be cancelled automatically{' '}
                            // </Tag>
                          ) : (
                            <Button
                              className="Modal-cancel-btn Subscribe"
                              onClick={() => showModal()}
                            >
                              Cancel
                            </Button>
                          )}
                          <ConfirmModal
                            title={'Confirmation'}
                            visible={showCancelModal}
                            handleCancel={handleCancelModal}
                            handleOk={handleOk}
                            renderData={
                              <div>
                                Your subscription will be cancelled {userPlan?.renewalDate? `and not renewed on ${userPlan?.renewalDate}`:''}
                                {/* {userPlan.trialing &&
                                  ' You will loose your free trial.'} */}
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
                            <>
                            {isNextPhase(plan)?
                            <Button
                            className="Modal-cancel-btn Subscribe"
                            onClick={() => showModal()}
                          >
                            Cancel
                            </Button>
                            :<Button
                              className="Subscribe"
                              onClick={() => handleSwitchModal(plan.id)}
                            >
                              Switch
                            </Button>
                            }
                            </>  
                          ) : (
                            <Button
                              className="Subscribe"
                              onClick={() => handleSubscribeClick(plan.id)}
                              disabled={
                                disableButton ||
                                loading ||
                                isActivePlan(plan)
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
          visible={showSwitchModal}
          handleCancel={handleCancelModal}
          handleOk={handleSwitch}
          renderData={
            <div>
              Your subscription will be changed on {dateFormatRenewal(userPlan?.currentPeriod?.ends)}
              <br/>
              {estimateAmount ? estimateAmount!=='$0.00' && `You will be charged ${estimateAmount} plus applicable taxes. Do you agree?`:<Spin spinning={estimateAmount}/>}
            </div>
          }
        />
      </div>
    </Layout>
  );
};

export default Subscription;