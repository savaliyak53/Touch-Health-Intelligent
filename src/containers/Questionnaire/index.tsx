import React, { useContext, useEffect, useState } from 'react';
import './index.scss';
import { useNavigate, useLocation } from 'react-router-dom';
import Button from '../../components/Button';
import { toast } from 'react-toastify';
import Question from '../../components/Question';
import {
  getInteractionService,
  getInteractionServiceByType,
  getUser,
  postInteractionService,
  preferencesService,
} from '../../services/authservice';
import { Interaction } from '../../interfaces';
import Layout from '../../layouts/Layout/Layout';
import { Skeleton } from 'antd';
import ErrorInteractionModal from '../../components/Modal/ErrorInteractionModal';
import AuthContext, { AuthContextData } from '../../contexts/AuthContext';

function UserCondition() {
  const [question, setQuestion] = useState<Interaction | any>();
  const [value, setValue] = useState<string | undefined>();
  const [items, setItems] = useState<string | undefined>();
  const [loading, setLoading] = useState<boolean>(false);
  const [refId, setRefId] = useState<string>('');
  const [skeletonLoading, setSkeletonLoading] = useState(true);
  const [isClicked, setClicked] = useState(false);
  const [disableNextButton, setDisableNextButton] = useState<boolean>(false);
  const [disableYesNoButton, setDisableYesNoButton] = useState<boolean>(false);
  const [signupStatus, setSignupStatus] = useState<string | null>();
  const [exception, setException] = useState<boolean>(false);
  const context = useContext<AuthContextData | undefined>(AuthContext);
  const [error, setError] = useState<any>();

  const navigate = useNavigate();
  const location = useLocation();
  const getInteraction = () => {
    getInteractionService()
      .then((response) => {
        setSkeletonLoading(false);
        if (response?.data?.question) {
          if (response?.data?.question.type == 'integration_page_redirect') {
            integrationPageRedirect(response.data.ref_id);
          } else {
            setQuestion(response?.data?.question);
            setRefId(response.data.ref_id);
          }
        } else if (response?.data?.type === 'done') {
          handleInteractionRedirect();
        } else {
          navigate('/dashboard');
        }
      })
      .catch((error) => {
        setError({
          code: error.response.status,
          message: error.response.data.details,
        });
        setSkeletonLoading(false);
      });
  };
  const handleInteractionRedirect = () => {
    const userId = context?.user
      ? context?.user
      : localStorage.getItem('userId');
    getUser(userId)
      .then((response: any) => {
        if (response?.data.signup_status === 'onboarding') {
          const preferenceData = {
            signup_status: 'done',
          };
          const userId = context?.user ?? localStorage.getItem('userId');
          if (userId) {
            preferencesService(preferenceData, userId)
              .then(async (preferencesResponse: any) => {
                if (preferencesResponse) {
                  navigate('/dashboard');
                } else {
                  setError({
                    code: 400,
                    message: `Preference status doesn't exist`,
                  });
                  navigate('/dashboard');
                }
              })
              .catch((error) => {
                setError({
                  code: error.response.status,
                  message: error.response.data.details,
                });
              });
          }
        } else if (response?.data.signup_status === 'done') {
          navigate('/dashboard');
        } else {
          navigate('/dashboard');
        }
      })
      .catch((error) => {
        setError({
          code: error.response.status,
          message: error.response.data.details,
        });
      });
  };
  useEffect(() => {
    window.scrollTo(0, 0);
    if (location && location.pathname === '/c/checkup') {
      handleInitiateCheckupByLink();
    } else {
      getInteraction();
    }
  }, []);

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  const handleInitiateCheckupByLink = () => {
    const userId = context?.user;

    getUser(userId)
      .then((response: any) => {
        if (response?.data.signup_status === 'done') {
          getInteractionServiceByType('checkup')
            .then((response: any) => {
              if (response) {
                getInteraction();
              } else {
                setException(true);
                navigate('/dashboard');
              }
            })
            .catch((error) => {
              setException(true);
              setError({
                code: error.response.status,
                message: error.response.data.details,
              });
            });
        } else {
          navigate('/');
        }
      })
      .catch((error) => {
        setError({
          code: error.response.status,
          message: error.response.data.details,
        });
      });
  };
  const integrationPageRedirect = (refId: string) => {
    localStorage.setItem('refId', refId);
    localStorage.setItem('redirect', 'true');
    navigate('/integrations');
  };
  const onSubmit = async (state?: string, skip?: boolean) => {
    setDisableYesNoButton(true);
    setClicked(true);
    if (
      question.type !== 'select_many' &&
      question.type !== 'multi_select' &&
      question.type !== 'yes_no' &&
      question.type !== 'slider' &&
      question.type !== 'select_one' &&
      question.type !== 'dialog_select_one' &&
      question.type !== 'image_and_text' &&
      question.type !== 'image_and_text_select_one' &&
      question.type !== 'markdown_select_one' &&
      !value
    ) {
      toast.error('Please select a value');
      return;
    }

    if (
      value !== undefined &&
      value?.length <
        Math.min(question.min_num_selections, question.options?.length)
    ) {
      toast(`Please select at least ${question.min_num_selections} options`);
      setClicked(false);
      return;
    }

    const payload = {
      type: 'question',
      ref_id: refId,
      question_response: {
        ref_id: question.ref_id,
        type: question.type,
        value: value,
      },
      reward_nugget_response: {
        shared: true,
      },
    };
    if (question.type === 'slider' && !value) {
      payload.question_response.value = '0';
    }
    if (question.type == 'yes_no') {
      payload.question_response.value = state;
    }
    if (question.type == 'dialog_select_one') {
      payload.question_response.value = state;
    }
    if (question.type == 'image_and_text_select_one') {
      payload.question_response.value = state;
    }
    if (question.type == 'markdown_select_one') {
      payload.question_response.value = state;
    }
    if (question.type == 'image_and_text') {
      payload.question_response.value = '1';
    }
    setLoading(true);
    postInteractionService(payload)
      .then(({ data }) => {
        setLoading(false);
        setValue(undefined);
        setRefId(data.ref_id ?? '');
        setClicked(false);
        if (data.question) {
          if (data.question.type == 'integration_page_redirect') {
            integrationPageRedirect(data.ref_id);
          } else {
            setQuestion(data.question);
            setDisableNextButton(false);
          }
        } else if (!data.question && data.type === 'done') {
          handleInteractionRedirect();
        } else if (!data || !data.question || data.question === null) {
          setError({
            code: 400,
            message: 'Something went wrong, question is null',
          });
          setException(true);
          setDisableNextButton(false);
        }
         setDisableYesNoButton(false)
      })
      .catch((error) => {
        setLoading(false);
        setException(true);
        setError({
          code: error.response.status,
          message: error.response.data.details,
        });
      });
  };

  return (
    <Layout defaultHeader={true} hamburger={false}>
      {skeletonLoading ? <Skeleton active></Skeleton> : <></>}
      {question?.type === 'error' || exception ? (
        <div>
          <ErrorInteractionModal
            title={'Error'}
            open={true}
            showTryButton={!exception}
            renderData={
              <div className={'Description'}>
                Oops! Looks like we cannot continue interaction at this point{' '}
                <br />
                Try again later.
              </div>
            }
          />
        </div>
      ) : (
        <div className="Content-wrap Pain">
          {question && (
            <>
              <Question
                key={refId}
                selectedValue={value}
                question={question}
                items={items}
                setItems={setItems}
                setValue={setValue}
                onSubmit={onSubmit}
                setDisableNextButton={setDisableNextButton}
                disable={disableNextButton}
                value={value}
                disableYesNoButton={disableYesNoButton}
                // setDisableYesNoButton={setDisableYesNoButton}
              />
              {question?.type !== 'yes_no' &&
                question?.type !== 'dialog_select_one' &&
                question?.type !== 'image_and_text_select_one' &&
                question?.type !== 'markdown_select_one' && (
                  <div>
                    <Button
                      className={`Questionnaire-Submit-Button ${
                        isClicked ? ' active' : ''
                      }`}
                      onClick={() => {
                        setClicked(true);
                        onSubmit();
                        console.log('CLicked the button');
                      }}
                      loading={loading}
                      disabled={
                        (question?.type !== 'select_many' &&
                          question?.type !== 'multi_select' &&
                          question?.type !== 'image_and_text' &&
                          (typeof value === 'undefined' ||
                            value?.length < 1)) ||
                        loading
                      }
                    >
                      Next
                    </Button>
                  </div>
                )}
            </>
          )}
        </div>
      )}
    </Layout>
  );
}

export default UserCondition;
