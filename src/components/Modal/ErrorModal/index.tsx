import React from 'react';
import { useNavigate } from 'react-router-dom';
import TouchButton from 'components/TouchButton';
import TouchModal from 'components/Modal/TouchModal';

export type IProps = {
  open: boolean;
  isAuth?: boolean;
  title: string;
  errorType: string;
  error?: any
  handleCancel: () => void;
};
const ErrorModal = ({
  open,
  title,
  errorType,
  error,
  handleCancel,
  isAuth = false
}: IProps) => {

  const navigate = useNavigate();

  const handleOk = () => {
    navigate('/dashboard');
    handleCancel();
  };

  const handleUnauthorized = () => {
    handleCancel();
    window.location.assign('/login');
  };

  const isClosable = (): boolean => {
    return !(errorType == 'type1' || errorType == 'type0' || errorType == 'type401')
  }

  const isConfirmBtn = (): boolean => {
    return !(errorType == 'type0' || errorType == 'type401'
      || (errorType == 'type1' && (error.message === 'Daily SMS limit reached' || error.message === 'Invalid username or password.')))
  }

  const getBtnText = (): string => {
    if (errorType == 'type0') {
      return 'OK'
    } else if (errorType == 'type401') {
      return 'Login'
    } else if (errorType == 'type1') {
      if (error.message === 'Daily SMS limit reached' || error.message === 'Invalid username or password.') {
        return 'Close'
      }
    }
    return 'Something went wrong.';
  }

  const getErrorDescription = (): string => {
    if (errorType == 'type0') {
      return 'Your session has expired. Please log in to continue.'
    } else if (errorType == 'type401') {
      return 'Please log in to continue.'
    } else if (errorType == 'type1') {
        return 'Something went wrong! Please try refreshing your page and trying again. If it still doesn\'t work, please let us know over on the support page.'
    } else if (errorType == 'type2') {
        return 'Please wait a minute, then try again. If it still doesn\'t work, please let us know over on the support page.'
    }
    return 'Go to dashboard';
  }

  const fakeFunction = (bool: boolean): void => {
    if (!bool) {
      console.log('Сan not be closed');
    }
  }

  return (
    <TouchModal isAuth={isAuth} setClose={isClosable() ? handleCancel : fakeFunction} isOpen={open}>
      <div className='flex flex-col w-full my-[50px] px-[20px]'>
        <h3 className='text-[18px] mb-10 leading-[22px] flex items-center font-tilt-warp text-primary-delft-dark opacity-90'>
          {title}
        </h3>
        <div className='text-3 text-oldBurgundy leading-[23px] text-left'>
          {getErrorDescription()} <br />
          {errorType == 'type1' && error && error.code && error.message && <>{`Error ${error.code}: ${error.message}`}</>}
        </div>
      </div>
      <div className='mx-[25px] mb-[33px] px-10'>
        <TouchButton type={'default'} onClick={isConfirmBtn() ? handleOk : handleUnauthorized}>
          {getBtnText()}
        </TouchButton>
      </div>
    </TouchModal>
  );
};

export default ErrorModal;
