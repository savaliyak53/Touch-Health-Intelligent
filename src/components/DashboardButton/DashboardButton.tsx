import React, { useContext } from 'react';
import { Button } from 'antd';
import { ArrowUpOutlined } from '@ant-design/icons';
import './DashboardButton.scss';
import { useNavigate } from 'react-router-dom';
import { InsightContext } from '../../contexts/InsightContext';
import { Buffer } from 'buffer';

type Props = {
  innerButtons: boolean;
  image: string;
  innerButtonImage: string;
  disabled: boolean;
  color: string;
  outerButton: boolean;
  inner?: number;
  outer?: number;
  insight?: any;
  highlight: number;
};
function DashboardButton({
  innerButtons,
  innerButtonImage,
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
  return (
    <>
      <Button
        className={`Diamond-Btn ${
          color === '394A7E' ? 'primary' : 'secondary'
        }  ${highlight > 0 ? 'highlight' : ''}  ${disabled ? 'disabled' : ''}`}
      >
        <div className="inner-1">
          <Button className="btn-inner" onClick={handleRedirectInsights}>
            <img
              src={`${process.env.PUBLIC_URL}/assets/mobileassets/Block-Chart-2.png`}
              alt=""
            />
          </Button>
        </div>
        {outerButton ? (
          '.'
        ) : (
          <span className="Btn-text">{insight?.category.name}</span>
        )}
        {outerButton ? '.' : <img src={image} className="Btn-img" />}
        <div className="inner-2">
          <Button className="btn-inner" onClick={handleRedirectTimeline}>
            <img
              src={`${process.env.PUBLIC_URL}/assets/mobileassets/Diagram-2.png`}
              alt=""
            />
          </Button>
        </div>
      </Button>
    </>
  );
}

export default DashboardButton;
