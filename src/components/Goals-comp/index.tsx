import React from 'react';

import './style.scss';
import { Progress } from 'antd';

export const GoalsComp = ({ name, score }: any) => {
  return (
    <div className="goalsBar">
      <div className="goalsContainer">
        <p className="goalsLevel">Level 1</p>
        <p className="goalsTitle">{name}</p>
        <Progress
          showInfo={false}
          percent={score}
          strokeColor={'#B3FFD1'}
          strokeWidth={7}
          className="progressBar"
        />
      </div>
    </div>
  );
};
