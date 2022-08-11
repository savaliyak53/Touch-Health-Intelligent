import React, { useState, useEffect } from 'react';
import './index.css';
import Typography from '@mui/material/Typography';
import { requestPhoneOTP } from '../../services/authservice';
import { toast } from 'react-toastify';
import { useParams } from 'react-router';

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
    <div className="cards-video-wrapper">
      <div className="card-text">
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          className="resend"
        >
          Welcome to Touch Health Assistant
        </Typography>
        <Typography
          gutterBottom
          variant="h6"
          component="div"
          className="response"
        >
          Please check your provided phone for verification
        </Typography>
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
  );
}
export default VerificationMessage;
