import React, { useEffect, useState, useContext } from 'react';
import Layout from '../../layouts/Layout/Layout';
import './index.scss';
import DashboardButton from '../../components/DashboardButton/DashboardButton';
import { InsightContext } from '../../contexts/InsightContext';
import { Spin } from 'antd';
import { toast } from 'react-toastify';

const Dashboard = () => {
  const context = useContext(InsightContext);
  useEffect(() => {
    getInsights();
  }, []);

  let rowNumber = 0;
  let itemPrinted = 0;
  const getInsights = async () => {
    try {
      await context?.commands?.loadInsights();
    } catch (error) {
      toast('unknown error');
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
          <div className="btn-group" key={Math.random().toString()}>
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
          <div className="btn-group" key={Math.random().toString()}>
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
  const Dashboard = () => {
    const dashboard: React.ReactNode[] = [];
    const insights = context?.insights?.insights;
    for (let i = 0; i < insights.length; i++) {
      dashboard.push(Section(i));
    }
    rowNumber++;
    return dashboard;
  };
  return (
    <>
      <Layout defaultHeader={true} hamburger={true} dashboard={true}>
        <div className="Db-wrap">
          {context?.insights && (
            <div className="dsgbtn-group">
              <div className="btn-group" key="extraUpperButton">
                <DashboardButton
                  key="extraUpperButton1"
                  image=""
                  disabled={true}
                  color={`${context.insights.insights[0][0]?.category?.color}`}
                  outerButton={true}
                />
                <DashboardButton
                  key="extraUpperButton2"
                  image=""
                  disabled={true}
                  color={`${context.insights.insights[0][0]?.category?.color}`}
                  outerButton={true}
                />
              </div>
              {Dashboard()}

              {rowNumber % 2 == 0 ? (
                <div className="btn-group" key="extraLowerButton">
                  <DashboardButton
                    key="extraLowerButton1"
                    image=""
                    disabled={true}
                    color={`${context.insights.insights[0][0]?.category?.color}`}
                    outerButton={true}
                  />
                  <DashboardButton
                    key="extraLowerButton2"
                    image=""
                    disabled={true}
                    color={`${context.insights.insights[0][0]?.category?.color}`}
                    outerButton={true}
                  />
                </div>
              ) : (
                <div className="btn-group" key="lowerButton">
                  <DashboardButton
                    key="lowerButton1"
                    image=""
                    disabled={true}
                    color={`${context.insights.insights[0][0]?.category?.color}`}
                    outerButton={true}
                  />
                  <DashboardButton
                    key="lowerButton2"
                    image=""
                    disabled={true}
                    color={`${context.insights.insights[0][0]?.category?.color}`}
                    outerButton={true}
                  />
                  <DashboardButton
                    key="lowerButton3"
                    image=""
                    disabled={true}
                    color={`${context.insights.insights[0][0]?.category?.color}`}
                    outerButton={true}
                  />
                </div>
              )}
            </div>
          )}

          <Spin spinning={!context?.insights} className="Spinner"></Spin>
        </div>
      </Layout>
    </>
  );
};

export default Dashboard;
