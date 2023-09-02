import React, { useEffect, useState, useContext } from 'react';
import { Button } from 'antd';
import Layout from '../../layouts/Layout/Layout';
import { Spin } from 'antd';
import { useNavigate } from 'react-router-dom';
import Drawer from 'components/Modal/Drawer';
import SocketContext from 'contexts/SocketContext';
import { getOverview } from 'services/dashboardservice';
import { getPreference, invokeInteractionServiceByType } from 'services/authservice';
import Status from 'containers/Status';
import EntityListWidget from 'components/Widgets/EntityListWidget';
import { IOverview } from 'interfaces';
import { getPartOfDay } from 'helpers/time';

const DashboardNew = () => {
  const [error, setError] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const [username, setUsername] = useState(null);
  const [overview, setOverview] = useState<IOverview>();
  const [dashboardNotification, setDashboardNotification] = useState();
  const navigate = useNavigate();
  const socketContext = useContext(SocketContext);

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);
    Promise.all([getOverview(), getPreference()])
      .then(([overviewData, userData]) => {
        if (userData?.status === 200 && userData.data && userData.data.username) {
          setUsername(userData.data.username);
        }
        if (overviewData?.status === 200 && overviewData.data) {
          setOverview(overviewData.data)
        }
      })
      .catch((error) => {
        setError({
          code: error.response.status,
          message: error.response.data.details ?? 'Something went wrong.',
        });
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

  useEffect(() => {
    setDashboardNotification(socketContext.dashboardNotification.payload);
  }, [socketContext]);

  return (
    <Layout streak={overview?.streak || 0} defaultHeader={true} hamburger={true} dashboard={true} title={`Good ${getPartOfDay()}${username ? `, ${username}`: ''}`}>

      <Status overview={overview} />
      {/* Conditions widget */}
      <EntityListWidget type={'conditions'} />
      {/* Influencers widget */}
      <EntityListWidget type={'influencers'} />

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
