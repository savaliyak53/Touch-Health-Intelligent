import React, { ChangeEvent } from 'react';
import TouchModal from 'components/Modal/TouchModal';
import TouchButton from 'components/TouchButton';
import TouchInput from 'components/TouchInput';

export type IProps = {
  open: boolean;
  password: string;
  setPassword: (str: string) => void;
  handleCancel: () => void;
  handleOk: () => void;
};

const DeleteSessionModal = ({
  open,
  password,
  setPassword,
  handleCancel,
  handleOk
}: IProps) => {

  const handleOnChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  }

  return (
    <TouchModal setClose={handleCancel} isOpen={open}>
      <div className='flex flex-col w-full my-[50px] px-[20px]'>
        <h3 className='text-[18px] mb-[6px] leading-[22px] flex items-center font-tilt-warp text-primary-delft-dark opacity-90'>
          Enter Password to Signout Device
        </h3>
        <TouchInput
          placeholder='Enter password'
          className='mt-5'
          type={'password'}
          value={password}
          onChange={handleOnChangePassword} />
      </div>
      <div className='mx-[25px] mb-[33px] px-10'>
        <TouchButton type={'default'} onClick={handleOk} isDisabled={!password}>
          Confirm
        </TouchButton>
      </div>
    </TouchModal>
  );
};

export default DeleteSessionModal;
