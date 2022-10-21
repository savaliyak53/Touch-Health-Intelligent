import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import {
  postResetPassword,
  resetPassword,
} from '../../../services/authservice';
import { toast } from 'react-toastify';
import Button from '../../../components/Button';
import { AiOutlineEye } from 'react-icons/ai';
import Layout from '../../../layouts/Layout/Layout';
import { Tooltip } from 'antd';
import '../index.scss';
import InputField from '../../../components/Input';
import CountryCode from '../Country/CountryCode';
import { onlyNumbers } from '../../../utils/lib';
import ReactCodeInput from 'react-code-input';
import {
  checkAnswer,
  getSecurityQuestions,
} from '../../../services/authservice';

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
const PasswordRecovery = () => {
  const navigate = useNavigate();
  const [passwordShown, setPasswordShown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [question, setQuestion] = useState('');
  const [confirmPasswordShown, setConfirmPasswordShown] = useState(false);
  const [answer, setAnswer] = useState('');
  const [codeSubmitted, setCodeSubmitted] = useState(false);
  const [enterNumber, setEnterNumber] = useState(true);
  const [changePassword, setChangePassword] = useState(false);

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

  const onSubmitCode = async (data: any) => {
    getSecurityQuestions(onlyNumbers(getValues('username')), getValues('code'))
      .then((response) => {
        if (response && response.code === 'ERR_BAD_REQUEST') {
          toast.error(response.response.data.details);
        } else if (response && response.security_questions.length > 0) {
          setCodeSubmitted(true);
          setIsCodeSent(false);
          setQuestion(response.security_questions[0].question);
        } else {
          setQuestion('null');
          setIsCodeSent(false);
          setChangePassword(true);
        }
      })
      .catch((error: any) => {
        toast(error);
      });
  };

  const confirmAnswer = async (data: any) => {
    data.username = onlyNumbers(getValues('username'));
    if (question === 'null') {
      data.security_question = null;
    } else {
      data.security_question.question = question;
    }
    checkAnswer(data).then((response) => {
      if (response && response.code === 'ERR_BAD_REQUEST') {
        toast.error(response.response.data.details);
      } else {
        setChangePassword(true);
        setCodeSubmitted(false);
      }
    });
  };

  const onSubmitRecover = async (data: any) => {
    if (changePassword) {
      data.username = onlyNumbers(getValues('username'));
      if (question === 'null') {
        data.security_question = null;
      } else {
        data.security_question.question = question;
      }
      postResetPassword(data)
        .then((response: any) => {
          if (response && response.code === 'ERR_BAD_REQUEST') {
            toast.error(response.response.data.details);
          } else {
            toast.success('Password Recovered Successfuly');
            navigate('/login');
          }
        })
        .catch((error: any) => {
          toast('error', error);
        });
    } else {
      sendCode();
      setChangePassword(false);
      setEnterNumber(true);
    }
  };
  const sendCode = () => {
    setIsLoading(true);
    setIsDisabled(true);
    resetPassword(onlyNumbers(getValues('username')))
      .then((response: any) => {
        if (response.code === 'ERR_BAD_REQUEST') {
          toast(response.response.data.details);
          setIsLoading(false);
          setIsDisabled(false);
        } else {
          setEnterNumber(false);
          setIsCodeSent(true);
          toast.success('Verification Code sent');
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
  return (
    <Layout defaultHeader={true} hamburger={false}>
      <div className="Auth-wrap">
        {enterNumber && (
          <form onSubmit={handleSubmit(sendCode)} className="Auth-form">
            <h2 className="Auth-title" style={{ color: 'black' }}>
              Reset Password
            </h2>
            <CountryCode
              disabled={isCodeSent}
              errors={errors.username}
              control={control}
              fieldName="username"
            />
            <Button
              onClick={isCodeSent ? sendCode : handleSubmit(sendCode)}
              loading={isLoading}
              disabled={isDisabled}
              className="Pref-btn btn"
            >
              {isCodeSent ? 'Resend Code' : 'Send Code'}
            </Button>
          </form>
        )}

        {isCodeSent && (
          <>
            <div className="Verification-wrap">
              <form
                onSubmit={handleSubmit(onSubmitCode)}
                className="Verification-form"
              >
                <h2 className="Auth-title" style={{ color: 'black' }}>
                  Verification Code
                </h2>
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
                  render={({
                    field: { onChange, onBlur, value, name, ref },
                  }) => (
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
                  onClick={handleSubmit(onSubmitCode)}
                  className="Pref-btn btn"
                  loading={isVerifying}
                >
                  Verify
                </Button>
              </form>
              <Button
                onClick={sendCode}
                className="Pref-btn btn"
                loading={isLoading}
              >
                Resend OTP
              </Button>
            </div>
          </>
        )}
        {codeSubmitted && question && (
          <>
            <div
              className="Auth-wrap"
              style={{ justifyContent: 'start', width: '100%' }}
            >
              <h2 className="Auth-title" style={{ color: 'black' }}>
                Security Question
              </h2>
              <input
                id="security_question.question"
                {...register('security_question.question')}
                type="text"
                className="app-Input"
                placeholder="Question"
                value={question}
                disabled={true}
              />
              <div className="input-element-wrapper">
                <InputField
                  id="security_question.answer"
                  {...register('security_question.answer', {
                    required: 'Answer is required',
                  })}
                  type="text"
                  className="app-Input"
                  placeholder="Answer"
                  onChange={(event: any) => setAnswer(event.target.value)}
                />
              </div>
              <div className="action">
                <Button
                  onClick={handleSubmit(confirmAnswer)}
                  className="Pref-btn btn"
                >
                  Submit
                </Button>
              </div>
            </div>
          </>
        )}

        {changePassword && (
          <>
            <div
              className="Auth-wrap"
              style={{ justifyContent: 'start', width: '100%' }}
            >
              <h2 className="Auth-title" style={{ color: 'black' }}>
                Enter New Password
              </h2>

              <Tooltip
                color="orange"
                placement="bottomLeft"
                title={errors.code?.message}
                visible={errors.code ? true : false}
              ></Tooltip>
              <div className="input-element-wrapper-password">
                <Tooltip
                  color="orange"
                  placement="bottomLeft"
                  title={errors.new_password?.message}
                  visible={errors.new_password ? true : false}
                >
                  <input
                    id="new_password"
                    placeholder="Enter new password here"
                    type={passwordShown ? 'text' : 'password'}
                    className="app-Input"
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
                <button className="btn" onClick={togglePassword} type="button">
                  <AiOutlineEye />
                </button>
              </div>
              <div className="input-element-wrapper-password">
                <Tooltip
                  color="orange"
                  placement="bottomLeft"
                  title={errors.confirmPassword?.message}
                  visible={errors.confirmPassword ? true : false}
                >
                  <input
                    id="confirmPassword"
                    placeholder="Confirm password here"
                    type={confirmPasswordShown ? 'text' : 'password'}
                    className="app-Input"
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
                  className="btn"
                  onClick={toggleConfirmPassword}
                  type="button"
                >
                  <AiOutlineEye />
                </button>
              </div>
              <div className="action">
                <Button
                  onClick={handleSubmit(onSubmitRecover)}
                  className="Pref-btn btn"
                >
                  Reset Password
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
