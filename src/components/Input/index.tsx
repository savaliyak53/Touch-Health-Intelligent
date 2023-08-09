import React, { CSSProperties, FC, forwardRef } from 'react';
import { AiOutlineEye } from 'react-icons/ai';
import './index.scss';
import SVGERROR from '../../utils';
interface InputProps {
  id?: string;
  name?: string;
  placeholder?: string;
  type?: string;
  maxLength?: number;
  className?: string;
  style?: CSSProperties;
  isEye?: boolean;
  value?: string;
  togglePassword?: any;
  defaultValue?: any;
  onChange?: any;
  disabled?: boolean;
  handleMouseEnter?: any;
  handleMouseLeave?: any;
}
const InputField: FC<InputProps> = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      name,
      placeholder,
      type,
      className,
      style,
      defaultValue,
      value,
      isEye,
      togglePassword,
      onChange,
      disabled,
      handleMouseEnter,
      handleMouseLeave,
      ...rest
    },
    ref
  ) => {
    return (
      <div className={'input-element-wrapper-password'}>
        <input
          type={type}
          name={name}
          className={className}
          placeholder={placeholder}
          ref={ref}
          value={value}
          style={style}
          {...rest}
          onChange={onChange}
          defaultValue={defaultValue}
          disabled={disabled}
        />
        {isEye ? (
          <button className="btn" onClick={togglePassword} type="button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
            >
              <g clipPath="url(#clip0_1113_1414)">
                <path
                  d="M9 13.898C6.97588 13.898 4.79742 13.1064 2.70016 11.6087C1.13235 10.4891 0.164673 9.37995 0.124238 9.3332C-0.0414125 9.14194 -0.0414125 8.85804 0.124238 8.66674C0.164673 8.62007 1.13231 7.51081 2.70016 6.39124C4.79746 4.89367 6.97592 4.10199 9 4.10199C11.0241 4.10199 13.2026 4.89363 15.2998 6.39124C16.8676 7.51081 17.8353 8.62003 17.8758 8.66674C18.0414 8.858 18.0414 9.1419 17.8758 9.3332C17.8353 9.37987 16.8677 10.4891 15.2998 11.6087C13.2026 13.1063 11.0242 13.898 9 13.898ZM1.20687 9.00003C1.59819 9.39905 2.33673 10.1007 3.31186 10.7946C4.64871 11.7459 6.72072 12.88 9 12.88C11.2793 12.88 13.3513 11.7459 14.6881 10.7946C15.6631 10.1008 16.4017 9.39909 16.7931 9.00003C16.4018 8.60101 15.6633 7.89936 14.6881 7.20545C13.3513 6.25414 11.2793 5.12008 9 5.12008C6.72072 5.12008 4.64871 6.25414 3.31186 7.20545C2.33686 7.89924 1.59827 8.60089 1.20687 9.00003Z"
                  fill="#080815"
                  fillOpacity="0.5"
                />
                <path
                  d="M9.00006 12.1559C7.25992 12.1559 5.84424 10.7401 5.84424 9.00003C5.84424 7.25993 7.25992 5.84421 9.00006 5.84421C9.76536 5.84421 10.5036 6.12168 11.0788 6.62555C11.2902 6.81079 11.3115 7.13235 11.1262 7.34381C10.941 7.55527 10.6194 7.57649 10.408 7.39129C10.0185 7.0501 9.51847 6.86222 9.00002 6.86222C7.82121 6.86222 6.8622 7.82126 6.8622 9.00003C6.8622 10.1788 7.82121 11.1378 9.00002 11.1378C10.1789 11.1378 11.1378 10.1788 11.1378 9.00003C11.1378 8.71894 11.3657 8.49103 11.6468 8.49103C11.9279 8.49103 12.1558 8.71894 12.1558 9.00003C12.1559 10.7401 10.7402 12.1559 9.00006 12.1559Z"
                  fill="#080815"
                  fillOpacity="0.5"
                />
                <path
                  d="M8.99994 10.018C8.43861 10.018 7.98193 9.56136 7.98193 9.00003C7.98193 8.4387 8.43861 7.98203 8.99994 7.98203C9.56131 7.98203 10.0179 8.4387 10.0179 9.00003C10.0179 9.56136 9.56131 10.018 8.99994 10.018Z"
                  fill="#080815"
                  fillOpacity="0.5"
                />
              </g>
              <defs>
                <clipPath id="clip0_1113_1414">
                  <rect width="18" height="18" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </button>
        ) : (
          <SVGERROR
            handleMouseEnter={handleMouseEnter}
            handleMouseLeave={handleMouseLeave}
            style={{
              position: 'absolute',
              right: 25,
              marginTop: '10px',
            }}
          />
        )}
      </div>
    );
  }
);
InputField.displayName = 'InputField';
export default InputField;
