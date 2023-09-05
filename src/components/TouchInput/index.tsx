import React, {FC, useEffect, useState} from 'react';
import 'components/PhoneInput/index.scss';
import InformIcon from '../Icons/InformIcon';
import ExclamationPointIcon from '../Icons/ExclamationPointIcon';
import EyeIcon from '../Icons/EyeIcon';
import { Tooltip } from 'antd';


interface InputProps {
  type: 'text' | 'number' | 'password';
  value: string | number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  resetError?: (str: string) => void;
  checkError?: (str: string) => void;
  placeholder?: string;
  className?: string;
  errorMessage?: string;
  isDisabled?: boolean;
  isVerified?: boolean;
  [key: string]: any;
}

const TouchInput: FC<InputProps> = ({
  type = 'text',
  value,
  onChange,
  resetError,
  checkError,
  placeholder = '',
  className = '',
  errorMessage = '',
  isDisabled = false,
  isVerified = false,
  ...rest
}) => {

  const [isPasswordVisible, setPasswordVisibility] = useState(false);
  const [isFocusedOrFilled, setFocusOrFilled] = useState(false);
  const [activeClass, setActiveClass] = useState('shadow-primary');
  const [isHovered, setIsHovered] = useState(false);
  const inputType = type === 'password' && isPasswordVisible ? 'text' : type;

  useEffect(() => {
    if (errorMessage) {
      setActiveClass('shadow-error');
    }
  }, [errorMessage]);

  useEffect(() => {
    setActiveClass(isVerified ? 'shadow-verified' : 'shadow-primary');
  }, [isVerified]);

  const handleTogglePasswordVisibility = () => {
    setPasswordVisibility((prev) => !prev);
  };

  const onFocus = () => {
    setFocusOrFilled(true);
    setActiveClass('shadow-active');
    if (resetError) {
      resetError('');
    }
  };

  const onBlur = (event: React.ChangeEvent<HTMLInputElement>) => {
    const val = event.target.value;
    setFocusOrFilled(!!val);
    setActiveClass(isVerified ? 'shadow-verified' : 'shadow-primary');
    if (checkError) {
      checkError(val);
    }
  };

  const getPlaceholder = ():string => {
    if (isFocusedOrFilled) {
      switch (placeholder) {
        case 'Enter new password here':
          return 'New password';
        case 'Confirm password here':
          return 'Confirm password';
        default:
          return placeholder;
      }
    }
    return placeholder;
  }

  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div className={`relative w-full h-[60px] px-5 py-[18px] leading-4 bg-dentist rounded-md ${activeClass} ${className}`}>
      <Tooltip
        title={errorMessage}
        placement="bottomRight"
        color="blue"
        open={!!errorMessage && isHovered}>
        <label
          className={`font-medium text-left leading-[14px] absolute left-[20px] top-[25px] opacity-50 transition-all duration-300 ease-linear pointer-events-none ${isFocusedOrFilled ? 'transform -translate-y-3 text-[10px]' : ''}`}
        >
          {getPlaceholder()}
        </label>
        <input
          {...rest}
          type={inputType}
          value={value}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          disabled={isDisabled}
          className='pt-[10px] font-medium w-full disabled:cursor-default'
        />

        {errorMessage && !isDisabled && (
          <span onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          <ExclamationPointIcon className={`absolute right-5 top-1/2 transform -translate-y-1/2 cursor-pointer ${type === 'password' ? 'mr-3' : ''}`} />
        </span>
        )}
        {isDisabled && type !== 'password' && (
          <InformIcon className="absolute right-5 top-1/2 transform -translate-y-1/2 cursor-pointer" />
        )}
        {type === 'password' && (
          <span className="absolute right-[10px] top-1/2 transform -translate-y-1/2 cursor-pointer" onClick={handleTogglePasswordVisibility}>
          <EyeIcon color={isPasswordVisible ? 'blue' : '#080815'}/>
        </span>
        )}
      </Tooltip>
    </div>
  );
};
export default TouchInput;
