import React, { useEffect, useState } from 'react';
import styles from './GoalDetails.module.scss';
import streakStyles from '../../DashboardNew/DashboardNew.module.scss';
import v from '../../../variables.module.scss';
import Layout from '../../../layouts/Layout/Layout';
import { Modal, Spin } from 'antd';
import { Row, Col, Typography, Tooltip, Button, Progress } from 'antd';
import {
  DeleteOutlined,
  LeftOutlined,
  RightOutlined,
  CaretDownOutlined,
  CaretUpOutlined,
  InfoOutlined,
} from '@ant-design/icons';
import { AiOutlineQuestionCircle } from 'react-icons/ai';
import { toast } from 'react-toastify';
import ReactMarkdown from 'react-markdown';
import { goalDetails, deleteGoal } from '../../../services/goalsService';
import { Chart as ChartJS } from 'chart.js';
import 'chartjs-adapter-date-fns';
import { Line } from 'react-chartjs-2';
import { useNavigate } from 'react-router';
import { useParams } from 'react-router-dom';
import rehypeRaw from 'rehype-raw';
import { guidanceStatus } from '../../../services/authservice';
import moment from 'moment';
import { timeFrom } from '../../../utils/lib';
import ConfirmModal from '../../../components/Modal/ConfirmModal';
import { getDashboard } from '../../../services/dashboardservice';
import LastGoalModal from '../../../components/Modal/LastGoalModal';

