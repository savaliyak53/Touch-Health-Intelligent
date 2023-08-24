import React, { ChangeEvent, useState } from 'react';
import Button from '../../../../../components/Button';
import styles from '../../../Login/Login.module.scss';
import TouchInput from '../../../../../components/TouchInput';

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
    <div className={styles.Form}>
      <h1 className={styles.Title}>Enter New Password</h1>
      <TouchInput
        design="password"
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
        design="password"
        value={confirmPassword}
        onChange={handleOnChangeConfirm}
        resetError={setErrConfirm}
        errorMessage={errConfirm}
        placeholder="Confirm password here"
        type="password"
      />
      <Button onClick={handleOnSubmit} className={`${styles.LoginButton} tilt-warp`}>
        <span className={'tilt-warp font-normal'}>Reset password</span>
      </Button>
    </div>
  );
};

export default NewPasswordEnterStep;
