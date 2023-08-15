import React, { FC, useState } from 'react';
import './index.scss';
import InformIcon from '../Icons/InformIcon';
import ExclamationPointIcon from '../Icons/ExclamationPointIcon';
import EyeIcon from '../Icons/EyeIcon';
import CloseEyeIcon from '../Icons/CloseEyeIcon';
import { Tooltip } from 'antd';

type InputDesigns =
  | 'username'
  | 'password'
  | 'answer'
  | 'default'
  | 'email'
  | 'error';

interface InputProps {
  type: 'text' | 'number' | 'password';
  value: string | number;
  id?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  resetError?: (str: string) => void;
  checkError?: (str: string) => void;
  onBlure?: () => void;
  placeholder?: string;
  design: InputDesigns;
  className?: string;
  errorMessage?: string;
  isDisabled?: boolean;
  isRequired?: boolean;

  [key: string]: any;
}

const getActiveClassById = <T extends InputDesigns>(type: T): string => {
  switch (type) {
    case 'username':
      return 'input-container_username';
    case 'password':
      return 'input-container_default';
    case 'email':
      return 'input-container_email';
    case 'error':
      return 'input-container_error';
    default:
      return 'input-container_default';
  }
};

const TouchInput: FC<InputProps> = ({
  type = 'text',
  value,
  design,
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
  const [isFocusedOrFilled, setFocusOrFilled] = useState(false);
  const [activeClass, setActiveClass] = useState('default');
  const [isHovered, setIsHovered] = useState(false);
  const inputType = type === 'password' && isPasswordVisible ? 'text' : type;

  const handleTogglePasswordVisibility = () => {
    setPasswordVisibility((prev) => !prev);
  };

  const onFocus = () => {
    setFocusOrFilled(true);
    setActiveClass(getActiveClassById(design));
    if (resetError) {
      resetError('');
    }
  };

  const onBlur = (event: React.ChangeEvent<HTMLInputElement>) => {
    const val = event.target.value;
    setFocusOrFilled(!!val);
    setActiveClass(getActiveClassById('default'));
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

  const showLabel = (): boolean => {
    if (design === 'password') {
      return !value;
    }
    return true;
  };

  return (
    <div className={`input-container ${activeClass} ${className}`}>
      {showLabel() && (
        <label
          className={`floating-label ${isFocusedOrFilled ? 'focused' : ''}`}
        >
          {placeholder}
        </label>
      )}
      <input
        {...rest}
        type={inputType}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        disabled={isDisabled}
        className={`touch-input ${isFocusedOrFilled ? 'focused' : ''}`}
      />

      {errorMessage && !isDisabled && (
        <span onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          <ExclamationPointIcon className={`info-icon ${type === 'password' ? 'mr-3' : ''}`} />
        </span>
      )}
      {isDisabled && type !== 'password' && (
        <InformIcon className="info-icon" />
      )}
      {type === 'password' && (
        <span className="toggle-icon" onClick={handleTogglePasswordVisibility}>
          {isPasswordVisible ? <EyeIcon /> : <CloseEyeIcon />}
        </span>
      )}
      <Tooltip
        title={errorMessage}
        placement="bottomRight"
        color="blue"
        open={!!errorMessage && isHovered}
      />
    </div>
  );
};
export default TouchInput;
