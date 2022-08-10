import React, { useState } from 'react';
import Layout from '../../layouts/Layout/Layout';
import { Input, Select, Spin } from 'antd';
import './index.scss';
import Button from '../../components/Button';
const { Option } = Select;

const SecurityQuestions = () => {
  const [loading, setLoading] = useState(true);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const questions = [
    {
      id: '1',
      text: 'question 1',
    },
  ];

  const onChange = (option: any) => {
    console.log('options is', option);
  };

  const handleSave = () => {
    console.log('hello');
  };

  return (
    <Layout defaultHeader={true} hamburger={true}>
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
              {questions.map((item) => (
                <Option key={item.id} value={item.text}>
                  {item.text}
                </Option>
              ))}
            </Select>
            {/* <RightOutlined /> */}
          </div>
          <div className="Input-Wrap">
            <Input
              placeholder="Answer"
              onChange={(event) => setAnswer(event.target.value)}
            />
          </div>
        </div>

        <div className="action">
          <Button onClick={handleSave} className="btn">
            Save
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default SecurityQuestions;
