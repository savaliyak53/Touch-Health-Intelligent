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

  useEffect(() => {
    if (context?.showButton === `${outer}-${inner}`) {
      setShow(true);
    } else {
      setShow(false);
    }
  }, [context?.showButton]);
  const handleClick = () => {
    if (!disabled) {
      navigate(`/goals/${insight?.id}`)
    }
  };
  return (
    <>
      <Button
        onClick={handleClick}
        key={insight?.name + Math.random().toString()}
        className={`Diamond-Btn
        ${color === '394A7E' ? 'blue' : 'green'
        } ${outerButton? `${disabled ? 'disabled' : ''}`:``} ${show ? 'show' : ''}`}
        style={{ backgroundColor: `${color? `rgb(${color === '394A7E' ? '57, 74, 126' : '89, 170, 142'}, ${highlight})`:'rgb(229, 235, 225, 0.3)'} `}}
      >
        {outerButton ? (
          '.'
        ) : (
          <span className="Btn-text">{insight?.name}</span>
        )}
        {outerButton ? '.' : <img src={image} className="Btn-img" />}
      </Button>
    </>
  );
}

export default DashboardButton;