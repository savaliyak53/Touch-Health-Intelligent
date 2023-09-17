import React, { ChangeEvent, useEffect, useState } from 'react';
import TouchInput from 'components/UI/TouchInput';

interface IProps {
  email?: string;
  password?: string;
  setEmail?: (str: string) => void;
  setPassword?: (str: string) => void;
  approveEmailVerified?: (bool: boolean) => void;
  approvePasswordVerified?: (bool: boolean) => void;
}
const emailRegexp = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

const InputGroup: React.FC<IProps> = ({
  email,
  password,
  setEmail,
  setPassword,
  approveEmailVerified,
  approvePasswordVerified
  }) => {

  const [emailError, setEmailError] = useState<string>('');
  const [emailVerified, setEmailVerified] = useState<boolean>(false);
  const [confirmEmail, setConfirmEmail] = useState<string>('');
  const [confirmEmailError, setConfirmEmailError] = useState<string>('');
  const [confirmEmailVerified, setConfirmEmailVerified] = useState<boolean>(false);

  const [passwordError, setPasswordError] = useState<string>('');
  const [passwordVerified, setPasswordVerified] = useState<boolean>(false);
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [confirmPasswordError, setConfirmPasswordError] = useState<string>('');
  const [confirmPasswordVerified, setConfirmPasswordVerified] = useState<boolean>(false);

  useEffect(() => {
    if (approveEmailVerified !== undefined) {
      approveEmailVerified((emailVerified && confirmEmailVerified))
    }

  }, [emailVerified, confirmEmailVerified]);

  useEffect(() => {
    if (approvePasswordVerified !== undefined) {
      approvePasswordVerified((passwordVerified && confirmPasswordVerified))
    }
  }, [passwordVerified, confirmPasswordVerified])

  const checkErrorPassword = (value: string) => {
    if (confirmPassword && confirmPassword !== value) {
      setConfirmPasswordError('Password do not match.');
      setConfirmPasswordVerified(false);
    } else if (confirmPassword && confirmPassword === value) {
      setConfirmPasswordError('');
      setConfirmPasswordVerified(true);
    }
    if (!value) {
      setPasswordError('Password is required.')
      setPasswordVerified(false);
      return;
    } else if (value.length < 8) {
      setPasswordError('Password should be of at least 8 characters.')
      setPasswordVerified(false);
      return;
    } else if (!value.match(/^(?=.*?[#?!@$%^&*-])/)) {
      setPasswordError('Need a special character.')
      setPasswordVerified(false);
      return;
    }
    setPasswordVerified(true);
  }

  const checkErrorConfirmPassword = (value: string) => {
    if (!value) {
      setConfirmPasswordError('Confirm password is required.');
      setConfirmPasswordVerified(false);
      return;
    } else if (value.length < 8) {
      setConfirmPasswordError('Password should be of at least 8 characters.')
      setConfirmPasswordVerified(false);
      return;
    } else if (!value.match(/^(?=.*?[#?!@$%^&*-])/)) {
      setConfirmPasswordError('Need a special character.')
      setConfirmPasswordVerified(false);
      return;
    } else if (value !== password) {
      setConfirmPasswordError('Passwords do not match.');
      setConfirmPasswordVerified(false);
      return;
    }
    setConfirmPasswordVerified(true);
  }

  const checkErrorEmail = (value: string) => {
    if (confirmEmail && confirmEmail !== value) {
      setConfirmEmailError('Emails do not match.');
      setConfirmEmailVerified(false);
    } else if (confirmEmail && confirmEmail === value) {
      setConfirmEmailError('');
      setConfirmEmailVerified(true);
    }
    if (!value) {
      setEmailError('Email is required.');
      setEmailVerified(false);
      return;
    } else if (!emailRegexp.test(value || '')) {
      setEmailError('Invalid Email address');
      setEmailVerified(false);
      return;
    }
    setEmailVerified(true);
  }

  const checkErrorConfirmEmail = (value: string) => {
    if (!value) {
      setConfirmEmailError('Confirm email is required.');
      setConfirmEmailVerified(false);
      return;
    } else if (value !== email) {
      setConfirmEmailError('Emails do not match.');
      setConfirmEmailVerified(false);
      return;
    } else if (!emailRegexp.test(value || '')) {
      setConfirmEmailError('Invalid Email address');
      setConfirmEmailVerified(false);
      return;
    }
    setConfirmEmailVerified(true);
  }

  const handleChangeConfirmPassword = (e: ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  }

  const handleChangeConfirmEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setConfirmEmail(e.target.value);
  }

  return (
    <>
      {setEmail && email !== undefined && <>
        <TouchInput
          type={'text'}
          className='mb-4'
          isVerified={emailVerified}
          errorMessage={emailError}
          resetError={setEmailError}
          checkError={checkErrorEmail}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='Email'
          value={email}/>
        <TouchInput
          type={'text'}
          className='mb-4'
          isVerified={confirmEmailVerified}
          errorMessage={confirmEmailError}
          resetError={setConfirmEmailError}
          onChange={handleChangeConfirmEmail}
          checkError={checkErrorConfirmEmail}
          placeholder='Repeat email'
          value={confirmEmail}/>
      </>}

      {setPassword && password !== undefined && <>
        <TouchInput
          type={'password'}
          className='mb-4'
          isVerified={passwordVerified}
          errorMessage={passwordError}
          resetError={setPasswordError}
          checkError={checkErrorPassword}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='Password'
          value={password}/>
        <TouchInput
          type={'password'}
          className='mb-4'
          isVerified={confirmPasswordVerified}
          errorMessage={confirmPasswordError}
          resetError={setConfirmPasswordError}
          onChange={handleChangeConfirmPassword}
          checkError={checkErrorConfirmPassword}
          placeholder='Repeat password'
          value={confirmPassword}/>
      </>}
    </>
  );
};

export default InputGroup;
