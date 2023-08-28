import React, { ChangeEvent, useState } from 'react';
import TouchInput from 'components/TouchInput';

interface IProps {
  onSubmitRecover: (password: string) => Promise<void>;
}

const NewPasswordEnterStep: React.FC<IProps> = ({
  onSubmitRecover,
}) => {

  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [errPassword, setErrPassword] = useState<string>('');
  const [errConfirm, setErrConfirm] = useState<string>('');
  const [isPasswordVerified, setIsPasswordVerified] = useState<boolean>(false);

  const handleOnChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.target.value);
  }

  const handleOnChangeConfirm = (e: ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  }

  const handleOnSubmit = (): void => {
    if (isPasswordVerified) {
      if (newPassword === confirmPassword) {
        onSubmitRecover(newPassword)
      } else {
        setErrConfirm('Passwords do not match.');
      }
    }
  }

  const checkPassword = (value: string) => {
    if (value.length < 8) {
      setErrPassword('Password should be of at least 8 characters.')
      setIsPasswordVerified(false);
      return;
    } else if (!value.match(/^(?=.*?[#?!@$%^&*-])/)) {
      setErrPassword('Need a special character.')
      setIsPasswordVerified(false);
      return;
    }
    setIsPasswordVerified(true);
  }

  return (
    <div className='flex flex-col items-center justify-center'>
      <h1 className='text-primary-delft-dark font-tilt-warp font-normal text-[22px] leading-[36px] opacity-80 text-center mb-4'>Enter New Password</h1>
      <TouchInput
        errorMessage={errPassword}
        value={newPassword}
        onChange={handleOnChangePassword}
        resetError={setErrPassword}
        checkError={checkPassword}
        placeholder="Enter new password here"
        type="password"
        className={'mb-4'}
      />
      <TouchInput
        id="confirmPassword"
        value={confirmPassword}
        onChange={handleOnChangeConfirm}
        resetError={setErrConfirm}
        errorMessage={errConfirm}
        placeholder="Confirm password here"
        type="password"
      />
      <button onClick={handleOnSubmit} className='rounded-full bg-high-dark text-nimbus w-full p-4 h-full mt-8 text-center font-tilt-warp text-sm font-medium leading-none disabled:cursor-not-allowed'>
        Reset password
      </button>
    </div>
  );
};

export default NewPasswordEnterStep;
