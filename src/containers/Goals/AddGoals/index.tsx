import React, { useState, useEffect } from 'react';
import styles from './AddGoals.module.scss';
import v from '../../../variables.module.scss'
import Layout from '../../../layouts/Layout/Layout';
import { LeftOutlined } from '@ant-design/icons';
import {
  DownOutlined,
  SearchOutlined,
  RightOutlined,
  CloseOutlined,
} from '@ant-design/icons';
import { AutoComplete } from 'antd';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { Button, Modal } from 'antd';
import {
  getGoals,
  getGoalsSuggestion,
  getGoalsSearch,
  addGoal,
  deleteGoal,
} from '../../../services/goalsService';
import { toast } from 'react-toastify';
import ReactMarkdown from 'react-markdown';
import {
  getInteractionServiceByType,
  preferencesService,
  getUser
} from '../../../services/authservice';
import rehypeRaw from 'rehype-raw';
type ITerms = {
  termsAndConditions: boolean;
};
type IGoalInfo = {
  acronym: string;
  color: string;
  description_md: string;
  goal_class: string;
  id: string;
  info_image: string;
  name: string;
};
const AddGoals = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [goals, setGoals] = useState<any>([]);
  const [suggestion, setSuggestion] = useState([]);
  const [selectedGoal, setSelectedGoal] = useState<IGoalInfo>();
  const [searchValue, setSearchValue] = useState('');
  const [options, setOptions] = useState<any>([]);
  const [isDisable, setIsDisabled] = useState(true);
  const [userStatus, setUserSatus] = useState(false)
  const [active, setActive] = useState(false)

  const getUserStatus = () => {
    const userId = localStorage.getItem('userId');
    getUser(userId)
    .then(res => {
      res.data.signup_status == 'done' ? setUserSatus(true) : setUserSatus(false)
    })
    .catch(err => {
      console.log(err);
    })
  }

  const showModal = (data: any) => {
    setSelectedGoal(data);
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ITerms>({
    mode: 'onSubmit',
  });

  const useDebounce = (val: any, offset: any) => {
    const [debouncedVal, setDebouncedVal] = useState(val);

    useEffect(() => {
      const timeoutRef = setTimeout(() => {
        setDebouncedVal(val);
      }, offset);

      return () => {
        clearTimeout(timeoutRef);
      };
    }, [val]);

    return debouncedVal;
  };
  const debouncedSearchValue = useDebounce(searchValue, 500);

  const getGoalsData = () => {
    getGoals().then((res: any) => {
      setGoals(res.data);
      getSuggestedGoals(res.data);
    });
  };

  const getSuggestedGoals = (goals: any) => {
    getGoalsSuggestion().then((res: any) => {
      if (res?.data) {
        const result = res.data.filter(
          (item: any) => !goals.some((goal: any) => goal.id === item.id)
        );
        setSuggestion(result);
      }
    });
  };

  const handleOptionSelect = (value: string, option: any) => {
    setSelectedGoal(option.item);
    setIsModalOpen(true);
    setSearchValue('');
  };

  const addGoals = (goalId?: string) => {
    addGoal({ goal_ids: [goalId] })
      .then((res) => {
        setSearchValue('');
        toast.success('Goal added successfully');
        setIsModalOpen(false);
        setOptions(null);
        getGoalsData();
        isDisable ? setIsDisabled(false) : null;
      })
      .catch((error) => {
        console.log(error);
        toast.error('Something went wrong. Please contact support.');
      });
  };

  const removeGoal = (id?: string) => {
    deleteGoal(id)
      .then((res) => {
        toast.success('Goal removed');
        setSearchValue('');
        getGoalsData();
        setIsModalOpen(false);
        isDisable ? setIsDisabled(false) : null
      })
      .catch((error: any) => {
        toast.error(error);
      });
  };
  const handleNext = () => {
    setIsLoading(true);
    if (goals.length > 0) {
      const preferenceData = {
        signup_status: 'goal-characterization',
      };
      const userId = localStorage.getItem('userId');
      if (userId) {
        preferencesService(preferenceData, userId)
          .then((preferencesResponse: any) => {
            setIsLoading(false);
            if (preferencesResponse) {
              getInteractionServiceByType('goal_characterization')
                .then((response: any) => {
                  if (response) {
                    navigate('/questionnaire');
                  } else {
                    navigate('/');
                  }
                })
                .catch((error) => {
                  toast.error(`Something went wrong. `);
                });
            } else {
              toast.error(`Preference status doesn't exist`);
              navigate('/dashboard');
            }
          })
          .catch((error) => {
            setIsLoading(false);
            toast.error(
              `${error.response?.data?.title} Please check values and try again.`
            );
          });
      }
    }
  };
  useEffect(() => {
    getGoalsData();
    getUserStatus()
  }, []);
  useEffect(() => {
    if (debouncedSearchValue) {
      getGoalsSearch(debouncedSearchValue)
        .then((response: any) => {
          setIsDropdownOpen(true);
          if (response?.data) {
            const result = response.data.filter(
              (item: any) => !goals.some((goal: any) => goal.id === item.id)
            );
            setOptions(
              result.map((item: any) => {
                return { value: item.name, key: item.id, item };
              })
            );
          }
        })
        .catch((error) => {
          console.log('error while searching ', error);
          toast('Something went wrong. Please contact support.');
        });
    } else {
      setIsDropdownOpen(false);
      setOptions(null);
    }
  }, [debouncedSearchValue]);
  const handleBack = () => {
    navigate('/dashboard');
  };
  return (
    <Layout defaultHeader={true} hamburger={false}>
      <>
        {userStatus && (
          <div className={styles['Backflex']} onClick={handleBack}>
            <LeftOutlined className={styles['LeftIcon']} /> Back
          </div>
        )}
      </>
      <div className={styles['AddGoals']}>
        <h2 className={styles['Title']}>Adding Health Goals</h2>
        <div className={`Goal-Select-Wrap Goals-Select`}>
          <SearchOutlined className="search" />
          <AutoComplete
            onChange={(v) => setSearchValue(v)}
            placeholder="Add a goal"
            options={options}
            onSelect={handleOptionSelect}
            value={searchValue}
            open={isDropdownOpen}
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          ></AutoComplete>

          <DownOutlined onClick={() => setIsDropdownOpen(!isDropdownOpen)} />
        </div>

        <h3 className={styles['Goals-title']}>Recommended goals</h3>

        <div className={styles['Rec-wrap']}>
          {suggestion?.map((data: any, key: any) => (
            <Button
              key={key}
              className={styles['Rec-Goal']}
              type="primary"
              onClick={() => showModal(data)}
              style={{
                color: `${v['primary-color2']}`,
                backgroundColor: `${'rgba(232, 232, 232, 0.31)'}`,
              }}
            >
              {data.name === '' ? (
                ''
              ) : (
                <span className={styles['Rec-Text']}>{data.name}</span>
              )}
              <RightOutlined className={styles['Arrow']} />
            </Button>
          ))}
        </div>
        <h3 className={styles['Goals-title']}>Your health goals</h3>
        <div className={styles['Health-Goals']}>
          {goals?.map((data: any, key: any) => (
            <div
              key={key}
              className={styles['Selected-Goal']}
              style={{
                color: `${v['primary-color2']}`,
                backgroundColor: `${'rgba(246, 187, 161, 0.22)'}`,
              }}
              onClick={(e) => {e.stopPropagation(); showModal(data); setActive(true)}}
            >
              <div className={styles['Mygoals-Title']}>
                <Button
                  className={styles['Cross-btn']}
                  onClick={(e) => {e.stopPropagation(); removeGoal(data.id)}}
                >
                  <CloseOutlined className={styles['Cross']} />
                </Button>
                {data.name === '' ? (
                  ''
                ) : (
                  <span className={styles['Rec-Text']}>{data.name}</span>
                )}
              </div>
              <Button
                key={key}
                onClick={() => showModal(data)}
                style={{
                  color: `${v['primary-color2']}`,
                  backgroundColor: `transparent`,
                  border: '0px',
                  padding: 0
                }}
              >
                <RightOutlined className={styles['Arrow']} />
              </Button>
            </div>
          ))}
        </div>
        <div style={{position: 'fixed', backgroundColor: 'white', bottom: '0', left: '0', width: '100vw', padding: '0 20px 20px'}}>
          <Button
            className={`Pref-btn btn ${isDisable ? 'disabled' : ''}`}
            loading={isLoading}
            onClick={handleNext}
            disabled={isDisable}
          >
            Next
          </Button>
        </div>
      </div>
      <Modal
        footer={null}
        centered
        visible={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <h3 className={styles['Goals-title']}>{selectedGoal?.name}</h3>
        {selectedGoal && (
          <div className={styles['Des-Goal']}>
            <ReactMarkdown rehypePlugins={[rehypeRaw]}>
              {selectedGoal.description_md}
            </ReactMarkdown>
          </div>
        )}
        <div className={styles['Modal-Btn-Group']}>
          {goals.filter((goal: any) => {return goal.name == selectedGoal?.name})[0]?.name ? (
              <Button
                className="Pref-btn btn"
                loading={isLoading}
                onClick={() => removeGoal(selectedGoal?.id)}
              >
                Remove goal
              </Button>
          ) : (
            <Button
              className="Pref-btn btn"
              loading={isLoading}
              onClick={() => addGoals(selectedGoal?.id)}
            >
              Pick goal
            </Button>
          )}
          <Button
            className="Back-btn btn"
            loading={isLoading}
            onClick={handleCancel}
          >
            Take me back
          </Button>
        </div>
      </Modal>
    </Layout>
  );
};
export default AddGoals;
