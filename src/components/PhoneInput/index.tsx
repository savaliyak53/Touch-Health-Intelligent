import { Tooltip } from 'antd';
import React, {
  useEffect,
  useState,
} from 'react';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import ExclamationPointIcon from '../Icons/ExclamationPointIcon';
import 'react-phone-number-input/style.css';
import '../TouchInput/index.scss';

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
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (error) {
      setActiveClass('shadow-error');
    }

  }, [error])

  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleOnBlur = () => {
    setError(!isValidPhoneNumber(value || ''));
    setActiveClass('shadow-primary');
  };

  const handleOnFocuse = () => {
    setError(false);
    setActiveClass('shadow-active');
  };

  return (
    <div className={`relative w-full h-[60px] px-5 py-[18px] leading-4 bg-inputWhite rounded-md ${activeClass}`}>
      <Tooltip
        color="orange"
        placement="bottomLeft"
        title={'Invalid Phone number'}
        open={isHovered}
      >
        <PhoneInput
          id={'phone-input'}
          disabled={disabled}
          placeholder={placeholder}
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
            <ExclamationPointIcon className="absolute right-5 top-1/2 transform -translate-y-1/2 cursor-pointer" />
          </span>
        )}
      </Tooltip>
    </div>
  );
};

export default TelephoneInput;
