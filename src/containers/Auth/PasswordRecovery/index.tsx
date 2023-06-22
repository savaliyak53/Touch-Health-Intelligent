import React, { useState, useRef, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  postResetPassword,
  requestPhoneOTP,
  // resetPassword,
} from '../../../services/authservice';
import { toast } from 'react-toastify';
import Button from '../../../components/Button';
import { AiOutlineEye } from 'react-icons/ai';
import Layout from '../../../layouts/Layout/Layout';
import { Tooltip } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
// import '../index.scss';
import styles from './PasswordRecovery.module.scss';
import InputField from '../../../components/Input';
import CountryCode from '../Country/CountryCode';
import { onlyNumbers } from '../../../utils/lib';
import ReactCodeInput from 'react-code-input';
import {
  checkAnswer,
  getSecurityQuestions,
} from '../../../services/authservice';
import ReCAPTCHA from 'react-google-recaptcha';
import RecaptchaModal from '../../../components/Modal/RecaptchaModal';
import { useTimer } from 'react-timer-hook';
import ConfirmModal from '../../../components/Modal/ConfirmModal';
import Verification from '../Verification';

type IRecoverFormInputs = {
  username: string;
  code: string;
  new_password: string;
  confirmPassword: string;
  security_question?: ISecurityQuestion;
};
type ISecurityQuestion = {
  question: string;
  answer: string;
};
type User = {
  exp: string;
  iat: string;
  id: string;
};
const PasswordRecovery = () => {
  const navigate = useNavigate();
  const location: any = useLocation();
  const [passwordShown, setPasswordShown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [question, setQuestion] = useState('');
  const [confirmPasswordShown, setConfirmPasswordShown] = useState(false);
  const [answer, setAnswer] = useState('');
  const [codeSubmitted, setCodeSubmitted] = useState(false);
  const [enterNumber, setEnterNumber] = useState(false);
  const [changePassword, setChangePassword] = useState(false);
  const [openRecaptcha, setOpenRecaptcha] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [enableTimer, setEnableTimer] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [disableSubmit, setDisableSubmit] = useState(true);
  const [code, setCode] = useState('');
  const [error, setError] = useState<any>();

  const time = new Date();
  time.setSeconds(time.getSeconds() + 60);
  const expiryTimestamp = time;
  const refCaptcha = useRef<any>(null);

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };
  const toggleConfirmPassword = () => {
    setConfirmPasswordShown(!confirmPasswordShown);
  };
  const {
    register,
    handleSubmit,
    control,
    getValues,
    formState: { errors },
  } = useForm<IRecoverFormInputs>({
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
    window.scrollTo(0,0)
    if (location.state) {
      onSubmitCode(location.state);
    } else {
      setEnterNumber(true);
    }
  }, []);

  useEffect(() => {
    if (error) throw(error)
  }, [error]);

  const restartTime = (time: number) => {
    const t = new Date();
    t.setSeconds(t.getSeconds() + time);
    restart(t);
  };

  const onSubmitCode = async (data: any) => {
    setIsSubmitted(true);
    const username = location.state?.username ?? localStorage.getItem('username');
    const code = data.code ?? getValues('code');
    getSecurityQuestions(username, code)
      .then((response) => {
        if (response && response.security_questions.length > 0) {
          setCodeSubmitted(true);
          setIsCodeSent(false);
          setQuestion(response.security_questions[0].question);
          setCode(data.code);
        } else {
          setQuestion('null');
          setIsCodeSent(false);
          setChangePassword(true);
        }
      })
      .catch((error: any) => {
        if (error.response.data.details && error.code === 'ERR_BAD_REQUEST') {
          toast.error(error.response.data.details);
        } else {
          setError({code: error.response.status, message: error.response.data.details ?? "Something went wrong."})
        }
      });
  };

  const confirmAnswer = async (data: any) => {
    if (getValues('username')) {
      data.username = onlyNumbers(getValues('username'));
      data.code = code;
    } else {
      data.username = location.state.username;
      data.code = location.state.code;
    }
    if (question === 'null') {
      data.security_question = null;
    } else {
      data.security_question.question = question;
    }
    checkAnswer(data).then((response) => {
      if(response) {
        setChangePassword(true);
        setCodeSubmitted(false);
      }
    })
    .catch(err => {
      if (err.response.data.details && err.code === 'ERR_BAD_REQUEST') {
        toast.error(err.response.data.details);
      } else {
        setError({code: err.response.status, message: err.response.data.details ?? "Something went wrong."})
      }
    })
  };

  const onSubmitRecover = async (data: any) => {
    if (changePassword) {
      if (getValues('username')) {
        data.username = onlyNumbers(getValues('username'));
      } else {
        data.username = location.state.username;
        data.code = location.state.code;
      }
      if (question === 'null') {
        data.security_question = null;
      } else {
        data.security_question.question = question;
      }
      postResetPassword(data)
        .then((response: any) => {
          if (response) {
            toast.success('Password Recovered Successfuly');
            localStorage.clear();
            navigate('/login');
          }
        })
        .catch((error: any) => {
            setError({code: error.response.status, message: error.response.data.details ?? "Something went wrong."})
        });
    } else {
      setChangePassword(false);
      setEnterNumber(true);
    }
  };
  const resendOTP = () => {
    setIsLoading(true);
    setIsDisabled(true);
    const token = localStorage.getItem('recaptcha-token');
    requestPhoneOTP(onlyNumbers(getValues('username')), token || '')
      .then((response: any) => {
        if (response.code === 'ERR_BAD_REQUEST') {
          setIsCodeSent(true);
          // toast(response.response.data.details);
          const remaining_time = response?.response?.data.details.match(/\d+/g);
          restartTime(parseInt(remaining_time[0]));
          setIsLoading(false);
          // setIsDisabled(false);
        } else {
          setEnterNumber(false);
          setIsCodeSent(true);
          restartTime(60);
          setEnableTimer(true);
          setModalOpen(true);
          setIsLoading(false);
          setIsDisabled(true);
        }
      })
      .catch((error: any) => {
        toast(error.response);
        setIsLoading(false);
        setIsDisabled(false);
      });
  };
  const onVerify = () => {
    setIsLoading(true);
    setIsDisabled(true);
    const token = refCaptcha?.current?.getValue();
    const username = onlyNumbers(getValues('username'));
    localStorage.setItem('username', username);
    requestPhoneOTP(onlyNumbers(getValues('username')), token)
      .then((response: any) => {
        if (response.code === 'ERR_BAD_REQUEST') {
          if(response.response.data.details.issues){
            toast(response.response.data.details.issues[0].message);
        } else {
          toast(response.response.data.details);
          const remaining_time = response?.response?.data.details.match(/\d+/g);
          if(remaining_time){
            setEnterNumber(false);
            setIsCodeSent(true);
            restartTime(parseInt(remaining_time[0]));   
          }
        }
          setIsLoading(false);
          setIsDisabled(false);
        } else {
          setEnterNumber(false);
          setIsCodeSent(true);
          restartTime(60);
          setEnableTimer(true);
          setModalOpen(true);
          setIsLoading(false);
          setIsDisabled(true);
        }
      })
      .catch((error: any) => {
        // console.log(error);
        toast(error.response);
        setIsLoading(false);
        setIsDisabled(false);
      });
  };
  return (
    <Layout defaultHeader={false} hamburger={false} signupLogin="Reset-bg">
      <div className="Auth-wrap">
        {enterNumber && (
          <form
            onSubmit={handleSubmit(onVerify)}
            className={styles['Auth-form']}
          >
          <div className={'Reset-Pwd-Back-Btn'}>
            <ArrowLeftOutlined className={'LeftIcon'} onClick={() => navigate('/login')} />
          </div>
            <h2 className={styles['Security-title']}>Reset password</h2>
            <Tooltip
              color="orange"
              placement="bottomLeft"
              title={errors.username?.message}
              open={errors.username ? true : false}
            ></Tooltip>
            <CountryCode
              disabled={isCodeSent}
              errors={errors.username}
              control={control}
              fieldName="username"
            />
            <ReCAPTCHA
              className={styles['recaptcha']}
              ref={refCaptcha}
              sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY as string}
              onChange={() => {
                setIsDisabled(false);
              }}
            />
            <Button
              onClick={handleSubmit(onVerify)}
              loading={isLoading}
              disabled={isDisabled}
              className={'Submit-Button'}
            >
              {isCodeSent ? 'Resend code' : 'Send code'}
            </Button>
          </form>
        )}

        {isCodeSent && (
          <>
            <div className={styles['Verification-wrap']}>
              <form
                onSubmit={handleSubmit(onSubmitCode)}
                className={styles['Verification-form']}
              >
                <h2 className={styles['Security-title']}>Verification code</h2>
                {/* <div className={styles['description']}>
               <InfoCircleOutlined /> We just sent a text to your number, confirm this is you by putting in the code you received here
              </div> */}
                <Controller
                  control={control}
                  name="code"
                  rules={{
                    validate: (value) => {
                      // only apply validation rules when the form is submitted
                      if (isSubmitted) {
                        return value && value.length === 6
                          ? true
                          : !value
                          ? 'Verification code is required'
                          : 'Invalid verification code';
                      }
                      return true; // skip validation on first render
                    },
                  }}
                  render={({
                    field: { onChange, onBlur, value, name, ref },
                  }) => (
                    <ReactCodeInput
                      name={name}
                      inputMode="numeric"
                      fields={6}
                      type="number"
                      onChange={(value: any) => {
                        onChange(value);
                        setDisableSubmit(false);
                      }}
                      value={value}
                    />
                  )}
                />

                <Tooltip
                  color="orange"
                  placement="bottom"
                  title={errors.code?.message}
                  open={errors.code ? true : false}
                />
                <Button
                  onClick={handleSubmit(onSubmitCode)}
                  className={'Submit-Button'}
                  loading={isVerifying}
                  disabled={disableSubmit}
                >
                  Verify
                </Button>
              </form>
              <RecaptchaModal
                title={''}
                open={openRecaptcha}
                resendOTP={resendOTP}
                setOpenRecaptcha={setOpenRecaptcha}
              />
              <button
                onClick={() => {
                  setOpenRecaptcha(true);
                }}
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
                    We just sent a text to your number, confirm this is you by
                    putting in the code you received here
                  </div>
                }
              />
            </div>
          </>
        )}
        {/* {(    */}

        {codeSubmitted && question && (
          <>
            <div
              className={styles['Question-Auth-wrap']}
              // className="Auth-wrap"
            >
              {/* <h2 className={styles["Auth-title"]}> */}
              <h2 className={styles['Security-title']}>Security Question</h2>
              <p className={styles['Security-Description']}>
                Please help us protect your account. Select a security question
                and input answer. You can use this to get back access to your
                account.
              </p>
              <input
                id="security_question.question"
                {...register('security_question.question')}
                type="text"
                className={styles['security-Input']}
                // className="app-Input"
                placeholder="Question"
                value={question}
                disabled={true}
              />
              <div className={styles['input-element-wrapper']}>
                <InputField
                  id="security_question.answer"
                  {...register('security_question.answer', {
                    required: 'Answer is required',
                  })}
                  type="text"
                  className={styles['answer-Input']}
                  placeholder="Answer"
                  onChange={(event: any) => setAnswer(event.target.value)}
                />
              </div>
              {/* <div className="action"> */}
              <Button
                onClick={handleSubmit(confirmAnswer)}
                className={'Submit-Button'}
              >
                Submit
              </Button>
              {/* </div> */}
            </div>
          </>
        )}

        {changePassword && (
          <>
            <div
              className={styles['Auth-wrap']}
              style={{ justifyContent: 'start', width: '100%' }}
            >
              <h2 className={styles['Security-title']}>Enter New Password</h2>

              <Tooltip
                color="orange"
                placement="bottomLeft"
                title={errors.code?.message}
                open={errors.code ? true : false}
              ></Tooltip>
              <div className={styles['input-element-wrapper-password']}>
                {/* <div className="input-element-wrapper-password"> */}
                <Tooltip
                  color="orange"
                  placement="bottomLeft"
                  title={errors.new_password?.message}
                  open={errors.new_password ? true : false}
                >
                  <input
                    id="new_password"
                    placeholder="Enter new password here"
                    type={passwordShown ? 'text' : 'password'}
                    className={styles['security-Input']}
                    // className="app-Input"
                    {...register('new_password', {
                      required: 'Password is required',
                      minLength: {
                        value: 8,
                        message: 'Password should be of at least 8 characters.',
                      },
                      pattern: {
                        value: /^(?=.*?[#?!@$%^&*-])/,
                        message: 'Need a special character.',
                      },
                    })}
                  />
                </Tooltip>
                {/* <button className="btn" onClick={togglePassword} type="button"> */}
                <button
                  className={styles['btn']}
                  onClick={togglePassword}
                  type="button"
                >
                  <AiOutlineEye style={{ color: '#204ECF' }} />
                </button>
              </div>
              <div className={styles['input-element-wrapper-password']}>
                <Tooltip
                  color="orange"
                  placement="bottomLeft"
                  title={errors.confirmPassword?.message}
                  open={errors.confirmPassword ? true : false}
                >
                  <input
                    id="confirmPassword"
                    placeholder="Confirm password here"
                    type={confirmPasswordShown ? 'text' : 'password'}
                    className={styles['security-Input']}
                    {...register('confirmPassword', {
                      required: 'Confirm password is required',
                      validate: (value: string) => {
                        return (
                          value === getValues('new_password') ||
                          'Passwords do not match.'
                        );
                      },
                    })}
                  />
                </Tooltip>
                <button
                  className={styles['btn']}
                  onClick={toggleConfirmPassword}
                  type="button"
                >
                  <AiOutlineEye style={{ color: '#204ECF' }} />
                </button>
              </div>
              <div className="action">
                <Button
                  onClick={handleSubmit(onSubmitRecover)}
                  className={'Submit-Button'}
                >
                  Reset password
                </Button>
              </div>
            </div>
          </>
        )}

        {/* <div className="Links-wrap">
          <div className="Auth-terms-signup">
            For customer support, please follow this{' '}
            <a href="https://www.touchmedical.ca/customer-care">link</a>
          </div>
        </div> */}
      </div>
    </Layout>
  );
};

export default PasswordRecovery;
