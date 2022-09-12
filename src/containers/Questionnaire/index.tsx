import React, { useEffect, useState } from 'react';
import './index.scss';
import AuthenticationLayout from '../../layouts/authentication-layout/AuthenticationLayout';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import { toast } from 'react-toastify';
import Question from '../../components/Question';
import {
  getInteractionService,
  postInteractionService,
} from '../../services/authservice';
import { Interaction } from '../../interfaces';
import Layout from '../../layouts/Layout/Layout';
import { Skeleton } from 'antd';

function UserCondition() {
  const [question, setQuestion] = useState<Interaction | any>();
  const [value, setValue] = useState<string | undefined>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [refId, setRefId] = useState<string>('');
  const [skeletonLoading, setSkeletonLoading] = useState(true);

  const navigate = useNavigate();
  const getInteraction = () => {
    getInteractionService()
      .then((response) => {
        setSkeletonLoading(false);
        if (response?.data?.question) {
          setQuestion(response?.data?.question);
          setRefId(response.data.ref_id);
        }
      })
      .catch(() => {
        toast('Cannot get question');
        navigate('/dashboard');
        setSkeletonLoading(false);
      });
  };
  useEffect(() => {
    getInteraction();
  }, []);
  const onSubmit = async (state?: string, skip?: boolean) => {
    if (
      question.type !== 'yes_no' &&
      question.type !== 'slider' &&
      question.type !== 'select_one' &&
      !value &&
      !skip
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
        value: skip ? null : value,
      },
      reward_nugget_response: {
        shared: true,
      },
    };
    if (question.type === 'slider' && !value && !skip) {
      payload.question_response.value = '0';
    }
    if (question.type == 'yes_no' && !skip) {
      payload.question_response.value = state;
    }
    setLoading(true);
    postInteractionService(payload)
      .then(({ data }) => {
        setLoading(false);
        setValue('');
        setRefId(data.ref_id ?? '');
        if (data.question) {
          setQuestion(data.question);
        } else {
          navigate('/questionnaire-submit');
        }
      })
      .catch(() => {
        setLoading(false);
        toast.error('Something went wrong');
        setLoading(false);
        navigate('/dashboard');
      });
  };

  return (
    <Layout defaultHeader={true} hamburger={false}>
      {skeletonLoading ? <Skeleton active></Skeleton> : <></>}

      <div className="Content-wrap Pain">
        {question && (
          <>
            <Question
              question={question}
              setValue={setValue}
              onSubmit={onSubmit}
            />
            {question?.type !== 'yes_no' && (
              <div className="Btn-group">
                <Button
                  className="Skip"
                  onClick={() => {
                    onSubmit('', true);
                  }}
                  disabled={loading}
                >
                  Skip
                </Button>
                <Button
                  className="Next"
                  onClick={() => {
                    onSubmit();
                  }}
                  loading={loading}
                  disabled={value === null || loading}
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
