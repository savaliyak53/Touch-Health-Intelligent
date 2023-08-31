import React, { FC } from 'react';

interface InputProps {
  type: 'default' | 'auth';
  onClick: () => void;
  children: React.ReactNode;
  isLoading?: boolean;
  isDisabled?: boolean;
  className?: string;
}

const TouchButton: FC<InputProps> = ({
   type = 'default',
   onClick,
   isLoading = false,
   className = '',
   isDisabled = false,
   children
  }) => {
  const baseClasses = `${type === 'default' ? 'bg-primary-delft-dark' : 'bg-high-dark'} rounded-[100px] flex justify-center items-center text-nimbus w-full p-4 h-[50px] text-center font-tilt-warp text-[16px] font-normal leading-[14px] cursor-pointer transition ease-in-out duration-300`;

  const disabledClasses = 'disabled:cursor-not-allowed disabled:opacity-60';

  return (
    <button
      type='button'
      onClick={onClick}
      disabled={isDisabled || isLoading}
      className={`${baseClasses} ${disabledClasses} ${className}`}
    >
      {isLoading && <span className='button-loader mr-2'></span>}
      {children}
    </button>
  );
};

export default TouchButton;