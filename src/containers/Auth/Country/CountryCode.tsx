import { Tooltip } from 'antd';
import React, { useState } from 'react';
import { Controller } from 'react-hook-form';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import './index.scss';
interface IProps {
  register?: any;
  errors?: any;
  control?: any;
}
const CountryCode = ({ register, errors, control }: IProps) => {
  const [value, setValue] = useState<any>(undefined);
  console.log('errors', errors);
  const handleChange = (value: any) => {
    console.log('valy: ', value);
    setValue(value);
  };
  const whitelist: any = ['WS', 'SB', 'TK', 'TO', 'TV', 'VU', 'WF', 'HK'];
  return (
    <div className="input-element-wrapper">
      <Tooltip
        color="orange"
        placement="bottomLeft"
        title={errors.phone ? 'Invalid Phone Number' : ''}
        visible={errors.phone ? true : false}
      >
        <Controller
          name="phone"
          control={control}
          rules={{ required: true, validate: isValidPhoneNumber }}
          render={({ field: { onChange, value } }) => (
            <PhoneInput
              countries={whitelist}
              className="app-Input"
              value={value}
              onChange={onChange}
              defaultCountry="TH"
              id="phone"
            />
          )}
        />
      </Tooltip>
    </div>
  );
};

export default CountryCode;
