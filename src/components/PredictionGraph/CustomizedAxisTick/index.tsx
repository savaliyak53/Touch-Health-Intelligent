import React, { FC } from 'react';

const CustomizedAxisTick: FC = (props: any) => {
  const { x, y, payload } = props;
  const [date, score, emoji] = payload.value.split('_');

  return (
    <g transform={`translate(${x},${y})`}>
      <foreignObject x={-20} y={0} width={50} height={70}>
        <div key={`${date}`} className="flex flex-col justify-center items-center w-full">
          <div className='mb-2 text-white font-roboto text-xs font-medium leading-[14px] opacity-90'>
            {date}
          </div>
          <div className='mb-1 w-6 h-6 rounded-[50%] bg-glass flex justify-center items-center text-xs'>
            {emoji && emoji !== 'null' ? emoji : '-'}
          </div>
          <div className='text-white font-roboto text-xs font-medium leading-[14px] opacity-90'>
            {(score === 'null' || Number(score) === 0) ? '--' : score}
          </div>
        </div>
      </foreignObject>
    </g>
  );
};

export default CustomizedAxisTick;
