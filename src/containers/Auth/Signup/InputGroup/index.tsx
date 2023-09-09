import React, { ChangeEvent, useState } from 'react';
import TouchInput from 'components/TouchInput';
import PhoneInput from 'components/PhoneInput';
import { isValidPhoneNumber } from 'react-phone-number-input';

interface IProps {
  type: 'phone' | 'password';
  isVerified: boolean;
}

const InputGroup: React.FC<IProps> = ({type, isVerified}) => {
  const [phone, setPhone] = useState<string>('');
  const [phoneError, setPhoneError] = useState<string>('');
  const [phoneVerified, setPhoneVerified] = useState<boolean>(false);
  const [confirmPhone, setConfirmPhone] = useState<string>('');
  const [confirmPhoneError, setConfirmPhoneError] = useState<string>('');
  const [confirmPhoneVerified, setConfirmPhoneVerified] = useState<boolean>(false);

  const [password, setPassword] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');
  const [passwordVerified, setPasswordVerified] = useState<boolean>(false);
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [confirmPasswordError, setConfirmPasswordError] = useState<string>('');
  const [confirmPasswordVerified, setConfirmPasswordVerified] = useState<boolean>(false);

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

  const checkErrorPhone = (value: string) => {
    if (confirmPhone && confirmPhone !== value) {
      setConfirmPhoneError('Phones do not match.');
      setConfirmPhoneVerified(false);
    } else if (confirmPhone && confirmPhone === value) {
      setConfirmPhoneError('');
      setConfirmPhoneVerified(true);
    }
    if (!value) {
      setPhoneError('Phone is required.');
      setPhoneVerified(false);
      return;
    } else if (!isValidPhoneNumber(value || '')) {
      setPhoneError('Invalid Phone number');
      setPhoneVerified(false);
      return;
    }
    setPhoneVerified(true);
  }

  const checkErrorConfirmPhone = (value: string) => {
    if (!value) {
      setConfirmPhoneError('Confirm phone is required.');
      setConfirmPhoneVerified(false);
      return;
    } else if (value !== phone) {
      setConfirmPhoneError('Phones do not match.');
      setConfirmPhoneVerified(false);
      return;
    } else if (!isValidPhoneNumber(value || '')) {
      setConfirmPhoneError('Invalid Phone number');
      setConfirmPhoneVerified(false);
      return;
    }
    setConfirmPhoneVerified(true);
  }

  const handleChangeConfirmPassword = (e: ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  }

  const handleChangeConfirmPhone = (value: string) => {
    setConfirmPhone(value);
  }

  return (
    <>
      <PhoneInput
        value={phone}
        className='mb-4'
        isVerified={phoneVerified}
        errorMessage={phoneError}
        checkError={checkErrorPhone}
        resetError={setPhoneError}
        onChange={setPhone}
        placeholder='Mobile phone number'/>
      <PhoneInput
        value={confirmPhone}
        className='mb-4'
        isVerified={confirmPhoneVerified}
        errorMessage={confirmPhoneError}
        checkError={checkErrorConfirmPhone}
        resetError={setConfirmPhoneError}
        onChange={handleChangeConfirmPhone}
        placeholder='Confirm phone number'/>

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
    </>
  );
};

export default InputGroup;
