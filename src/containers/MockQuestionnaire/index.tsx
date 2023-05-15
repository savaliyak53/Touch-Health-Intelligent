import React, { useContext, useEffect, useState } from 'react';
import './index.scss';
import { useNavigate,useLocation } from 'react-router-dom';
import Button from '../../components/Button';
import { toast } from 'react-toastify';
import Question from '../../components/MockQuestion';
import {
  getInteractionService,
  getInteractionServiceByType,
  getUser,
  postInteractionService,
  preferencesService,
} from '../../services/authservice';
import { Interaction } from '../../interfaces';
import Layout from '../../layouts/Layout/Layout';
import { Skeleton, Divider } from 'antd';
import { Data } from '../MockScrollingChat/mockdata'
import cloneDeep from 'lodash/cloneDeep';
import { Collapse } from 'antd';
import styles from './MockQuestionnaire.module.scss';
import AuthContext, {AuthContextData} from '../../contexts/AuthContext';
const { Panel } = Collapse;

function MockQuestionnaire() {
  const [question, setQuestion] = useState<Interaction | any>(Data[0]);
  const [index , setIndex]=useState<number>(0)
  const [value, setValue] = useState<string | undefined>();
  const [items, setItems] = useState<string | undefined>();
  const [loading, setLoading] = useState<boolean>(false);
  const [refId, setRefId] = useState<string>('');
  const [skeletonLoading, setSkeletonLoading] = useState(false);
  const [isClicked, setClicked] = useState(false);
  const [disableNextButton, setDisableNextButton] = useState<boolean>(false);
  const [signupStatus, setSignupStatus] = useState<string | null >();
  const [historyQuestionArray, setHistoryQuestionArray] = useState<any>([Data[0]])
  const [toggleHistoryRecent, setToggleHistoryRecent] = useState(false);
  const context = useContext<AuthContextData | undefined>(AuthContext); 

 
  const handleToggleHistoryRecent = () => {
    setToggleHistoryRecent(!toggleHistoryRecent);
  }




  const navigate = useNavigate();
  const location = useLocation();
  const getInteraction = () => {
    getInteractionService()
      .then((response) => {
        setSkeletonLoading(false);
        if (response?.data?.question) {
          if(response?.data?.question.type == 'integration_page_redirect'){
            integrationPageRedirect(response.data.ref_id)
          } else {
            setQuestion(response?.data?.question);
            // setQuestionArray([response?.data?.question])
            setRefId(response.data.ref_id);
          }
        } 
        else if(response?.data?.type==="done"){
          handleInteractionRedirect()
        }
        else{
          navigate("/dashboard")
        }
      })
      .catch((error) => {
        toast(error?.details?.message?error?.details?.message:'Cannot get question');
        navigate('/dashboard');
        setSkeletonLoading(false);
      });
  };
  const handleInteractionRedirect = () =>{
    
    // const userId=localStorage.getItem('userId');
    const userId=context?.user;
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
    //setQuestionArray(Data)
    console.log("Data ", Data)
    console.log("Index ", index)
    setQuestion(Data[index])
    setHistoryQuestionArray(Data)
    // if(location && location.pathname ==='/c/checkup'){
    //   handleInitiateCheckupByLink();
    // }
    // else{
    //   getInteraction();
    // }
  }, []);
  const handleInitiateCheckupByLink = () =>{
    getInteractionServiceByType('checkup')
    .then((response: any) => {
      if (response) {
        getInteraction();
      } else {
        toast.error(`Something went wrong while Initiating Checkup Interaction.`);
        navigate('/dashboard');
      }
    })
    .catch((error) => {
      toast.error(`Something went wrong while Initiating Checkup Interaction.`);
    });
  }
  const integrationPageRedirect = (refId: string) => {
      localStorage.setItem('refId', refId)
      localStorage.setItem('redirect', 'true')
      navigate('/integrations');
  }
  const onSubmit= async (state?: string, skip?: boolean) => {
    console.log("questopn : ", question)
    setClicked(true);
    if (
      question.question.type !== 'select_many' && 
      question.question.type !== 'multi_select' &&
      question.question.type !== 'yes_no' &&
      question.question.type !== 'slider' &&
      question.question.type !== 'select_one' &&
      question.question.type !== 'dialog_select_one' &&
      question.question.type !== 'image_and_text' &&
      question.question.type !== 'image_and_text_select_one' &&
      question.question.type !== 'markdown_select_one' &&
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
        type:question.type,
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
    const historyQuestionsClone= cloneDeep(historyQuestionArray)
    setHistoryQuestionArray((historyQuestionsClone:any) => [...historyQuestionsClone, question])
    setLoading(true);
    setIndex(index+1)
    setQuestion(Data[index]);
    historyQuestionArray[historyQuestionArray.length-1].answer =  payload.question_response.value 
    console.log(" question : ", question)
    console.log("history question array : ", historyQuestionArray)
    console.log("payload  : ",payload)
    setLoading(false);
  };
  useEffect(() => {
    question?.type === 'slider'
      ? setDisableNextButton(true)
      : setDisableNextButton(false);
    setClicked(false);
  }, [question, question?.q_str]);
  console.log(question);
  return (
    <Layout defaultHeader={true} hamburger={false}>
      {/* <Collapse accordion>
            {historyQuestionArray.map((q : any , index : number)=>(
               <Panel header={q.question.q_str} key={index}>
               <p>{q.answer}</p>
               </Panel>
            ))}
      </Collapse> */}
      {skeletonLoading ? <Skeleton active></Skeleton> : <></>}
        <div className=" Pain">
            <>
            <section className={styles.HistorySection} style={{'display':`${toggleHistoryRecent? 'flex' : 'none'}`}}>
            <div className={styles.HistoryContent}>
            {historyQuestionArray.map((q : any , index : number)=>(
              <div key={index} style={{minHeight: '60vh' ,scrollSnapAlign: 'center'}}>
                  <Divider/>
                  <Question
                    selectedValue={q.answer}
                    question={q.question}
                    items={items}
                    setItems={setItems}
                    setValue={setValue}
                    onSubmit={onSubmit}
                    setDisableNextButton={setDisableNextButton}
                    recent={false}
                  />
                  </div>
            ))}
              </div>

              <div onClick={handleToggleHistoryRecent}>
                  <div className={styles.HistoryArrow}></div>
              </div>
            </section>

            <section className={styles.RecentQuestionWrap} style={{'display':`${toggleHistoryRecent? 'none' : 'flex'}`}}>
              <div onClick={handleToggleHistoryRecent}>
                  <div className={styles.HistoryArrow}></div>
              </div>

              <div className={styles.RecentContent}>
                <Question
                  selectedValue={value}
                  question={question.question}
                  items={items}
                  setItems={setItems}
                  setValue={setValue}
                  onSubmit={onSubmit}
                  setDisableNextButton={setDisableNextButton}
                  recent={true}
                />
                {question.question?.type !== 'yes_no' && question.question?.type !== 'dialog_select_one' && question.question?.type !== 'image_and_text_select_one' && question.question?.type !== 'markdown_select_one' && (
                  <div className="Btn-group">
                    <Button
                      className={`Next ${isClicked && 'active'}`}
                      onClick={() => {
                        setClicked(true);
                        onSubmit()
                      }}
                      loading={loading}
                    disabled={question.question?.type !== 'select_many' && question.question?.type !=='multi_select' && question.question?.type !=='image_and_text' && typeof value === 'undefined' || loading}
                    >
                      Next
                    </Button>
                  </div>
                )}
              </div>
            </section>
            </>
        </div>
    </Layout>
  );
}

export default MockQuestionnaire;
