import React from 'react';

interface CustomSVGIconProps {
  color?: string;
  bgColor?: string;
  size?: number;
  className?: string;
}

const ExclamationPointIcon: React.FC<CustomSVGIconProps> = ({
  color = '#F26749',
  bgColor = '#F26749',
  size = 18,
  className = ''
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    width={size}
    height={size}
    fill="none"
  >
    <circle
      cx="9"
      cy="9"
      r="9"
      fill={bgColor}
      opacity=".3"
      transform="rotate(180 9 9)"
    />
    <path
      fill={color}
      d="M8.389 11.396V4h1.654v7.396H8.389Zm1.763 1.942c0 .25-.082.458-.246.622-.168.169-.4.253-.697.253-.292 0-.522-.084-.69-.253a.831.831 0 0 1-.253-.622c0-.246.084-.451.253-.615.168-.164.398-.246.69-.246.296 0 .529.082.697.246.164.164.246.369.246.615Z"
    />
  </svg>
);

export default ExclamationPointIcon;
