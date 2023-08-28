import React, {
  CSSProperties,
  FC,
  forwardRef,
  ChangeEventHandler,
} from 'react';
import './index.scss';
import PassWordEye from './passwordEye';

import SVGERROR from 'components/ErrorSvg/index';

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
  togglePassword?: () => void;
  defaultValue?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  disabled?: boolean;
  handleMouseEnter?: () => void;
  handleMouseLeave?: () => void;
  userName?: boolean;
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
      userName,
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
          <PassWordEye togglePassword={togglePassword} />
        ) : userName ? null : (
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
