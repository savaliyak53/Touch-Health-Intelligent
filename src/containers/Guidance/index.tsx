import React, { useState } from 'react';
import styles from'./Guidance.module.scss';
import Layout from '../../layouts/Layout/Layout';
import { Button, Tooltip } from 'antd';
import { DeleteOutlined, RightOutlined, LeftOutlined } from '@ant-design/icons';
import { AiOutlineQuestionCircle } from 'react-icons/ai';
import {
    Chart as ChartJS,
  } from 'chart.js';
  import 'chartjs-adapter-date-fns';
import { Line } from 'react-chartjs-2';
import { Modal } from 'antd';



const Guidance = () => {
    const data = {
      labels: ['Jan', 'Feb', 'Mar', 'Apr'],
      datasets: [
        {
          label: 'Historical',
          data: [1, 2, 3, 4, 5],
          fill: false,
          borderColor: '#C47061',
          backgroundColor: '#C47061',
          lineTension: 0.4,
          min: 0,
          max: 1,
        },
      ]
    };
    const [open, setOpen] = useState(false);
    return (
        <Layout defaultHeader={true} hamburger={true}>
            {/* Top title with Delete button */}
            <div className={styles["Prevn-wrap"]}>
                <h2 className={styles["Prevn-text"]}>Insomnia prevention</h2>
                <Button className={styles["Prevn-btn"]}><DeleteOutlined style={{ fontSize: '28px', color: '#D2D1D1' }} /></Button>
            </div>

            <div className={styles["Vel-Eta-wrap"]}>
                {/* Single Velocity Wrap */}
                <div className={styles["Vel-wrap"]}>
                    <span className={styles["Vel-name"]}>
                        Velocity
                    </span>
                    <h2 className={styles["Vel-number"]}>
                        2
                        <span className={styles["Vel-subs"]}>
                            Points/ day
                            <Tooltip
                                title={'Some Text To be Display'}
                                placement="bottomRight"
                                overlayStyle={{marginRight:'10px'}}
                                mouseLeaveDelay={0}
                            >
                            <AiOutlineQuestionCircle size={30} style={{ marginLeft: '6px'}}/>
                            </Tooltip>
                        </span>
                    </h2>
                </div>
                {/* Single Velocity Wrap */}
                <div className={styles["Vel-wrap"]}>
                    <span className={styles["Vel-name"]}>
                    Expected completion
                    </span>
                    <h2 className={styles["Vel-number"]}>
                        10
                        <span className={styles["Vel-subs"]}>
                            Days
                            <Tooltip
                                title={'Some Text To be Display'}
                                placement="bottomRight"
                                overlayStyle={{marginRight:'10px'}}
                                mouseLeaveDelay={0}
                            >
                            <AiOutlineQuestionCircle size={30} style={{ marginLeft: '6px'}}/>
                            </Tooltip>
                        </span>
                    </h2>
                </div>
                {/* Single Velocity Wrap */}
                <div className={styles["Vel-wrap"]}>
                    <span className={styles["Vel-name"]}>
                    Data requirement
                    </span>
                    <h2 className={styles["Vel-number"]}>
                        10
                        <span className={styles["Vel-subs"]}>
                            100
                            <Tooltip
                                title={'Some Text To be Display'}
                                placement="bottomRight"
                                overlayStyle={{marginRight:'10px'}}
                                mouseLeaveDelay={0}
                            >
                            <AiOutlineQuestionCircle size={30} style={{ marginLeft: '6px'}}/>
                            </Tooltip>
                        </span>
                    </h2>
                </div>
            </div>

            {/* Chart */}
            <h3 className={styles["Chart-title"]}>
                Chart Title
                <Tooltip
                    title={'Some Text To be Display'}
                    placement="bottomRight"
                    overlayStyle={{marginRight:'10px'}}
                    className={styles["Vel-name"]}
                    mouseLeaveDelay={0}
                >
                <AiOutlineQuestionCircle size={30} style={{ marginLeft: '6px'}}/>
                </Tooltip>
            </h3>
            <div>
                <Line
                    data={data}
                />
            </div>

            {/* New Guidance */}
            <h3 className={styles["Guidance-title"]}>
                New Guidance
            </h3>
            <div className={styles["Rec-wrap"]}>
                <Button className={styles["Rec-Guidance"]} onClick={() => setOpen(true)} type="primary"  style={{ color: `#657FD1` , backgroundColor: `rgba(101 127 209 / 0.16)` }}>
                    <span className={styles["Rec-Text"]}>Get to sleep by 11:00pm everyday</span>
                    <RightOutlined className={styles["Arrow"]}/>
                </Button>
                {/* Active Guidance Modal ( onClick={() => setOpen(true)} ) */}
                <Modal
                    className='Guidance-Modal'
                    open={open}
                    zIndex={99999}
                    closeIcon={<><LeftOutlined />Back</>}
                    footer={false}
                    onCancel={() => setOpen(false)}
                >
                    <p className={styles["Modal-subtitle"]}>Active</p>
                    <h2 className={styles["Modal-Title"]}>Get to sleep by 11:00pm Everyday</h2>
                    <h3 className={styles["Modal-DescTitle"]}>Description of guidance that is pretty long and requires 3 lines</h3>
                    <p className={styles["Modal-Text"]}>With that in mind, here are 10 reasons to prioritize</p>
                    <p className={styles["Modal-Text"]}>With that in mind, here are 10 reasons to prioritize shut-eyeWith that in mind, here are 10 reasons to prioritize shut-eye</p>
                    <img src={`${process.env.PUBLIC_URL}/assets/mobileassets/background-mobile.png`} alt="Image" />
                    <p className={styles["Modal-Text"]}>With that in mind, here are 10 reasons to prioritize shut-eyeWith that in mind, here are 10 reasons to prioritize shut-eye</p>

                    {/* Modal Single button */}
                    <Button
                        className="Pref-btn btn Guidance-Inactive-btn"
                    >
                        Inactivate guidance
                    </Button>

                    {/* Modal Group Button */}
                    <div className='Btn-group'>
                        <Button
                            className="Pref-btn btn Guidance-Inactive-btn"
                        >
                            Not for me
                        </Button>
                        <Button
                            className="Pref-btn btn  Guidance-active-btn"
                        >
                            Activate guidance
                        </Button>
                    </div>
                </Modal>
            </div>

            {/* Active Guidance */}
            <h3 className={styles["Guidance-title"]}>
                New Guidance
            </h3>
            <div className={styles["Rec-wrap"]}>
                <Button className={styles["Rec-Guidance"]} type="primary"  style={{ color: `#657FD1` , backgroundColor: `rgba(25 150 44 / 0.16)` }}>
                    <span className={styles["Rec-Text"]}>Get to sleep by 11:00pm everyday</span>
                    <RightOutlined className={styles["Arrow"]}/>
                </Button>
                <Button className={styles["Rec-Guidance"]} type="primary"  style={{ color: `#657FD1` , backgroundColor: `rgba(25 150 44 / 0.16)` }}>
                    <span className={styles["Rec-Text"]}>Get to sleep by 11:00pm everyday</span>
                    <RightOutlined className={styles["Arrow"]}/>
                </Button>
            </div>

            {/* Inactive Guidance */}
            <h3 className={styles["Guidance-title"]}>
                New Guidance
            </h3>
            <div className={styles["Rec-wrap"]}>
                <Button className={styles["Rec-Guidance"]} type="primary"  style={{ color: `#657FD1` , backgroundColor: `rgba(214 214 214 / 0.16)` }}>
                    <span className={styles["Rec-Text"]}>Get to sleep by 11:00pm everyday</span>
                    <RightOutlined className={styles["Arrow"]}/>
                </Button>
            </div>
        </Layout>
    )

}
export default Guidance