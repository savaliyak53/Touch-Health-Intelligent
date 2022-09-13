import React, { useState, useEffect } from 'react';
import './index.scss';
import { Typography } from 'antd';
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
  const { Title, Paragraph } = Typography;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ITerms>({
    mode: 'onSubmit',
    shouldFocusError: true,
    shouldUnregister: false,
  });
  const sendPhoneOTP = async (userId: any) => {
    //api call to send email otp

    const phoneRequestResponse = await requestPhoneOTP(userId);
    if (phoneRequestResponse?.response?.data) {
      toast.error(phoneRequestResponse?.response?.data.details);
      setIsLoading(false);
      return false;
    } else {
      setIsLoading(false);
      toast.success('Phone verification code sent');
      return true;
    }
  };
  const onSubmit = async () => {
    setIsLoading(true);
    const userId = localStorage.getItem('userId');
    if (userId) {
      const isOtpSent = await sendPhoneOTP(userId);
      if (isOtpSent) {
        navigate(`/verification-code`);
      }
    } else {
      setIsLoading(false);
      toast.error('Error fetching user data');
      navigate('/signup');
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
            <Title level={4}>Welcome to Touch Health Assistant</Title>
            <Paragraph>
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
            </Paragraph>
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
                I agree to the Terms & Conditions
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
            Continue
          </Button>
        </form>
      </div>
    </Layout>
  );
}
export default TermsAndCondtions;
