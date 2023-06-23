import React, {
  useEffect,
  useState,
  useRef,
  Dispatch,
  SetStateAction,
} from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import styles from './Verification.module.scss';
import { toast } from 'react-toastify';
import Button from '../../../components/Button';
import ConfirmModal from '../../../components/Modal/ConfirmModal';
import Layout from '../../../layouts/Layout/Layout';
import { Tooltip } from 'antd';
// import './index.scss';
import ReactCodeInput from 'react-code-input';
import { requestPhoneOTP, verifyPhoneOTP } from '../../../services/authservice';
import { useTimer } from 'react-timer-hook';
import { ArrowLeftOutlined, InfoCircleOutlined } from '@ant-design/icons';

type IVerificationCode = {
  code: string;
};
type VerificationProps = {
  isResetPassword?: boolean;
  onSubmitResetPassword?: (code: any) => void;
  setCode: Dispatch<SetStateAction<string>>;
};
const Verification = () => {
  const userId = localStorage.getItem('userId');
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const toastId = useRef<any>(null);
  const [finishStatus, setfinishStatus] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [enableTimer, setEnableTimer] = useState(true);
  const [disableSubmit, setDisableSubmit] = useState(true);
  const [error, setError] = useState<any>();
  const time = new Date();
  time.setSeconds(time.getSeconds() + 60);
  const expiryTimestamp = time;
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

  const { seconds, minutes, restart } = useTimer({
    expiryTimestamp,
    onExpire: () => {
      setEnableTimer(false);
      setIsDisabled(false);
    },
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!userId) {
      navigate('/');
    }
    pageBackEvent();
    sendPhoneOTP();
  }, []);

  useEffect(() => {
    if(error) throw(error)
  }, [error])
  const onSubmit = async (data: any) => {
    if (userId) {
      setIsVerifying(true);
      const phoneVerificationResponse: any = await verifyPhoneOTP(
        data.code,
        userId
      );
      if (phoneVerificationResponse?.data?.id) {
        setIsVerifying(false);
        toast.dismiss();
        toast.success('Verified');
        navigate('/security');
      } else if (phoneVerificationResponse?.response?.status === 409) {
        const phone = localStorage.getItem('phone');
        navigate('/existing-user',{state: {
          username: phone,
          code: data.code
        }})
        setIsVerifying(false);
      } else if (phoneVerificationResponse?.response?.data) {
        toast.info(phoneVerificationResponse?.response?.data?.details);
        setIsVerifying(false);
      } else {
        setError({code: error.response.status, message: 'something went wrong.'})
      }
    }
  };

  const logoutClick = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
    localStorage.clear();
    navigate('/login');
  };
  const sendPhoneOTP = async () => {
    // api call to send phone otp
    const phone = localStorage.getItem('phone');
    const captchaToken = localStorage.getItem('captchaToken');
    setIsLoading(true);
    if (phone && captchaToken) {
      const phoneRequestResponse: any = await requestPhoneOTP(phone, captchaToken);
      if (phoneRequestResponse.code === 'ERR_BAD_REQUEST') {
        if(phoneRequestResponse.response.data.details.issues){
          toast(phoneRequestResponse.response.data.details.issues[0].message);
      } else if (phoneRequestResponse?.response.data.details) {
        toast(phoneRequestResponse?.response?.data.details)
        const remaining_time =
          phoneRequestResponse?.response?.data.details.match(/\d+/g);
          if(remaining_time){
            const t = new Date();
            t.setSeconds(t.getSeconds() + parseInt(remaining_time[0]));
            restart(t);
          }
        setIsLoading(false);
        return false;
      } else {
        setError({code: error.response.status, message: 'Something went wrong.'})
      }
    }  else {
      setIsLoading(false);
      setModalOpen(true);
      setEnableTimer(true);
      setIsDisabled(true);
      restart(time);
      setIsLoading(false);
    }
    }
  };
  const pageBackEvent = () => {
    window.history.pushState(null, '', window.location.pathname);
    window.addEventListener('popstate', onBackButtonEvent);
    return () => {
      window.removeEventListener('popstate', onBackButtonEvent);
    };
  };
  const onBackButtonEvent = (e: any) => {
    e.preventDefault();
    if (!finishStatus) {
      setfinishStatus(true);
    } else {
      window.history.pushState(null, '', window.location.pathname);
    }
  };

  return (
    <Layout defaultHeader={true} hamburger={false}>
      <div className={styles['Verification-wrap']}>
        <h2 className={styles['Verification-title']}>Verification code</h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={styles['Verification-form']}
        >
          <Controller
            control={control}
            name="code"
            rules={{
              validate: (value) => {
                return value && value.length === 6
                  ? true
                  : !value
                  ? 'Verification code is required'
                  : 'Invalid verification code';
              },
            }}
            render={({ field: { onChange, onBlur, value, name, ref } }) => (
              <ReactCodeInput
                // className={styles["box"]}
                name={name}
                inputMode="numeric"
                fields={6}
                type="number"
                onChange={(value) => {
                  onChange(value);
                  setDisableSubmit(false);
                }}
                value={value}
              />
            )}
          />
          {/* {errors.code?.message? <div className={styles['error-msg']}>&nbsp;&nbsp;&nbsp;<InfoCircleOutlined/> {errors.code?.message}</div>: null} */}
          <Tooltip
            color="orange"
            placement="bottom"
            title={errors.code?.message}
            open={errors.code ? true : false}
          />
          <Button
            onClick={handleSubmit(onSubmit)}
            className="Submit-Button"
            loading={isVerifying}
            disabled={disableSubmit}
          >
            Verify
          </Button>

          <button
            onClick={sendPhoneOTP}
            className={isDisabled ? styles['grey'] : styles['resend']}
            type="button"
            disabled={isDisabled}
          >
            Resend code&nbsp;
            {enableTimer && (
              <span>
                in&nbsp;{minutes}:{seconds}
              </span>
            )}
          </button>
        </form>
        <ConfirmModal
          title={'Confirmation'}
          open={modalOpen}
          handleCancel={() => {
            setModalOpen(false);
          }}
          handleOk={() => {
            setModalOpen(false);
          }}
          className="Addgoal-Confirm-Modal"
          renderData={
            <div className="Description">
              We just sent a text to your number, confirm this is you by putting
              in the code you received here
            </div>
          }
        />
        <ConfirmModal
          title={'Confirmation'}
          open={finishStatus}
          handleCancel={() => {
            setfinishStatus(false);
            pageBackEvent();
          }}
          handleOk={logoutClick}
          className="Addgoal-Confirm-Modal"
          renderData={
            <div className="Description">
              Are you sure you want to navigate away from this page?
            </div>
          }
        />
      </div>
    </Layout>
  );
};

export default Verification;
