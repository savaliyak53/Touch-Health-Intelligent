import { Tooltip } from 'antd';
import React, { useEffect, useState } from 'react';
import { Controller } from 'react-hook-form';
import Authstyles from '../Auth.module.scss';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import SVGERROR from '../../../utils';

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
  isConfirmPhone,
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

  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div className="input-element-wrapper">
      <Tooltip
        color="orange"
        placement="bottomLeft"
        title={errors?.message ?? 'Invalid Phone number'}
        open={isHovered == true ? true : false}
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
                return value === phone || 'Phone numbers do not match';
              }
              return isValidPhoneNumber(value) || 'Invalid Phone Number';
            },
          }}
          render={({ field: { onChange, value } }) => (
            <>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                }}
              >
                <PhoneInput
                  disabled={disabled}
                  placeholder={
                    fieldName === 'phone' || fieldName === 'username'
                      ? 'Mobile phone number'
                      : 'Confirm phone number'
                  }
                  countries={whitelist}
                  className={
                    errors
                      ? Authstyles['new-Input-error']
                      : Authstyles['app-Input']
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
