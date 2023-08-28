import React, { FC, useEffect, useState } from 'react';
import { LineChart, XAxis, YAxis, Line, ResponsiveContainer } from 'recharts';
import CustomizedAxisTick from './CustomizedAxisTick';
import { IPredictionGraphList } from '../../interfaces';
// import BackgraundGraph from './BackgraundGraph';
// import Gradient from './BackgraundGraph/Gradient1';
import { getDayOfWeekByDate } from '../../helpers/time';

interface IProps {
  data: IPredictionGraphList[];
}

const PredictionGraph: FC<IProps> = ({data}) => {
  const [range, setRange] = useState<string[]>(['auto', 'auto']);
  const [graphData, setGraphData] = useState<IPredictionGraphList[] | []>([]);
  // const [backData, setBackData] = useState<number[] | []>([]);


  const list: IPredictionGraphList[] = [
    {
      date: 'Today',
      score: 45,
      emoji: '🌓',
    },
    {
      date: 'Thu',
      score: 61,
      emoji: '🌓',
    },
    {
      date: 'Fri',
      score: 66,
      emoji: '🌓',
    },
    {
      date: 'Sat',
      score: 30,
      emoji: '🌓',
    },
    {
      date: 'Sun',
      score: 74,
      emoji: '🌓',
    },
    {
      date: 'Mon',
      score: 45,
      emoji: '🌓',
    },
    {
      date: 'Thu',
      score: 61,
      emoji: '🌓',
    },
    {
      date: 'Fri',
      score: 66,
      emoji: '🌓'
    },
    {
      date: 'Sat',
      score: 30,
      emoji: '🌓'
    },
    {
      date: 'Sun',
      score: 74,
      emoji: '🌓'
    },
    {
      date: 'Mon',
      score: 45,
      emoji: '🌓'
    },
    {
      date: 'Thu',
      score: 61,
      emoji: '🌓'
    },
    {
      date: 'Fri',
      score: 66,
      emoji: '🌓'
    },
    {
      date: 'Sat',
      score: 30,
      emoji: '🌓'
    },
    {
      date: 'Sun',
      score: 74,
      emoji: '🌓'
    },
    {
      date: 'Mon',
      score: 45,
      emoji: '🌓'
    },
    {
      date: 'Tue',
      score: 45,
      emoji: '🌓'
    },
    {
      date: 'Wed',
      score: 45,
      emoji: '🌓'
    },
    {
      date: 'Wed',
      score: 45,
      emoji: '🌓'
    },
    {
      date: 'Wed',
      score: null,
      emoji: '🌓'
    },
  ];

  useEffect(() => {
    // const values: number[] = [];
    const state: IPredictionGraphList[] = [...list];
    state.forEach(({ date, score, emoji }, index) => {
      const day = index === 0 ? 'Today' : getDayOfWeekByDate(date);
      state[index].value = `${date}_${score}_${emoji}`;
      // if (score) {
      //   values.push(score);
      // }
    });
    setGraphData(state);
    // setBackData(values);
    setTimeout(() => {
      setRange(['dataMin', 'dataMax']);
    }, 1000);
  }, []);
// 190
  return (
    <div className='scrolling-x-auto overflow-x-auto h-[160px] z-10 mt-10 pr-10 relative'>
      {graphData && (
        <ResponsiveContainer
          className="mt-4 w-full"
          width={60 * graphData.length}
          maxHeight={100}
        >
          <LineChart data={graphData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
            <XAxis
              tick={<CustomizedAxisTick />}
              tickLine={false}
              axisLine={false}
              dataKey="value"
              interval={0}
            />
            <YAxis axisLine={false} tick={false} domain={range} />
            <Line
              type="linear"
              dataKey="score"
              stroke="#FDFCFB50"
              dot={{ stroke: 'white', strokeWidth: 1, fill: 'white' }}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
      {/*<Gradient/>*/}
      {/*<BackgraundGraph data={backData} />*/}
    </div>
  );
};

export default PredictionGraph;
