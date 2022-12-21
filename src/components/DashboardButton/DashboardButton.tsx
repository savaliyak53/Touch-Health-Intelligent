import React, { useContext, useEffect, useState } from 'react';
import { Button } from 'antd';
import { ArrowUpOutlined } from '@ant-design/icons';
import './DashboardButton.scss';
import { useNavigate } from 'react-router-dom';
import { InsightContext } from '../../contexts/InsightContext';
import { Buffer } from 'buffer';
import hexToRgba from 'hex-to-rgba';

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
  isPlus?: boolean;
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
  isPlus,
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
        className={`Diamond-Btn
        ${outerButton? `${disabled ? 'disabled' : ''}`:``} ${show ? 'show' : ''}`}
        style={{ backgroundColor: `${color? `${hexToRgba(color, highlight)}`:'rgb(229, 235, 225, 0.3)'} `}}
      >
        {outerButton ? (
          '.'
        ) : (
          <span className="Btn-text">{insight?.category.name}</span>
        )}
        {outerButton ? '.' : isPlus? <img src={image} className="Btn-img" /> : highlight && <span className="Btn-img Btn-letter" style={{color: `${highlight < 0.5? `#${color}` : `#fff`}`}}>S</span>}
      </Button>
    </>
  );
}

export default DashboardButton;