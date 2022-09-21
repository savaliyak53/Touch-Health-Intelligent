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
  updateSubscription,
  getUserPlan,
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
  const [plans, setPlans] = useState<ISubscriptionPlan[]|undefined>([]);
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
        // const newData = [
        //   plans.find(item => item.id===response.data?.subscription?.plan?.id),
        //   ...plans.filter(item => item.id!==response.data?.subscription?.plan?.id),
        // ];
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
  //trial period implementation
  const getUserPlanInfo = () => {
    getUserPlan()
      .then((response) => {
        // setUserPlanStatus(response.data.status);
        // if (
        //   location.pathname === '/subscription' &&
        //   response.data.status === 'active'
        // ) {
        //   localStorage.removeItem('userId');
        //   localStorage.removeItem('token');
        //   navigate('/login');
        // }
        //console.log('userplan:', response)
      })
      .catch((error) => {
        console.log('Error while getting user plan. ', error);
      });
  };

  useEffect(() => {
    userSubscriptionStatus();
    fetchPlans();
    fetchUserSubscription();
    getUserPlanInfo()
  }, []);
  useEffect(() => {
    if(userPlan){
      const activePlan= plans?.find(item => item.id===userPlan?.subscription?.plan?.id);
        const otherPlans=plans?.filter(item => item.id!==userPlan?.subscription?.plan?.id);
        if(activePlan && otherPlans){
          const sortedPlans=[activePlan,...otherPlans];
          setPlans(sortedPlans);
        }  
    }
  }, [userPlan]);
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

  const handlePauseClick = (endDate: number) => {
    setLoading(true);
    setDisableButton(true);
    showModal();
    pauseSubscription(endDate)
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
  const handleRenewClick = () => {
    setLoading(true);
    setDisableButton(true);
    uncancelSubscription()
      .then((response) => {
        setLoading(false);
        setDisableButton(false);
        toast.info('Subscription Renewed');
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

  const getDate = (dateObj: any, dateString: string) => {
    const date = new Date(dateString);
    const timestampInMs = date.getTime();
    setEndDate(timestampInMs);
  };

  const handleOk = () => {
    handlePauseClick(endDate);
    setIsModalOpen(false);
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

        <>
          {plans?.map((plan: ISubscriptionPlan) => (
            <Card key={plan.id} type="inner">
              <Meta
                title={userPlanStatus==='ACTIVE' && userPlan?.subscription?.plan?.id === plan.id? (
                  <h3 className="Question-title"> <Tag color="#00FF00">Current Plan</Tag></h3>
                ):<h3 className="Question-title">{plan.name}</h3>}
                description={
                  <div className="Question">
                    {userPlanStatus==='ACTIVE' && userPlan?.subscription?.plan?.id === plan.id && <p>{plan.name}</p>}
                    <p>{plan.description}</p>
                    {/* {userPlanStatus==='ACTIVE' && userPlan?.subscription?.plan?.id === plan.id && (
                      <Tag color="#00FF00">{userPlanStatus}</Tag>
                    )} */}
                    <p className="Description">
                      {plan.amount}
                      {/* {plan.currency}/{plan.interval} */}
                    </p>
                    {plan.interval && (
                      <p>{plan.interval}</p>
                    )}
                    {userPlan?.subscription?.plan?.id === plan.id && userPlanStatus === 'ACTIVE' ? (
                      <>
                        <div className="Btn-group">
                          <Button
                            className="Cancel-btn btn Subscribe"
                            onClick={() => handleCancelClick()}
                          >
                            Cancel
                          </Button>
                          <Button
                            className="Subscribe"
                            onClick={() => showModal()}
                          >
                            Pause
                          </Button>
                          <Modal
                            title="Enter date to pause subsciption:"
                            visible={isModalOpen}
                            closable={false}
                            footer={
                              <div className="Btn-group">
                                <Button
                                  className="Modal-cancel-btn Subscribe"
                                  onClick={handleCancel}
                                >
                                  Cancel
                                </Button>
                                <Button
                                  className="Subscribe"
                                  onClick={handleOk}
                                >
                                  Ok
                                </Button>
                              </div>
                            }
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
                    ) : userPlanStatus === 'CANCELED' ? (
                      <>
                        <div className="Btn-group quest">
                          <Button
                            className="Subscribe"
                            onClick={() => handleRenewClick()}
                          >
                            Renew
                          </Button>
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
                      <div className="Btn-group">
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
                      </div>
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
// {userPlanStatus === 'NOT_SUBSCRIBED' ? (
//   <Tag color="#3a4a7e">
//     {'User is currently not subscribed to any plan'}
//   </Tag>
// ) : (
//   userPlanStatus && (
//     <Card>
//       <Meta
//         title={<h3 className="Question-title"> Current Plan:</h3>}
//         description={
//           <>
//             <h3 className="Question-title">
//               {userPlan?.subscription?.plan?.interval_count}&nbsp;
//               {userPlan?.subscription?.plan?.interval}
//               &nbsp;{userPlan?.subscription?.plan?.object}
//             </h3>
//             <div className="Question">
//               {userPlan.cancel_at ? (
//                 <p>
//                   Your Plan will end at{' '}
//                   {moment(userPlan.cancel_at).format('DD/MM/YYYY')}
//                 </p>
//               ) : (
//                 ''
//               )}
//               <Tag color="#3a4a7e">{userPlanStatus}</Tag>

//               <p className="Description">
//                 ${userPlan?.subscription?.plan?.amount / 100}
//                 {/* {userPlan?subscription.plan?.currency?.toUpperCase()}/
//                 {userPlan?.subscription?.plan?.interval} */}
//               </p>
//               {userPlanStatus === 'ACTIVE' ? (
//                 <>
//                   <div className="Btn-group">
//                     <Button
//                       className="Cancel-btn btn Subscribe"
//                       onClick={() => handleCancelClick()}
//                     >
//                       Cancel
//                     </Button>
//                     <Button
//                       className="Subscribe"
//                       onClick={() => showModal()}
//                     >
//                       Pause
//                     </Button>
//                     <Modal
//                       title="Enter date to pause subsciption:"
//                       visible={isModalOpen}
//                       closable={false}
//                       footer={
//                         <div className="Btn-group">
//                           <Button
//                             className="Modal-cancel-btn Subscribe"
//                             onClick={handleCancel}
//                           >
//                             Cancel
//                           </Button>
//                           <Button
//                             className="Subscribe"
//                             onClick={handleOk}
//                           >
//                             Ok
//                           </Button>
//                         </div>
//                       }
//                     >
//                       <DatePicker
//                         onChange={(date: any, dateString: any) => {
//                           getDate(date, dateString);
//                         }}
//                         disabledDate={(d) => d.isBefore(moment())}
//                         className="Date-Select"
//                       />
//                     </Modal>
//                   </div>
//                 </>
//               ) : userPlanStatus === 'CANCELED' ? (
//                 <>
//                   <div className="Btn-group quest">
//                     <Button
//                       className="Subscribe"
//                       onClick={() => handleRenewClick()}
//                     >
//                       Renew
//                     </Button>
//                   </div>
//                 </>
//               ) : userPlanStatus === 'PAUSED' ? (
//                 <>
//                   <div className="Btn-group">
//                     <Button
//                       className="Cancel-btn btn ant-btn Subscribe"
//                       onClick={() => handleCancelClick()}
//                     >
//                       Cancel
//                     </Button>
//                     <Button
//                       className="Subscribe"
//                       onClick={() => handleResumeClick()}
//                     >
//                       Resume
//                     </Button>
//                   </div>
//                 </>
//               ) : (
//                 ''
//               )}
//             </div>
//           </>
//         }
//       />
//     </Card>
//   )
// )}