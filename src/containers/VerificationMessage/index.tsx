import React, { useState, useEffect } from 'react';
import './index.css';
import { requestPhoneOTP } from '../../services/authservice';
import { toast } from 'react-toastify';
import { useParams } from 'react-router';
import Layout from '../../layouts/Layout/Layout';
import { Typography } from 'antd';

const { Title } = Typography;

function VerificationMessage() {
  const [phoneLoading, setPhoneLoading] = useState<boolean>(false);
  const { userId } = useParams();

  const sendPhoneOTP = async () => {
    //api call to send email otp
    setPhoneLoading(true);
    const phoneRequestResponse = await requestPhoneOTP(userId);
    if (phoneRequestResponse?.response?.data) {
      setPhoneLoading(false);
      toast.error('Phone verification failed Number');
    } else {
      setPhoneLoading(false);
      toast.success('Phone verification link sent');
    }
  };

  return (
    <Layout defaultHeader={true} hamburger={false}>
      <div className="cards-video-wrapper">
        <div className="card-text">
          <Title level={2}>Welcome to Touch Health Assistant</Title>
          <Title level={3}>
            Please check your provided phone for verification
          </Title>
          <div className="resend">
            <span
              className={phoneLoading ? 'resend-otp-disabled' : 'resend-otp'}
              onClick={() => !phoneLoading && sendPhoneOTP()}
            >
              Resend verification link on Phone.
            </span>
          </div>
        </div>
      </div>
    </Layout>
  );
}
export default VerificationMessage;
