import React from 'react';
import './intro-video.scss';
import { Card } from 'antd';
import Button from '../../components/Button';
import { useNavigate } from 'react-router-dom';
import { Typography } from 'antd';
const { Title } = Typography;
const IntroVideo = () => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    localStorage.removeItem('token');
    navigate(`/login`);
  };
  return (
    <div className="intro-video">
      <div className="card-text">
        <Title level={2}>Welcome to Touch Health Assistant</Title>
        <iframe
          className="video-iframe"
          src={`https://www.youtube.com/embed/I42Afr-OUso`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="Embedded youtube"
        />
        <div className="action">
          <Button onClick={handleRedirect} className="btn">
            Done
          </Button>
        </div>
      </div>
    </div>
  );
};
export default IntroVideo;
