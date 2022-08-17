import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import {
  postResetPassword,
  requestPhoneOTP,
  resetPassword,
} from '../../../services/authservice';
import { toast } from 'react-toastify';
import Button from '../../../components/Button';
import { signUpService } from '../../../services/authservice';
import { AiOutlineEye } from 'react-icons/ai';
import Layout from '../../../layouts/Layout/Layout';
import { Input, Select, Tooltip } from 'antd';
import './index.scss';
import InputField from '../../../components/Input';
import CountryCode from '../Country/CountryCode';
import { onlyNumbers } from '../../../utils/lib';
import { securityQuestions } from '../../../constants';
const { Option } = Select;
type IFormInputs = {
  username: string;
};
type IRecoverFormInputs = {
  username: string;
  code: string;
  new_password: string;
  security_question: ISecurityQuestion;
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

  const [answer, setAnswer] = useState('');
  const onChange = (option: any) => {
    setQuestion(option);
  };
  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    control,
    formState: { errors },
  } = useForm<IFormInputs>({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    shouldFocusError: true,
    shouldUnregister: false,
  });
  const {
    register: register2,
    handleSubmit: handleSubmit2,
    control: control2,
    formState: { errors: errors2 },
  } = useForm<IRecoverFormInputs>({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    shouldFocusError: true,
    shouldUnregister: false,
  });
  const onSubmit = async (data: any) => {
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
  const onSubmitRecover = async (data: any) => {
    setIsLoading(true);
    setIsDisabled(true);
    data.username = onlyNumbers(getValues('username'));
    data.security_question.question = question;
    data.security_question.answer;
    postResetPassword(data)
      .then((response: any) => {
        toast.success('Password Recovered Successfuly');
        navigate('/login');
      })
      .catch((error: any) => {
        toast('Unknown error');
      });
  };
  //ToDo: Improve the code quality
  return (
    <Layout defaultHeader={false} hamburger={false}>
      <div className="Auth-wrap">
        {isCodeSent ? (
          <form onSubmit={handleSubmit2(onSubmitRecover)} className="Auth-form">
            <h2 className="Auth-title">Reset Password</h2>
            <CountryCode
              disabled={true}
              errors={errors2.username}
              control={control}
              fieldName="username"
            />
            <Tooltip
              color="orange"
              placement="bottomLeft"
              title={errors2.code?.message}
              visible={errors2.code ? true : false}
            >
              <InputField
                id="code"
                {...register2('code', {
                  required: 'Code is required',
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
                title={errors2.new_password?.message}
                visible={errors2.new_password ? true : false}
              >
                <input
                  id="new_password"
                  placeholder="Enter password here"
                  type={passwordShown ? 'text' : 'password'}
                  className="app-Input"
                  {...register2('new_password', {
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
            {resetResponse && (
              <>
                <div
                  className="Select-Wrap input-element-wrapper"
                  style={{ marginBottom: '14px' }}
                >
                  <Select
                    {...register2('security_question.question', {
                      // required: 'Question is required',
                    })}
                    id="security_question.question"
                    placeholder="Select a question"
                    optionFilterProp="children"
                    onChange={onChange}
                  >
                    {securityQuestions.map((item) => (
                      <Option key={item.id} value={item.text}>
                        {item.text}
                      </Option>
                    ))}
                  </Select>
                </div>

                <div className="input-element-wrapper">
                  <InputField
                    id="security_question.answer"
                    {...register2('security_question.answer', {
                      //required: 'Answer is required',
                    })}
                    type="text"
                    className="app-Input"
                    placeholder="Answer"
                    onChange={(event: any) => setAnswer(event.target.value)}
                  />
                </div>
              </>
            )}
            <Button
              onClick={handleSubmit2(onSubmitRecover)}
              //loading={isLoading}
              //disabled={isDisabled}
              className="Auth-submit"
              style={{ color: 'white' }}
            >
              Recover Password
            </Button>
            <Button
              onClick={handleSubmit(onSubmit)}
              loading={isLoading}
              disabled={isDisabled}
              className="Auth-submit"
              style={{ color: 'white' }}
            >
              Resend Code
            </Button>
          </form>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="Auth-form">
            <h2 className="Auth-title">Reset Password</h2>
            <CountryCode
              errors={errors.username}
              control={control}
              fieldName="username"
            />

            <Button
              onClick={handleSubmit(onSubmit)}
              loading={isLoading}
              disabled={isDisabled}
              className="Auth-submit"
              style={{ color: 'white' }}
            >
              Send Verification Code
            </Button>
          </form>
        )}
        <div className="Auth-terms-signup">
          <Link to="/login">Already have an account?</Link>
        </div>
      </div>
    </Layout>
  );
};

export default ResetPassword;
