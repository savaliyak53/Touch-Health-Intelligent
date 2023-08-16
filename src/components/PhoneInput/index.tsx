import { Tooltip } from 'antd';
import React, {
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
  const [activeClass, setActiveClass] = useState('input-container_default');
  const [error, setError] = useState(false);
  const [show, setShow] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleOnBlur = () => {
    setError(!isValidPhoneNumber(value || ''));
    setActiveClass('input-container_default');
  };

  const handleOnFocuse = () => {
    setError(false);
    setActiveClass('input-container_username');
  };

  return (
    <div className={`input-container ${activeClass}`}>
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
            <ExclamationPointIcon className="info-icon" />
          </span>
        )}
      </Tooltip>
    </div>
  );
};

export default TelephoneInput;
