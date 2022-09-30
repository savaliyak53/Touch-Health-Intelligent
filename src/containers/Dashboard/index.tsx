import React, { useEffect, useState, useContext } from 'react';
import Layout from '../../layouts/Layout/Layout';
import './index.scss';
import DashboardButton from '../../components/DashboardButton/DashboardButton';
import { InsightContext } from '../../contexts/InsightContext';
import { Spin } from 'antd';
import { toast } from 'react-toastify';

const Dashboard = () => {
  const context = useContext(InsightContext);
  // let disable = false;
  const [disable, setDisable] = useState(false);
  useEffect(() => {
    getInsights();
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

  const getColor = () => {
    if (context?.insights?.insights && context?.insights?.insights.length) {
      return `${context?.insights?.insights[0][0]?.category?.color}`;
    } else {
      return undefined;
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
    let insights: any;
    if (context?.insights?.insights) {
      insights = context?.insights?.insights;
    } else {
      insights = context;
    }
    const getLength = () => {
      if (insights) {
        return insights[outer]?.length > 0 ? insights[outer]?.length : 2;
      } else {
        return 2;
      }
    };
    for (let i = 0; i < getLength(); i++) {
      {
        rowNumber++;
      }
      if (rowNumber % 2 === 0) {
        {
          i++;
        }
        section.push(
          insights.length != 0 && insights.length != undefined ? (
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
          ) : (
            <div className="btn-group" key={Math.random().toString()}>
              <DashboardButton
                disabled={true}
                outerButton={false}
                outer={outer}
                inner={i - 1}
              />
              <DashboardButton
                disabled={true}
                outerButton={false}
                outer={outer}
                inner={i}
              />
            </div>
          )
        );
        {
          itemPrinted = itemPrinted + 2;
        }
      } else {
        section.push(
          insights.length != 0 && insights.length != null ? (
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
                highlight={getOpacity(insights[outer][i] ?? null)}
              />
            </div>
          ) : (
            <div className="btn-group" key={Math.random().toString()}>
              <DashboardButton disabled={true} outerButton={false} />
              <DashboardButton
                disabled={true}
                outerButton={false}
                outer={outer}
                inner={i}
              />
              <DashboardButton disabled={true} outerButton={false} />
            </div>
          )
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
    const getLength = () => {
      if (insights) {
        return insights.length > 0 ? insights.length : 2;
      } else {
        return 2;
      }
    };
    for (let i = 0; i < getLength(); i++) {
      dashboard.push(Section(i));
    }
    rowNumber++;
    return dashboard;
  };
  if (context?.insights?.insights) {
    setDisable(false);
  } else {
    setDisable(true);
  }
  return (
    <>
      <Layout defaultHeader={true} hamburger={true} dashboard={true}>
        <div className="Db-wrap">
          <div className="dsgbtn-group">
            <div className="btn-group" key="extraUpperButton">
              <DashboardButton
                key="extraUpperButton1"
                image=""
                disabled={disable}
                color={getColor()}
                outerButton={!disable}
              />
              <DashboardButton
                key="extraUpperButton2"
                image=""
                disabled={disable}
                color={getColor()}
                outerButton={!disable}
              />
            </div>
            {Dashboard()}

            {rowNumber % 2 == 0 ? (
              <div className="btn-group" key="extraLowerButton">
                <DashboardButton
                  key="extraLowerButton1"
                  image=""
                  disabled={disable}
                  color={getColor()}
                  outerButton={!disable}
                />
                <DashboardButton
                  key="extraLowerButton2"
                  image=""
                  disabled={disable}
                  color={getColor()}
                  outerButton={!disable}
                />
              </div>
            ) : (
              <div className="btn-group" key="lowerButton">
                <DashboardButton
                  key="lowerButton1"
                  image=""
                  disabled={disable}
                  color={getColor()}
                  outerButton={!disable}
                />
                <DashboardButton
                  key="lowerButton2"
                  image=""
                  disabled={disable}
                  color={getColor()}
                  outerButton={!disable}
                />
                <DashboardButton
                  key="lowerButton3"
                  image=""
                  disabled={disable}
                  color={getColor()}
                  outerButton={!disable}
                />
              </div>
            )}
          </div>

          <Spin spinning={!context?.insights} className="Spinner"></Spin>
        </div>
      </Layout>
    </>
  );
};

export default Dashboard;
