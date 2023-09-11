import React from 'react';
import TouchButton from 'components/TouchButton';
import TouchModal from 'components/Modal/TouchModal';

export type IProps = {
  open: boolean;
  isAuth: boolean;
  handleCancel: () => any;
  handleOk: any;
  children?: React.ReactNode;
  title: string;
};

const AccountLockModal = ({
  open,
  isAuth,
  handleCancel,
  title,
  handleOk,
  children,
}: IProps) => {

  return (
    <TouchModal setClose={handleCancel} isOpen={open} isAuth={isAuth}>
      <div className='flex flex-col w-full my-[50px] px-[20px]'>
        <h3 className='text-[18px] mb-10 leading-[22px] flex items-center font-tilt-warp text-primary-delft-dark opacity-90'>
          {title}
        </h3>
        {children}
      </div>
      <div className='mx-[25px] mb-[33px] px-10'>
        <TouchButton type={'default'} onClick={handleOk}>
          Okay
        </TouchButton>
      </div>
    </TouchModal>
  );
};

export default AccountLockModal;
