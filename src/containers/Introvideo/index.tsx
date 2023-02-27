import React, { useEffect, useState } from 'react';
// import './intro-video.scss';
import styles from './Introvideo.module.scss';
import Button from '../../components/Button';
import { useNavigate } from 'react-router-dom';
import { Typography } from 'antd';
import { getInteractionService, getInteractionServiceByType, getUser, preferencesService } from '../../services/authservice';
import { toast } from 'react-toastify';
import Layout from '../../layouts/Layout/Layout';
const { Title } = Typography;
const IntroVideo = () => {
  const navigate = useNavigate();
  useEffect(() => {
  const userId = localStorage.getItem('userId');
  getInteractionServiceByType('frontend_testing')
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
    <Layout defaultHeader={true} hamburger={false}>
    <div className={styles["intro-video"]}>
      <div>
        This screen is a test screen to initiate frontend_testing Interaction 
      </div>
    </div>
    </Layout>
  );
};
export default IntroVideo;