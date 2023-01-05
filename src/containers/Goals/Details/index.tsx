import React, { useEffect, useState } from 'react';
import styles from'./GoalDetails.module.scss';
import Layout from '../../../layouts/Layout/Layout';
import { Button, Modal, Tooltip, Spin } from 'antd';
import { DeleteOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons';
import { AiOutlineQuestionCircle } from 'react-icons/ai';
import { toast } from 'react-toastify';
import ReactMarkdown from 'react-markdown'
import { goalDetails,deleteGoal } from '../../../services/goalsService'
import {
    Chart as ChartJS,
  } from 'chart.js';
import 'chartjs-adapter-date-fns';
import { Line } from 'react-chartjs-2';
import { useNavigate } from 'react-router';
import { useParams } from 'react-router-dom';
import rehypeRaw from "rehype-raw";
import { guidanceStatus } from '../../../services/authservice';
import { dateFormatRenewal } from '../../../utils/lib';
import { getInteractionServiceByType, preferencesService } from '../../../services/authservice';


const GoalDetails = () => {
    const [goal, setGoal] = useState<any>()
    const [open, setOpen] = useState<boolean>(false)
    const [type, setType] = useState<string>()
    const [guidanceData, setGuidanceDate] = useState<any>()

    const [dataset, setDataset] = useState<any>();
    const [startDate, setForecastStartDate] = useState<any>();
    const [lastDate, setForecastLastDate] = useState<any>();
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate()
    let data = {};
    const { id:goalId } = useParams<string>()

    const options:any = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
              display: false,
            },
          },
        scales: {
            x: {
                type: 'time',
                unit: 'day',
                time: {
                  displayFormats: {
                    quarter: 'MMM YYYY',
                  },
                },
                grid: {
                    display: false,
                    drawBorder: false
                }
            },
            y: {
                min: 0,
                max: 100,
                grid: {
                    display: false,
                    drawBorder: false
                }
            },
        },
    };
    const calculate = (response:any) => {
        if (response.data.forecast) {
          const forecastTime = response?.data.forecast.times.map((item:any) => {
            return item;
        });
          setForecastStartDate(forecastTime[0]);
          setForecastLastDate(forecastTime[forecastTime.length - 1]);
          const historicalTime = response?.data.historical.times.map((item:any) => {
            return item;
          });
          //setHistoricalData
          const expectation = response?.data.historical.expectation;
          const historicalArray = [];
          for (let i = 0; i < expectation.length; i++) {
            const dataArray = [];
            dataArray.push(historicalTime[i]);
            dataArray.push(expectation[i]);
            historicalArray.push(dataArray);
          }
          //setForecastData
          const forecast = response?.data.forecast.expectation;
          const forecastArray = [];
          for (let i = 0; i < forecast.length; i++) {
            const dataArray = [];
            dataArray.push(forecastTime[i]);
            dataArray.push(forecast[i]);
            forecastArray.push(dataArray);
          }
          data = {
            datasets: [
              {
                label: 'Historical',
                data: historicalArray,
                fill: false,
                borderColor: '#657FD1',
                backgroundColor: '#657FD1',
                lineTension: 1,
                borderCapStyle: 'round',
                borderWidth: '6',
                pointBorderWidth: '0'	
              },
              {
                label: 'Forecast',
                data: forecastArray,
                fill: false,
                lineTension: 1,
                borderCapStyle: 'round',
                borderWidth: '6',               
                backgroundColor: '#CD6052',
                borderColor: '#CD6052',
                pointBorderWidth: '0',	
              },
            ],
          };
          setDataset(data);          
        } else {
          setDataset({ datasets: [] });
        }
      };
    const dateHighlighter = {
        id: 'dateHighlighter',
        beforeDatasetsDraw(chart:any) {
          const {
            ctx,
            chartArea: { top, bottom, left, right, width, height },
            scales: { x, y },
          } = chart;
          ctx.fillStyle = 'rgba(0,0,0,0)';
          const forecastStartDate = new Date(startDate);
          const forecastLastDate = new Date(lastDate);
          ctx.fillRect(
            x.getPixelForValue(forecastStartDate),
            top,
            x.getPixelForValue(forecastLastDate) -
              x.getPixelForValue(forecastStartDate),
            height
          );
        },
    };
    const legendMargin = {
        id: 'legendMargin',
        beforeInit(chart:any, legend:any, options:any) {
            const fitValue = chart.legend.fit;
            chart.legend.fit = function fit() {
            fitValue.bind(chart.legend)();
            return (this.height += 20);
            };
        },
    };
    const getGoalDetails = (goalId:string) => {
        setIsLoading(true)
        goalDetails(goalId)
        .then((res:any)=>{
            setGoal(res.data)
            calculate(res.data)
            setIsLoading(false)
        })
        .catch((error: any) => {
            toast.error(error);
            setIsLoading(false)
        });
    }
    const handleDelete = (id:any) => {
        setIsLoading(true)
        deleteGoal(id)
        .then((res)=>{
            if(res){
                toast.success('Goal removed');
                navigate('/dashboard');
            }
        })
        .catch((error: any) => {
            toast.error(error);
            setIsLoading(false)
        });
    }
    const handleClick =(type:string, info:any)=>{
     setOpen(true)
     setType(type)
     setGuidanceDate(info)
    }
    const handleClose = ( )=>{
        setType(undefined)
        setGuidanceDate(undefined)
        setOpen(false)
    }
    const handleGuidanceStatus = (status:string)=>{
        //activate-inactivate guidance
        guidanceStatus(guidanceData.id,{"status": status}).then((response:any) => {
            if(response.data){
                if(goalId){
                 getGoalDetails(goalId)
                }
              setOpen(false)
            }
          })
          .catch((error) => {
            console.log('error is ', error);
            toast('Something went wrong');
          });    
    }
    useEffect(() => {
        if(goalId){
            getGoalDetails(goalId)
        }
    },[])
    return (
        <Layout defaultHeader={true} hamburger={true}>
            {/* Top title with Delete button */}
            <div className={styles["Prevn-wrap"]}>
                <h2 className={styles["Prevn-text"]}>{goal?.info.name}</h2>
                <Button className={styles["Prevn-btn"]} onClick={() => handleDelete(goalId)}><DeleteOutlined style={{ fontSize: '28px', color: '#D2D1D1', cursor: 'pointer' }} /></Button>
            </div>
            <Spin spinning={isLoading} className="Spinner"></Spin>
            { goal?.data && (
                <>
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
                    <h2 className={styles["Vel-number"]}>{goal?.data.velocity.toFixed(1)}<span className={styles["Vel-subs"]}>Points/ day</span></h2>
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
                    <h2 className={styles["Vel-number"]}>{dateFormatRenewal(goal?.data.eta)}</h2>
                </div>
            </div>

            <div className={styles["Stat-wrap"]}>
                {/* Single Stat bar section */}
                <div className={styles["Stat-Single"]}>
                    <div className={styles["Stat-bar"]}><span className={styles["Stat-bar-progress"]} style={{ width: `${goal?.data.success_score+'%'}`, backgroundColor: '#DFC877'}}></span></div>
                    <div className={styles["Vel-wrap"]}>
                        <span className={styles["Vel-name"]}>Success</span>
                        <h2 className={styles["Vel-number"]}>
                            {goal?.data.success_score.toFixed(2)}
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
                            {goal?.data.data_score.toFixed(2)}
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
            </>
            )}

            {/* Chart */}
            {dataset && (
                <>
                    <h3 className={styles["Chart-title"]}>
                        {goal?.data.chart_title}
                        <Tooltip
                            title="This shows how close you have been to achieving this goal in the past, and also your forecasted expectation if you continue doing all the things you currently do."
                            placement="bottomRight"
                            overlayStyle={{marginRight:'10px'}}
                            className={styles["Vel-name"]}
                            mouseLeaveDelay={0}
                        >
                        <AiOutlineQuestionCircle size={30} style={{ marginLeft: '6px'}}/>
                        </Tooltip>
                    </h3>
            <div className={styles["chart-container"]}>
                <Line
                    options={options}
                    data={dataset}
                    plugins={[dateHighlighter, legendMargin]}

                />
            </div>
                </>
            )}
          

            {/* New Guidance */}
            {goal?.guidances.map((o:any) => (
                <>
                {o.data && <div key={o.data.id}>
                { o.data.status == 'new' && (
                <>
                    <h3 className={styles["Guidance-title"]}>
                        New Guidance
                    </h3>
                    <div className={styles["Rec-wrap"]}>
                        <Button onClick={()=>handleClick('new', o.info)} className={styles["Rec-Guidance"]} type="primary"  style={{ color: `#657FD1` , backgroundColor: `rgba(214 214 214 / 0.16)` }}>
                            {/* <span className={styles["Rec-Text"]}><ReactMarkdown>{o.info.description_md}</ReactMarkdown></span> */}
                            <span className={styles["Rec-Text"]}>{o.info.name}</span>
                            <RightOutlined className={styles["Arrow"]}/>
                        </Button>
                    </div>
                </>
                )}
                </div>}
                </>
            ))}
            {/* Active Guidance */}
            {goal?.guidances.map((o:any) => (
                <>
                {o.data && <div key={o.data.id}>
                {o.data.status === 'active' && (
                <>
                    <h3 className={styles["Guidance-title"]}>
                        Active Guidance
                    </h3>
                    <div className={styles["Rec-wrap"]}>
                        <Button onClick={()=>handleClick('active',o.info)}  className={styles["Rec-Guidance"]} type="primary"  style={{ color: `#657FD1` , backgroundColor: `rgba(101 127 209 / 0.16)` }}>
                            <span className={styles["Rec-Text"]}>{o.info.name}</span>
                            <RightOutlined className={styles["Arrow"]}/>
                        </Button>
                    </div>
                </>
                )}
                </div>
                }
                </>
                
            ))}
            {/* Inactive Guidance */}
            {goal?.guidances.map((o:any) => (
                <>
                {o.data && <div key={o.data.id}>
                { o.data && o.data.status === 'inactive' && (
                <>
                    <h3 className={styles["Guidance-title"]}>
                        Inactive Guidance
                    </h3>
                    <div className={styles["Rec-wrap"]}>
                        <Button onClick={()=>handleClick('inactive',o.info)}  className={styles["Rec-Guidance"]} type="primary"  style={{ color: `#657FD1` , backgroundColor: `rgba(25 150 44 / 0.16)` }}>
                            <span className={styles["Rec-Text"]}>{o.info.name}</span>
                            <RightOutlined className={styles["Arrow"]}/>
                        </Button>
                    </div>
                </>
                )}
                </div>
                }
                </>
            ))}
            <Modal
                className='Guidance-Modal'
                visible={open}
                zIndex={99999}
                closeIcon={<><LeftOutlined />Back</>}
                footer={false}
                onCancel={handleClose}
            >
                {type && type ==='inactive' && <p className={styles["Modal-subtitle"]}>Inactive</p>}
                {type && type ==='active' && <p className={styles["Modal-subtitle"]}>Active</p>}
                {type && type === 'new' && <h2 className={styles["Modal-Title"]}>New Guidance</h2> } 
                {guidanceData && <ReactMarkdown rehypePlugins={[rehypeRaw]}>{guidanceData.description_md}</ReactMarkdown>}
                
                {type === 'active' && <Button
                    className="Pref-btn btn Guidance-Inactive-btn"
                    onClick={()=>handleGuidanceStatus('inactive')}
                >
                    Inactivate guidance
                </Button>}
                {type === 'inactive' && <div className='Btn-group'>
                    <Button
                        className="Pref-btn btn Guidance-Inactive-btn"
                        onClick={handleClose}
                    >
                        Not for me
                    </Button>
                    <Button
                        className="Pref-btn btn  Guidance-active-btn"
                        onClick={()=>handleGuidanceStatus('active')}
                    >
                        Activate guidance
                    </Button>
                </div>}
                
            </Modal>

        </Layout>
    )

}
export default GoalDetails