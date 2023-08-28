import React from 'react';

interface CustomSVGIconProps {
  color?: string;
  size?: number;
  className?: string;
}

const EyeIcon: React.FC<CustomSVGIconProps> = ({
  color = '#080815',
  size = 18,
  className = '',
}) => (
  <svg xmlns='http://www.w3.org/2000/svg' className={className} width={size} height={size} fill='none'>
    <g fill={color} fillOpacity='.5' clipPath='url(#a)'>
      <path d='M9 13.898c-2.024 0-4.203-.792-6.3-2.29C1.132 10.49.165 9.38.124 9.334a.509.509 0 0 1 0-.666C.164 8.62 1.132 7.51 2.7 6.39 4.797 4.894 6.976 4.102 9 4.102s4.203.792 6.3 2.29c1.568 1.119 2.535 2.228 2.576 2.275a.51.51 0 0 1 0 .666c-.04.047-1.008 1.156-2.576 2.276-2.097 1.497-4.276 2.289-6.3 2.289ZM1.207 9c.391.4 1.13 1.1 2.105 1.795C4.649 11.745 6.72 12.88 9 12.88c2.28 0 4.351-1.134 5.688-2.085A16.067 16.067 0 0 0 16.793 9c-.391-.399-1.13-1.1-2.105-1.795C13.351 6.255 11.28 5.12 9 5.12c-2.28 0-4.351 1.134-5.688 2.085A16.06 16.06 0 0 0 1.207 9Z' />
      <path d='M9 12.156A3.16 3.16 0 0 1 5.844 9 3.16 3.16 0 0 1 9 5.844c.765 0 1.504.278 2.079.782a.509.509 0 0 1-.671.765A2.14 2.14 0 0 0 6.862 9 2.14 2.14 0 0 0 9 11.138 2.14 2.14 0 0 0 11.138 9a.509.509 0 0 1 1.018 0A3.16 3.16 0 0 1 9 12.156Z' />
      <path d='M9 10.018a1.02 1.02 0 0 1 0-2.036 1.02 1.02 0 0 1 0 2.036Z' />
    </g>
    <defs>
      <clipPath id='a'>
        <path fill={color} d='M0 0h18v18H0z' />
      </clipPath>
    </defs>
  </svg>
);

export default EyeIcon;
