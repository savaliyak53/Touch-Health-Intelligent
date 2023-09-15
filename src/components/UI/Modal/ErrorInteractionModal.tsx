import React from 'react';
import {useNavigate} from 'react-router-dom';
import TouchButton from 'components/UI/TouchButton';
import TouchModal from 'components/UI/Modal/TouchModal';

export type IProps = {
  open: boolean;
  showTryButton?:boolean;
  title: string;
  children?: React.ReactNode;
};

const ErrorInteractionModal = ({
  open,
  title,
  showTryButton,
  children,
}: IProps) => {

  const navigate = useNavigate();

  const handleRetry = () => {
    window.location.reload();
  };

  const handleOk = () => {
    navigate('/dashboard');
  };

  const fakeFunction = (bool: boolean): void => {
    if (!bool) {
      console.log('Сan not be closed');
    }
  }

  return (
    <TouchModal setClose={fakeFunction} isOpen={open}>
      <div className='flex flex-col w-full my-[50px] px-[20px]'>
        <h3 className='text-[18px] mb-10 leading-[22px] flex items-center font-tilt-warp text-primary-delft-dark opacity-90'>
          {title}
        </h3>
        {children}
      </div>
      <div className='mx-[25px] mb-[33px] px-10'>
        {showTryButton && <TouchButton className='mb-5' type={'default'} onClick={handleRetry}>
          Try again
        </TouchButton>
        }
        <TouchButton type={'default'} onClick={handleOk}>
          Go to dashboard
        </TouchButton>
      </div>
    </TouchModal>
  )
};

export default ErrorInteractionModal;
