import React, { useState } from 'react';
import Layout from '../../layouts/Layout/Layout';
import { Input, Select, Spin } from 'antd';
import './index.scss';
import Button from '../../components/Button';
import { securityQuestions } from '../../constants';
import {
  getInteractionService,
  getUser,
  preferencesService,
} from '../../services/authservice';
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

  const handleSave = () => {
    const userId = localStorage.getItem('userId');
    const securityQuestion = [{ question: question, answer: answer }];
    setLoading(true);
    preferencesService({ security_questions: securityQuestion }, userId)
      .then((response) => {
        toast.success('Security Question saved successfully');
        // getUserInfo(userId);
        navigate('/introvideo');
      })
      .catch((error) => {
        setLoading(false);
        toast.error('Something went wrong while saving the Question');
      });
  };

  return (
    <Layout defaultHeader={true} hamburger={false}>
      <div className="Content-wrap Con">
        <h2 className="Con-title">
          Security Question <Spin spinning={loading} />
        </h2>
        <p className="Con-Description">
          Please help us protect your account. Select a security and input
          answer. You can use this to get back access to your account.
        </p>

        <div className="Switch-wrap">
          <h3 className="Title">Question</h3>
          <div className="Select-Wrap">
            <Select
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
            <DownOutlined />
          </div>
          <div className="Input-Wrap">
            <Input
              placeholder="Answer"
              onChange={(event) => setAnswer(event.target.value)}
            />
          </div>
        </div>

        <div className="action">
          <Button
            loading={loading}
            onClick={handleSave}
            disabled={loading || !question || !answer}
            className="btn"
          >
            Save
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default SecurityQuestions;
