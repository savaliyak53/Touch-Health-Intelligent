import React, { useContext, useEffect } from 'react';
import styles from './Introvideo.module.scss';
import { useNavigate } from 'react-router-dom';
import { invokeInteractionServiceByType } from 'services/authservice';
import { toast } from 'react-toastify';
import Layout from 'layouts/Layout';
const IntroVideo = () => {
  const navigate = useNavigate();
  useEffect(() => {
    // const userId = localStorage.getItem('userId');
    invokeInteractionServiceByType('frontend_testing')
      .then((response: any) => {
        if (response) {
          navigate('/questionnaire');
        } else {
          navigate('/');
        }
      })
      .catch((error) => {
        toast.error(`Something went wrong. `);
      });
  }, []);
  return (
    <Layout defaultHeader={true} hamburger={false} title={'Into video'}>
      <div className={styles['intro-video']}>
        <div>
          This screen is a test screen to initiate frontend_testing Interaction
        </div>
      </div>
    </Layout>
  );
};
export default IntroVideo;
