import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import {
  postResetPassword,
  resetPassword,
} from '../../../services/authservice';
import { toast } from 'react-toastify';
import Button from '../../../components/Button';
import { AiOutlineEye } from 'react-icons/ai';
import Layout from '../../../layouts/Layout/Layout';
import { Select, Tooltip } from 'antd';
import './index.scss';
import '../index.scss';
import InputField from '../../../components/Input';
import CountryCode from '../Country/CountryCode';
import { onlyNumbers } from '../../../utils/lib';
import { securityQuestions } from '../../../constants';
import { DownOutlined } from '@ant-design/icons';
const { Option } = Select;
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
    if (isCodeSent) {
      data.username = onlyNumbers(getValues('username'));
      if (question && question.length > 0) {
        data.security_question.question = question;
        data.security_question.answer;
      } else {
        data.security_question = undefined;
      }
      data.security_question.question = question;
      data.security_question.answer;
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
          toast('Unknown error');
        });
    } else {
      sendCode();
    }
  };
  const sendCode = () => {
    setIsLoading(true);
    setIsDisabled(true);
    resetPassword(onlyNumbers(getValues('username')))
      .then((response: any) => {
        setIsCodeSent(true);
        setResetResponse(response);
        toast.success('Verification Code sent');
        setIsLoading(false);
        setIsDisabled(false);
      })
      .catch((error: any) => {
        toast('Unknown error');
      });
  };
  return (
    <Layout defaultHeader={false} hamburger={false}>
      <div className="Auth-wrap">
        <form onSubmit={handleSubmit(onSubmitRecover)} className="Auth-form">
          <h2 className="Auth-title">Reset Password</h2>
          <CountryCode
            disabled={isCodeSent}
            errors={errors.username}
            control={control}
            fieldName="username"
          />
          {isCodeSent && (
            <>
              {' '}
              <Tooltip
                color="orange"
                placement="bottomLeft"
                title={errors.code?.message}
                visible={errors.code ? true : false}
              >
                <InputField
                  id="code"
                  {...register('code', {
                    required: 'Code is required',
                    maxLength: {
                      value: 6,
                      message:
                        'Verification code should not be greater than 6 digits.',
                    },
                  })}
                  placeholder="Verification Code"
                  type="number"
                  className="app-Input"
                />
              </Tooltip>
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
              <div
                className="Select-Wrap input-element-wrapper"
                style={{ marginBottom: '14px' }}
              >
                <Select
                  {...register('security_question.question', {
                    // required: 'Question is required',
                  })}
                  id="security_question.question"
                  placeholder="Select a question"
                  optionFilterProp="children"
                  onChange={onChange}
                >
                  {securityQuestions.map((item: any) => (
                    <Option key={item.id} value={item.text}>
                      {item.text}
                    </Option>
                  ))}
                </Select>
                <DownOutlined />
              </div>
              <div className="input-element-wrapper">
                <InputField
                  id="security_question.answer"
                  {...register('security_question.answer', {
                    //required: 'Answer is required',
                  })}
                  type="text"
                  className="app-Input"
                  placeholder="Answer"
                  onChange={(event: any) => setAnswer(event.target.value)}
                />
              </div>
              <Button
                onClick={handleSubmit(onSubmitRecover)}
                className="Auth-submit"
                style={{ color: 'white' }}
              >
                Reset Password
              </Button>
            </>
          )}
          <Button
            onClick={handleSubmit(sendCode)}
            loading={isLoading}
            disabled={isDisabled}
            className="Auth-submit"
            style={{ color: 'white' }}
          >
            {isCodeSent ? 'Resend Code' : 'Send Code'}
          </Button>
        </form>

        <div className="Auth-terms-signup">
          <Link to="/login">Already have an account?</Link>
        </div>
      </div>
    </Layout>
  );
};

export default ResetPassword;
