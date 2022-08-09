import React from 'react';
import Layout from '../../layouts/Layout/Layout';
import { Button, Checkbox, Slider } from 'antd';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import './Subscription.scss';
import { useNavigate } from 'react-router';

const onChange = (e: CheckboxChangeEvent) => {
  console.log(`checked = ${e.target.checked}`);
};

const Subscription = () => {
  const navigate = useNavigate();
  const handleCancelButtonClick = () => {
    navigate('/dashboard');
  };

  return (
    <>
      <Layout defaultHeader={true} hamburger={true} dashboard={false}>
        <div className="Content-wrap Sub">
          <h2 className="Sub-title">Subscription</h2>

          <div className="Question">
            <h3 className="Question-title">Plan</h3>
            <p className="Description">Monthly 6.99$/ month</p>
            <div className="Btn-group quest">
              <Button className="Next">Modify</Button>
            </div>
          </div>
          <div className="Question">
            <h3 className="Question-title">
              Automatic subscription renewal date
            </h3>
            <p className="Description">July 20, 2022</p>
          </div>
          <div className="Question">
            <h3 className="Question-title">Payment details</h3>
            <div className="Btn-group quest">
              <Button className="Next">Modify</Button>
            </div>
          </div>

          <div className="Btn-group">
            <Button className="Skip" onClick={handleCancelButtonClick}>
              Cancel
            </Button>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Subscription;
