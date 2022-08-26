import React, { useEffect, useState } from 'react';
import Layout from '../../layouts/Layout/Layout';
import { Button, Spin } from 'antd';
import './Subscription.scss';
import { useNavigate } from 'react-router';
import {
  checkoutPlan,
  getPlansService,
  getUserSubscription,
} from '../../services/subscriptionService';
import { Card, Carousel } from 'antd';
import { toast } from 'react-toastify';

const { Meta } = Card;

type ISubscriptionPlan = {
  id: string;
  currency: string;
  interval: string;
  periods: number;
  trialPeriodDays: number | null;
  amount: number;
  description: string | null;
  name: string;
};

const Subscription = () => {
  const [plans, setPlans] = useState<ISubscriptionPlan[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [disableButton, setDisableButton] = useState(false);

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
        console.log('user subscriptions are ', response.data);
      })
      .catch((error) => {
        setLoading(false);
        console.log('error while getting user plan');
      });
  };

  useEffect(() => {
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
        console.log('error for plan is ', error);
        toast.error('Something went wrong while subscribing');
      });
  };

  return (
    <Layout defaultHeader={true} hamburger={true} dashboard={false}>
      <div className="Content-wrap Sub">
        <h2 className="Sub-title">
          Subscription <Spin spinning={loading} />
        </h2>
        <Carousel effect="fade">
          {plans.map((plan: ISubscriptionPlan) => (
            <Card key={plan.id} type="inner">
              <Meta
                title={<h3 className="Question-title">{plan.name}</h3>}
                description={
                  <div className="Question">
                    <p>{plan.description}</p>
                    <p className="Description">
                      {plan.amount}
                      {plan.currency}/{plan.interval}
                    </p>
                    {plan.trialPeriodDays && (
                      <p>Trial Period: {plan.trialPeriodDays}</p>
                    )}

                    <div className="Btn-group quest">
                      <Button
                        className="Next"
                        onClick={() => handleSubscribeClick(plan.id)}
                        disabled={disableButton}
                      >
                        Subscribe
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
