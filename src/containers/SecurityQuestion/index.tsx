import React, { useState, useEffect, useContext } from 'react';
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
import { DownOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { convertLegacyProps } from 'antd/lib/button/button';
import AuthContext, {AuthContextData} from '../../contexts/AuthContext';

const { Option } = Select;

const SecurityQuestions = () => {
  const [loading, setLoading] = useState(false);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [saveMsg, setSaveMsg] = useState<boolean>(true)
  const navigate = useNavigate();
  const authContext = useContext<AuthContextData | undefined>(AuthContext); 
  const [error, setError] = useState<any>();

  const onChange = (option: any) => {
    setQuestion(option);
  };
  const scrollListener = (x:any) => {
    if(x.matches){
      document.querySelectorAll<HTMLElement>('.Layout')[0].style.height = '80vh'
      document.querySelectorAll<HTMLElement>('.Layout')[0].style.minHeight = '80vh'
    }
  }
  useEffect(() => {
    window.scrollTo(0,0)
    const x = window.matchMedia("(max-width: 900px)")
    scrollListener(x)
    window.addEventListener('scroll', scrollListener)
    window.addEventListener('beforeunload', ()=> {
      document.querySelectorAll<HTMLElement>('.Layout')[0].style.height = 'auto'
      document.querySelectorAll<HTMLElement>('.Layout')[0].style.minHeight = '100vh'
    })
    // const userId = localStorage.getItem('userId');
    const userId=authContext?.user ? authContext?.user : localStorage.getItem('userId');
    if (!userId) {
      navigate('/signup');
    }
  }, []);
  useEffect(() => {
    if(error) throw(error)
  }, [error]);
  const handleSave = async () => {
    //const userId = localStorage.getItem('userId');
    // const userId = localStorage.getItem('userId');
    const userId=authContext?.user ? authContext?.user : localStorage.getItem('userId');
    const securityQuestion = [{ question: question, answer: answer }];
    setLoading(true);
    if (userId) {
      putSignUp({ security_questions: securityQuestion }, userId)
        .then(async (response: any) => {
          if (response.data.id) {
             toast.success('Security Question saved successfully');
            setLoading(false)
            navigate('/');
          }
        })
        .catch((error) => {
          setLoading(false);
          setError({code: error.response.status, message: error.response.data.details})
        });
    }
  };

  return (
    <Layout defaultHeader={true} hamburger={false}>
      <div className={styles['Security-wrap']}>
        <h2 id='header' className={styles['Con-title']}>
          Security question <Spin spinning={loading} />
        </h2>
        <div className={styles['Switch-wrap']} style={{overflow: 'hidden'}}>
        <p className={styles['Con-Description']}>
          Please help us protect your account. Select a security question and
          input answer. You can use this to get back access to your account.
        </p>
          <div className="Select-Wrap">
            <Select
              placeholder="Select a question"
              optionFilterProp="children"
              onChange={onChange}
            >
              {securityQuestions.map((item) => (
                <Option key={item.id} value={item.text} style={{color: v['primary-color1']}}>
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


        <div className={styles['Security-Btn']}>
          <Button
            loading={loading}
            onClick={handleSave}
            disabled={loading || !question || !answer}
            className="Submit-Button"
          >
            Save
          </Button>

          {/* { saveMsg ? (
              <div className={styles['dlt-msg']}>&nbsp;&nbsp;&nbsp;<InfoCircleOutlined/> Security question saved succesfully</div>
            ) : ''} */}
        </div>
        </div>

      </div>
    </Layout>
  );
};

export default SecurityQuestions;
