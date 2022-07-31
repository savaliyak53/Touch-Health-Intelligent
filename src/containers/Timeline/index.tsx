import React, { useContext, useEffect, useState } from 'react';
import { Button, Spin } from 'antd';
import {
  RightOutlined,
  ArrowDownOutlined,
  DownOutlined,
  CloseOutlined,
  ArrowUpOutlined,
} from '@ant-design/icons';
import './index.scss';
import Layout from '../../layouts/Layout/Layout';
import { InsightContext } from '../../contexts/InsightContext';
import { useNavigate } from 'react-router-dom';
const Timeline = () => {
  const context = useContext(InsightContext);
  const navigate = useNavigate();
  const [insight, setInsight] = useState<any>();
  const [patterns, setPatterns] = useState<any>();
  const [category, setCategory] = useState<string>();
  const [image, setImage] = useState<string>();

  const selectedInsight = localStorage.getItem('selectedInsight');
  //<To-do-hamza >move this to dashboard
  const getSelectedInsight = async () => {
    const response = await context?.commands.loadInsights();
    const splitIndex = selectedInsight && selectedInsight.split('-');
    const insightIndex = splitIndex && splitIndex.map(Number);
    calculate(insightIndex, response);
  };
  const calculate = (insightArray: any, response: any) => {
    const i = insightArray[0];
    const j = insightArray[1];
    const selectedinsight = response.insights[i][j];
    selectedInsight && setInsight(selectedInsight);
    setCategory(selectedinsight.category.name);
    setImage(selectedinsight.category.icon);
    //setPatternData
    const patterns = selectedinsight.patterns;
    setPatterns(patterns);
  };
  useEffect(() => {
    getSelectedInsight();
  }, []);
  const handleInsightsChange = () => {
    navigate('/insights');
  };
  const handleCategoryChange = () => {
    const splitIndex = selectedInsight && selectedInsight.split('-');
    const insightIndex = splitIndex && splitIndex.map(Number);
    if (!insightIndex) return;
    const iIndex = insightIndex[0];
    const jIndex = insightIndex[1];
    const jIndexlength = context?.insights.insights[iIndex].length;
    const iIndexlength = context?.insights.insights.length;
    if (jIndex < jIndexlength - 1) {
      localStorage.setItem('selectedInsight', `${iIndex}-${jIndex + 1}`);
    } else if (jIndex >= jIndexlength - 1) {
      if (iIndex < iIndexlength - 1) {
        localStorage.setItem('selectedInsight', `${iIndex + 1}-${0}`);
      } else {
        localStorage.setItem('selectedInsight', `0-0`);
      }
    } else {
      localStorage.setItem('selectedInsight', `${iIndex}-${jIndex}`);
    }
    window.location.reload();
  };
  return (
    <>
      <Layout defaultHeader={true} hamburger={true} dashboard={false}>
        <Spin spinning={!context?.insights}>
          <div className="Content-wrap Corr">
            <div className="Insite-btn" onClick={handleInsightsChange}>
              <Button>
                Insights <RightOutlined />
              </Button>
            </div>

            <div className="Title-wrap" onClick={handleCategoryChange}>
              <h2 className="Corr-title">{category && category}</h2>
              <RightOutlined />
            </div>

            <div className="Corr-wrap">
              <h3 className="Corr-Title">
                Most recent
                {/* Most recent <DownOutlined /> */}
              </h3>

              {patterns &&
                patterns.map((pattern: any, index: number) => (
                  <div className="Each-Relation" key={index}>
                    <div className="Text-btn">
                      <p className="Text">{pattern.p_str}</p>
                      <div className="Arrow-btn">
                        {pattern.direction === 'up' ? (
                          <ArrowUpOutlined className="arrwo up" />
                        ) : (
                          <ArrowDownOutlined className="arrwo" />
                        )}
                        <Button className="Heart-Btn">
                          <img src={image} />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </Spin>
      </Layout>
    </>
  );
};

export default Timeline;
