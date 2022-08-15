import { Tooltip } from 'antd';
import React, { useState } from 'react';
import { Controller } from 'react-hook-form';
import PhoneInput, {
  isValidPhoneNumber,
  formatPhoneNumberIntl,
} from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import './index.scss';
interface IProps {
  errors?: any;
  control?: any;
  fieldName?: string;
  country?: string;
}
const ConfirmCountry = ({ errors, control, fieldName, country }: IProps) => {
  const whitelist: any = ['AU', 'CA', 'JM', 'IE', 'NZ', 'PK', 'ZA', 'US', 'GB'];
  return (
    <div className="input-element-wrapper">
      <Tooltip
        color="orange"
        placement="bottomLeft"
        title={errors ? 'Invalid Phone Number' : ''}
        visible={errors ? true : false}
      >
        <Controller
          name={fieldName ? fieldName : 'phone'}
          control={control}
          rules={{ required: true, validate: isValidPhoneNumber }}
          render={({ field: { onChange, value } }) => (
            <PhoneInput
              whitelist={[country]}
              country={country}
              className="app-Input"
              value={value}
              onChange={onChange}
              id={fieldName}
            />
          )}
        />
      </Tooltip>
    </div>
  );
};

export default ConfirmCountry;
