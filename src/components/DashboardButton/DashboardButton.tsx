import React, { useContext, useEffect, useState } from 'react';
import { Button } from 'antd';
import { ArrowUpOutlined } from '@ant-design/icons';
import './DashboardButton.scss';
import { useNavigate } from 'react-router-dom';
import { InsightContext } from '../../contexts/InsightContext';
import { Buffer } from 'buffer';

type Props = {
  image?: string;
  disabled?: boolean;
  color?: string;
  outerButton?: boolean;
  inner?: number;
  outer?: number;
  insight?: any;
  highlight?: number;
  show?: boolean;
  onClick?: any;
};
function DashboardButton({
  image,
  disabled,
  color,
  outerButton,
  insight,
  outer,
  inner,
  highlight,
}: Props) {
  const context = useContext(InsightContext);
  const [show, setShow] = useState(false);

  const navigate = useNavigate();
  const handleRedirectInsights = async () => {
    await context?.commands?.loadSelectedInsightIndex(`${outer}-${inner}`);
    await context?.commands?.loadSelectedInsight(insight);
    navigate('/insights');
  };

  const handleRedirectTimeline = async () => {
    await context?.commands?.loadSelectedInsightIndex(`${outer}-${inner}`);
    await context?.commands?.loadSelectedInsight(insight);
    navigate('/insights/guideline');
  };
  useEffect(() => {
    if (context?.showButton === `${outer}-${inner}`) {
      setShow(true);
    } else if (context?.showButton === '') {
      setShow(true);
    } else {
      setShow(false);
    }
  }, [context?.showButton]);
  const handleClick = () => {
    if (!disabled) {
      context?.commands.setInsightButton(`${outer}-${inner}`);
    }
  };
  return (
    <>
      <Button
        onClick={handleClick}
        key={insight?.category.name + Math.random().toString()}
        className={`Diamond-Btn ${
          color === '394A7E'
            ? 'primary'
            : color == 'undefined' || color == undefined
            ? ''
            : 'secondary'
        } ${disabled ? 'disabled' : ''} ${show ? 'show' : ''}`}
        style={{ opacity: highlight }}
      >
        <div className="inner-1" key={Math.random()}>
          <a className="btn-inner" onClick={handleRedirectInsights}>
            <img
              src={`${process.env.PUBLIC_URL}/assets/mobileassets/Block-Chart-2.png`}
              alt=""
            />
          </a>
        </div>
        {outerButton ? (
          '.'
        ) : (
          <span className="Btn-text">{insight?.category.name}</span>
        )}
        {outerButton ? '.' : <img src={image} className="Btn-img" />}
        <div className="inner-2" key={Math.random()}>
          <a className="btn-inner" onClick={handleRedirectTimeline}>
            <img
              src={`${process.env.PUBLIC_URL}/assets/mobileassets/Diagram-2.png`}
              alt=""
            />
          </a>
        </div>
      </Button>
    </>
  );
}

export default DashboardButton;
