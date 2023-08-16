import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  postResetPassword,
  requestPhoneOTP,
} from '../../../../services/authservice';
import { toast } from 'react-toastify';
import styles from '../../Login/Login.module.scss';
import { onlyNumbers } from '../../../../utils/lib';
import {
  checkAnswer,
  getSecurityQuestions,
} from '../../../../services/authservice';
import NumberEnterStep from './NumberEnterStep';
import CodeEnterStep from './CodeEnterStep';
import QuestionEnterStep from './QuestionEnterStep';
import NewPasswordEnterStep from './NewPasswordEnterStep';

const PasswordRecovery: React.FC = () => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [disableSubmit, setDisableSubmit] = useState(true);

  const [isCodeSent, setIsCodeSent] = useState(false);
  const [codeSubmitted, setCodeSubmitted] = useState(false);
  const [enterNumber, setEnterNumber] = useState(true);
  const [changePassword, setChangePassword] = useState(false);

  const [username, setUsername] = useState<string | undefined>('');
  const [code, setCode] = useState<string | undefined>('');
  const [question, setQuestion] = useState<string>('');
  const [answer, setAnswer] = useState<string>('');

  const refCaptcha = useRef<any>(null);

  const handleBeforeUnload = (event: BeforeUnloadEvent) => {
    if (!changePassword) {
      event.preventDefault();
      event.returnValue = '';
    }
  };

  useEffect(() => {
    setUsername(sessionStorage.getItem('username') || '');
    setCode(sessionStorage.getItem('code') || '');
    setQuestion(sessionStorage.getItem('answer') || '');
    setAnswer(sessionStorage.getItem('question') || '');
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  const onSubmitCode = async () => {
    getSecurityQuestions(username || '', code || '')
      .then((response) => {
        if (response && response.security_questions.length > 0) {
          setCodeSubmitted(true);
          setIsCodeSent(false);
          setQuestion(response.security_questions[0].question);
          sessionStorage.setItem('code', code || '');
          sessionStorage.setItem(
            'question',
            response.security_questions[0].question || ''
          );
        } else {
          setQuestion('');
          setIsCodeSent(false);
          setChangePassword(true);
        }
      })
      .catch((error: any) => {
        toast.error(error.response.data.details || 'Error');
      });
  };

  const confirmAnswer = async () => {
    checkAnswer({
      username,
      code,
      security_question: {
        question,
        answer,
      },
    })
      .then((response) => {
        if (response) {
          setChangePassword(true);
          setCodeSubmitted(false);
          sessionStorage.setItem('answer', answer || '');
        }
      })
      .catch((err) => {
        toast.error(err.response.data.details || 'Error');
      });
  };

  const onSubmitRecover = async (password: string) => {
    if (changePassword) {
      postResetPassword({
        username,
        code,
        new_password: password,
        security_question: {
          question,
          answer,
        },
      })
        .then((response: any) => {
          if (response) {
            toast.success('Password Recovered Successfuly');
            sessionStorage.clear();
            navigate('/login');
          }
        })
        .catch((error: any) => {
          toast.error(error.response.data.details || 'Error');
        });
    } else {
      setChangePassword(false);
      setEnterNumber(true);
    }
  };

  const handleOTPRequest = (isResendOTP = false): void => {
    setIsLoading(true);
    setIsDisabled(true);
    const token = isResendOTP
      ? sessionStorage.getItem('recaptcha-token')
      : refCaptcha?.current?.getValue();
    if (!onlyNumbers(username || '')) {
      setIsLoading(false);
      setIsDisabled(false);
      return;
    }
    if (!isResendOTP) {
      sessionStorage.setItem('username', username || '');
    }
    requestPhoneOTP(onlyNumbers(username || ''), token)
      .then((res: any) => {
        if (res && res.status === 200) {
          setEnterNumber(false);
          setIsCodeSent(true);
        } else {
          if (
            res &&
            res.response &&
            res.response.data &&
            res.response.data.title
          ) {
            toast.error(res.response.data.title || 'Error');
          } else {
            toast.error('Something whent wrong, try later.');
          }
        }
      })
      .catch((error) => {
        toast.error(error?.response?.data?.details || 'Error');
      })
      .finally(() => {
        setIsLoading(false);
        refCaptcha.current.reset();
      });
  };

  return (
    <div className={styles.Login}>
      <div className={styles.FormWrap}>
        {/*first step*/}
        {enterNumber && (
          <NumberEnterStep
            onVerify={handleOTPRequest}
            setIsDisabled={setIsDisabled}
            isLoading={isLoading}
            isDisabled={isDisabled}
            refCaptcha={refCaptcha}
            onChange={setUsername}
            username={username}
          />
        )}

        {/*second step*/}
        {isCodeSent && (
          <CodeEnterStep
            code={code}
            setCode={setCode}
            onSubmitCode={onSubmitCode}
            setDisableSubmit={setDisableSubmit}
            handleOTPRequest={handleOTPRequest}
            isLoading={isLoading}
            disableSubmit={disableSubmit}
            refCaptcha={refCaptcha}
          />
        )}
        {/*third step*/}
        {codeSubmitted && question && (
          <QuestionEnterStep
            confirmAnswer={confirmAnswer}
            question={question}
            answer={answer}
            setAnswer={setAnswer}
          />
        )}
        {/*fourth step*/}
        {changePassword && (
          <NewPasswordEnterStep onSubmitRecover={onSubmitRecover} />
        )}
      </div>
    </div>
  );
};

export default PasswordRecovery;
