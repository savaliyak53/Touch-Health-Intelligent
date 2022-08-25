import React, { useEffect, useState } from 'react';
import Layout from '../../layouts/Layout/Layout';
import { Button } from 'antd';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import './Subscription.scss';
import { useNavigate } from 'react-router';
import { getPlansService } from '../../services/subscriptionService';
import { Card, Carousel } from 'antd';
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
  const navigate = useNavigate();
  const handleCancelButtonClick = () => {
    navigate('/dashboard');
  };

  const fetchPlans = () => {
    getPlansService()
      .then(({ data }) => {
        console.log('plans are ', data.plans);
        setPlans(data.plans);
      })
      .catch((error) => {
        console.log('errors are ', error);
      });
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  return (
    <>
      <Layout defaultHeader={true} hamburger={true} dashboard={false}>
        <div className="Content-wrap Sub">
          <h2 className="Sub-title">Subscription</h2>
          <Carousel effect="fade">
            {plans.map((plan: ISubscriptionPlan) => (
              <Card
                key={plan.id}
                type="inner"
                // title={<h3 className="Question-title">{plan.name}</h3>}
                // actions={[
                //   <div key="modify" className="Btn-group quest">
                //     <Button className="Next">Modify</Button>
                //   </div>,
                // ]}
              >
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
                        <Button className="Next">Modify</Button>
                      </div>
                    </div>
                  }
                />
                {/* <div className="Question">
                  <p>{plan.description}</p>
                  <p className="Description">
                    {plan.amount}
                    {plan.currency}/{plan.interval}
                  </p>
                  {plan.trialPeriodDays && (
                    <p>Trial Period: {plan.trialPeriodDays}</p>
                  )}
                </div> */}
              </Card>
            ))}
          </Carousel>
          {/* <div className="Btn-group">
            <Button className="Skip" onClick={handleCancelButtonClick}>
              Cancel
            </Button>
          </div> */}
        </div>
      </Layout>
    </>
  );
};

export default Subscription;
