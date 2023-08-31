import React from 'react';

interface CustomSVGIconProps {
  className?: string;
}

const ArrowDownIcon: React.FC<CustomSVGIconProps> = ({
   className = ''
 }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="10" height="15" fill="none">
    <path fill="#204ECF"
          d="M9.605 10.552A.801.801 0 1 0 8.53 9.364l-2.434 2.202V.843a.843.843 0 1 0-1.685 0V11.59L1.964 9.378a.792.792 0 1 0-1.062 1.174l3.68 3.33a1 1 0 0 0 1.342 0l3.68-3.33Z" />
  </svg>
);

export default ArrowDownIcon;
