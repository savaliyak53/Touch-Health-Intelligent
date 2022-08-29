import React, { useState, useEffect } from 'react';
import './index.scss';
import Typography from '@mui/material/Typography';
import { useForm } from 'react-hook-form';
import { requestPhoneOTP } from '../../services/authservice';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router';
import Layout from '../../layouts/Layout/Layout';
import { Checkbox } from 'antd';
import Button from '../../components/Button';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
type ITerms = {
  termsAndConditions: boolean;
};
function TermsAndCondtions() {
  const navigate = useNavigate();
  const [termsAndConditions, setTermAndConditions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    getValues,
    formState: { errors },
  } = useForm<ITerms>({
    mode: 'onSubmit',
    shouldFocusError: true,
    shouldUnregister: false,
  });
  const sendPhoneOTP = async () => {
    //api call to send email otp
    const userId = localStorage.getItem('userId');
    const phoneRequestResponse = await requestPhoneOTP(userId);
    if (phoneRequestResponse?.response?.data) {
      toast.error('Invalid Phone Number');
      setIsLoading(false);
      return false;
    } else {
      setIsLoading(false);
      toast.success('You have signed up successfully');
      toast.success('Phone verification link sent');
      return true;
    }
  };
  const onSubmit = async () => {
    setIsLoading(true);
    const userId = localStorage.getItem('userId');
    const isOtpSent = await sendPhoneOTP();
    if (isOtpSent) {
      navigate(`/verification-message/${userId}`);
    }
  };
  const onChange = (e: CheckboxChangeEvent) => {
    setTermAndConditions(e.target.checked);
  };
  return (
    <Layout defaultHeader={true} hamburger={false}>
      <div className="container">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
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
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.Lorem Ipsum has been the industrys standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged.It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum. Lorem Ipsum is simply dummy text of the printing and
              typesetting industry.Lorem Ipsum has been the industrys standard
              dummy text ever since the 1500s, when an unknown printer took a
              galley of type and scrambled it to make a type specimen book. It
              has survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged.It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </Typography>
            <div className={`Auth-terms`}>
              <Checkbox
                id="termsAndConditions"
                checked={termsAndConditions}
                {...register('termsAndConditions', {
                  required: {
                    value: termsAndConditions ? false : true,
                    message:
                      'Please accept the terms and Conditions to proceed!',
                  },
                })}
                onChange={onChange}
              >
                By creating your account, you agree to the Terms & Conditions
              </Checkbox>
            </div>
            <span className="error-message">
              {errors?.termsAndConditions?.message}
            </span>
          </div>

          <Button
            className="terms-btn"
            loading={isLoading}
            onClick={handleSubmit(onSubmit)}
          >
            Continue to Signup
          </Button>
        </form>
      </div>
    </Layout>
  );
}
export default TermsAndCondtions;
