import { Tooltip } from 'antd';
import React, { useState } from 'react';
import { Controller } from 'react-hook-form';
import PhoneInput, {
  isValidPhoneNumber,
  formatPhoneNumberIntl,
} from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { onlyNumbers } from '../../../utils/lib';
import './index.scss';
interface IProps {
  errors?: any;
  control?: any;
  fieldName?: string;
  country?: string;
  setCountry?: any;
  isConfirmPhone?: any;
  phone?: any;
}
const CountryCode = ({
  errors,
  control,
  fieldName,
  isConfirmPhone,
  phone,
}: IProps) => {
  const whitelist: any = [
    'AU',
    'CA',
    'JM',
    'IE',
    'NL',
    'NZ',
    'PK',
    'ZA',
    'US',
    'GB',
  ];
  return (
    <div className="input-element-wrapper">
      <Tooltip
        color="orange"
        placement="bottomLeft"
        title={
          errors && errors.message ? errors.message : 'Invalid Phone number'
        }
        visible={
          fieldName === 'confirmPhone' ? isConfirmPhone : errors ? true : false
        }
      >
        <Controller
          name={fieldName ? fieldName : 'phone'}
          control={control}
          rules={{
            required: {
              value: true,
              message: 'Phone is required',
            },
            validate: (value) => {
              if (fieldName === 'confirmPhone') {
                return (
                  onlyNumbers(value) === onlyNumbers(phone) ||
                  'Phone numbers do not match'
                );
              }
              return isValidPhoneNumber(value) || 'Invalid Phone Number';
            },
          }}
          render={({ field: { onChange, value } }) => (
            <PhoneInput
              countries={whitelist}
              className="app-Input"
              value={value}
              onChange={onChange}
              defaultCountry="CA"
              id={fieldName}
            />
          )}
        />
      </Tooltip>
    </div>
  );
};

export default CountryCode;