const GoalDetails = () => {
  const [goal, setGoal] = useState<any>();
  const [elements, setElements] = useState<any>();
  const [open, setOpen] = useState<boolean>(false);
  const [type, setType] = useState<string>();
  const [guidanceData, setGuidanceDate] = useState<any>();
  const [followUpData, setFollowUpData] = useState<any>();
  const [followUpPattern, setFollowUpPattern] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [dataset, setDataset] = useState<any>();
  const [startDate, setForecastStartDate] = useState<any>();
  const [lastDate, setForecastLastDate] = useState<any>();
  const [isLoading, setIsLoading] = useState(true);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showLastGoalModal, setShowLastGoalModal] = useState(false);
  const [showGoalInfoModal, setShowGoalInfoModal] = useState(false);

  const navigate = useNavigate();
  let data = {};
  const { id: goalId } = useParams<string>();

  const options: any = {
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
          drawBorder: false,
        },
      },
      y: {
        min: 0,
        max: 100,
        ticks: {
          stepSize: 25,
        },
        grid: {
          display: false,
          drawBorder: false,
        },
      },
    },
  };
  const calculate = (response: any) => {
    let forecastTime, historicalTime, forecastArray, historicalArray;
    if (response.data.forecast) {
      forecastTime = response?.data.forecast.times.map((item: any) => {
        return item;
      });

      //setForecastData
      const forecast = response?.data.forecast.expectation;
      forecastArray = [];
      for (let i = 0; i < forecast.length; i++) {
        const dataArray = [];
        dataArray.push(forecastTime[i]);
        dataArray.push(forecast[i]);
        forecastArray.push(dataArray);
      }
    }
    if (response.data.historical) {
      historicalTime = response?.data.historical.times.map((item: any) => {
        return item;
      });
      //setHistoricalData
      const expectation = response?.data.historical.expectation;
      historicalArray = [];
      for (let i = 0; i < expectation.length; i++) {
        const dataArray = [];
        dataArray.push(historicalTime[i]);
        dataArray.push(expectation[i]);
        historicalArray.push(dataArray);
      }
    }
    if (forecastTime) {
      setForecastStartDate(forecastTime[0]);
      setForecastLastDate(forecastTime[forecastTime.length - 1]);
    } else {
      setForecastStartDate(historicalTime[0]);
      setForecastLastDate(
        moment().add(2, 'weeks').format('YYYY-MM-DDTHH:mm:ssZ').toString()
      );
    }
    forecastArray == undefined
      ? (forecastArray = [
          [
            moment().add(2, 'weeks').format('YYYY-MM-DDTHH:mm:ssZ').toString(),
            null,
          ],
        ])
      : null;

    data = {
      datasets: [
        {
          label: 'Historical',
          data: historicalArray,
          fill: false,
          borderColor: v['primary-color1'],
          backgroundColor: v['primary-color1'],
          lineTension: 1,
          borderCapStyle: 'round',
          borderWidth: '6',
          pointBorderWidth: '0',
        },
        {
          label: 'Forecast',
          data: forecastArray,
          fill: false,
          lineTension: 1,
          borderCapStyle: 'round',
          borderWidth: '6',
          backgroundColor: v['primary-color3'],
          borderColor: v['primary-color3'],
          pointBorderWidth: '0',
        },
      ],
    };
    setDataset(data);
  };
  const dateHighlighter = {
    id: 'dateHighlighter',
    beforeDatasetsDraw(chart: any) {
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
    beforeInit(chart: any, legend: any, options: any) {
      const fitValue = chart.legend.fit;
      chart.legend.fit = function fit() {
        fitValue.bind(chart.legend)();
        return (this.height += 20);
      };
    },
  };
  const handleOk = (id: any) => {
    handleDelete(id);
    setShowCancelModal(false);
  };
  const handleCancelModal = () => {
    setShowCancelModal(false);
    setShowLastGoalModal(false);
    setShowGoalInfoModal(false);
  };
  const getGoalDetails = (goalId: string) => {
    setIsLoading(true);
    goalDetails(goalId)
      .then((res: any) => {
        setGoal(res.data);
        calculate(res.data);
        setIsLoading(false);
      })
      .catch((error: any) => {
        toast.error(error);
        setIsLoading(false);
      });
  };
  const handleDelete = (id: any) => {
    setIsLoading(true);
    deleteGoal(id)
      .then((res) => {
        if (res) {
          toast.success('Goal removed');
          navigate('/dashboard');
        }
      })
      .catch((error: any) => {
        toast.error(error);
        setIsLoading(false);
      });
  };
  const handleClick = (type?: string, info?: any, data?:any) => {
    setOpen(true);
    setType(type);
    setGuidanceDate(info);
    setFollowUpData(data);
    //calculate followUpPattern
    const dates = timeFrom(14).sort((a: any, b: any) =>
      a[0].localeCompare(b[0])
    );
    const new_streaks = dates.map((item, index) => {
      const this_date =
        data.followup_pattern &&
        data.followup_pattern.find((checkup: any) => checkup[0] === item[0]);
      if (!this_date && index === 13) {
        return (dates[index] = [...dates[index], 'purple']);
      } else if (this_date && this_date[1] === false && index === 13) {
        return (dates[index] = [...dates[index], 'purple']);
      } else if (this_date && this_date[1] === true) {
        return (dates[index] = [...dates[index], 'orange']);
      } else {
        return (dates[index] = [...dates[index], 'grey']);
      }
    });
    setFollowUpPattern(new_streaks);
  };
  const handleClose = () => {
    setType(undefined);
    setGuidanceDate(undefined);
    setOpen(false);
  };
  const handleGuidanceStatus = (status: string) => {
    //activate-inactivate guidance
    guidanceStatus(guidanceData.id, { status: status })
      .then((response: any) => {
        if (response.data) {
          if (goalId) {
            getGoalDetails(goalId);
          }
          setLoading(false);
          setLoading2(false);
          setOpen(false);
        }
      })
      .catch((error) => {
        console.log('error is ', error);
        toast('Something went wrong');
      });
  };
  useEffect(() => {
    if (goalId) {
      getGoalDetails(goalId);
    }
  }, []);
  useEffect(() => {
    setLoading(true);
    getDashboard().then((response) => {
      setLoading(false);
      if (response.data) {
        setElements(response.data.elements);
      }
    });
  }, []);
  const handleBack = () => {
    navigate('/dashboard');
  };
  const convertToPositive = (num:number)=>{
    return (num < 0) ? num * -1 : num;
  }
  return (
    <Layout defaultHeader={true} hamburger={true}>
      <div className={styles['Backflex']} onClick={handleBack}>
        <LeftOutlined className={styles['LeftIcon']} /> Back
      </div>
      {/* Top title with Delete button */}
      <div className={styles['Prevn-wrap']}>
        <Button
          className={styles['Prevn-btn']}
          onClick={() => {
            if (elements.length > 1) {
              setShowCancelModal(true);
            } else {
              setShowLastGoalModal(true);
            }
          }}
        >
          <DeleteOutlined
            style={{ fontSize: '18px', color: '#D2D1D1', cursor: 'pointer' }}
          />
        </Button>
        { goal?.info && (<h2 className={styles['Prevn-text']}>{goal?.info?.name ? goal.info.name :" "}</h2>)}
        <Button
          className={styles['Prevn-btn']}
          onClick={() => {
          setShowGoalInfoModal(true)}}
        >
           <p
                 style={{ fontSize: '30px', fontFamily:"serif", fontWeight:"bolder" ,fontStyle : "Italic",color: `#F26749`, cursor: 'pointer', marginLeft: "30px"}}
              >i</p>
          </Button>
      </div>
      <Modal
        footer={
          <div
            className={styles['Modal-Btn-Group']}
          >
            <Button
              className="Back-btn btn"
              loading={isLoading}
              onClick={handleCancelModal}
            >
              Take me back
            </Button>
          </div>
        }
        centered
        open={showGoalInfoModal}
        onCancel={handleCancelModal}
        className="Goals-Modal"
      >
         <h3 className={styles['Goals-title']}>{goal?.info.name ? goal?.info.name : "" }</h3>
        { goal?.info&& (
          <div className={styles['Des-Goal']}>
            <ReactMarkdown rehypePlugins={[rehypeRaw]}>
              {goal?.info?.description_md? goal?.info?.description_md : ""}
            </ReactMarkdown>
          </div>
        )}
      </Modal>
      <ConfirmModal
        title={'Confirmation'}
        open={showCancelModal}
        handleCancel={handleCancelModal}
        handleOk={() => handleOk(goalId)}
        renderData={<div>Are you sure you want to delete goal?</div>}
      />
      <LastGoalModal
        title={'Warning'}
        open={showLastGoalModal}
        handleCancel={handleCancelModal}
        handleOk={handleCancelModal}
        renderData={<div>Alas! Unable to delete. This is your last goal</div>}
      />
      <Spin spinning={isLoading} className="Spinner"></Spin>
      {goal?.data && (
        <>
          <div className={styles['Vel-Eta-wrap']}>
            {goal?.data?.success_score !== null &&
              goal?.data?.velocity !== undefined && (
                <div className={styles['Vel-wrap']}>
                  {/* Single Velocity Wrap */}
                  <span className={styles['Vel-name']}>
                    Goal
                    <Progress
                      style={{ margin: '0 25px' }}
                      percent={goal.data.success_score}
                      showInfo={false}
                      strokeColor={v['primary-color1']}
                      strokeWidth={20}
                    />
                    <Tooltip
                      title={
                        'This is an instantaneous measure of your Goal Success right now. Each health goal has a proprietary formula to determine goal success based on your data.'
                      }
                      placement="bottomRight"
                      overlayStyle={{ marginRight: '10px' }}
                      mouseLeaveDelay={0}
                    >
                      <AiOutlineQuestionCircle
                        size={30}
                        style={{ color: '#D2D1D1', marginLeft: '6px' }}
                      />
                    </Tooltip>
                  </span>
                </div>
              )}
            {/* Single ETA wrap */}
            {goal?.data?.data_score && (
              <div className={styles['Vel-wrap']}>
                <span className={styles['Vel-name']}>
                  Data
                  <Progress
                    style={{ margin: '0 25px' }}
                    percent={goal.data.data_score}
                    showInfo={false}
                    strokeColor={v['primary-color3']}
                    strokeWidth={20}
                  />
                  <Tooltip
                    title={
                      'Your data score shows how well this Health Goal is characterised by your data. Keep this as high as possible by giving data daily.'
                    }
                    placement="bottomRight"
                    overlayStyle={{ marginRight: '10px' }}
                    mouseLeaveDelay={0}
                  >
                    <AiOutlineQuestionCircle
                      size={30}
                      style={{ color: '#D2D1D1', marginLeft: '6px' }}
                    />
                  </Tooltip>
                </span>
              </div>
            )}
          </div>
        </>
      )}

      {/* Chart */}
      {dataset && (
        <>
          <div className={styles['Chart-title']}>
            <div style={{ fontSize: '25px' }}>Goal Success</div>
            <div className={styles['Succes-score']}>
              {goal?.data.success_score}
              {goal.data.velocity !== null && (
                <div
                  className={styles['Velocity']}
                  style={{
                    color: `${
                      goal.data.velocity == 0
                        ? 'grey'
                        : goal.data.velocity < 0
                        ? v['primary-color1']
                        : 'green'
                    }`,
                  }}
                >
                  {goal.data.velocity<0?convertToPositive(goal.data.velocity):goal.data.velocity}
                  {goal.data.velocity == 0 ? null : goal.data.velocity < 0 ? (
                    <CaretDownOutlined style={{ color: v['primary-color1'] }} />
                  ) : (
                    <CaretUpOutlined style={{ color: 'green' }} />
                  )}
                </div>
              )}
            </div>

            <Tooltip
              title="Goal Success is a measure how well you're doing with the goal. Each health goal has a proprietary formula for determining success based on all the data you have given."
              placement="bottomRight"
              overlayStyle={{ marginRight: '10px' }}
              mouseLeaveDelay={0}
              style={{ marginRight: '10px' }}
            >
              <AiOutlineQuestionCircle
                size={30}
                style={{ color: '#D2D1D1', marginLeft: '6px' }}
              />
            </Tooltip>
          </div>
          <div className={styles['chart-container']}>
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
        {goal?.guidances?.find(
          (element: any) => element.data?.status === 'new'
        ) && (
          <>
            <h3 className={styles['Guidance-title']}>New Guidance</h3>
          </>
        )}
        {goal?.guidances.map((o: any, key: any) => (
          <>
            {o.data && (
              <div key={o.data.id}>
                {o.data.status == 'new' && (
                  <div className={styles['Rec-wrap']} key={key}>
                    {o.info && (
                      <Button
                        onClick={() => handleClick('new', o.info, o.data)}
                        className={styles['Rec-Guidance']}
                        type="primary"
                        style={{
                          color: v['secondary-color1'],
                          backgroundColor: `rgba(106, 44, 112, 0.11)`,
                        }}
                      >
                        {/* <span className={styles["Rec-Text"]}><ReactMarkdown>{o.info.description_md}</ReactMarkdown></span> */}
                        {o.info.name && (
                          <span className={styles['Rec-Text']}>
                            {o.info.name ? o.info.name : ""}
                          </span>
                        )}
                        <RightOutlined className={styles['Arrow']} />
                      </Button>
                    )}
                  </div>
                )}
              </div>
            )}
          </>
        ))}
      </>
      {/* Active Guidance */}
      <>
        {goal?.guidances?.find(
          (element: any) => element.data?.status === 'active'
        ) && (
          <>
            <h3 className={styles['Guidance-title']}>Active Guidance</h3>
          </>
        )}
        {goal?.guidances.map((o: any) => (
          <>
            {o.data && (
              <div key={o.data.id}>
                {o.data.status === 'active' && (
                  <div className={styles['Rec-wrap']}>
                    <Button
                      onClick={() => handleClick('active', o.info, o.data)}
                      className={styles['Rec-Guidance']}
                      type="primary"
                      style={{
                        color: v['secondary-color1'],
                        backgroundColor: `rgba(246, 187, 161, 0.16)`,
                      }}
                    >
                      <span className={styles['Rec-Text']}>{o.info?.name? o.info?.name : ""}</span>
                      <RightOutlined className={styles['Arrow']} />
                    </Button>
                  </div>
                )}
              </div>
            )}
          </>
        ))}
      </>
      {/* Inactive Guidance */}
      <>
        {goal?.guidances?.find(
          (element: any) => element.data?.status === 'inactive'
        ) && (
          <>
            <h3 className={styles['Guidance-title']}>Inactive Guidance</h3>
          </>
        )}
        {goal?.guidances.map((o: any) => (
          <>
            {o.data && (
              <div key={o.data.id}>
                {o.data && o.data.status === 'inactive' && (
                  <div className={styles['Rec-wrap']}>
                    <Button
                      onClick={() => handleClick('inactive', o.info, o.data)}
                      className={styles['Rec-Guidance']}
                      type="primary"
                      style={{
                        color: v['secondary-color1'],
                        backgroundColor: 'rgba(214, 214, 214, 0.24)',
                      }}
                    >
                      <span className={styles['Rec-Text']}>{o.info.name ? o.info.name  :  ""}</span>
                      <RightOutlined className={styles['Arrow']} />
                    </Button>
                  </div>
                )}
              </div>
            )}
          </>
        ))}
      </>
      <Modal
        className="Guidance-Modal"
        open={open}
        zIndex={99999}
        closeIcon={
          <>
            <LeftOutlined />
            Back
          </>
        }
        footer={false}
        onCancel={handleClose}
      >
        {/* show streak */}

        <Row>
          <Col span={21}>
            <Row>
              <Col span={24}>
                <div className={streakStyles.TagWrap}>
                  {followUpPattern &&
                    followUpPattern.map((item: any, index: number) => {
                      if (item[2] === 'purple' && type !== 'new') {
                        return (
                          <div className={streakStyles.Tag} key={index}>
                            <div
                              className={streakStyles.Streak}
                              style={{ backgroundColor: v['primary-color2'] }}
                            ></div>
                            <div className={streakStyles.StreakDay}>
                              {item[1]}
                            </div>
                          </div>
                        );
                      } else if (item[2] === 'grey') {
                        return (
                          <div className={streakStyles.Tag} key={index}>
                            <div
                              className={streakStyles.Streak}
                              style={{ backgroundColor: '#E8E8E8' }}
                            ></div>
                            <div className={streakStyles.StreakDay}>
                              {item[1]}
                            </div>
                          </div>
                        );
                      } else if (item[2] === 'orange' && type !== 'new') {
                        return (
                          <div className={streakStyles.Tag} key={index}>
                            <div
                              className={streakStyles.Streak}
                              style={{ backgroundColor: v['secondary-color2'] }}
                            ></div>
                            <div className={streakStyles.StreakDay}>
                              {item[1]}
                            </div>
                          </div>
                        );
                      }
                    })}
                </div>
              </Col>
            </Row>
          </Col>
          <Col span={1}></Col>
          <Col span={2}>
            <Tooltip
              title="Following guidance suggestions regularly results in an improved streak."
              placement="bottomRight"
              overlayStyle={{ marginRight: '10px', zIndex:"100000" }}
              mouseLeaveDelay={0}
            >
              <AiOutlineQuestionCircle
                size={30}
                style={{ color: '#D2D1D1', marginLeft: '6px' }}
              />
            </Tooltip>
          </Col>
        </Row>
        {type && type === 'inactive' && (
          <p className={styles['Modal-subtitle']}>Inactive</p>
        )}
        {type && type === 'active' && (
          <p className={styles['Modal-subtitle']}>Active</p>
        )}
        {type && (
          <h2 className={`Title`}>{guidanceData?.name}</h2>
        )}
        {guidanceData && (
          <div className={"Description"}>
            <ReactMarkdown rehypePlugins={[rehypeRaw]}>
              {guidanceData?.description_md ? guidanceData?.description_md : ""}
            </ReactMarkdown>
          </div>
        )}

        {type === 'active' && (
          <div className={styles.GuidanceBtnWrap}>
            <Button
              // className="Pref-btn btn Guidance-Inactive-btn GuidanceBtn"
              className={'Submit-Button'}
              onClick={() => {
                handleGuidanceStatus('inactive');
                setLoading(true);
              }}
              loading={loading}
            >
              Inactivate guidance
            </Button>
          </div>
        )}
        {type === 'new' && (
          <div className={styles.GuidanceBtnActiveWrap}>
            <Button
              className={styles.GuidanceNotBtn}
              onClick={() => {
                handleGuidanceStatus('inactive');
                setLoading2(true);
              }}
              loading={loading2}
            >
              Not For me
            </Button>
            <Button
              className={styles.GuidanceActiveBtn}
              onClick={() => {
                handleGuidanceStatus('active');
                setLoading(true);
              }}
              loading={loading}
            >
              Activate guidance
            </Button>
          </div>
        )}
        {type === 'inactive' && (
          <div className={styles.GuidanceBtnActiveWrap}>
            <Button
              className={`Submit-Button`}
              onClick={() => {
                handleGuidanceStatus('active');
                setLoading(true);
              }}
              loading={loading}
            >
              Activate guidance
            </Button>
          </div>
        )}
      </Modal>
    </Layout>
  );
};
export default GoalDetails;
