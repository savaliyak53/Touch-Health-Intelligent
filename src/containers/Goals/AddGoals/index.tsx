import React, { useState, useEffect } from 'react';
import styles from'./AddGoals.module.scss';
import Layout from '../../../layouts/Layout/Layout';
import { DownOutlined, SearchOutlined, RightOutlined, CloseOutlined} from '@ant-design/icons';
import { AutoComplete} from 'antd';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { Button, Modal } from 'antd';
import { getGoals, getGoalsSuggestion, getGoalsSearch, addGoal, deleteGoal, goalDetails } from '../../../services/goalsService'
import { toast } from 'react-toastify';
import { getInteractionServiceByType, preferencesService } from '../../../services/authservice';

type ITerms = {
    termsAndConditions: boolean;
};

const AddGoals = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [goals, setGoals] = useState<any>([])
    const [suggestion, setSuggestion] = useState([])
    const [selectedGoal, setSelectedGoal] = useState<any>()
    const [searchValue, setSearchValue] = useState('')
    const [options, setOptions] = useState<any>([])
    const [isDisable, setIsDisabled] = useState(true)

    const showModal = (data:any) => {
        getGoalDetails(data.id)
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
        mode: 'onSubmit'
      });

    const onSubmit = async (data:any) => {
        // console.log(data);
            // navigate('/add-goals');
        };

    const getGoalsData = () => {
        getGoals()
            .then((res:any) => {
                setGoals(res.data)
                getSuggestedGoals(res.data)
                if(res.data.length > 0) setIsDisabled(false)
                else setIsDisabled(true)

        })
    }

    const getSuggestedGoals = (goals:any) => {
        getGoalsSuggestion()
        .then((res:any) => {
            if (res?.data) {
                const result = res.data.filter((item:any) => !goals.some((goal:any) => goal.id === item.id));
                setSuggestion(result)
            }
        })
    }

    const handleSearch = (value: string) => {
        setSearchValue(value);
        if (value) {
            getGoalsSearch(value)
            .then((response: any) => {
                setIsDropdownOpen(true)
                if (response?.data) {
                    const result = response.data.filter((item:any) => !goals.some((goal:any) => goal.id === item.id));
                    setOptions(result.map((item: any) => {
                        return { value: item.name, key: item.id, item };
                    }));
                }
            })
            .catch((error) => {
                console.log('error while searching ', error);
                toast('Something went wrong. Please contact support.');
            });
        }
        else if (value === '')
            setIsDropdownOpen(false)
            setOptions(null)
    };

    const handleOptionSelect = (value: string, option: any) => {
        setSearchValue(value)
        getGoalDetails(option.key)
        setIsModalOpen(true)
    };

    const addGoals = (goal: string) => {
        addGoal({"goal_ids":[goal]})
        .then((res) => {
            setSearchValue('')
            toast.success('Goal added successfully');
            setIsModalOpen(false);
            setOptions(null)
            getGoalsData()
        })
        .catch((error) => {
            console.log(error);
            toast.error('Something went wrong. Please contact support.');
        })
    };

    const removeGoal = (id:string) => {
        deleteGoal(id)
        .then((res)=>{
            toast.success('Goal removed');
            setSearchValue('')
            getGoalsData()
        })
        .catch((error: any) => {
            toast.error(error);
        });
    }
    const getGoalDetails = (goalId:string) => {
        goalDetails(goalId)
        .then((res)=>{
            setSelectedGoal(res.data)
        })
        .catch((error: any) => {
            toast.error(error);
        });
    }
    const handleNext = () => {
    setIsLoading(true)
    if(goals.length>0){
        const preferenceData = {
            signup_status:"goal-characterization",
        };
        const userId=localStorage.getItem('userId')
        if(userId){
            preferencesService(preferenceData, userId)
            .then((preferencesResponse:any) => {
            setIsLoading(false);
            toast.success('Preferences submitted');
            if (preferencesResponse) {
                getInteractionServiceByType('goal_characterization').then((response:any) => {
                    if (response) {
                    navigate('/questionnaire')
                    } else {
                    navigate('/');
                    }
                })
                .catch((error) => {
                    toast.error(
                    `Something went wrong. `
                    );
                });
            } else {
                toast.error(
                    `Preference status doesn't exist`
                );
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
    }
    useEffect(() => {
        getGoalsData();
    }, []);  

    return (
        <Layout defaultHeader={true} hamburger={true}>
            <div className={styles["AddGoals"]}>
                <h2 className={styles["Title"]}>
                    Adding Health Goals
                </h2>
                <div className={`Goal-Select-Wrap Goals-Select`}>
                    <SearchOutlined className="search" />
                    <AutoComplete
                    onSearch={handleSearch}
                    placeholder="Add a goal"
                    options={options}
                    onSelect={handleOptionSelect}
                    value={searchValue}
                    open={isDropdownOpen}
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    ></AutoComplete>

                    <DownOutlined onClick={() => setIsDropdownOpen(!isDropdownOpen)} />
                </div>

                <h3 className={styles["Goals-title"]}>
                    Recommended goals
                </h3>

                <div className={styles["Rec-wrap"]}>
                {suggestion?.map((data:any, key:any) => (
                        <Button key={key} className={styles["Rec-Goal"]} type="primary" onClick={() => showModal(data)} style={{ color: `${'#'+data.color}` , backgroundColor: `${'#'+data.color+'29'}` }}>
                            {data.name === '' ? '' :<span className={styles["Rec-Text"]}>{data.name}</span>}
                            <RightOutlined className={styles["Arrow"]}/>
                        </Button>
                ))}
                </div>
                <h3 className={styles["Goals-title"]}>
                    Your health goals
                </h3>
                <div className={styles["Health-Goals"]}>
                    {goals?.map((data:any, key:any) => (
                        <div key={key} className={styles["Selected-Goal"]} style={{ color: `${'#'+data.color}` , backgroundColor: `${'#'+data.color+'29'}`}}>
                            {data.name === '' ? '' : <span className={styles["Rec-Text"]}>{data.name}</span>}
                            <Button className={styles["Cross-btn"]} onClick={() => removeGoal(data.id)}>
                                <CloseOutlined className={styles["Cross"]}/>
                            </Button>
                        </div>
                    ))}
                </div>

                <Button
                    className={`Pref-btn btn ${isDisable ? 'disabled' : ''}`}
                    loading={isLoading}
                    onClick={handleNext}
                    disabled={isDisable}
                >
                    Next
                </Button>
            </div>
            <Modal footer={null} centered visible={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <h3 className={styles["Goals-title"]}>
                    {selectedGoal?.info.name}                
                </h3>
                <p className={styles["Des-Short"]}>{selectedGoal?.info.goal_class}</p>
                <p className={styles["Des-Goal"]}>{selectedGoal?.info.description}</p>
                <div className={styles["Modal-Btn-Group"]}>
                    <Button
                        className="Pref-btn btn"
                        loading={isLoading}
                        onClick={() => addGoals(selectedGoal.id)}
                    >
                        Pick goal
                    </Button>
                    <Button
                        className="Back-btn btn"
                        loading={isLoading}
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    >
                        Take me back
                    </Button>
                </div>
            </Modal>
        </Layout>
    )

}
export default AddGoals