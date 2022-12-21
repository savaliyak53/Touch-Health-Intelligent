import React, { useEffect, useState } from 'react';
import styles from'./Guidance.module.scss';
import Layout from '../../layouts/Layout/Layout';
import { Button, Tooltip } from 'antd';
import { DeleteOutlined, RightOutlined } from '@ant-design/icons';
import { AiOutlineQuestionCircle } from 'react-icons/ai';
import { toast } from 'react-toastify';
import ReactMarkdown from 'react-markdown'
import { goalDetails } from '../../services/goalsService'
import {
    Chart as ChartJS,
  } from 'chart.js';
  import 'chartjs-adapter-date-fns';
import { Line } from 'react-chartjs-2';



const Guidance = () => {
    const [goal, setGoal] = useState<any>()
    const data = {
      labels: goal?.data.forecast.times,
      datasets: [
        {
          label: 'Historical',
          data: goal?.data.forecast.expectation,
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
                <h2 className={styles["Prevn-text"]}>{goal?.info.name}</h2>
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
                    <h2 className={styles["Vel-number"]}>{goal?.data.velocity}<span className={styles["Vel-subs"]}>Points/ day</span></h2>
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
                    <h2 className={styles["Vel-number"]}>{goal?.data.eta}<span className={styles["Vel-subs"]}>day</span></h2>
                </div>
            </div>

            <div className={styles["Stat-wrap"]}>
                {/* Single Stat bar section */}
                <div className={styles["Stat-Single"]}>
                    <div className={styles["Stat-bar"]}><span className={styles["Stat-bar-progress"]} style={{ width: `${goal?.data.success_score+'%'}`, backgroundColor: '#DFC877'}}></span></div>
                    <div className={styles["Vel-wrap"]}>
                        <span className={styles["Vel-name"]}>Success</span>
                        <h2 className={styles["Vel-number"]}>
                            {goal?.data.success_score}
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
                    <div className={styles["Stat-bar"]}><span className={styles["Stat-bar-progress"]} style={{ width: `${goal?.data.data_score+'%'}`, backgroundColor: '#5BD056'}}></span></div>
                    <div className={styles["Vel-wrap"]}>
                        <span className={styles["Vel-name"]}>Data requirement</span>
                        <h2 className={styles["Vel-number"]}>
                            {goal?.data.data_score}
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
                {goal?.data.chart_title}
                <Tooltip
                    title={goal?.data.chart_tooltip}
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
                    options={options}
                    data={data}
                />
            </div>

            {/* New Guidance */}
            {goal?.guidances.map((o:any) => (
                <div key={o.data.id}>
                { o.data.status == 'new' && (
                <>
                    <h3 className={styles["Guidance-title"]}>
                        New Guidance
                    </h3>
                    <div className={styles["Rec-wrap"]}>
                        <Button className={styles["Rec-Guidance"]} type="primary"  style={{ color: `#657FD1` , backgroundColor: `rgba(214 214 214 / 0.16)` }}>
                            {/* <span className={styles["Rec-Text"]}><ReactMarkdown>{o.info.description_md}</ReactMarkdown></span> */}
                            <span className={styles["Rec-Text"]}>{o.info.name}</span>
                            <RightOutlined className={styles["Arrow"]}/>
                        </Button>
                    </div>
                </>
                )}
                </div>
            ))}
            {/* Active Guidance */}
            {goal?.guidances.map((o:any) => (
                <div key={o.data.id}>
                { o.data.status == 'active' && (
                <>
                    <h3 className={styles["Guidance-title"]}>
                        Active Guidance
                    </h3>
                    <div className={styles["Rec-wrap"]}>
                        <Button className={styles["Rec-Guidance"]} type="primary"  style={{ color: `#657FD1` , backgroundColor: `rgba(101 127 209 / 0.16)` }}>
                            <span className={styles["Rec-Text"]}>{o.info.name}</span>
                            <RightOutlined className={styles["Arrow"]}/>
                        </Button>
                    </div>
                </>
                )}
                </div>
            ))}
            {/* Inactive Guidance */}
            {goal?.guidances.map((o:any) => (
                <div key={o.data.id}>
                { o.data.status == 'inactive' && (
                <>
                    <h3 className={styles["Guidance-title"]}>
                        Inactive Guidance
                    </h3>
                    <div className={styles["Rec-wrap"]}>
                        <Button className={styles["Rec-Guidance"]} type="primary"  style={{ color: `#657FD1` , backgroundColor: `rgba(25 150 44 / 0.16)` }}>
                            <span className={styles["Rec-Text"]}>{o.info.name}</span>
                            <RightOutlined className={styles["Arrow"]}/>
                        </Button>
                    </div>
                </>
                )}
                </div>
            ))}
            {/* <h3 className={styles["Guidance-title"]}>
                New Guidance
            </h3>
            <div className={styles["Rec-wrap"]}>
                <Button className={styles["Rec-Guidance"]} type="primary"  style={{ color: `#657FD1` , backgroundColor: `rgba(101 127 209 / 0.16)` }}>
                    <span className={styles["Rec-Text"]}>Get to sleep by 11:00pm everyday</span>
                    <RightOutlined className={styles["Arrow"]}/>
                </Button>
            </div>

            <h3 className={styles["Guidance-title"]}>
                New Guidance
            </h3>
            <div className={styles["Rec-wrap"]}>
                <Button className={styles["Rec-Guidance"]} type="primary"  style={{ color: `#657FD1` , backgroundColor: `rgba(25 150 44 / 0.16)` }}>
                    <span className={styles["Rec-Text"]}>Get to sleep by 11:00pm everyday</span>
                    <RightOutlined className={styles["Arrow"]}/>
                </Button>
            </div> */}


        </Layout>
    )

}
export default Guidance