import React from 'react';

interface CustomSVGIconProps {
  className?: string;
}

const CloseIcon: React.FC<CustomSVGIconProps> = ({ className }) => (
  <svg className={className} xmlns='http://www.w3.org/2000/svg' width='18' height='18' fill='none'>
    <path fill='#362A2F'
          d='m13.815 12.185-1.442 1.442-8.27-8.27 1.442-1.442 8.27 8.27Zm.158-6.886-8.784 8.784-1.533-1.533 8.784-8.784L13.972 5.3Z' />
  </svg>
);

export default CloseIcon;
