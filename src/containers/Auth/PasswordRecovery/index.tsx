import React, { useEffect, useRef, useState } from 'react';
import AuthLayout from 'layouts/AuthLayout';
import NumberEnterStep from 'containers/Auth/PasswordRecovery/NumberEnterStep';
import CodeEnterStep from 'containers/Auth/PasswordRecovery/CodeEnterStep';
import QuestionEnterStep from 'containers/Auth/PasswordRecovery/QuestionEnterStep';
import NewPasswordEnterStep from 'containers/Auth/PasswordRecovery/NewPasswordEnterStep';
import { useNavigate } from 'react-router-dom';
import { checkAnswer, getSecurityQuestions, postResetPassword, requestPhoneOTP } from 'services/authservice';
import { onlyNumbers } from 'utils/lib';
import { toast } from 'react-toastify';
import ReCAPTCHA from 'react-google-recaptcha';

const PasswordRecovery: React.FC = () => {
  const navigate = useNavigate();

  const [isDisabled, setIsDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [disableSubmit, setDisableSubmit] = useState(true);

  const [isCodeSent, setIsCodeSent] = useState(false);
  const [codeSubmitted, setCodeSubmitted] = useState(false);
  const [enterNumber, setEnterNumber] = useState(true);
  const [changePassword, setChangePassword] = useState(false);
  const [wrongAnswer, setWrongAnswer] = useState(false);

  const [username, setUsername] = useState<string>('');
  const [code, setCode] = useState<string>('');
  const [question, setQuestion] = useState<string>('');
  const [answer, setAnswer] = useState<string>('');

  const refCaptcha = useRef<ReCAPTCHA>(null);

  const handleBeforeUnload = (event: BeforeUnloadEvent) => {
    if (!changePassword) {
      event.preventDefault();
      event.returnValue = '';
    }
  };

  useEffect(() => {
    setUsername(sessionStorage.getItem('username') || '');
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  const onSubmitCode = async () => {
    setIsLoading(true);
    getSecurityQuestions(onlyNumbers(username), code)
      .then((response) => {
        if (response && response.security_questions.length > 0) {
          setCodeSubmitted(true);
          setIsCodeSent(false);
          setQuestion(response.security_questions[0].question);
        } else {
          setQuestion('');
          setIsCodeSent(false);
          setChangePassword(true);
        }
      })
      .catch((error: any) => {
        toast.error(error.response.data.details || 'Error');
      }).finally(() => setIsLoading(false));
  };

  const confirmAnswer = async () => {
    setIsLoading(true);
    checkAnswer({
      username: onlyNumbers(username),
      code: code,
      security_question: {
        question: question,
        answer: answer,
      },
    })
      .then((response) => {
        if (response) {
          setChangePassword(true);
          setCodeSubmitted(false);
        }
      })
      .catch((err) => {
        if ('Wrong answer to security question' === err.response.data.details ) {
          setWrongAnswer(true);
        }
        toast.error(err.response.data.details || 'Error');
      }).finally(() => setIsLoading(false));
  };

  const onSubmitRecover = async (password: string) => {
    if (changePassword) {
      setIsLoading(true);
      postResetPassword({
        username: onlyNumbers(username),
        code: code,
        new_password: password,
        security_question: {
          question: question,
          answer: answer,
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
        }).finally(() =>  setIsLoading(false));
    } else {
      setChangePassword(false);
      setEnterNumber(true);
    }
  };

  const handleOTPRequest = (isResendOTP = false): void => {
    setIsDisabled(true);
    setIsLoading(true);
    const token = isResendOTP
      ? localStorage.getItem('recaptcha-token')
      : refCaptcha?.current?.getValue();

    if (!onlyNumbers(username)) {
      setIsDisabled(false);
      setIsLoading(false);
      return;
    }
    if (!isResendOTP) {
      sessionStorage.setItem('username', username);
    }

    requestPhoneOTP(onlyNumbers(username), token || '')
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
            toast.error(res.response.data.details || 'Error');
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
        refCaptcha?.current?.reset();
      });
  };

  return (
    <AuthLayout>
      <div className='w-full'>
        <div className='rounded-[5px] bg-white shadow-primaryTop w-full px-[16px] pt-[52px] pb-[84px]'>
          {/*first step*/}
          {enterNumber && (
            <NumberEnterStep
              onVerify={handleOTPRequest}
              setIsDisabled={setIsDisabled}
              isDisabled={isDisabled}
              isLoading={isLoading}
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
              isLoading={isLoading}
              setDisableSubmit={setDisableSubmit}
              handleOTPRequest={handleOTPRequest}
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
              isLoading={isLoading}
              setAnswer={setAnswer}
              setWrongAnswer={setWrongAnswer}
              wrongAnswer={wrongAnswer}
            />
          )}
          {/*fourth step*/}
          {changePassword && (
            <NewPasswordEnterStep onSubmitRecover={onSubmitRecover} isLoading={isLoading}/>
          )}
        </div>
      </div>
    </AuthLayout>
  );
};

export default PasswordRecovery;
