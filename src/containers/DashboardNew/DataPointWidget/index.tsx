import React, { useEffect, useState } from 'react';
import { getDashboardDataPoints } from '../../../services/dashboardservice';

const defaultColors = [
  "#204ECF", "#F26749", "#83A5F2", "#FCDED6", "#EA9836", "#F9A197", "#9DD7B4", "#B3FFD1"
]

const DataPointWidget = () => {
  const [dataPointColors, setDataPointColors] = useState<string[]>([]);

  const generateDataPoints = (count: number, colors: string[]) => {
    const points: string[] = [];
    for (let i = 0; i < count; i++) {
      const color: string = colors[Math.floor(Math.random() * colors.length)];
      points.push(color);
    }
    return points;
  }

  useEffect(() => {
    getDashboardDataPoints()
      .then((response) => {
        if (response.data) {
          const counts = response.data?.num_data_points || 0;
          const colors = response.data?.colors?.length && response.data?.colors || defaultColors;
          const dotPoints: string[] = generateDataPoints(counts, colors);
          setDataPointColors(dotPoints)
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="mb-8 sm:px-[20%]">
      <div className="mb-8">
        <img className='m-auto' src="/assets/icons/dashboard/dashboard_icon.svg" alt='dashboard' />
      </div>
      {
        !!dataPointColors?.length &&
        <div className='flex flex-wrap-reverse gap-[2px] min-h-[115px] content-start relative'>
          {dataPointColors.map((color: string, index: number) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-[50%]`}
              style={{
                backgroundColor: color,
              }}
            />
          ))}
          <div className='absolute bottom-2 right-2 text-[12px] py-[6px] px-[16px] bg-white rounded-[10px] shadow-'>{dataPointColors?.length}/1000</div>
        </div>
      }
    </div>
  );
};

export default DataPointWidget;
