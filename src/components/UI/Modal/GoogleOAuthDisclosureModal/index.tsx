import React from 'react';
import TouchButton from 'components/UI/TouchButton';
import TouchModal from 'components/UI/Modal/TouchModal';

export type IProps = {
  open: boolean;
  handleCancel: () => any;
  handleOk: any;
  children?: React.ReactNode;
};

const GoogleOAuthDisclosureModal = ({
  open,
  handleCancel,
  handleOk,
  children,
}: IProps) => {

  return (
    <TouchModal setClose={handleCancel} isOpen={open}>
      <div className='flex flex-col w-full my-[50px] px-[20px]'>
        {children}
      </div>
      <div className='mx-[25px] mb-[33px] px-10'>
        <TouchButton className='mb-5' type={'default'} onClick={handleOk}>
          Acknowledge
        </TouchButton>
        <TouchButton type={'default'} onClick={handleCancel}>
          Cancel
        </TouchButton>
      </div>
    </TouchModal>
  );
};

export default GoogleOAuthDisclosureModal;
