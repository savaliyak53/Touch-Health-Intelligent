import React, { useEffect, useState, useContext } from 'react';
import { RightOutlined } from '@ant-design/icons';
import { Button, Select, Spin } from 'antd';
import {
  Chart as ChartJS,
  Filler,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
  TimeScale,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import './index.scss';
import Layout from '../../layouts/Layout/Layout';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import 'chartjs-adapter-date-fns';
import { InsightContext } from '../../contexts/InsightContext';
const { Option } = Select;
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  TimeScale,
  Title,
  Tooltip,
  Legend,
  Filler
);

const Insights = () => {
  const context = useContext(InsightContext);
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');
  const [dataset, setDataset] = useState();
  const [startDate, setForecastStartDate] = useState();
  const [lastDate, setForecastLastDate] = useState();

  const [category, setCategory] = useState();
  let data = {};
  //selected Insight from localstorage is saved as [i]-[j]
  const [insight, setInsight] = useState();
  const [type, setType] = useState('day');
  const [vmin, setVmin] = useState(0);
  const [vmax, setVmax] = useState(1);

  const dateHighlighter = {
    id: 'dateHighlighter',
    beforeDatasetsDraw(chart, args, pluginOptions) {
      const {
        ctx,
        chartArea: { top, bottom, left, right, width, height },
        scales: { x, y },
      } = chart;
      ctx.fillStyle = 'rgba(0,0,0,0.2)';
      const forecastStartDate = new Date(startDate);
      const forecastLastDate = new Date(lastDate);
      ctx.fillRect(
        x.getPixelForValue(forecastStartDate),
        top,
        x.getPixelForValue(forecastLastDate) -
          x.getPixelForValue(forecastStartDate),
        height
      );
    },
  };
  const legendMargin = {
    id: 'legendMargin',
    beforeInit(chart, legend, options) {
      const fitValue = chart.legend.fit;
      chart.legend.fit = function fit() {
        fitValue.bind(chart.legend)();
        return (this.height += 20);
      };
    },
  };
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        align: 'start',
        labels: {
          usePointStyle: true,
          pointStyle: 'circle',
        },
      },
    },
    scales: {
      x: {
        type: 'time',
        time: {
          unit: type,
          displayFormats: {
            quarter: 'MMM YYYY',
          },
        },
      },
      y: {
        min: vmin,
        max: vmax,
      },
    },
  };
  const selectedInsightIndex = localStorage.getItem('selectedInsight');
  const selectedInsight = context.selectedInsight;
  const getSelectedInsight = async () => {
    const response = await context.commands.loadInsights();
    const splitIndex = selectedInsightIndex && selectedInsightIndex.split('-');
    const insightIndex = splitIndex && splitIndex.map(Number);
    calculate(insightIndex, response);
  };
  useEffect(() => {
    getSelectedInsight();
  }, []);
  const getOpacity = (insight) => {
    const alpha_max = 1;
    const alpha_min = 0.25;
    const alpha =
      alpha_min +
      ((insight.present_value.expectation - insight.forecast.vmin) *
        (alpha_max - alpha_min)) /
        (insight.forecast.vmax - insight.forecast.vmin);
    return alpha;
  };

  const calculate = (insightArray, response) => {
    const i = insightArray[0];
    const j = insightArray[1];
    const selectedinsight = response.insights[i][j];
    selectedInsight && setInsight(selectedInsight);
    setYAxis(selectedinsight);
    // console.log(
    //   'This log is for Rahmeen to test opacity of this insight tile: ',
    //   getOpacity(response.insights[i][j])
    // );
    setCategory(selectedinsight.category.name);
    const forecastTime = selectedinsight.forecast.times.map((item) => {
      return item;
    });
    setForecastStartDate(forecastTime[0]);
    setForecastLastDate(forecastTime[forecastTime.length - 1]);
    const historicalTime = selectedinsight.historical.times.map((item) => {
      return item;
    });
    //setHistoricalData
    const expectation = selectedinsight.historical.expectation;
    const historicalArray = [];
    for (let i = 0; i < expectation.length; i++) {
      const dataArray = [];
      dataArray.push(historicalTime[i]);
      dataArray.push(expectation[i]);
      historicalArray.push(dataArray);
    }
    //setForecastData
    const forecast = selectedinsight.forecast.expectation;
    const forecastArray = [];
    for (let i = 0; i < forecast.length; i++) {
      const dataArray = [];
      dataArray.push(forecastTime[i]);
      dataArray.push(forecast[i]);
      forecastArray.push(dataArray);
    }
    data = {
      datasets: [
        {
          label: 'Historical',
          data: historicalArray,
          fill: false,
          borderColor: '#3A4A7E',
          backgroundColor: '#3A4A7E',
          lineTension: 0.4,
          min: 0,
          max: 1,
        },
        {
          label: 'Forecast',
          data: forecastArray,
          fill: false,
          lineTension: 0.4,
          min: 0,
          max: 1,
          backgroundColor: '#FF0000',
          segment: {
            borderColor: '#FF0000',
          },
        },
      ],
    };

    setDataset(data);
  };
  const handleCategoryChange = () => {
    const splitIndex = selectedInsightIndex && selectedInsightIndex.split('-');
    const insightIndex = splitIndex && splitIndex.map(Number);
    if (!insightIndex) return;
    const iIndex = insightIndex[0];
    const jIndex = insightIndex[1];
    const jIndexlength = context.insights.insights[iIndex].length;
    const iIndexlength = context.insights.insights.length;
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
  const setYAxis = (selectedinsight) => {
    setVmin(selectedinsight.historical.vmin);
    setVmax(selectedinsight.historical.vmax);
  };
  const handleTimelineChange = () => {
    navigate('/insights/guideline');
  };
  return (
    <>
      <Layout defaultHeader={true} hamburger={true} dashboard={false}>
        <Spin spinning={!context?.insights}>
          <div className="Content-wrap Analytic">
            <div className="Insite-btn" onClick={handleTimelineChange}>
              <Button>
                Timeline <RightOutlined />
              </Button>
            </div>
            <div className="Title-wrap" onClick={handleCategoryChange}>
              <h2 className="Analytic-title">
                {category && category}
                {/* Hypertension <br /> management */}
              </h2>
              <RightOutlined />
            </div>
            <div className="filters-wrap">
              <Select
                defaultValue="day"
                placeholder="Select View"
                dropdownStyle={{
                  padding: '0',
                  borderRadius: '4px',
                  borderColor: '#616C61',
                }}
                onChange={(value) => setType(value)}
              >
                <Option value="day">Daily</Option>
                <Option value="hour">Hourly</Option>
                <Option value="week">Weekly</Option>
              </Select>
            </div>
            {dataset && context.insights && (
              <div className="chart-wrap">
                <div className="chart">
                  <Line
                    id="myChart"
                    options={options}
                    data={dataset}
                    plugins={[dateHighlighter, legendMargin]}
                  />
                </div>
              </div>
            )}
          </div>
          {/* <To-do-Nayab> Please take tooltip data from oracle</To-do-Nayab>
          <div className="tooltip">
            <span className="link-text">?</span>
          </div> */}
        </Spin>
      </Layout>
    </>
  );
};

export default Insights;
