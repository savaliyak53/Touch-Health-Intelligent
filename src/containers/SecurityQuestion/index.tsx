import React, { useState, useEffect } from 'react';
import Layout from '../../layouts/Layout/Layout';
import { Input, Select, Spin } from 'antd';
import v from "../../variables.module.scss"
import styles from './SecurityQuestion.module.scss';
import Button from '../../components/Button';
import InputField from '../../components/Input';
import { securityQuestions } from '../../constants';
import { putSignUp, requestPhoneOTP } from '../../services/authservice';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { DownOutlined } from '@ant-design/icons';

const { Option } = Select;

const SecurityQuestions = () => {
  const [loading, setLoading] = useState(false);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const navigate = useNavigate();

  const onChange = (option: any) => {
    setQuestion(option);
  };
  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      navigate('/signup');
    }
  }, []);
  const sendPhoneOTP = async (phone: any) => {
    //api call to send phone otp
    const captchaToken = localStorage.getItem('captchaToken');
    if (captchaToken) {
      const phoneRequestResponse = await requestPhoneOTP(phone, captchaToken);
      if (phoneRequestResponse?.response?.data) {
        toast.error(phoneRequestResponse?.response?.data.details);
        return false;
      } else {
        toast.success('Phone verification code sent');
        return true;
      }
    }
  };
  const handleSave = async () => {
    //const userId = localStorage.getItem('userId');
    const userId = localStorage.getItem('userId');
    const securityQuestion = [{ question: question, answer: answer }];
    setLoading(true);
    if (userId) {
      putSignUp({ security_questions: securityQuestion }, userId)
        .then(async (response) => {
          if (response?.id) {
            toast.success('Security Question saved successfully');
            //const userId = localStorage.getItem('userId');
            const phone = localStorage.getItem('phone');

            if (phone) {
              const isOtpSent = await sendPhoneOTP(phone);
              if (isOtpSent) {
                navigate(`/verification-code`);
              } else {
                setLoading(false);
                toast.error(
                  'Phone number can not be processed. Try another phone number.'
                );
              }
            }
          }
        })
        .catch((error) => {
          setLoading(false);
          toast.error('Something went wrong while saving the Question');
        });
    }
  };

  return (
    <Layout defaultHeader={true} hamburger={false}>
      <div className="Content-wrap Con">
        <h2 className={styles['Con-title']}>
          Security Question <Spin spinning={loading} />
        </h2>
        <p className={styles['Con-Description']}>
          Please help us protect your account. Select a security question and
          input answer. You can use this to get back access to your account.
        </p>

        <div className={styles['Switch-wrap']}>
          <div className="Select-Wrap">
            <Select
              placeholder="Select a question"
              optionFilterProp="children"
              onChange={onChange}
            >
              {securityQuestions.map((item) => (
                <Option key={item.id} value={item.text} style={{color: v['primary-color2']}}>
                  {item.text}
                </Option>
              ))}
            </Select>
            <DownOutlined />
          </div>
          <div
            className={styles['input-element-wrapper']}
            style={{ marginTop: '10px' }}
          >
            <InputField
              placeholder="Answer"
              onChange={(event: {
                target: { value: React.SetStateAction<string> };
              }) => setAnswer(event.target.value)}
              className={` ${styles['app-Input']} ${styles['security-answer']} `}
            />
          </div>
        </div>

        <div className="action">
          <Button
            loading={loading}
            onClick={handleSave}
            disabled={loading || !question || !answer}
            className="Pref-btn btn"
          >
            Save
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default SecurityQuestions;
