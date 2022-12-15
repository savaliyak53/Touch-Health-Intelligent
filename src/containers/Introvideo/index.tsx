import React, { useState } from 'react';
// import './intro-video.scss';
import styles from './Introvideo.module.scss';
import Button from '../../components/Button';
import { useNavigate } from 'react-router-dom';
import { Typography } from 'antd';
import { getInteractionService, getUser } from '../../services/authservice';
import { toast } from 'react-toastify';
import Layout from '../../layouts/Layout/Layout';
const { Title } = Typography;
const IntroVideo = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const getUserInfo = (userId: string | null | undefined) => {
    getUser(userId)
      .then((response: any) => {
        if (response?.data?.preferences?.timezone) {
          getInteractionService()
            .then((response) => {
              if (response?.data?.question) {
                navigate('/questionnaire');
              } else {
                navigate('/dashboard');
              }
            })
            .catch((error) => {
              toast('Unkown Error');
              console.log('error occured', error);
            });
        } else {
          navigate('/preferences');
        }
      })
      .catch((error) => {
        setLoading(false);
        toast('Unknown Error');
        console.log('error occured', error);
      });
  };
  const handleRedirect = () => {
    const userId = localStorage.getItem('userId');
    setLoading(true);
    getUserInfo(userId);
  };
  return (
    <Layout defaultHeader={true} hamburger={false}>
    <div className={styles["intro-video"]}>
      <div>
        <Title level={2}>Welcome to Touch Health Assistant</Title>
        <iframe
          className=""
          src={`https://www.youtube.com/embed/B6AaGFXa10A`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="Embedded youtube"
        />
        <div>
          <Button
            onClick={handleRedirect}
            className="Pref-btn btn"
            loading={loading}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
    </Layout>
  );
};
export default IntroVideo;
