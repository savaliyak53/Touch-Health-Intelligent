import React from 'react';

interface CustomSVGIconProps {
  color?: string;
  bgColor?: string;
  size?: number;
  className?: string;
}

const InformIcon: React.FC<CustomSVGIconProps> = ({
  color = '#080815',
  bgColor = '#F0ECE7',
  size = 18,
  className = '',
}) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={size}
    height={size}
    fill='none'
    className={className}
  >
    <circle cx='9' cy='9' r='9' fill={bgColor} />
    <path
      fill={color}
      d='M9.611 6.604V14H7.957V6.604h1.654ZM7.848 4.662c0-.25.082-.458.246-.622.168-.169.4-.253.697-.253.292 0 .522.084.69.253a.831.831 0 0 1 .253.622.823.823 0 0 1-.253.615c-.168.164-.398.246-.69.246-.296 0-.529-.082-.697-.246a.835.835 0 0 1-.246-.615Z'
      opacity='.5'
    />
  </svg>
);

export default InformIcon;
