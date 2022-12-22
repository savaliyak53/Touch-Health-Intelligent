import React, { useEffect, useState, useContext } from 'react';
import Layout from '../../layouts/Layout/Layout';
import './index.scss';
import styles from './Dashboard.module.scss';
import DashboardButton from '../../components/DashboardButton/DashboardButton';
import { InsightContext } from '../../contexts/InsightContext';
import { Spin } from 'antd';
import { toast } from 'react-toastify';
import { getDashboard } from '../../services/dashboardservice';

const Dashboard = () => {
  const context = useContext(InsightContext);
  const [sections,setSections] = useState<any>();
  useEffect(() => {
    getDashboard().then((response) => {
      if(response.data){
        setSections(response.data.sections);
      }
    })
    .catch((error) => {
      console.log('error is ', error);
      //setLoading(false);
      toast('Something went wrong');
    });
    context?.commands.setInsightButton('');
  }, []);
  let rowNumber = 0;
  let itemPrinted = 0;
  const Section = (outer: number) => {
    const section: React.ReactNode[] = [];
    for (let i = 0; i < sections[outer]?.length; i++) {
      {
        rowNumber++;
      }
      if (rowNumber % 2 === 0) {
        {
          i++;
        }
        section.push(
          <div className={styles["btn-group"]} key={Math.random().toString()}>
            <DashboardButton
              image={`${sections[outer][i - 1]?.category?.icon}`}
              disabled={false}
              color={`${sections[outer][i - 1]?.color}`}
              outerButton={false}
              insight={sections[outer][i - 1]}
              outer={outer}
              inner={i - 1}
              highlight={sections[outer][i - 1].opacity}
            />
            <DashboardButton
              image={`${sections[outer][i]?.category?.icon}`}
              disabled={
                sections[outer]?.length - itemPrinted === 1 ? true : false
              }
              color={`${sections[outer][i]?.color}`}
              outerButton={
                sections[outer]?.length - itemPrinted === 1 ? true : false
              }
              insight={sections[outer][i]}
              outer={outer}
              inner={i}
              highlight={sections[outer][i-1].opacity}
            />
          </div>
        );
        {
          itemPrinted = itemPrinted + 2;
        }
      } else {
        section.push(
          <div className={styles["btn-group"]} key={Math.random().toString()}>
            <DashboardButton
              image={`${sections[outer][i]?.category?.icon}`}
              disabled={true}
              color={`${sections[outer][i]?.color}`}
              outerButton={true}
              highlight={sections[outer][i].opacity}
            />
            <DashboardButton
              image={`${sections[outer][i]?.category?.icon}`}
              disabled={false}
              color={`${sections[outer][i]?.color}`}
              outerButton={false}
              insight={sections[outer][i]}
              outer={outer}
              inner={i}
              highlight={sections[outer][i].opacity}
            />
            <DashboardButton
              image={`${sections[outer][i]?.category?.icon}`}
              disabled={true}
              color={`${sections[outer][i]?.color}`}
              outerButton={true}
              highlight={sections[outer][i].opacity}
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
          <div className={styles["btn-group"]} key="lowerButton">
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
          <div className={styles["btn-group"]} key="lowerButton">
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
      for (let i = 0; i < sections.length; i++) {
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
      <Layout defaultHeader={true} hamburger={true} dashboard={true}>
        <div className={styles["Db-wrap"]}>
            <div className="dsgbtn-group">
              <div className={styles["btn-group"]} key="extraUpperButton">
                <DashboardButton
                  key="extraUpperButton0"
                  image={`${process.env.PUBLIC_URL}/assets/mobileassets/+.svg`}
                  disabled={true}
                  color={``}
                  outerButton={false}
                  isPlus={true}
                />
              </div>
              <div className={styles["btn-group"]} key="extraUpperButton">
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
              {sections &&  sections.length !== 0 ? Dashboard():EmptyDashboard()}
              {rowNumber % 2 == 0 ? (
                <div className={styles["btn-group"]} key="extraLowerButton">
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
                <div className={styles["btn-group"]} key="lowerButton">
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
          <Spin spinning={!sections} className="Spinner"></Spin>
        </div>
      </Layout>
    </>
  );
};

export default Dashboard;