import React, { useEffect, useState, useContext } from 'react';
import { Button } from 'antd';
import Layout from 'layouts/Layout';
import { Spin } from 'antd';
import { useNavigate } from 'react-router-dom';
import Drawer from 'components/UI/Modal/Drawer';
import Status from '../Status';
import { getUser, invokeInteractionServiceByType } from 'services/authservice';
import {getPartOfDay} from 'helpers/time';
import {IOverview} from 'interfaces';
import EntityListWidget from 'components/Widgets/EntityListWidget';
import { getOverview } from 'services/dashboardservice';
import useLocalStorage from 'hooks/useLocalStorage';
import AuthContext, { AuthContextData } from 'contexts/AuthContext';

const DashboardNew = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const [username, setUsername] = useState<string | null>(null);
  const [overview, setOverview] = useState<IOverview>();
  const [isOnboarding] = useLocalStorage("isOnboarding");
  const context = useContext<AuthContextData | undefined>(AuthContext);

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);
    const id = context?.user;
    const username = sessionStorage.getItem('un-dash');
    const promises = [getOverview()];
    if (id && !username) {
      promises.push(getUser(id))
    } else if (username) {
      setUsername(username);
    }
    Promise.all(promises)
      .then(([overviewData, userData]) => {
        if (userData?.status === 200 && userData.data && userData.data.name) {
          setUsername(userData.data.name);
          sessionStorage.setItem('un-dash', userData.data.name);
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
    invokeInteractionServiceByType({type})
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
    if(isOnboarding){
      localStorage.removeItem('isOnboarding')
    }
  },[]);

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  return (
    <Layout streak={overview?.streak || 0} defaultHeader={true} hamburger={true} dashboard={true} title={`Good ${getPartOfDay()}${username ? `, ${username}`: ''}`}>

      <Status overview={overview} />
      {/*/!* Conditions widget *!/*/}
      <EntityListWidget type={'conditions'} />
      {/*/!* Influencers widget *!/*/}
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
