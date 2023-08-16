import React, { useEffect, useState } from 'react';
import styles from './GoalDetails.module.scss';
import v from '../../../variables.module.scss';
import Layout from '../../../layouts/Layout/Layout';
import { Modal, Spin } from 'antd';
import { Tooltip, Button, Progress } from 'antd';
import { ArrowLeftOutlined, InfoCircleOutlined } from '@ant-design/icons';
import {
  DeleteOutlined,
  CaretDownOutlined,
  CaretUpOutlined,
} from '@ant-design/icons';

import { toast } from 'react-toastify';
import ReactMarkdown from 'react-markdown';
import { goalDetails, deleteGoal } from '../../../services/goalsService';
import 'chartjs-adapter-date-fns';
import { Line } from 'react-chartjs-2';
import { useNavigate } from 'react-router';
import { useParams } from 'react-router-dom';
import rehypeRaw from 'rehype-raw';
import moment from 'moment';
import { timeFrom } from '../../../utils/lib';
import ConfirmModal from '../../../components/Modal/ConfirmModal';
import { getDashboard } from '../../../services/dashboardservice';
import LastGoalModal from '../../../components/Modal/LastGoalModal';
import ListItem from '../../../components/ListItem/ListItem';
import GuidanceModal from './GuidanceModal';

const GoalDetails = () => {
  const [goal, setGoal] = useState<any>();
  const [elements, setElements] = useState<any>();
  const [open, setOpen] = useState<boolean>(false);
  const [type, setType] = useState<string>();
  const [guidanceData, setGuidanceDate] = useState<any>();
  const [followUpPattern, setFollowUpPattern] = useState<any>();
  const [dataset, setDataset] = useState<any>();
  const [startDate, setForecastStartDate] = useState<any>();
  const [lastDate, setForecastLastDate] = useState<any>();
  const [isLoading, setIsLoading] = useState(true);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showLastGoalModal, setShowLastGoalModal] = useState(false);
  const [showGoalInfoModal, setShowGoalInfoModal] = useState(false);
  const [error, setError] = useState<any>();

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
        chartArea: { top, height },
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
        setError({
          code: error.response.status,
          message: error.response.data.details,
        });
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
        setError({
          code: error.response.status,
          message: error.response.data.details,
        });
        setIsLoading(false);
      });
  };
  const handleClick = (item: any, type?: string) => {
    const { info, data } = item;
    setOpen(true);
    setType(type);
    setGuidanceDate(info);
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
  useEffect(() => {
    window.scrollTo(0, 0);
    if (goalId) {
      getGoalDetails(goalId);
    }
    getDashboard().then((response) => {
      if (response.data) {
        setElements(response.data.elements);
      }
    });
  }, []);

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  const handleBack = () => {
    navigate('/dashboard');
  };
  const convertToPositive = (num: number) => {
    return num < 0 ? num * -1 : num;
  };
  return (
    <Layout defaultHeader={true} hamburger={true}>
      <div className={'Backflex'} onClick={handleBack}>
        <ArrowLeftOutlined className={'LeftIcon'} />
      </div>
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
        {goal?.info && (
          <h2 className={styles['Prevn-text']}>
            {goal?.info?.name ? goal.info.name : ' '}
          </h2>
        )}
        <Button
          className={styles['Prevn-btn']}
          onClick={() => {
            setShowGoalInfoModal(true);
          }}
        >
          <InfoCircleOutlined size={30} className={styles['tooltip']} />
        </Button>
      </div>
      <Modal
        footer={null}
        centered
        open={showGoalInfoModal}
        onCancel={handleCancelModal}
        className="Goals-Modal"
        closable={false}
      >
        <div className={'Backflex'} onClick={handleCancelModal}>
          <ArrowLeftOutlined className={'LeftIcon'} />
        </div>
        <h3 className={'Title'}>{goal?.info?.name ? goal?.info.name : ''}</h3>
        {goal?.info && (
          <div className={styles['Des-Goal']}>
            <ReactMarkdown rehypePlugins={[rehypeRaw]}>
              {goal?.info?.description_md ? goal?.info?.description_md : ''}
            </ReactMarkdown>
          </div>
        )}
        <div className={styles['Modal-Btn-Group']}>
          <Button
            className="Submit-Button"
            loading={isLoading}
            onClick={handleCancelModal}
          >
            Take me back
          </Button>
        </div>
      </Modal>
      <ConfirmModal
        title={'Confirmation'}
        open={showCancelModal}
        handleCancel={handleCancelModal}
        handleOk={() => handleOk(goalId)}
        className="Addgoal-Confirm-Modal"
        renderData={
          <div className="Description">
            Are you sure you want to delete goal?
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
                      <InfoCircleOutlined
                        size={30}
                        className={styles['tooltip']}
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
                    <InfoCircleOutlined
                      size={30}
                      className={styles['tooltip']}
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
            <div className={`Heading Heading-color2 ${styles['sub-heading']}`}>
              Goal Success
            </div>
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
                  {goal.data.velocity < 0
                    ? convertToPositive(goal.data.velocity)
                    : goal.data.velocity}
                  {goal.data.velocity == 0 ? null : goal.data.velocity < 0 ? (
                    <CaretDownOutlined style={{ color: v['primary-color1'] }} />
                  ) : (
                    <CaretUpOutlined style={{ color: 'green' }} />
                  )}
                </div>
              )}
            </div>

            <Tooltip
              title="Goal Success is a measure of how well you're doing with the goal. Each health goal has a proprietary formula for determining success based on all the data you have given."
              placement="bottomRight"
              overlayStyle={{ marginRight: '10px' }}
              mouseLeaveDelay={0}
              style={{ marginRight: '10px' }}
            >
              <InfoCircleOutlined size={30} className={styles['tooltip']} />
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
            <div className={styles['sub-heading']}>New Guidance</div>
          </>
        )}
        <div className={styles['Health-Goals']}>
          {goal?.guidances.map((o: any, index: number) => (
            <>
              {o.data && o.data.status === 'new' && (
                <ListItem
                  index={index}
                  status="new"
                  handleClick={handleClick}
                  item={o}
                  name={o.info?.name}
                />
              )}
            </>
          ))}
        </div>
      </>
      {/* Active Guidance */}
      <>
        {goal?.guidances?.find(
          (element: any) => element.data?.status === 'active'
        ) && (
          <>
            <div className={`Heading Heading-color2 ${styles['sub-heading']}`}>
              Active Guidance
            </div>
          </>
        )}
        <div className={styles['Health-Goals']}>
          {goal?.guidances.map((o: any, index: number) => (
            <>
              {o.data && o.data.status === 'active' && (
                <ListItem
                  index={index}
                  status="active"
                  handleClick={handleClick}
                  item={o}
                  name={o.info?.name}
                />
              )}
            </>
          ))}
        </div>
      </>
      {/* Inactive Guidance */}
      <>
        {goal?.guidances?.find(
          (element: any) => element.data?.status === 'inactive'
        ) && (
          <>
            <div className={styles['sub-heading']}>Inactive guidances</div>
          </>
        )}
        <div className={styles['Health-Goals']}>
          {goal?.guidances.map((o: any, index: number) => (
            <>
              {o.data && o.data.status === 'inactive' && (
                <ListItem
                  index={index}
                  status="inactive"
                  handleClick={handleClick}
                  item={o}
                  name={o.info?.name}
                />
              )}
            </>
          ))}
        </div>
        <GuidanceModal
          open={open}
          handleClose={handleClose}
          followUpPattern={followUpPattern}
          type={type}
          guidanceData={guidanceData}
        />
      </>
    </Layout>
  );
};
export default GoalDetails;
