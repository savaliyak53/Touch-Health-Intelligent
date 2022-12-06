import React, { useState } from 'react';
import styles from'./AddGoals.module.scss';
import Layout from '../../../layouts/Layout/Layout';
import { DownOutlined, SearchOutlined, RightOutlined, CloseOutlined} from '@ant-design/icons';
import { AutoComplete} from 'antd';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { Button, Modal } from 'antd';
type ITerms = {
    termsAndConditions: boolean;
};

const AddGoals = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
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
      const onSubmit = async () => {
            navigate('/add-goals');
        };
    return (
        <Layout defaultHeader={true} hamburger={true}>
            <div className={styles["AddGoals"]}>
                <h2 className={styles["Title"]}>
                    Adding Health Goals
                </h2>
                <div className={`Select-Wrap Goals-Select`}>
                    <SearchOutlined className="search" />
                    <AutoComplete
                    // onSearch={handleSearch}
                    placeholder="Add a goal"
                    // options={result}
                    // onSelect={handleOptionSelect}
                    // value={selectedValue}
                    open={isDropdownOpen}
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    ></AutoComplete>

                    <DownOutlined onClick={() => setIsDropdownOpen(!isDropdownOpen)} />
                </div>

                <h3 className={styles["Goals-title"]}>
                    Recommended goals
                </h3>
                <div className={styles["Rec-wrap"]}>
                    <Button className={styles["Rec-Goal"]} type="primary" onClick={showModal} style={{ color: "#394A7E" , backgroundColor: "rgba(57, 74, 126, 0.16)"}}>
                        <span className={styles["Rec-Text"]}>Optimal Movement</span>
                        <RightOutlined className={styles["Arrow"]}/>
                    </Button>
                    <Button className={styles["Rec-Goal"]} type="primary" onClick={showModal} style={{ color: "#397E79" , backgroundColor: "rgba(57, 126, 121, 0.16)"}}>
                        <span className={styles["Rec-Text"]}>Diabetes Management</span>
                        <RightOutlined className={styles["Arrow"]}/>
                    </Button>
                    <Button className={styles["Rec-Goal"]} type="primary" onClick={showModal} style={{ color: "#61397E" , backgroundColor: "rgba(97, 57, 126, 0.16)"}}>
                        <span className={styles["Rec-Text"]}>Cancer Remission</span>
                        <RightOutlined className={styles["Arrow"]}/>
                    </Button>
                    <Button className={styles["Rec-Goal"]} type="primary" onClick={showModal} style={{ color: "#F0962D" , backgroundColor: "rgba(240, 150, 45, 0.16)"}}>
                        <span className={styles["Rec-Text"]}>Insomnia Prevention</span>
                        <RightOutlined className={styles["Arrow"]}/>
                    </Button>
                </div>
                <h3 className={styles["Goals-title"]}>
                    Your health goals
                </h3>
                <div className={styles["Health-Goals"]}>
                    <div className={styles["Selected-Goal"]} style={{ color: "#394A7E" , backgroundColor: "rgba(57, 74, 126, 0.16)"}}>
                        <span className={styles["Rec-Text"]}>Optimal Movement</span>
                        <Button className={styles["Cross-btn"]}>
                            <CloseOutlined className={styles["Cross"]}/>
                        </Button>
                    </div>
                </div>
                <Button
                    className={`Pref-btn btn ${'disabled'}`}
                    loading={isLoading}
                    onClick={handleSubmit(onSubmit)}
                >
                    Next
                </Button>
            </div>
            <Modal footer={null} centered visible={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <h3 className={styles["Goals-title"]}>
                    Optimal Movment
                </h3>
                <p className={styles["Des-Short"]}>Description</p>
                <p className={styles["Des-Goal"]}>Description of goal</p>
                <div className={styles["Modal-Btn-Group"]}>
                    <Button
                        className="Pref-btn btn"
                        loading={isLoading}
                        onClick={handleSubmit(onSubmit)}
                    >
                        Pick goal
                    </Button>
                    <Button
                        className="Back-btn btn"
                        loading={isLoading}
                        onClick={handleSubmit(onSubmit)}
                    >
                        Take me back
                    </Button>
                </div>
            </Modal>
        </Layout>
    )

}
export default AddGoals