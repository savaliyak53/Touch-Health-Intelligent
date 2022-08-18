import React, { useState, useEffect } from 'react';
import './index.css';
import Typography from '@mui/material/Typography';
import { useParams, useNavigate } from 'react-router-dom';
import { verifyPhoneOTP } from '../../services/authservice';
import { Spin } from 'antd';

function PhoneVerification() {
  const { code, userId } = useParams();
  const navigate = useNavigate();
  const [phoneLoading, setPhoneLoading] = useState<boolean>(false);
  const [isPhoneVerified, setIsPhoneVerified] = useState<boolean>(false);

  const phoneVerification = async () => {
    setPhoneLoading(true);
    const phoneVerificationResponse = await verifyPhoneOTP(code, userId);
    if (phoneVerificationResponse?.is_phone_verified) {
      setPhoneLoading(false);
      setIsPhoneVerified(true);
      navigate('/login');
    } else {
      setPhoneLoading(false);
    }
  };
  useEffect(() => {
    if (isPhoneVerified) {
      navigate('/login');
    } else phoneVerification();
  }, []);

  return (
    <div className="cards-video-wrapper">
      <div className="card-text">
        <Typography gutterBottom variant="h5" component="div">
          Welcome to Touch Health Assistant
        </Typography>
        {}
        {phoneLoading ? (
          <p className="response">Verifying your given phone number ... </p>
        ) : (
          <div>
            {' '}
            {isPhoneVerified ? (
              <p className="success-response">
                Phone number Verified please login ...{' '}
              </p>
            ) : (
              <p className="fail-response">
                Invaid code please contact support ...{' '}
              </p>
            )}{' '}
          </div>
        )}
        <div className="spin">
          {' '}
          <Spin spinning={phoneLoading} />
        </div>
      </div>
    </div>
  );
}
export default PhoneVerification;
