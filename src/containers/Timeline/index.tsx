import React, { useContext, useEffect, useState } from 'react';
import { Button, Dropdown, Menu, Space, Spin } from 'antd';
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
  const [loader, setLoader] = useState<boolean>();
  const [insightResponse, setInsightResponse] = useState<any>();
  const selectedInsight = localStorage.getItem('selectedInsight');
  const getSelectedInsight = async (index:any, insightResp:any) => {   
    const splitIndex = index && index.split('-');
    const insightIndex = splitIndex && splitIndex.map(Number);
    calculate(insightIndex, insightResp);
  };
  const calculate = (insightArray: any, response: any) => {
    const i = insightArray[0];
    const j = insightArray[1];
    if (response.insights && response.insights.length && response.insights[i].length) {
      const selectedinsight = response.insights[i][j];
      selectedInsight && setInsight(selectedInsight);
      setCategory(selectedinsight.category.name);
      setImage(selectedinsight.category.icon);
      //setPatternData
      const patterns = selectedinsight.patterns;
      setPatterns(patterns);
      setLoader(false);
    }
    else { 
     setLoader(false); 
    }
  };
  const loadInsights = async (index: any) => {
    setLoader(true);
    const response = await context?.commands.loadInsights();
    setInsightResponse(response);
    getSelectedInsight(index,response);
  };
  // const selectedInsightIndex = localStorage.getItem('selectedInsight');
  useEffect(() => {   
    loadInsights(selectedInsight);
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
    let exactIndex = '';
    if (jIndex < jIndexlength - 1) {
      exactIndex = `${iIndex}-${jIndex + 1}`;
      localStorage.setItem('selectedInsight', `${iIndex}-${jIndex + 1}`);
    } else if (jIndex >= jIndexlength - 1) {
      if (iIndex < iIndexlength - 1) {
        exactIndex = `${iIndex + 1}-${0}`;
        localStorage.setItem('selectedInsight', `${iIndex + 1}-${0}`);
      } else {
        exactIndex = '0-0';
        localStorage.setItem('selectedInsight', `0-0`);
      }
    } else {
      exactIndex = `${iIndex}-${jIndex}`;
      localStorage.setItem('selectedInsight', `${iIndex}-${jIndex}`);
    }
    getSelectedInsight(exactIndex,insightResponse);
    //window.location.reload();
  };
  const sortByUp = () => {
    const up = patterns.filter((item: any) => item.direction === 'up');
    const down = patterns.filter((item: any) => item.direction === 'down');
    setPatterns(up.concat(down));
  };
  const sortByDown = () => {
    const up = patterns.filter((item: any) => item.direction === 'up');
    const down = patterns.filter((item: any) => item.direction === 'down');
    setPatterns(down.concat(up));
  };
  const menu = (
    <Menu
      items={[
        {
          label: (
            <a target="_blank" rel="noopener noreferrer" onClick={sortByUp}>
              Sort by Up
            </a>
          ),
          key: '0',
        },
        {
          label: (
            <a target="_blank" rel="noopener noreferrer" onClick={sortByDown}>
              Sort By Down
            </a>
          ),
          key: '1',
        },
      ]}
    />
  );
  return (
    <>
      <Layout defaultHeader={true} hamburger={true} dashboard={false}>
        <Spin spinning={loader}>
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
              <Dropdown overlay={menu} trigger={['click']}>
                <a onClick={(e) => e.preventDefault()} className="Corr-Title">
                  <Space>
                    Most recent
                    <DownOutlined />
                  </Space>
                </a>
              </Dropdown>

              {patterns &&
                patterns.map((pattern: any, index: number) => (
                  <div className="Each-Relation" key={index}>
                    <div className="Text-btn">
                      <p className="Text" dangerouslySetInnerHTML={{__html: pattern.p_str}} />
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
