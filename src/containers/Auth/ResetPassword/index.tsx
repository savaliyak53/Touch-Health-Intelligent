import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import {
  postResetPassword,
  requestPhoneOTP,
} from '../../../services/authservice';
import { toast } from 'react-toastify';
import Button from '../../../components/Button';
import { AiOutlineEye } from 'react-icons/ai';
import Layout from '../../../layouts/Layout/Layout';
import { Tooltip } from 'antd';
import './index.scss';
import '../index.scss';
import InputField from '../../../components/Input';
import CountryCode from '../Country/CountryCode';
import { onlyNumbers } from '../../../utils/lib';
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
const ResetPassword = () => {
  const navigate = useNavigate();
  const [passwordShown, setPasswordShown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [question, setQuestion] = useState('');
  const [resetResponse, setResetResponse] = useState<any>();
  const [confirmPasswordShown, setConfirmPasswordShown] = useState(false);
  const [answer, setAnswer] = useState('');
  const onChange = (option: any) => {
    setQuestion(option);
  };
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
  const onSubmitRecover = async (data: any) => {
    // data.username = onlyNumbers(getValues('username'));
    // if (question && question.length > 0) {
    //   data.security_question.question = question;
    //   data.security_question.answer;
    // } else {
    //   data.security_question = undefined;
    // }
    // data.security_question.question = question;
    // data.security_question.answer;
    // postResetPassword(data)
    //   .then((response: any) => {
    //     if (response && response.code === 'ERR_BAD_REQUEST') {
    //       toast.error(response.response.data.details);
    //     } else {
    toast.success('Password recovered successfuly');
    navigate('/login');
    //   }
    // })
    // .catch((error: any) => {
    //   toast('Unknown error');
    // });
  };
  const sendCode = () => {
    setIsLoading(true);
    setIsDisabled(true);
    const captchaToken= localStorage.getItem('captchaToken');
    if(captchaToken){
      requestPhoneOTP(onlyNumbers(getValues('username')),captchaToken)
      .then((response: any) => {
        if (response && response.security_questions) {
          setIsCodeSent(true);
          setResetResponse(response);
          setQuestion(response.security_questions[0].question);
          toast.success('Verification code sent');
          setIsLoading(false);
          setIsDisabled(false);
          navigate('/reset-verification-code');
        } else if (response.code === 'ERR_BAD_REQUEST') {
          toast(response.response.data.details);
          setIsLoading(false);
          setIsDisabled(false);
        }
      })
      .catch((error: any) => {
        toast('unknown error');
        setIsLoading(false);
        setIsDisabled(false);
      });
    }
    
  };
  return (
    <Layout defaultHeader={false} hamburger={false}>
      <div className="Auth-wrap">
        <form onSubmit={handleSubmit(onSubmitRecover)} className="Auth-form">
          <h2 className="Auth-title">Reset password</h2>

          <>
            <div className="input-element-wrapper-password">
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
                open={errors.confirmPassword ? true : false}
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

            <Button
              onClick={handleSubmit(onSubmitRecover)}
              className="Auth-submit"
              style={{ color: 'white' }}
            >
              Reset password
            </Button>
          </>
        </form>
        <div className='Links-wrap'>
          <div className="Auth-terms-signup">
          For customer support, please follow this <a href="https://www.touchmedical.ca/customer-care">link</a>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ResetPassword;
