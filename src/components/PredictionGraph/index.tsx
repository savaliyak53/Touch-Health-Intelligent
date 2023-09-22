import React, { FC, useEffect, useMemo, useState } from 'react';
import { LineChart, XAxis, YAxis, Line, ResponsiveContainer } from 'recharts';
import CustomizedAxisTick from './CustomizedAxisTick';
import { IPredictionGraphList } from '../../interfaces';
// import BackgroundGraph from './BackgroundGraph';
// import Gradient from './BackgroundGraph/Gradient1';
import { getDayOfWeekFromToday } from '../../helpers/time';

interface IProps {
  data: IPredictionGraphList[];
}

const PredictionGraph: FC<IProps> = ({ data }) => {
  const [range, setRange] = useState<string[]>(['auto', 'auto']);
  const [graphData, setGraphData] = useState<IPredictionGraphList[] | []>([]);

  const filteredData = useMemo(() => {
    const filtered_predictions: any = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      const dateString = date.toISOString().split('T')[0];

      const filtered_predictions_date = data.filter(
        (item) => item.dt === dateString
      );

      if (filtered_predictions_date.length < 1) {
        filtered_predictions.push({
          dt: dateString,
          emoji: '-',
          value: '--',
          uncertainty: '--',
        });
      } else {
        filtered_predictions.push(filtered_predictions_date[0]);
      }
    }

    return filtered_predictions;
  }, [data]);

  useEffect(() => {
    const updatedData = filteredData.map((item: any, index: number) => {
      const { dt: date, value: score, emoji } = item;
      const day = index === 0 ? 'Today' : getDayOfWeekFromToday(date, index);
      const updatedScore = score == null ? null : Number(score);
      const updatedValue = `${day}_${updatedScore}_${emoji}`;
      return { ...item, score: updatedScore, value: updatedValue };
    });

    setGraphData(updatedData);
    setTimeout(() => {
      setRange(['dataMin', 'dataMax']);
    }, 1000);
  }, []);

  return (
    <div className="scrollBarHidden scrolling-x-auto overflow-x-auto h-[160px] z-10 mt-10 pr-10 relative">
      {graphData && (
        <ResponsiveContainer
          className="mt-4 w-full"
          width={60 * graphData.length}
          maxHeight={100}
        >
          <LineChart
            data={graphData}
            margin={{ top: 0, right: 25, left: -20, bottom: 0 }}
          >
            <XAxis
              tick={<CustomizedAxisTick />}
              tickLine={false}
              axisLine={false}
              dataKey="value"
              interval={0}
            />
            <YAxis axisLine={false} tick={false} domain={range} />
            <Line
              isAnimationActive={false}
              type="linear"
              dataKey="score"
              stroke="#FDFCFB50"
              dot={{ stroke: 'white', strokeWidth: 1, fill: 'white' }}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
      {/*<Gradient/>*/}
      {/*<BackgroundGraph data={backData} />*/}
    </div>
  );
};

export default PredictionGraph;
