import React, { useEffect, useState } from 'react';
import './index.scss';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import { toast } from 'react-toastify';
import Question from '../../components/Question';
import {
  getInteractionService,
  getUser,
  postInteractionService,
  preferencesService,
} from '../../services/authservice';
import { Interaction } from '../../interfaces';
import Layout from '../../layouts/Layout/Layout';
import { Skeleton } from 'antd';

function UserCondition() {
  const [question, setQuestion] = useState<Interaction | any>();
  const [value, setValue] = useState<string | undefined>();
  const [items, setItems] = useState<string | undefined>();
  const [loading, setLoading] = useState<boolean>(false);
  const [refId, setRefId] = useState<string>('');
  const [skeletonLoading, setSkeletonLoading] = useState(true);
  const [isClicked, setClicked] = useState(false);
  const [disableNextButton, setDisableNextButton] = useState<boolean>(false);
  const [signupStatus, setSignupStatus] = useState<string | null >();


  const navigate = useNavigate();
  const getInteraction = () => {
    getInteractionService()
      .then((response) => {
        setSkeletonLoading(false);
        if (response?.data?.question) {
          setQuestion(response?.data?.question);
          setRefId(response.data.ref_id);
        } else {
          handleInteractionRedirect()
        }
      })
      .catch((error) => {
        toast(error?.details?.message?error?.details?.message:'Cannot get question');
        navigate('/dashboard');
        setSkeletonLoading(false);
      });
  };
  const handleInteractionRedirect = () =>{
    const userId=localStorage.getItem('userId');
    getUser(userId)
    .then((response:any) => {
      if (response?.data.signup_status==='onboarding') {
        preferencesService({
          signup_status:"goal-selection"
        }, userId)
        .then((preferencesResponse) => {
          if (preferencesResponse) {
            navigate('/add-goals')
          } else {
            console.log('navigate to dashboard')
          }
        })
        .catch((error) => {
          toast.error(
            `${error.response?.data?.title} Please check values and try again.`
          );
        });
      }
      else if (response?.data.signup_status==='goal-characterization') {
        preferencesService({
          signup_status:"done"
        }, userId)
        .then((preferencesResponse) => {
          if (preferencesResponse) {
            //nayab revisit this
            navigate('/dashboard')
          } else {
            console.log('navigate to dashboard')
            //navigate('/dashboard');
          }
        })
        .catch((error) => {
          toast.error(
            `${error.response?.data?.title} Please check values and try again.`
          );
        });
      } 
      else if (response?.data.signup_status==='done') {
        navigate("/dashboard")
      }
      else{
        navigate("/dashboard")
      }
    })
    .catch((error) => {
      toast.error(
        `${error.response?.data?.title} Please check values and try again.`
      );
    });          
  }
  useEffect(() => {
    getInteraction();
  }, []);
  const onSubmit= async (state?: string, skip?: boolean) => {
    setClicked(true);
    if (
      question.type !== 'select_many' && 
      question.type !== 'mutli_select' &&
      question.type !== 'yes_no' &&
      question.type !== 'slider' &&
      question.type !== 'select_one' &&
      question.type !== 'dialog_select_one' &&
      question.type !== 'image_and_text' &&
      question.type !== 'image_and_text_select_one' &&
      !value
    ) {
      toast.error('Please select a value');
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
      payload.question_response.value = '1';
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
        if (data.question) {
          setQuestion(data.question);
        } else {
          handleInteractionRedirect();
          //navigate('/questionnaire-submit');
        }
      })
      .catch(() => {
        setLoading(false);
        toast.error('Something went wrong');
        setLoading(false);
        navigate('/dashboard');
      });
  };
  useEffect(() => {
    question?.type === 'slider'
      ? setDisableNextButton(true)
      : setDisableNextButton(false);
    setClicked(false);
  }, [question, question?.q_str]);
  
  return (
    <Layout defaultHeader={true} hamburger={false}>
      {skeletonLoading ? <Skeleton active></Skeleton> : <></>}
      <div className="Content-wrap Pain">
        {question && (
          <>
            <Question
              selectedValue={value}
              question={question}
              items={items}
              setItems={setItems}
              setValue={setValue}
              onSubmit={onSubmit}
              setDisableNextButton={setDisableNextButton}
            />
            {question?.type !== 'yes_no' && question?.type !== 'dialog_select_one' && question?.type !== 'image_and_text_select_one' && question?.type !== 'markdown_select_one' && (
              <div className="Btn-group">
                <Button
                  className={`Next ${isClicked && 'active'}`}
                   onClick={() => {
                     setClicked(true);
                     onSubmit()
                   }}
                  loading={loading}
                 disabled={question?.type !== 'select_many' && question?.type !=='multi_select' && question?.type !=='image_and_text' && typeof value === 'undefined' || loading}
                >
                  Next
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </Layout>
  );
}

export default UserCondition;
