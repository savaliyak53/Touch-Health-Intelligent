import React, {FC, useEffect, useState} from 'react';
import './index.scss';
import InformIcon from '../Icons/InformIcon';
import ExclamationPointIcon from '../Icons/ExclamationPointIcon';
import EyeIcon from '../Icons/EyeIcon';
import CloseEyeIcon from '../Icons/CloseEyeIcon';
import { Tooltip } from 'antd';


interface InputProps {
  type: 'text' | 'number' | 'password';
  value: string | number;
  id?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  resetError?: (str: string) => void;
  checkError?: (str: string) => void;
  onBlure?: () => void;
  placeholder?: string;
  className?: string;
  errorMessage?: string;
  isDisabled?: boolean;
  isRequired?: boolean;
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
  ...rest
}) => {

  const [isPasswordVisible, setPasswordVisibility] = useState(false);
  const [activeClass, setActiveClass] = useState('shadow-primary');
  const [isHovered, setIsHovered] = useState(false);
  const inputType = type === 'password' && isPasswordVisible ? 'text' : type;

  useEffect(() => {
    if (errorMessage) {
      setActiveClass('shadow-error');
    }

  }, [errorMessage])

  const handleTogglePasswordVisibility = () => {
    setPasswordVisibility((prev) => !prev);
  };

  const onFocus = () => {
    setActiveClass('shadow-active');
    if (resetError) {
      resetError('');
    }
  };

  const onBlur = (event: React.ChangeEvent<HTMLInputElement>) => {
    const val = event.target.value;
    setActiveClass('shadow-primary');
    if (checkError) {
      checkError(val);
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div className={`relative w-full h-[60px] px-5 py-[18px] leading-4 bg-inputWhite rounded-md ${activeClass} ${className}`}>
      <Tooltip
        title={errorMessage}
        placement="bottomRight"
        color="blue"
        open={!!errorMessage && isHovered}>
        <input
          {...rest}
          type={inputType}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          onFocus={onFocus}
          onBlur={onBlur}
          disabled={isDisabled}
          className='font-medium w-full disabled:cursor-default'
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
