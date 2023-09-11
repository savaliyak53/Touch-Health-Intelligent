import React, { useState, useEffect, useContext } from 'react';
import Layout from 'layouts/Layout';
import { Spin } from 'antd';
import styles from './SecurityQuestion.module.scss';
import Button from 'components/Button';
import { putSignUp } from 'services/authservice';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import AuthContext, { AuthContextData } from 'contexts/AuthContext';
import TouchDropdown from 'components/TouchDropdown';
import { securityQuestions as dropDownOptions} from '../../constants';
import TouchInput from 'components/TouchInput';

const SecurityQuestions = () => {
  const [loading, setLoading] = useState(false);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const navigate = useNavigate();
  const authContext = useContext<AuthContextData | undefined>(AuthContext);
  const [error, setError] = useState<any>();

  const onChange = (value: string) => {
    setQuestion(value);
  };
  const scrollListener = (x: any) => {
    if (x.matches) {
      const layoutElement = document.querySelectorAll<HTMLElement>('.Layout')[0];
      if (layoutElement) {
        layoutElement.style.height = '80vh';
        layoutElement.style.minHeight ='80vh';
      }
    }
  };
  useEffect(() => {
    window.scrollTo(0, 0);
    const x = window.matchMedia('(max-width: 900px)');
    scrollListener(x);
    window.addEventListener('scroll', scrollListener);
    window.addEventListener('beforeunload', () => {
      const layoutElement = document.querySelectorAll<HTMLElement>('.Layout')[0];
      if (layoutElement) {
        layoutElement.style.height = 'auto';
        layoutElement.style.minHeight ='100vh';
      }
    });
    const userId = authContext?.user
      ? authContext?.user
      : localStorage.getItem('userId');
    if (!userId) {
      navigate('/signup');
    }
  }, []);
  useEffect(() => {
    if (error) throw error;
  }, [error]);
  const handleSave = async () => {
    const userId = authContext?.user
      ? authContext?.user
      : localStorage.getItem('userId');
    const securityQuestion = [{ question: question, answer: answer }];
    setLoading(true);
    if (userId) {
      putSignUp({ security_questions: securityQuestion }, userId)
        .then(async (response: any) => {
          if (response.data.id) {
            toast.success('Security Question saved successfully');
            setLoading(false);
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
    <Layout defaultHeader={true} hamburger={false} title={'Security Question'}>
      <div className={`mt-5 ${styles['Security-wrap']}`}>
        <Spin spinning={loading} />
        <div className={styles['Switch-wrap']}>
          <p className='text-base font-normal leading-7 text-center mb-5'>
            Please help us protect your account. Select a security question and
            input answer. You can use this to get back access to your account.
          </p>
          <TouchDropdown
            options={dropDownOptions}
            value={question}
            onClick={onChange}
            placeholder="Select a question"/>
          <TouchInput
            type='text'
            placeholder="Answer"
            onChange={(e) => setAnswer(e.target.value)}
            value={answer} />
          <div className={styles['Security-Btn']}>
            <Button
              loading={loading}
              onClick={handleSave}
              disabled={loading || !question || !answer}
              className="Submit-Button"
            >
              Save
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SecurityQuestions;
