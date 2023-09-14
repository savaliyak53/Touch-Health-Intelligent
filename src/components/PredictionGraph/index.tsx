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

const PredictionGraph: FC<IProps> = ({data}) => {
  const [range, setRange] = useState<string[]>(['auto', 'auto']);
  const [graphData, setGraphData] = useState<IPredictionGraphList[] | []>([]);

  const filteredData = useMemo(() => {
    const filtered_predictions: any = []
    const currentDate: string = new Date().toISOString().split('T')[0];
      
    const tomorrowDate = new Date();
    tomorrowDate.setDate(tomorrowDate.getDate() + 1);
    const tomorrowDateString: string = tomorrowDate.toISOString().split('T')[0];

    const thirdDate = new Date();
    thirdDate.setDate(thirdDate.getDate() + 2);
    const thirdDateString: string = thirdDate.toISOString().split('T')[0];

    const filtered_predictions_today = data.filter((item: any) => item.dt === currentDate);
    if(filtered_predictions_today.length < 1) filtered_predictions.push({dt: currentDate, emoji: '❔', value: '—', uncertainy: '—'});
    else filtered_predictions.push(filtered_predictions_today[0]) 

    const filtered_predictions_tom = data.filter((item: any) => item.dt === tomorrowDateString);
    if(filtered_predictions_tom.length < 1) filtered_predictions.push({dt: tomorrowDateString, emoji: '❔', value: '—', uncertainy: '—'});
    else filtered_predictions.push(filtered_predictions_tom[0]) 

    const filtered_predictions_third = data.filter((item: any) => item.dt === thirdDateString);
    if(filtered_predictions_third.length < 1) filtered_predictions.push({dt: thirdDateString, emoji: '❔', value: '—', uncertainy: '—'});
    else filtered_predictions.push(filtered_predictions_third[0]) 

    return filtered_predictions
  },[data])

  useEffect(() => {
    // const values: number[] = [];
    const state: IPredictionGraphList[] = filteredData;
    state.forEach(({ dt: date, value: score, emoji }, index) => {
      const day = index === 0 ? 'Today' : getDayOfWeekFromToday(date, index);
      state[index].score = Number(score);
      state[index].value = `${day}_${score}_${emoji}`;
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
      {/*<BackgroundGraph data={backData} />*/}
    </div>
  );
};

export default PredictionGraph;
