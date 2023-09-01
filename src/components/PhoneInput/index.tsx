import { Tooltip } from 'antd';
import React, {
  useEffect,
  useState,
} from 'react';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import ExclamationPointIcon from '../Icons/ExclamationPointIcon';
import 'react-phone-number-input/style.css';
import './index.scss';

interface IProps {
  disabled?: boolean;
  value: string | undefined;
  onChange: (value: string) => void;
  placeholder: string;
}

const TelephoneInput = ({ disabled, value, onChange, placeholder }: IProps) => {
  const whitelist: any = [
    'AU',
    'CA',
    'DO',
    'JM',
    'IE',
    'NL',
    'NZ',
    'PK',
    'ZA',
    'US',
    'GB',
  ];
  const [isHovered, setIsHovered] = useState(false);
  const [activeClass, setActiveClass] = useState('shadow-primary');
  const [error, setError] = useState(false);
  const [isFocusedOrFilled, setFocusOrFilled] = useState(true);

  useEffect(() => {
    if (error) {
      setActiveClass('shadow-error');
    }
  }, [error])

  useEffect(() => {
    setFocusOrFilled(!!value)
    setActiveClass(!isValidPhoneNumber(value || '') ? 'shadow-primary' : 'shadow-verified');
  }, [value])

  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleOnBlur = () => {
    setFocusOrFilled(!!value)
    setError(!isValidPhoneNumber(value || ''));
    setActiveClass('shadow-verified');
  };

  const handleOnFocuse = () => {
    setFocusOrFilled(true);
    setError(false);
    setActiveClass('shadow-active');
  };

  return (
    <div id='touch-input-wrapper' className={`relative w-full h-[60px] px-5 py-[18px] leading-4 bg-dentist rounded-md ${activeClass}`}>
      <Tooltip
        color="orange"
        placement="bottomLeft"
        title={'Invalid Phone number'}
        open={isHovered}
      >
        <label
          className={`font-medium text-left leading-[14px] absolute left-[60px] top-[28px] opacity-50 transition-all duration-300 ease-linear pointer-events-none ${isFocusedOrFilled ? 'transform -translate-y-[20px] -translate-x-[42px] text-[10px]' : ''}`}
        >
          {placeholder}
        </label>
        <PhoneInput
          id={'phone-input'}
          disabled={disabled}
          countries={whitelist}
          value={value}
          onBlur={handleOnBlur}
          onFocus={handleOnFocuse}
          onChange={onChange}
          defaultCountry="CA"
          addInternationalOption={false}
        />
        {error && (
          <span onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <ExclamationPointIcon className="absolute mt-[6px] right-5 top-1/2 transform -translate-y-1/2 cursor-pointer" />
          </span>
        )}
      </Tooltip>
    </div>
  );
};

export default TelephoneInput;
