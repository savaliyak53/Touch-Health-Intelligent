import React from 'react';
import TouchButton from 'components/TouchButton';
import TouchModal from 'components/Modal/TouchModal';

export type IProps = {
  open: boolean;
  handleCancel: () => any;
  handleOk: any;
  price: number
};

const PriceModal = ({
  open,
  handleCancel,
  price,
  handleOk
}: IProps) => {

  return (
    <TouchModal setClose={handleCancel} isOpen={open}>
      <div className='flex flex-col w-full my-[50px] px-[20px]'>
        <h3 className='text-[18px] mb-10 leading-[22px] flex items-center font-tilt-warp text-primary-delft-dark opacity-90'>
          Confirmation
        </h3>
        <div className='text-3 text-oldBurgundy leading-[23px] text-left'>
          {`Your monthly subscription is $${price}/month. Would you like to start your subscription now?`}
        </div>
      </div>
      <div className='mx-[25px] mb-[33px] px-10'>
        <TouchButton type={'default'} onClick={handleOk}>
          Confirm
        </TouchButton>
      </div>
    </TouchModal>
  );
};

export default PriceModal;