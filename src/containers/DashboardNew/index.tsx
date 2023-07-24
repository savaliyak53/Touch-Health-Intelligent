import React, { useEffect, useState } from 'react';
import styles from './DashboardNew.module.scss';
import { Row, Col, Typography, Tooltip, Button, Progress } from 'antd';
import { AiOutlineQuestionCircle } from 'react-icons/ai';
import Layout from '../../layouts/Layout/Layout';
import { Spin } from 'antd';
import { getDashboard } from '../../services/dashboardservice';
import { useNavigate } from 'react-router-dom';
import { timeFrom } from '../../utils/lib';
import { tooltipContent } from '../../constants';
import Drawer from '../../components/Modal/Drawer';
const DashboardNew = () => {
  const [elements, setElements] = useState<any>();
  const [elementStreak, setElementStreak] = useState<any>();
  const [streakCount, setStreakCount] = useState<any>();
  const [error, setError] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);
    getDashboard()
      .then((response) => {
        setLoading(false);
        if (response.data) {
          setElements(response.data.elements);
          const dates = timeFrom(14).sort((a: any, b: any) =>
            a[0].localeCompare(b[0])
          );
          const new_streaks = dates.map((item, index) => {
            const this_date = response.data.checkup_pattern.find(
              (checkup: any) => checkup[0] === item[0]
            );
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
          setElementStreak(new_streaks);
          //updated pattern shows check true on today or yesterday then the streak is valid, otherwise zero
          if (dates[13][2] === 'orange' || dates[12][2] === 'orange') {
            setStreakCount(response.data.checkup_streak);
          } else {
            setStreakCount(0);
          }
        }
      })
      .catch((error) => {
        setError({
          code: error.response.status,
          message: error.response.data.details ?? 'Something went wrong.',
        });
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  return (
    <Layout defaultHeader={true} hamburger={true} dashboard={false}>
      <Spin spinning={loading}>
        <div>
          <Row>
            <Col span={21}>
              <div className={`Title`}>Your Dashboard</div>
            </Col>
            <Col span={1}></Col>
            <Col span={2}>
              <Tooltip
                title={tooltipContent.dashboardText}
                placement="bottomRight"
                overlayStyle={{ marginRight: '10px' }}
                color="blue"
                mouseLeaveDelay={0}
              >
                <AiOutlineQuestionCircle
                  size={35}
                  className={styles.TitleToolTip}
                />
              </Tooltip>
            </Col>
          </Row>
          <div className={`Heading Heading-color1 ${styles.StreakTitle}`}>
            {streakCount && streakCount > 0
              ? `${streakCount} day streak!`
              : 'No current streak'}
          </div>
          <Row>
            <Col span={21}>
              <Row>
                <Col span={24}>
                  <div className={styles.TagWrap}>
                    {elementStreak &&
                      elementStreak.map((item: any, index: number) => {
                        if (item[2] === 'purple') {
                          return (
                            <div className={styles.Tag} key={index}>
                              <div className={styles.StreakBlue}></div>
                              <div className={styles.StreakDay}>{item[1]}</div>
                            </div>
                          );
                        } else if (item[2] === 'grey') {
                          return (
                            <div className={styles.Tag} key={index}>
                              <div className={styles.StreakGrey}></div>
                              <div className={styles.StreakDay}>{item[1]}</div>
                            </div>
                          );
                        } else if (item[2] === 'orange') {
                          return (
                            <div className={styles.Tag} key={index}>
                              <div className={styles.StreakPeach}></div>
                              <div className={styles.StreakDay}>{item[1]}</div>
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
                title={tooltipContent.streakText}
                placement="bottomRight"
                overlayStyle={{ marginRight: '10px' }}
                color="blue"
                mouseLeaveDelay={0}
              >
                <AiOutlineQuestionCircle size={35} className={styles.Tooltip} />
              </Tooltip>
            </Col>
          </Row>
          <Button
            className={'Submit-Button'}
            onClick={() => setDrawerOpen(true)}
          >
            Daily Check-in
          </Button>
          {/* Goals Detail Head + Add new Goal */}
          <Row>
            <Col span={24}>
              <div className={styles.GoalsHead}>
                <Typography
                  className={`Heading Heading-color1 ${styles.GoalsHeadTitle}`}
                >
                  Health Goals
                </Typography>
              </div>
            </Col>
          </Row>
          {elements ? (
            elements.map((item: any) => (
              <Row key={item.id}>
                <Col span={24}>
                  <div
                    className={styles.Goal}
                    onClick={() => navigate(`/goals/${item.id}`)}
                  >
                    <div className={styles.GoalHeadWrap}>
                      <Typography className={styles.GoalTitle}>
                        {item.name}
                      </Typography>
                      <Typography className={styles.GoalCount}>
                        {item.success_score}
                      </Typography>
                    </div>
                    <div className={styles.GoalBarWrap}>
                      <Typography className={styles.GoalLetter}>
                        Goal
                      </Typography>
                      <Progress
                        percent={item.success_score}
                        strokeColor="#204ECF"
                        strokeWidth={15}
                        showInfo={false}
                      />
                    </div>
                    <div className={styles.GoalBarWrap}>
                      <Typography className={styles.GoalLetter}>
                        Data
                      </Typography>
                      <Progress
                        percent={item.data_score}
                        strokeColor="#F26749"
                        strokeWidth={15}
                        showInfo={false}
                      />
                    </div>
                  </div>
                </Col>
              </Row>
            ))
          ) : (
            <Row key="#nodata">
              <Col span={24}>
                <div className={styles.Goal}>
                  <div className={styles.GoalHeadWrap}>
                    <Typography
                      className={styles.GoalTitle}
                      style={{ color: '#6A2C70', alignItems: 'center' }}
                    >
                      No Data to Show
                    </Typography>
                  </div>
                </div>
              </Col>
            </Row>
          )}
        </div>
        <Drawer
          title="Daily check-in"
          open={drawerOpen}
          handleCancel={() => setDrawerOpen(false)}
          renderOptions={
            <>
              <Button
                className={'Submit-Button Button-Drawer'}
                onClick={() => {
                  navigate('/c/checkup');
                }}
              >
                Daily Questions
              </Button>
              <Button
                className={'Submit-Button Button-Drawer'}
                onClick={() => {
                  console.log('2');
                }}
              >
                Update my conditions
              </Button>
              <Button
                className={'Submit-Button Button-Drawer-Secondary'}
                onClick={() => {
                  console.log('3');
                }}
              >
                Explore my data
              </Button>
            </>
          }
        />
      </Spin>
    </Layout>
  );
};

export default DashboardNew;
