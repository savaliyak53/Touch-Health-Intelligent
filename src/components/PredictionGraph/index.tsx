import React, { FC, useEffect, useState } from 'react';
import { LineChart, XAxis, YAxis, Line, ResponsiveContainer } from 'recharts';
import CustomizedAxisTick from './CustomizedAxisTick';
import { IPredictionGraphList } from '../../interfaces';

interface IProps {
  list?: IPredictionGraphList[];
}

const PredictionGraph: FC<IProps> = () => {
  const [range, setRange] = useState<string[]>(['auto', 'auto']);
  const [data, setData] = useState<IPredictionGraphList[] | []>([]);
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
    // {
    //   date: 'Fri',
    //   score: 66,
    //   emoji: '🌓'
    // },
    // {
    //   date: 'Sat',
    //   score: 30,
    //   emoji: '🌓'
    // },
    // {
    //   date: 'Sun',
    //   score: 74,
    //   emoji: '🌓'
    // },
    // {
    //   date: 'Mon',
    //   score: 45,
    //   emoji: '🌓'
    // },
    // {
    //   date: 'Thu',
    //   score: 61,
    //   emoji: '🌓'
    // },
    // {
    //   date: 'Fri',
    //   score: 66,
    //   emoji: '🌓'
    // },
    // {
    //   date: 'Sat',
    //   score: 30,
    //   emoji: '🌓'
    // },
    // {
    //   date: 'Sun',
    //   score: 74,
    //   emoji: '🌓'
    // },
    // {
    //   date: 'Mon',
    //   score: 45,
    //   emoji: '🌓'
    // },
    // {
    //   date: 'Tue',
    //   score: 45,
    //   emoji: '🌓'
    // },
    // {
    //   date: 'Wed',
    //   score: 45,
    //   emoji: '🌓'
    // },
    // {
    //   date: 'Wed',
    //   score: 45,
    //   emoji: '🌓'
    // },
    // {
    //   date: 'Wed',
    //   score: null,
    //   emoji: '🌓'
    // },
  ];

  useEffect(() => {
    list.forEach(({ date, score, emoji }, index) => {
      list[index].value = `${date}_${score}_${emoji}`;
    });
    setData(list);
    setTimeout(() => {
      setRange(['dataMin', 'dataMax']);
    }, 1000);
  }, []);

  return (
    <div className="flex justify-start items-center w-full bg-primary-delft-dark h-full scrolling-x-auto overflow-x-scroll">
      {data && data.length && (
        <ResponsiveContainer
          className="mt-4 w-full"
          width={60 * list.length}
          maxHeight={100}
        >
          <LineChart data={data}>
            <XAxis
              tick={<CustomizedAxisTick />}
              tickLine={false}
              axisLine={false}
              dataKey="value"
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
    </div>
  );
};

export default PredictionGraph;
