import React, { useState } from 'react';
import styles from'./Guidance.module.scss';
import Layout from '../../layouts/Layout/Layout';
import { Button, Tooltip } from 'antd';
import { DeleteOutlined, RightOutlined } from '@ant-design/icons';
import { AiOutlineQuestionCircle } from 'react-icons/ai';
import {
    Chart as ChartJS,
  } from 'chart.js';
  import 'chartjs-adapter-date-fns';
import { Line } from 'react-chartjs-2';



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
    return (
        <Layout defaultHeader={true} hamburger={true}>
            {/* Top title with Delete button */}
            <div className={styles["Prevn-wrap"]}>
                <h2 className={styles["Prevn-text"]}>Insomnia prevention</h2>
                <Button className={styles["Prevn-btn"]}><DeleteOutlined style={{ fontSize: '28px', color: '#D2D1D1' }} /></Button>
            </div>

            <div className={styles["Vel-Eta-wrap"]}>
                <div className={styles["Vel-wrap"]}>
                    {/* Single Velocity Wrap */}
                    <span className={styles["Vel-name"]}>
                        Velocity
                        <Tooltip
                            title={'Some Text To be Display'}
                            placement="bottomRight"
                            overlayStyle={{marginRight:'10px'}}
                            mouseLeaveDelay={0}
                        >
                        <AiOutlineQuestionCircle size={30} style={{ marginLeft: '6px'}}/>
                        </Tooltip>
                        </span>
                    <h2 className={styles["Vel-number"]}>2<span className={styles["Vel-subs"]}>Points/ day</span></h2>
                </div>
                {/* Single ETA wrap */}
                <div className={styles["Vel-wrap"]}>
                    <span className={styles["Vel-name"]}>
                        ETA
                        <Tooltip
                            title={'Some Text To be Display'}
                            placement="bottomRight"
                            overlayStyle={{marginRight:'10px'}}
                            mouseLeaveDelay={0}
                        >
                        <AiOutlineQuestionCircle size={30} style={{ marginLeft: '6px'}}/>
                        </Tooltip>
                    </span>
                    <h2 className={styles["Vel-number"]}>10<span className={styles["Vel-subs"]}>day</span></h2>
                </div>
            </div>

            <div className={styles["Stat-wrap"]}>
                {/* Single Stat bar section */}
                <div className={styles["Stat-Single"]}>
                    <div className={styles["Stat-bar"]}><span className={styles["Stat-bar-progress"]} style={{ width: '45%', backgroundColor: '#DFC877'}}></span></div>
                    <div className={styles["Vel-wrap"]}>
                        <span className={styles["Vel-name"]}>Success</span>
                        <h2 className={styles["Vel-number"]}>
                            40
                            <span className={styles["Stat-subs"]}> / 100</span>
                            <Tooltip
                                title={'Some Text To be Display'}
                                placement="bottomRight"
                                overlayStyle={{marginRight:'10px'}}
                                className={styles["Vel-name"]}
                                mouseLeaveDelay={0}
                            >
                            <AiOutlineQuestionCircle size={30} style={{ marginLeft: '6px'}}/>
                            </Tooltip>
                        </h2>
                    </div>
                </div>
                {/* Single Stat bar section */}
                <div className={styles["Stat-Single"]}>
                    <div className={styles["Stat-bar"]}><span className={styles["Stat-bar-progress"]} style={{ width: '25%', backgroundColor: '#5BD056'}}></span></div>
                    <div className={styles["Vel-wrap"]}>
                        <span className={styles["Vel-name"]}>Data requirement</span>
                        <h2 className={styles["Vel-number"]}>
                            10
                            <span className={styles["Stat-subs"]}> / 100</span>
                            <Tooltip
                                title={'Some Text To be Display'}
                                placement="bottomRight"
                                overlayStyle={{marginRight:'10px'}}
                                className={styles["Vel-name"]}
                                mouseLeaveDelay={0}
                            >
                            <AiOutlineQuestionCircle size={30} style={{ marginLeft: '6px'}}/>
                            </Tooltip>
                        </h2>
                    </div>
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
                <Button className={styles["Rec-Guidance"]} type="primary"  style={{ color: `#657FD1` , backgroundColor: `rgba(101 127 209 / 0.16)` }}>
                    <span className={styles["Rec-Text"]}>Get to sleep by 11:00pm everyday</span>
                    <RightOutlined className={styles["Arrow"]}/>
                </Button>
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