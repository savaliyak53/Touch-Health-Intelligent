import React, { FC } from 'react';

interface InputProps {
  type: 'default' | 'auth' | 'secondary';
  onClick: () => void;
  children: React.ReactNode;
  isLoading?: boolean;
  isDisabled?: boolean;
  className?: string;
  isExtraPadding?: boolean;
}

const TouchButton: FC<InputProps> = ({
   type = 'default',
   onClick,
   isLoading = false,
   className = '',
   isDisabled = false,
   isExtraPadding,
   children
  }) => {

  const getBaseClass = (): string => {
    if (type === 'auth') {
      return 'bg-high-dark font-tilt-warp font-normal text-[16px] text-nimbus';
    } else if (type === 'secondary') {
      return 'bg-rae text-high-medium font-roboto font-medium text-[14px]';
    }
    return 'bg-primary-delft-dark font-roboto font-medium text-[14px] text-nimbus';
  }

  const getDisableClass = (): string => {
    if (type === 'auth') {
      return 'disabled:opacity-60';
    } else if (type === 'secondary') {
      return 'disabled:bg-nimbus text-high-light';
    }
    return 'disabled:opacity-70 disabled:bg-primary-cornflower-dark disabled:text-[#FDFCFB80]';
  }

  const getHoverClass = (): string => {
    if (type === 'auth') {
      return 'hover:bg-buttongradientBlack';
    } else if (type === 'secondary') {
      return 'hover:bg-buttonGradientSecondary hover:text-high-dark';
    }
    return 'hover:bg-buttongradient';
  }

  const getActiveClass = (): string => {
    if (type === 'auth') {
      return 'active:shadow-buttonBlack';
    } else if (type === 'secondary') {
      return 'active:shadow-buttonSecondary';
    }
    return 'active:shadow-button';
  }

  const baseClasses = `${getBaseClass()} rounded-[100px] flex justify-center items-center w-full ${isExtraPadding ? 'py-8' : 'py-4'} px-4 h-[50px] text-center leading-[14px] cursor-pointer transition ease-in-out duration-300 focus-visible:outline-none`;
  const disabledClasses = `${getDisableClass()} disabled:cursor-not-allowed`;
  let hoverClasses = getHoverClass();
  const activeClasses = getActiveClass();

  if (isDisabled) {
    hoverClasses = 'hover:none'
  }

  return (
    <button
      type='button'
      onClick={onClick}
      disabled={isDisabled || isLoading}
      className={`${baseClasses} ${disabledClasses} ${hoverClasses} ${activeClasses} ${className}`}
    >
      {isLoading && <span className='button-loader mr-2'></span>}
      {children}
    </button>
  );
};

export default TouchButton;