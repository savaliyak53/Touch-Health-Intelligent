import React from 'react';

interface CustomSVGIconProps {
  color?: string;
  size?: number;
  className?: string;
}

const ArrowDownIcon: React.FC<CustomSVGIconProps> = ({
  color = '#080815',
  size = 24,
  className = '',
}) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} width={size} height={size}>
    <path fill={color} d="M12 17.414 3.293 8.707l1.414-1.414L12 14.586l7.293-7.293 1.414 1.414L12 17.414z" />
  </svg>
);

export default ArrowDownIcon;
