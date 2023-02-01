import React, { useEffect, useState } from 'react';
import styles from'./GoalDetails.module.scss';
import v from '../../../variables.module.scss'
import Layout from '../../../layouts/Layout/Layout';
import { Button, Modal, Tooltip, Spin, Progress } from 'antd';
import { DeleteOutlined, LeftOutlined, RightOutlined, CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons';
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
import moment from 'moment'


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
                ticks: {
                    stepSize: 25,
                },
                grid: {
                    display: false,
                    drawBorder: false
                }
            },
        },
    };
    const calculate = (response:any) => {
        let forecastTime, historicalTime, forecastArray, historicalArray
        if (response.data.forecast) {
            forecastTime = response?.data.forecast.times.map((item:any) => {
                return item;
            });

            //setForecastData
            const forecast = response?.data.forecast.expectation;
            forecastArray = []
            for (let i = 0; i < forecast.length; i++) {
                const dataArray = [];
                dataArray.push(forecastTime[i]);
                dataArray.push(forecast[i]);
                forecastArray.push(dataArray);
            }
        }
        if (response.data.historical) {
            historicalTime = response?.data.historical.times.map((item:any) => {
                return item;
            });
            //setHistoricalData
            const expectation = response?.data.historical.expectation;
            historicalArray = []
            for (let i = 0; i < expectation.length; i++) {
                const dataArray = [];
                dataArray.push(historicalTime[i]);
                dataArray.push(expectation[i]);
                historicalArray.push(dataArray);
            }
        }
        if(forecastTime){
            setForecastStartDate(forecastTime[0]);
            setForecastLastDate(forecastTime[forecastTime.length - 1]);
        } else {
            setForecastStartDate(historicalTime[0]);
            setForecastLastDate(moment().add(2, 'weeks').format('YYYY-MM-DDTHH:mm:ssZ').toString());
        }
        forecastArray == undefined ? forecastArray = [[moment().add(2, 'weeks').format('YYYY-MM-DDTHH:mm:ssZ').toString(), null]] : null

          data = {
            datasets: [
              {
                label: 'Historical',
                data: historicalArray,
                fill: false,
                borderColor: v['secondary-color1'],
                backgroundColor: v['secondary-color1'],
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
                backgroundColor: v['secondary-color2'],
                borderColor: v['secondary-color2'],
                pointBorderWidth: '0',	
              },
            ],
          };
          setDataset(data);
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
            res.data = {
                "id": "340d9adb-4927-19d2-8721-132b7d3ff77f",
                "info": {
                    "id": "340d9adb-4927-19d2-8721-132b7d3ff77f",
                    "name": "TMJ Disorder Management",
                    "acronym": "TMJDM",
                    "goal_class": "management",
                    "color": "CD6052",
                    "description_md": "### Objective of this goal\n\nThe objective of the goal is to manage temporomandibular joint (TMJ) disorder and eliminate symptoms.\n\n**To select this goal, you should have a diagnosis of the disorder.**\n\n### About TMJ Disorder Management\n\n<iframe width=100%\" src=\"https://www.youtube.com/embed/mB468Jh9aAY\" title=\"YouTube video player\" frameborder=\"0\" allow=\"\naccelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>\n\nAs your AI health assistant, I am here to help you manage your temporomandibular joint (TMJ) disorder and keep the\ncondition in remission. The TMJ is the joint that connects your jaw to your skull, and TMJ disorder is a condition that\ncauses pain and discomfort in this joint. It can also cause other symptoms, such as difficulty chewing, headaches, and a\nclicking or popping sound when you move your jaw.\n\nTo help you accomplish this health goal, I will provide you with information and resources on how to manage your TMJ\ndisorder. This may include exercises to stretch and strengthen the muscles in your jaw, as well as tips on how to reduce\nstress and tension that can contribute to the condition. I may also suggest that you see a healthcare professional, such\nas a dentist or a physical therapist, for additional support and treatment.\n\nThe benefits of keeping your TMJ disorder in remission are significant. By managing the condition effectively, you can\nreduce or eliminate the pain and discomfort that it causes, as well as improve your ability to chew and speak. In\naddition, maintaining your TMJ health can help prevent long-term damage to the joint, which can lead to more serious\nhealth problems. Overall, taking care of your TMJ disorder can help you live a healthier and more comfortable life."
                },
                "data": {
                    "id": "340d9adb-4927-19d2-8721-132b7d3ff77f",
                    "guidance_ids": [
                        "34da6d73-00b7-a99b-6165-19fe7db03730"
                    ],
                    "success_score": 20,
                    "data_score": 81,
                    "eta": null,
                    "velocity": 4,
                    "historical": {
                        "times": [
                            "2023-01-30T00:00:00+05:00"
                        ],
                        "expectation": [
                            2.98
                        ]
                    },
                    "forecast": null
                },
                "guidances": [
                    {
                        "info": {
                            "id": "34da6d73-00b7-a99b-6165-19fe7db03730",
                            "name": "Healthy Oral Behaviour for TMD",
                            "description_md": "## Guidance\n- [ ] There are some behaviors that can make your TMD symptoms worse or even cause TMD.\n- [ ] Please pay attention to these behaviors and try to avoid them.\n- [ ] Your pain should significantly reduce after 10 days\n\n\n## The Science\n__Read time__:  ~ 1 min.\n\nTemporomandibular joint disorder (TMD) is a condition that affects the jaw joint and the muscles that control jaw\nmovement. It can cause pain and discomfort in the jaw, face, head, neck, and shoulders, as well as difficulty opening\nand closing the mouth, clicking or popping sounds in the jaw, and difficulty biting or chewing.\n\nThe guidance \"Health Oral Behaviour for TMD\" is based on the idea that certain oral behaviours can cause or exacerbate\nTMD. These behaviours include clenching or grinding teeth, sleeping in a position that puts pressure on the jaw, and\nbiting or chewing on hard objects.\n\nClenching or grinding teeth, also known as bruxism, can put excessive pressure on the jaw joint and the surrounding\nmuscles, leading to pain and discomfort. This can occur during sleep or while awake. A mouthguard can help to reduce\nthis pressure by creating a barrier between the upper and lower teeth.\n\nSleeping in a position that puts pressure on the jaw can also lead to TMD. This can include sleeping on the stomach,\nwhich can force the jaw to the side, or sleeping on the side, which can put pressure on the jaw joint. Changing to a\nside-sleeping position can help to reduce this pressure.\n\nGrinding or clenching teeth during waking hours, biting, chewing or playing with your tongue, cheeks, or lips, holding\njaw in rigid or tense position, and using chewing gum can also lead to excessive pressure on the jaw and surrounding\nmuscles, leading to TMD.\n\nHolding or jutting jaw forward or to the side, pressing tongue forcibly against teeth, placing tongue between teeth,\nholding between the teeth or biting objects such as hair, pipe, pencils, pens, fingers, fingernails, etc. can also put\npressure on the jaw and lead to TMD.\n\nHolding the jaw in a rigid or tense position, such as to brace or protect the jaw, leaning with your hand on the jaw,\nsuch as cupping or resting the chin in the hand, and holding the telephone between your head and shoulders can also put\npressure on the jaw.\n\nThe expected outcome of this guidance is to help reduce the symptoms of TMD by eliminating oral behaviours that can\ncause or exacerbate the condition. This can include reducing pain and discomfort in the jaw, face, head, neck, and\nshoulders, as well as improving jaw movement and reducing clicking or popping sounds in the jaw."
                        },
                        "data": {
                            "status": "new",
                            "id": "34da6d73-00b7-a99b-6165-19fe7db03730"
                        }
                    }
                ]
            }
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
    const handleBack = () => {
        navigate('/dashboard');
    };
    return (
        <Layout defaultHeader={true} hamburger={true}>
             <div className={styles['Backflex']} onClick={handleBack}>
                <LeftOutlined className={styles['LeftIcon']} /> Back
            </div>
            {/* Top title with Delete button */}
            <div className={styles["Prevn-wrap"]}>
                <Button className={styles["Prevn-btn"]} onClick={() => handleDelete(goalId)}><DeleteOutlined style={{ fontSize: '18px', color: '#D2D1D1', cursor: 'pointer' }} /></Button>
                <h2 className={styles["Prevn-text"]}>{goal?.info.name}</h2>
            </div>
            <Spin spinning={isLoading} className="Spinner"></Spin>
            { goal?.data && (
                <>
            <div className={styles["Vel-Eta-wrap"]}>
                {goal?.data?.success_score !== null && goal?.data?.velocity !== undefined && <div className={styles["Vel-wrap"]}>
                    {/* Single Velocity Wrap */ }
                    <span className={styles["Vel-name"]}>
                        G
                        <Progress 
                            style={{margin: '0 25px'}}
                            percent={goal.data.success_score} 
                            showInfo={false}
                            strokeColor={v['secondary-color1']}
                            strokeWidth={20}
                        />
                        <Tooltip
                            title={'Some Text To be Display'}
                            placement="bottomRight"
                            overlayStyle={{marginRight:'10px'}}
                            mouseLeaveDelay={0}
                        >
                        <AiOutlineQuestionCircle size={30} style={{ color: '#D2D1D1', marginLeft: '6px'}}/>
                        </Tooltip>
                    </span>
                </div>}
                {/* Single ETA wrap */}
                {goal?.data?.data_score && <div className={styles["Vel-wrap"]}>
                    <span className={styles["Vel-name"]}>
                        D
                        <Progress 
                            style={{margin: '0 25px'}}
                            percent={goal.data.data_score} 
                            showInfo={false}
                            strokeColor={v['secondary-color2']}
                            strokeWidth={20}
                        />
                        <Tooltip
                            title={'Some Text To be Display'}
                            placement="bottomRight"
                            overlayStyle={{marginRight:'10px'}}
                            mouseLeaveDelay={0}
                        >
                        <AiOutlineQuestionCircle size={30} style={{ color: '#D2D1D1', marginLeft: '6px'}}/>
                        </Tooltip>
                    </span>
                </div>}
            </div>
            </>
            )}

            {/* Chart */}
            {dataset && (
                <>
                    <div className={styles["Chart-title"]}>
                        <div style={{fontSize: '25px'}}>Goal Success</div>
                        <div className={styles['Succes-score']}>
                            {goal?.data.success_score} 
                            <div className={styles['Velocity']} style={{color: `${goal.data.velocity && goal.data.velocity < 0 ? v['primary-color1'] : 'green'}`}}>
                                {goal?.data.velocity} 
                                {goal.data.velocity && (goal.data.velocity < 0 ? <CaretDownOutlined style={{color: v['primary-color1']}}/> : <CaretUpOutlined style={{color: 'green'}}/>)}
                            </div>
                           
                        </div>

                        <Tooltip
                            title="Success Score"
                            placement="bottomRight"
                            overlayStyle={{marginRight:'10px'}}
                            mouseLeaveDelay={0}
                            style={{marginRight: '10px'}}
                        >
                        <AiOutlineQuestionCircle size={30} style={{ color: '#D2D1D1', marginLeft: '6px'}}/>
                        </Tooltip>
                    </div>
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
            <>
            {goal?.guidances?.find((element:any) => (element.data?.status === 'new')) && <>
            <h3 className={styles["Guidance-title"]}>
                New Guidance
            </h3>
            </>}
            {goal?.guidances.map((o:any, key:any) => (
                <>
                {o.data && <div key={o.data.id}>
                { o.data.status == 'new' && (
                
                    <div className={styles["Rec-wrap"]} key={key}>
                        {o.info && (<Button onClick={()=>handleClick('new', o.info)} className={styles["Rec-Guidance"]} type="primary"  style={{ color: v['secondary-color1'] , backgroundColor: `rgba(106, 44, 112, 0.11)` }}>

                            {/* <span className={styles["Rec-Text"]}><ReactMarkdown>{o.info.description_md}</ReactMarkdown></span> */}
                          {o.info.name && (<span className={styles["Rec-Text"]}>{o.info.name}</span>)}
                            <RightOutlined className={styles["Arrow"]}/>
                        </Button>)}
                    </div>
                
                )}
                </div>}
                </>
            ))}
            </>
            {/* Active Guidance */}
            <>
            {goal?.guidances?.find((element:any) => (element.data?.status === 'active')) && <>
            <h3 className={styles["Guidance-title"]}>
                Active Guidance
            </h3>
            </>}
            {goal?.guidances.map((o:any) => (
                <>
                {o.data && <div key={o.data.id}>
                {o.data.status === 'active' && (
                    <div className={styles["Rec-wrap"]}>
                        <Button onClick={()=>handleClick('active',o.info)}  className={styles["Rec-Guidance"]} type="primary"  style={{ color: v['secondary-color1'] , backgroundColor: `rgba(246, 187, 161, 0.16)` }}>
                            <span className={styles["Rec-Text"]}>{o.info.name}</span>
                            <RightOutlined className={styles["Arrow"]}/>
                        </Button>
                    </div>
                )}
                </div>
                }
                </>
            ))}
            </>
            {/* Inactive Guidance */}
            <>
            {goal?.guidances?.find((element:any) => (element.data?.status === 'inactive')) && <>
            <h3 className={styles["Guidance-title"]}>
                Inactive Guidance
            </h3>
            </>}
            {goal?.guidances.map((o:any) => (
                <>
                {o.data && <div key={o.data.id}>
                { o.data && o.data.status === 'inactive' && (
               
                    <div className={styles["Rec-wrap"]}>
                        <Button onClick={()=>handleClick('inactive',o.info)}  className={styles["Rec-Guidance"]} type="primary"  style={{ color: v['secondary-color1'] , backgroundColor: 'rgba(214, 214, 214, 0.24)' }}>
                            <span className={styles["Rec-Text"]}>{o.info.name}</span>
                            <RightOutlined className={styles["Arrow"]}/>
                        </Button>
                    </div>
                
                )}
                </div>
                }
                </>
            ))}
            </>
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
                {(type === 'new') && <div className='Btn-group'>
                    <Button
                        className="Pref-btn btn Guidance-Inactive-btn"
                        onClick={()=>handleGuidanceStatus('inactive')}
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
                {(type === 'inactive') && <div className='Btn-group'>
                    <Button
                        className="Pref-btn btn  Inactive-Guidance-active-btn"
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