import React, { useState, useEffect, useContext } from 'react';
import styles from './AddGoals.module.scss';
import v from '../../../variables.module.scss';
import Layout from '../../../layouts/Layout/Layout';
import { ArrowLeftOutlined, InfoCircleOutlined } from '@ant-design/icons';
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
  getUser,
} from '../../../services/authservice';
import rehypeRaw from 'rehype-raw';
import ConfirmModal from '../../../components/Modal/ConfirmModal';
import LastGoalModal from '../../../components/Modal/LastGoalModal';
import ListItem from '../../../components/ListItem/ListItem';
import AuthContext, {AuthContextData} from '../../../contexts/AuthContext';

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
  const [isDisable, setIsDisabled] = useState(false);
  const [userStatus, setUserSatus] = useState(false);
  const [active, setActive] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showLastGoalModal, setShowLastGoalModal] = useState(false);
  const [deletedGoal, setDeletedGoal] = useState<string | undefined | null>(
    null
  );
  const [error, setError] = useState<any>();
  const authContext = useContext<AuthContextData | undefined>(AuthContext); 
  const getUserStatus = () => { 
    const userId=authContext?.user;
    // const userId = localStorage.getItem('userId');
    getUser(userId)
      .then((res) => {
        res?.data?.signup_status == 'done'
          ? setUserSatus(true)
          : setUserSatus(false);
      })
      .catch((err) => {
        setError({code: error.response.status, message: error.response.data.details});
      });
  };

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

  const handleDeleteOk = (id: any) => {
    removeGoal(id);
    setShowCancelModal(false);
    toast.success(`Your goal was successfully deleted`);
  };
  const handleDeleteModal = () => {
    setShowCancelModal(false);
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
    })
    .catch(err => {
      setError({code: err.response.status, message: err.response.data.details ?? "Something went wrong."});
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
    })
    .catch(err => {
      setError({code: err.response.status, message: err.response.data.details ?? "Something went wrong."});
    })
  };

  const handleOptionSelect = (value: string, option: any) => {
    setSelectedGoal(option.item);
    setIsModalOpen(true);
    setSearchValue('');
  };

  const addGoals = (goalId?: string) => {
    addGoal({ goal_ids: [goalId] })
      .then((res) => {
        localStorage.setItem('nextEnabled', 'true')
        setIsLoading(false);
        setIsDisabled(false);
        setSearchValue('');
        toast.success('Goal added successfully');
        setIsModalOpen(false);
        setOptions(null);
        getGoalsData();
      })
      .catch((error) => {
        setError({code: error.response.status, message: error.response.data.details});
      });
  };

  const removeGoal = (id?: string) => {
    deleteGoal(id)
      .then((res) => {
        localStorage.setItem('nextEnabled', 'true')
        setIsLoading(false);
        setIsDisabled(false);
        setSearchValue('');
        getGoalsData();
        setIsModalOpen(false);
      })
      .catch((error: any) => {
        setError({code: error.response.status, message: error.response.data.details ?? "Something went wrong."});
      });
  };
  const handleNext = () => {
    localStorage.removeItem('nextEnabled');
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(true);
      navigate('/dashboard');
    }, 1000);
  };
  useEffect(() => {
    getGoalsData();
    getUserStatus();
  }, []);

  useEffect(() => {
    if(error) throw(error);
  }, [error]);

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
          setError({code: error.response.status, message: error.response.data.details ?? "Something went wrong."});
        });
    } else {
      setIsDropdownOpen(false);
      setOptions(null);
    }
  }, [debouncedSearchValue]);
  const handleBack = () => {
    navigate('/dashboard');
  };
  const handleCancelModal = () => {
    setShowLastGoalModal(false);
  };
  const handleClose = (data: any) => {
    if (goals.length > 1) {
      setSelectedGoal(data);
      setShowCancelModal(true);
    } else setShowLastGoalModal(true);
  };
  const handleClick = (data: any) => {
    showModal(data);
    setActive(true);
  };
  return (
    <Layout defaultHeader={true} hamburger={userStatus}>
      <>
        {userStatus && (
          <div className={'Backflex'} onClick={handleBack}>
            <ArrowLeftOutlined className={'LeftIcon'} />
          </div>
        )}
      </>
      <div className={styles['AddGoals']}>
        <h2 className={`Title`}>Adding a health goal</h2>
        <div className={`Goal-Select-Wrap Goals-Select`}>
          <SearchOutlined className="search" />
          <AutoComplete
            onChange={(v) => setSearchValue(v)}
            placeholder="Explore all eligible goals"
            options={options}
            onSelect={handleOptionSelect}
            value={searchValue}
            open={isDropdownOpen}
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          ></AutoComplete>

          <DownOutlined onClick={() => setIsDropdownOpen(!isDropdownOpen)} />
        </div>

        <h3 className={`Heading Heading-color2 ${styles['Goals-title']}`}>
          Recommended goals
        </h3>

        <div className={styles['Health-Goals']}>
          {suggestion?.map((data: any, index: any) => (
            <>
              <ListItem
                index={index}
                handleClick={() => showModal(data)}
                item={data}
                name={data.name}
                disabled={isDisable}
                className={`${styles['Suggested-Goals-List']}`}
              />
            </>
          ))}
        </div>
        <h3 className={` Heading Heading-color2 ${styles['Goals-title']}`}>
          My goals
        </h3>
        <div>
          {goals?.map((data: any, index: any) => (
            <>
              <ListItem
                index={index}
                handleClick={handleClick}
                handleClose={handleClose}
                item={data}
                name={data.name}
                closable={true}
                disabled={isDisable}
                className={`${styles['Active-Goals-List']}`}
              />
              <ConfirmModal
                title={'Confirmation'}
                open={showCancelModal}
                handleCancel={handleDeleteModal}
                handleOk={() => handleDeleteOk(selectedGoal?.id)}
                className="Addgoal-Confirm-Modal"
                renderData={
                  <div className="Description">
                    Are you sure you want to delete the goal{' '}
                    <strong>{selectedGoal?.name}</strong>?
                  </div>
                }
              />
              <LastGoalModal
                title={'Warning'}
                open={showLastGoalModal}
                handleCancel={handleCancelModal}
                handleOk={handleCancelModal}
                className="Addgoal-Confirm-Modal"
                renderData={
                  <div className="Description">
                    Alas! Unable to delete. This is your last goal
                  </div>
                }
              />
            </>
          ))}
        </div>
        <div>
          <Button
            className={`Submit-Button ${localStorage.getItem('nextEnabled') ? 'disabled' : ''}`}
            loading={isLoading}
            onClick={handleNext}
            disabled={localStorage.getItem('nextEnabled') ? false : true}
          >
            Save
          </Button>
        </div>
      </div>
      <Modal
        footer={null}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={'100vw'}
        closable={false}
        style={{ height: '100vh' }}
        className="Goals-Modal"
      >
        <div
          className={'Backflex'}
          onClick={() => {
            setIsModalOpen(false);
          }}
        >
          <ArrowLeftOutlined className={'LeftIcon'} />
        </div>
        <h3 className={` Title ${styles['Goals-Detail-title']}`}>
          {selectedGoal?.name}
        </h3>
        {selectedGoal && (
          <div className={`Description ${styles['Des-Goal']}`}>
            <ReactMarkdown rehypePlugins={[rehypeRaw]}>
              {selectedGoal.description_md}
            </ReactMarkdown>
          </div>
        )}
        <div className={styles['Modal-Btn-Group']}>
          {goals.filter((goal: any) => {
            return goal.name == selectedGoal?.name;
          })[0]?.name ? (
            <Button
              className="Submit-Button"
              loading={isLoading}
              disabled={isDisable}
              onClick={() => {
                if (goals.length > 1) {
                  setIsLoading(true);
                  setIsDisabled(true);
                  removeGoal(selectedGoal?.id);
                } else setShowLastGoalModal(true);
              }}
            >
              Remove goal
            </Button>
          ) : (
            <Button
              className="Submit-Button"
              loading={isLoading}
              disabled={isDisable}
              onClick={() => {
                setIsLoading(true);
                setIsDisabled(true);
                addGoals(selectedGoal?.id);
              }}
            >
              Pick goal
            </Button>
          )}
        </div>
      </Modal>
    </Layout>
  );
};
export default AddGoals;
