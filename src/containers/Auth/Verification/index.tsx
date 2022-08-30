import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

import { toast } from 'react-toastify';
import Button from '../../../components/Button';
import { AiOutlineEye } from 'react-icons/ai';
import Layout from '../../../layouts/Layout/Layout';
import { Tooltip } from 'antd';
import './index.scss';
import ReactCodeInput from 'react-code-input';
type IVerificationCode = {
  code: any;
};
const Verification = () => {
  const navigate = useNavigate();

  const [valueInput, setValueInput] = useState(false);
  const [valid, setValid] = useState(true);

  const handleValueInput = (e: any) => {
    if (String(e).replace(/[A-Za-z]/g, '').length === 6) {
      setValueInput(true);
      if (e !== '222222') {
        setValid(false);
      } else {
        setValid(true);
      }
    } else {
      setValueInput(false);
    }
  };
  const {
    register,
    handleSubmit,
    control,
    getValues,
    formState: { errors },
  } = useForm<IVerificationCode>({
    mode: 'onSubmit',
    shouldFocusError: true,
    shouldUnregister: false,
  });
  const onSubmit = async (data: any) => {
    console.log;
  };
  console.log('errors: ', errors);

  return (
    <Layout defaultHeader={false} hamburger={false}>
      <div className="Auth-wrap">
        <form onSubmit={handleSubmit(onSubmit)} className="Auth-form">
          <h2 className="Auth-title">Verification Code</h2>
          <Controller
            control={control}
            name="code"
            rules={{
              required: 'Verification code is required',
              validate: (value) => {
                return value > 2006 ? 'You must older than 16' : true;
              },
            }}
            render={({ field: { onChange, onBlur, value, name, ref } }) => (
              <ReactCodeInput
                name="code"
                inputMode="numeric"
                fields={6}
                type="number"
                // {...register('code', {
                //   //required: 'Verification Code is required',
                //   validate: (value) => {
                //     console.log('value: ', value);
                //     return value > 2006 ? 'You must older than 16' : true;
                //   },
                // })}
                onChange={(e) => handleValueInput(e)}
                //isValid={valid}
              />
            )}
          />

          <Tooltip
            color="orange"
            placement="bottom"
            title={errors.code?.message}
            visible={errors.code ? true : false}
          />
          {/* {valueInput ? 'ee' : null} */}
          <Button onClick={handleSubmit(onSubmit)} className="verification-btn">
            Reset Password
          </Button>
        </form>
      </div>
    </Layout>
  );
};

export default Verification;
