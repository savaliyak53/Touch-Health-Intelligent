
import React, { useContext, useEffect, useState } from 'react';
import { Button } from 'antd';
import styles from './DashboardNew.module.scss';
import { Row, Col, Typography, Button } from 'antd';
import Layout from '../../layouts/Layout/Layout';
import { Spin } from 'antd';
import { getDashboard } from '../../services/dashboardservice';
import { useNavigate } from 'react-router-dom';
import Drawer from '../../components/Modal/Drawer';
import { invokeInteractionServiceByType } from '../../services/authservice';
import Status from '../Status';

import { GoalsComp } from '../../components/Goals-comp';
import {getPreference, invokeInteractionServiceByType} from '../../services/authservice';
import {response} from 'msw';
import dashboard from '../Dashboard';
import {getPartOfDay} from '../../helpers/time';

const DashboardNew = () => {
  const [error, setError] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const [username, setUsername] = useState<string>('');
  const navigate = useNavigate();


  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);
    getDashboard()
      .then((response) => {
        setLoading(false);

    Promise.all([getDashboard(), getPreference()])
      .then(([dashboardData, userData]) => {
        if (userData?.data && userData.data.username) {
          setUsername(userData.data.username);
        }
        if (dashboardData.data) {
          setElements(dashboardData.data.elements);
          const dates = timeFrom(14).sort((a: any, b: any) =>
            a[0].localeCompare(b[0])
          );
          const new_streaks = dates.map((item, index) => {
            const this_date = dashboardData.data.checkup_pattern.find(
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
          if (
            dates[13][2] === 'orange' ||
            (dates[12][2] === 'orange' && dates[13][2] === 'orange')
          ) {
            setStreakCount(dashboardData.data.checkup_streak);
          } else {
            setStreakCount(0);
          }
        }
      })
      .catch((error) => {
        setError({
          code: error.response.status,
          message: error.response.data.details ?? 'Something went wrong.',
        })
      })
      .finally(() => setLoading(false));
  }, []);

  const getInteractionByType = (type: string) => {
    invokeInteractionServiceByType(type)
      .then((response: any) => {
        if (response.data) {
          navigate('/questionnaire');
        } else {
          navigate('/dashboard');
        }
      })
      .catch((error) => {
        setError({
          code: error.response.status,
          message: error.response.data.details,
        });
      });
  };

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  return (
    <Layout defaultHeader={true} hamburger={true} dashboard={false} title={`Good ${getPartOfDay()}${username ? `, ${username}`: ''}`}>

        <Status />

      <Spin spinning={loading}>
        <Drawer
          title="Daily check-in"
          open={drawerOpen}
          handleCancel={() => setDrawerOpen(false)}
          renderOptions={
            <>
              <Button
                className={'Button-Drawer'}
                onClick={() => {
                  navigate('/c/checkup');
                }}
              >
                Daily Questions
              </Button>
              <Button
                className={'Button-Drawer'}
                onClick={() => getInteractionByType('update_conditions')}
              >
                Update my conditions
              </Button>
              <Button
                className={'Button-Drawer-Secondary'}
                onClick={() => getInteractionByType('explore_data')}
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
