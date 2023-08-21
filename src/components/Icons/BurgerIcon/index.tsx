import React from 'react';

interface CustomSVGIconProps {
  className?: string;
}

const BurgerIcon: React.FC<CustomSVGIconProps> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="18" height="12" fill="none">
    <path
      stroke="#F26749"
      strokeLinecap="round"
      strokeWidth="2"
      d="M1 1h16M1 6h16M1 11h16"
    />
  </svg>
);

export default BurgerIcon;
