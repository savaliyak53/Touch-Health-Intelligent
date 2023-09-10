import React, { useEffect, useContext } from 'react';
import Layout from 'layouts/Layout';
import './index.scss';
import styles from './Dashboard.module.scss';
import DashboardButton from 'components/DashboardButton/DashboardButton';
import { InsightContext } from 'contexts/InsightContext';
import { Spin } from 'antd';
import { toast } from 'react-toastify';
import { getDashboard } from 'services/dashboardservice';

const Dashboard = () => {
  const context = useContext(InsightContext);
  useEffect(() => {
    getInsights();
    getDashboard()
      .then((response) => {
        console.log('dashboard', response);
      })
      .catch((error) => {
        console.log('error is ', error);
        toast('Something went wrong');
      });
    context?.commands.setInsightButton('');
  }, []);

  let rowNumber = 0;
  let itemPrinted = 0;
  const getInsights = async () => {
    try {
      await context?.commands?.loadInsights();
    } catch (error) {
      //toast('unknown error');
    }
  };
  const getOpacity = (insight: any) => {
    const alpha_max = 1;
    const alpha_min = 0.25;
    const alpha =
      alpha_min +
      ((insight.present_value.expectation - insight.forecast.vmin) *
        (alpha_max - alpha_min)) /
        (insight.forecast.vmax - insight.forecast.vmin);
    return alpha;
  };

  const Section = (outer: number) => {
    const section: React.ReactNode[] = [];
    const insights = context?.insights?.insights;
    for (let i = 0; i < insights[outer]?.length; i++) {
      {
        rowNumber++;
      }
      if (rowNumber % 2 === 0) {
        {
          i++;
        }
        section.push(
          <div className={styles['btn-group']} key={Math.random().toString()}>
            <DashboardButton
              image={`${insights[outer][i - 1]?.category?.icon}`}
              disabled={false}
              color={`${insights[outer][i - 1]?.category?.color}`}
              outerButton={false}
              insight={insights[outer][i - 1]}
              outer={outer}
              inner={i - 1}
              highlight={getOpacity(insights[outer][i - 1])}
            />
            <DashboardButton
              image={`${insights[outer][i]?.category?.icon}`}
              disabled={
                insights[outer]?.length - itemPrinted === 1 ? true : false
              }
              color={`${insights[outer][i]?.category?.color}`}
              outerButton={
                insights[outer]?.length - itemPrinted === 1 ? true : false
              }
              insight={insights[outer][i]}
              outer={outer}
              inner={i}
              highlight={insights[outer][i] && getOpacity(insights[outer][i])}
            />
          </div>
        );
        {
          itemPrinted = itemPrinted + 2;
        }
      } else {
        section.push(
          <div className={styles['btn-group']} key={Math.random().toString()}>
            <DashboardButton
              image={`${insights[outer][i]?.category?.icon}`}
              disabled={true}
              color={`${insights[outer][i]?.category?.color}`}
              outerButton={true}
              highlight={getOpacity(insights[outer][i])}
            />
            <DashboardButton
              image={`${insights[outer][i]?.category?.icon}`}
              disabled={false}
              color={`${insights[outer][i]?.category?.color}`}
              outerButton={false}
              insight={insights[outer][i]}
              outer={outer}
              inner={i}
              highlight={getOpacity(insights[outer][i])}
            />
            <DashboardButton
              image={`${insights[outer][i]?.category?.icon}`}
              disabled={true}
              color={`${insights[outer][i]?.category?.color}`}
              outerButton={true}
              highlight={getOpacity(insights[outer][i])}
            />
          </div>
        );
        {
          itemPrinted = itemPrinted + 1;
        }
      }
    }
    itemPrinted = 0;
    return section;
  };
  const EmptySection = (outer: number) => {
    const emptysection: React.ReactNode[] = [];
    for (let i = 0; i < 1; i++) {
      {
        rowNumber++;
      }
      if (rowNumber % 2 === 0) {
        {
          i++;
        }
        emptysection.push(
          <div className={styles['btn-group']} key="lowerButton">
            <DashboardButton
              key="lowerButton1"
              image=""
              disabled={true}
              color={``}
              outerButton={true}
            />

            <DashboardButton
              key="lowerButton3"
              image=""
              disabled={true}
              color={``}
              outerButton={true}
            />
          </div>
        );
        {
          itemPrinted = itemPrinted + 2;
        }
      } else {
        emptysection.push(
          <div className={styles['btn-group']} key="lowerButton">
            <DashboardButton
              key="lowerButton1"
              image=""
              disabled={true}
              color={``}
              outerButton={true}
            />
            <DashboardButton
              key="lowerButton2"
              image=""
              disabled={true}
              color={``}
              outerButton={true}
            />
            <DashboardButton
              key="lowerButton3"
              image=""
              disabled={true}
              color={``}
              outerButton={true}
            />
          </div>
        );
        {
          itemPrinted = itemPrinted + 1;
        }
      }
    }
    itemPrinted = 0;
    return emptysection;
  };
  const Dashboard = () => {
    const dashboard: React.ReactNode[] = [];
    const insights = context?.insights?.insights;
    for (let i = 0; i < insights.length; i++) {
      dashboard.push(Section(i));
    }
    rowNumber++;
    return dashboard;
  };
  const EmptyDashboard = () => {
    const emptydashboard: React.ReactNode[] = [];
    for (let i = 0; i < 6; i++) {
      emptydashboard.push(EmptySection(i));
    }
    rowNumber++;
    return emptydashboard;
  };
  return (
    <>
      <Layout defaultHeader={true} hamburger={true} dashboard={true} title={'Dashboard'}>
        <div className={styles['Db-wrap']}>
          <div className="dsgbtn-group">
            <div className={styles['btn-group']} key="extraUpperButton">
              <DashboardButton
                key="extraUpperButton0"
                image={`${process.env.PUBLIC_URL}/assets/mobileassets/+.svg`}
                disabled={true}
                color={``}
                outerButton={false}
              />
            </div>
            <div className={styles['btn-group']} key="extraUpperButton">
              <DashboardButton
                key="extraUpperButton1"
                image=""
                disabled={true}
                color={``}
                outerButton={true}
              />
              <DashboardButton
                key="extraUpperButton2"
                image=""
                disabled={true}
                color={``}
                outerButton={true}
              />
            </div>
            {context &&
            context.insights !== undefined &&
            context?.insights?.insights?.length !== 0 &&
            context?.insights?.insights?.length !== undefined
              ? Dashboard()
              : EmptyDashboard()}
            {rowNumber % 2 == 0 ? (
              <div className={styles['btn-group']} key="extraLowerButton">
                <DashboardButton
                  key="extraLowerButton1"
                  image=""
                  disabled={true}
                  color={``}
                  outerButton={true}
                />
                <DashboardButton
                  key="extraLowerButton2"
                  image=""
                  disabled={true}
                  color={``}
                  outerButton={true}
                />
              </div>
            ) : (
              <div className={styles['btn-group']} key="lowerButton">
                <DashboardButton
                  key="lowerButton1"
                  image=""
                  disabled={true}
                  color={``}
                  outerButton={true}
                />
                <DashboardButton
                  key="lowerButton2"
                  image=""
                  disabled={true}
                  color={``}
                  outerButton={true}
                />
                <DashboardButton
                  key="lowerButton3"
                  image=""
                  disabled={true}
                  color={``}
                  outerButton={true}
                />
              </div>
            )}
          </div>
          <Spin spinning={context?.isLoading} className="Spinner"></Spin>
        </div>
      </Layout>
    </>
  );
};

export default Dashboard;
