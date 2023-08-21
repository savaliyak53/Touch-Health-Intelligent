import React, { useEffect, useState } from 'react';
import { Button } from 'antd';
import Layout from '../../layouts/Layout/Layout';
import { Spin } from 'antd';
import { getDashboard } from '../../services/dashboardservice';
import { useNavigate } from 'react-router-dom';
import Drawer from '../../components/Modal/Drawer';
import { invokeInteractionServiceByType } from '../../services/authservice';
import Status from '../Status';

const DashboardNew = () => {
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
      })
      .catch((error) => {
        setError({
          code: error.response.status,
          message: error.response.data.details ?? 'Something went wrong.',
        });
        setLoading(false);
      });
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
    <Layout
      defaultHeader={true}
      hamburger={true}
      dashboard={true}
      title={'Dashboard'}
    >
      <Spin spinning={loading}>
        <Status />
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
