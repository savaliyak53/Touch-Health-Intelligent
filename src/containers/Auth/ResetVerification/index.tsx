import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

import { toast } from 'react-toastify';
import Button from '../../../components/Button';
import { AiOutlineEye } from 'react-icons/ai';
import Layout from '../../../layouts/Layout/Layout';
import { Tooltip } from 'antd';
import ReactCodeInput from 'react-code-input';
import { requestPhoneOTP, verifyPhoneOTP } from '../../../services/authservice';
type IVerificationCode = {
  code: string;
};
const ResetVerification = () => {
  // const userId = localStorage.getItem('userId');
  // console.log(userId);
  let userId: any;
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

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
  // useEffect(() => {
  //   if (!userId) {
  //     navigate('/');
  //   }
  // }, []);
  const onSubmit = async (data: any) => {
    navigate('/security-question');
  };
  const sendPhoneOTP = async () => {
    //api call to send phone otp
    // setIsLoading(true);
    // const phoneRequestResponse = await requestPhoneOTP(userId);
    // if (phoneRequestResponse?.response?.data) {
    //   toast.error(phoneRequestResponse?.response?.data.details);
    //   setIsLoading(false);
    //   return false;
    // } else {
    //   setIsLoading(false);
    //   toast.success('Phone verification code sent');
    //   return true;
    // }
  };
  return (
    <Layout defaultHeader={true} hamburger={false}>
      <div className="Verification-wrap">
        <form onSubmit={handleSubmit(onSubmit)} className="Verification-form">
          <h2 className="Verification-title">Verification Code</h2>
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
        >
          Resend OTP
        </Button>
      </div>
    </Layout>
  );
};

export default ResetVerification;
