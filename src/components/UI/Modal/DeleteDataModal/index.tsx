import React from 'react';
import TouchButton from 'components/UI/TouchButton';
import TouchModal from 'components/UI/Modal/TouchModal';

export type IProps = {
  open: boolean;
  handleCancel: () => any;
  handleOk: any;
  children?: React.ReactNode;
};

const DeleteModal = ({
  open,
  handleCancel,
  handleOk,
  children,
}: IProps) => {

  return (
    <TouchModal setClose={handleCancel} isOpen={open}>
      <div className='w-full my-[50px] px-[20px] text-justify'>
        {children}
      </div>
      <div className='mx-[25px] mb-[33px]'>
        <TouchButton className='mb-5' type={'default'} onClick={handleOk} isExtraPadding={true}>
          I acknowledge the above and wish to delete my data.
        </TouchButton>
        <TouchButton type={'default'} onClick={handleCancel} isExtraPadding={true}>
          Take me back. I do not want to delete my data
        </TouchButton>
      </div>
    </TouchModal>
  );
};

export default DeleteModal;
