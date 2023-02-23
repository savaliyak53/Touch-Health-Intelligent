import React, { useEffect, useState, useRef } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import styles from "./Verification.module.scss"
import { toast } from 'react-toastify';
import Button from '../../../components/Button';
import ConfirmModal from '../../Subscription/ConfirmModal';
import Layout from '../../../layouts/Layout/Layout';
import { Tooltip } from 'antd';
// import './index.scss';
import ReactCodeInput from 'react-code-input';
import { requestPhoneOTP, verifyPhoneOTP } from '../../../services/authservice';
type IVerificationCode = {
  code: string;
};
const Verification = () => {
  const userId = localStorage.getItem('userId');
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false)
  const toastId = useRef<any>(null);
  const [finishStatus, setfinishStatus] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    getValues,
    formState: { errors },
  } = useForm<IVerificationCode>({
    mode: 'onSubmit',
    shouldFocusError: true,
    shouldUnregister: false,
  });
  useEffect(() => {
    if (!userId) {
      navigate('/');
    }
    pageBackEvent()
   }, []);
  const onSubmit = async (data: any) => {
    if (userId) {
      setIsVerifying(true);
      const phoneVerificationResponse = await verifyPhoneOTP(data.code, userId);
      if (phoneVerificationResponse?.id) {
        setIsVerifying(false);
        toast.dismiss()
        toast.success('Verified');
        //localStorage.setItem('token', phoneVerificationResponse.token)
        navigate('/subscription');
      }
      else if (phoneVerificationResponse?.response?.status === 409) {
        toast.error("It seems your phone number already registered in our system. Please try to login or recover your password.");
        setIsVerifying(false);
        logoutClick();
      } 
      else if (phoneVerificationResponse?.response?.data) {
        toast.info(phoneVerificationResponse?.response?.data?.details);
        setIsVerifying(false);
      }
    }
  };
  const logoutClick = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
    navigate('/login');
  };
  const sendPhoneOTP = async () => {
    // api call to send phone otp
    const phone = localStorage.getItem('phone');
    const captchaToken= localStorage.getItem('captchaToken')
    setIsLoading(true);
    if(phone && captchaToken){
      const phoneRequestResponse = await requestPhoneOTP(phone,captchaToken);
      if (phoneRequestResponse?.response?.data) {
        toast.error(phoneRequestResponse?.response?.data.details);
        setIsLoading(false);
        return false;
      } else {
        setIsLoading(false);
        toast.success('Phone verification code sent');
      }
    } 
  };
  const pageBackEvent = () => {
    window.history.pushState(null, '', window.location.pathname);
    window.addEventListener('popstate', onBackButtonEvent);
    return () => {
      window.removeEventListener('popstate', onBackButtonEvent);  
    }; 
  }
  const onBackButtonEvent = (e:any) => {
    e.preventDefault();
    if (!finishStatus) {
        setfinishStatus(true)

      } else {
          window.history.pushState(null, '', window.location.pathname);
      }
  }

  return (
    <Layout defaultHeader={true} hamburger={false}>
      <div className={styles["Verification-wrap"]}>
        <form onSubmit={handleSubmit(onSubmit)} className={styles["Verification-form"]}>
          <h2 className={styles["Verification-title"]}>Verification Code</h2>
          <Controller
            control={control}
            name="code"
            rules={{
              validate: (value) => {
                return value && value.length === 6
                  ? true
                  : !value
                  ? 'Verification Code is required'
                  : 'Invalid Verification Code';
              },
            }}
            render={({ field: { onChange, onBlur, value, name, ref } }) => (
              <ReactCodeInput
                name={name}
                inputMode="numeric"
                fields={6}
                type="number"
                onChange={onChange}
                value={value}
              />
            )}
          />

          <Tooltip
            color="orange"
            placement="bottom"
            title={errors.code?.message}
            visible={errors.code ? true : false}
          />
          <Button
            onClick={handleSubmit(onSubmit)}
            className="Pref-btn btn"
            loading={isVerifying}
          >
            Verify
          </Button>
        </form>
        <Button
          onClick={sendPhoneOTP}
          className="Pref-btn btn"
          loading={isLoading}
          disabled={isDisabled}
        >
          Resend OTP
        </Button>
        <ConfirmModal
            title={'Confirmation'}
            visible={finishStatus}
            handleCancel={() => {setfinishStatus(false); pageBackEvent(); }}
            handleOk={logoutClick}
            renderData={<div>Are you sure you want to navigate away from this page?</div>}
          />
      </div>
    </Layout>
  );
};

export default Verification;
