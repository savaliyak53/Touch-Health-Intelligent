import { Tooltip } from 'antd';
import React, {
  useEffect, useRef,
  useState
} from 'react';
import PhoneInput, { isValidPhoneNumber, Country } from 'react-phone-number-input';
import ExclamationPointIcon from 'components/Icons/ExclamationPointIcon';
import 'react-phone-number-input/style.css';
import 'components/UI/PhoneInput/index.scss';

interface IProps {
  disabled?: boolean;
  value: string | undefined;
  onChange: (value: string) => void;
  checkError?: (str: string) => void;
  placeholder: string;
  className?: string;
  isVerified?: boolean;
  errorMessage?: string;
  resetError?: (str: string) => void;
}

const whitelist: Country[] = [
  'AU', 'CA', 'DO', 'JM', 'IE', 'NL', 'NZ', 'PK', 'ZA', 'US', 'GB'
];

const TelephoneInput: React.FC<IProps> = ({
  disabled,
  value,
  onChange,
  placeholder,
  className,
  isVerified,
  errorMessage,
  checkError,
  resetError,
}) => {

  const phoneRef = useRef<HTMLInputElement | null>(null)
  const [isHovered, setIsHovered] = useState(false);
  const [activeClass, setActiveClass] = useState('shadow-primary');
  const [error, setError] = useState(false);
  const [isFocusedOrFilled, setFocusOrFilled] = useState(true);

  useEffect(() => {
    if (value && isVerified !== undefined) {
      setActiveClass(getCorrectClass());
    }
  }, [isVerified])

  useEffect(() => {
    if (error || errorMessage) {
      setActiveClass('shadow-error');
    }
  }, [error, errorMessage])

  useEffect(() => {
    setFocusOrFilled(!!value)
  }, [value]);

  const getCorrectClass = (): string => {
    if (isVerified !== undefined) {
      return isVerified ? 'shadow-verified' : 'shadow-error';
    }
    return isValidPhoneNumber(value || '') ? 'shadow-verified' : 'shadow-primary';
  }

  const getErrorMessage = (): string => {
    return value ? 'Invalid Phone number.' : 'Phone is required.';
  }

  const focusInput = () => {
    if (!disabled && phoneRef.current) {
      phoneRef.current.focus();
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleOnBlur = () => {
    setFocusOrFilled(!!value)
    if (checkError) {
      checkError(value || '');
    } else {
      setError(!isValidPhoneNumber(value || ''));
    }
    setActiveClass(getCorrectClass());
  };

  const handleOnFocus = () => {
    if (resetError) {
      resetError('');
    }
    setFocusOrFilled(true);
    setError(false);
    setActiveClass('shadow-active');
  };

  const checkAnimation = (e: any) => {
    if(e.animationName == 'onAutoFillStart') {
      setFocusOrFilled(true)
    } else if(e.animationName == 'onAutoFillCancel') {
      setFocusOrFilled(false)
    }
  }

  const handlePaste = (e: any) => {
    setTimeout(() => {
      setFocusOrFilled(!!e.target.value)
    }, 0)
  }

  return (
    <div onClick={focusInput} id='touch-input-wrapper' className={`relative ${disabled ? '' : 'cursor-pointer'} w-full h-[60px] px-5 py-[18px] leading-4 bg-dentist rounded-md ${activeClass} ${className}`}>
      <Tooltip
        color="orange"
        placement="bottomLeft"
        title={errorMessage ? errorMessage : getErrorMessage()}
        open={isHovered}
      >
        <label
          className={`font-medium text-left leading-[14px] absolute left-[60px] top-[28px] opacity-50 transition-all duration-300 ease-linear pointer-events-none ${isFocusedOrFilled ? 'transform -translate-y-[20px] -translate-x-[42px] text-[10px]' : 'text-[14px]'}`}
        >
          {placeholder}
        </label>
        <PhoneInput
          onAnimationStart={checkAnimation}
          id={'phone-input'}
          disabled={disabled}
          countries={whitelist}
          value={value}
          onBlur={handleOnBlur}
          onFocus={handleOnFocus}
          onPaste={handlePaste}
          onChange={onChange}
          defaultCountry="CA"
          addInternationalOption={false}
        />
        {(error || errorMessage) && (
          <span onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <ExclamationPointIcon className="absolute mt-[6px] right-5 top-1/2 transform -translate-y-1/2 cursor-pointer" />
          </span>
        )}
      </Tooltip>
    </div>
  );
};

export default TelephoneInput;
