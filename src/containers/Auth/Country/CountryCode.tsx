import { Tooltip } from 'antd';
import React, { useEffect, useState } from 'react';
import { Controller } from 'react-hook-form';
import Authstyles from '../Auth.module.scss';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import SVGERROR from '../../../components/ErrorSvg/index';
import './index.scss';

interface IProps {
  errors?: any;
  control?: any;
  fieldName?: string;
  country?: string;
  setCountry?: any;
  isConfirmPhone?: any;
  phone?: any;
  disabled?: boolean;
}
const CountryCode = ({
  errors,
  control,
  fieldName,
  phone,
  disabled,
}: IProps) => {
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
  const [isValid, setIsValid] = useState(false);
  const [activeClass, setActiveClass] = useState('app-Input');
  const [phoneValue, setPhoneValue] = useState('');
  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  useEffect(() => {
    const debounceId = setTimeout(() => {
      setActiveClass('app-Input');
    }, 1000);
    if (phoneValue !== undefined && phoneValue?.length !== 0) {
      setActiveClass('new-Input-change');
    }
    return () => {
      setActiveClass('app-Input');
      clearTimeout(debounceId);
    };
  }, [phoneValue]);

  return (
    <div className="input-element-wrapper">
      <Tooltip
        color="orange"
        placement="bottomLeft"
        title={errors?.message ?? 'Invalid Phone number'}
        open={isHovered ? true : false}
      >
        <Controller
          name={fieldName ? fieldName : 'phone'}
          control={control}
          rules={{
            required: {
              value: true,
              message: 'Phone is required',
            },
            validate: (value: any) => {
              if (fieldName === 'confirmPhone') {
                setIsValid(value === phone);
                return value === phone || 'Phone numbers do not match';
              }
              setIsValid(isValidPhoneNumber(value));
              return isValidPhoneNumber(value) || 'Invalid Phone Number';
            },
          }}
          render={({ field: { onChange, value } }) => (
            <>
              {
                // calling method on change according to this library
                setPhoneValue(value)
              }
              <div className="phoneInputContainer">
                <PhoneInput
                  disabled={disabled}
                  placeholder={
                    fieldName === 'phone' || fieldName === 'username'
                      ? 'Mobile phone number'
                      : 'Confirm phone number'
                  }
                  countries={whitelist}
                  className={
                    errors && isValid == false
                      ? Authstyles['new-Input-error']
                      : errors || isValid == true
                      ? Authstyles['new-Input-valid']
                      : Authstyles[activeClass]
                  }
                  value={value}
                  onChange={onChange}
                  defaultCountry="CA"
                  id={fieldName}
                  addInternationalOption={false}
                />
                {errors && (
                  <SVGERROR
                    handleMouseEnter={handleMouseEnter}
                    handleMouseLeave={handleMouseLeave}
                    style={{
                      position: 'absolute',
                      marginRight: '26px',
                      marginBottom: '7px',
                    }}
                  />
                )}
              </div>
            </>
          )}
        />
      </Tooltip>
    </div>
  );
};

export default CountryCode;
