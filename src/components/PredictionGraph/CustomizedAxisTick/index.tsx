import React, { FC } from 'react';

const CustomizedAxisTick: FC = (props: any) => {
  console.log('props', props);
  const { x, y, payload } = props;
  const date = payload.value;
  const score = 45;
  const emoji = '🌓';

  return (
    <g transform={`translate(${x},${y})`}>
      <foreignObject x={-60} y={0} width={120} height={70}>
        <div key={`${date}`} className="flex flex-col justify-center items-center w-full">
          <div className='mb-2 text-white font-roboto text-xs text-medium leading-[14px] opacity-90'>
            {date}
          </div>
          <div className='mb-1 w-6 h-6 rounded-[50%] bg-glass flex justify-center items-center text-xs'>
            {score ? emoji : '-'}
          </div>
          <div className='text-white font-roboto text-xs text-medium leading-[14px] opacity-90'>
            {score ? score : '-'}
          </div>
        </div>
      </foreignObject>
    </g>
  );
};

export default CustomizedAxisTick;
