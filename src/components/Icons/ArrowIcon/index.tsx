import React from 'react';

interface CustomSVGIconProps {
  className?: string;
  color?: string;
}

const ArrowIcon: React.FC<CustomSVGIconProps> = ({ className, color= '#F26749'}) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="21" height="15" fill="none">
    <path
      fill={color}
      d="M5.825 14.049a1 1 0 0 0 1.475.008l.22-.237a1 1 0 0 0 .008-1.35L4.237 8.833H20a1 1 0 0 0 1-1v-.442a1 1 0 0 0-1-1H4.2l3.298-3.645a1 1 0 0 0 0-1.342l-.199-.22a1 1 0 0 0-1.483 0L.607 6.942a1 1 0 0 0 0 1.342l5.218 5.766Z"
    />
  </svg>
);

export default ArrowIcon;
