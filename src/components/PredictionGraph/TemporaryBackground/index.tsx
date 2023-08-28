import React, { FC } from "react";

const TemporaryBackground: FC = () => {

  return (
    <div className='flex items-center absolute top-[20%] xl:top-0 z-1 w-full'>
      <svg className='mr-[-245px] w-full' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 378 408" fill="none">
        <g filter="url(#a)" opacity=".5">
          <path fill="url(#b)"
                d="M49.807 317.346C-80.27 295.927-189.461 247.855-194.08 209.975c-4.619-37.88-42.794-214.275 221.244-78.33 130.077 21.419 337.583 10.416 249.804 155.895 4.619 37.88-97.085 51.225-227.161 29.806Z" />
        </g>
        <defs>
          <linearGradient id="b" x1="287.803" x2="-145.402" y1="314.562" y2="192.359" gradientUnits="userSpaceOnUse">
            <stop stopColor="#F0ECE7" />
            <stop offset=".49" stopColor="#B3FFD1" />
            <stop offset=".984" stopColor="#F0ECE7" />
          </linearGradient>
          <filter id="a" width="656.568" height="406.601" x="-278.592" y=".964" colorInterpolationFilters="sRGB"
                  filterUnits="userSpaceOnUse">
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
            <feGaussianBlur result="effect1_foregroundBlur_2380_155" stdDeviation="40" />
          </filter>
        </defs>
      </svg>
      <svg className='w-full' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 258 298" fill="none">
        <g filter="url(#c)">
          <path fill="url(#d)" fillOpacity=".6"
                d="M343.12 90.772c95.066 133.221-89.557 128.082-150.953 149.574-61.397 21.491-158.6-9.819-138.795-67.511-3.254-66.919 79.278-65.641 140.675-87.133C293.8 33.97 324.121 42.145 343.12 90.773Z" />
        </g>
        <defs>
          <linearGradient id="d" x1="160.465" x2="204.477" y1="99.041" y2="224.772" gradientUnits="userSpaceOnUse">
            <stop stopColor="#F9A197" />
            <stop offset=".589" stopColor="#8AA4EC" />
          </linearGradient>
          <filter id="c" width="419.064" height="296.71" x=".757" y=".438" colorInterpolationFilters="sRGB"
                  filterUnits="userSpaceOnUse">
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
            <feGaussianBlur result="effect1_foregroundBlur_2380_156" stdDeviation="25" />
          </filter>
        </defs>
      </svg>
    </div>
  );
};

export default TemporaryBackground;
