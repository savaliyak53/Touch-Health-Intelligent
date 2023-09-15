import React, { useState } from 'react';
import TouchButton from 'components/UI/TouchButton';
import InputGroup from 'components/InputGroup';

interface IProps {
  onSubmitRecover: (password: string) => Promise<void>;
  isLoading: boolean;
}

const NewPasswordEnterStep: React.FC<IProps> = ({
  onSubmitRecover,
  isLoading
}) => {
  const [password, setPassword] = useState<string>('');
  const [isPasswordVerified, setIsPasswordVerified] = useState<boolean>(false);
  
  const handleOnSubmit = (): void => {
    if (isPasswordVerified) {
      onSubmitRecover(password);
    }
  }

  return (
    <div className='flex flex-col items-center justify-center'>
      <h1 className='text-primary-delft-dark font-tilt-warp font-normal text-[22px] leading-[36px] opacity-80 text-center mb-4'>Enter New Password</h1>
      <InputGroup
        password={password}
        setPassword={setPassword}
        approvePasswordVerified={setIsPasswordVerified}/>
      <TouchButton
        className='mt-8'
        type='auth'
        onClick={handleOnSubmit}
        isDisabled={!isPasswordVerified}
        isLoading={isLoading}
      >
        Reset password
      </TouchButton>
    </div>
  );
};

export default NewPasswordEnterStep;
