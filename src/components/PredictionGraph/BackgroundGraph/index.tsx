import React from 'react';

interface Props {
  data: number[];
}

const SvgLineGraph: React.FC<Props> = ({ data }) => {
  const height = 300; // 200
  const width = data.length * 65; // 200
  const segmentWidth = width / data.length;

  const scaleY = (value: number) => height - (value / 100) * height;

  let d = `M 0 ${height}`;

  for (let i = 0; i < data.length; i++) {
    const x = i * segmentWidth;
    const y = scaleY(data[i]);
    if (i === 0) {
      d += `L ${x} ${y} `;
    } else {
      const prevX = (i - 1) * segmentWidth;
      const prevY = scaleY(data[i - 1]);
      const cp1x = prevX + segmentWidth / 3;
      const cp2x = prevX + 2 * segmentWidth / 3;
      d += `C ${cp1x} ${prevY}, ${cp2x} ${y}, ${x} ${y} `;
    }
  }

  d += `L ${width} ${height}`;

  return (
    <svg width={width} height={height} xmlns="http://www.w3.org/2000/svg" overflow="visible">
      <defs>
        <filter id="blurFilter" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="40" />
        </filter>
        <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop stopColor="#F0ECE7" />
          <stop offset="50%" stopColor="#B3FFD1" />
          <stop offset="100%" stopColor="#F0ECE7" />
        </linearGradient>
      </defs>
      <path d={d} fill="url(#lineGradient)" filter="url(#blurFilter)" opacity="0.6" />
    </svg>
  );
}

export default SvgLineGraph;