import React from 'react';
import { Link } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha';
import { isValidPhoneNumber } from 'react-phone-number-input';
import PhoneInput from 'components/PhoneInput';

interface IProps {
  onVerify: (boolean: boolean) => void;
  setIsDisabled: (boolean: boolean) => void;
  isDisabled: boolean;
  refCaptcha: React.MutableRefObject<any>;
  username: string;
  onChange: (value: string) => void;
}

const NumberEnterStep: React.FC<IProps> = ({
  onVerify,
  username,
  onChange,
  setIsDisabled,
  isDisabled,
  refCaptcha,
}) => {

  const handleOnVerify = () => {
    if (isValidPhoneNumber(username || '')) {
      onVerify(false);
    }
  };

  return (
    <form onSubmit={handleOnVerify} className='flex flex-col items-center justify-center'>
      <h1 className='text-primary-delft-dark font-tilt-warp font-normal text-[22px] leading-[36px] opacity-80 text-center mb-4'>Reset password</h1>
      <PhoneInput
        onChange={onChange}
        placeholder="Mobile phone number"
        value={username}
      />
      <ReCAPTCHA
        className={'mx-auto mt-6 mb-0'}
        ref={refCaptcha}
        sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY as string}
        onChange={() => setIsDisabled(false)}
      />
      <button
        onClick={handleOnVerify}
        disabled={isDisabled}
        type='button'
        className='rounded-full bg-high-dark text-nimbus w-full p-4 h-full mt-8 text-center font-tilt-warp text-sm font-medium leading-none disabled:cursor-not-allowed'
      >
        Send code
      </button>
      <div className={'text-high-dark underline font-roboto text-xs font-normal leading-4 mt-5'}>
        <span>Go back? </span>
        <Link to="/login" className='hover:text-high-dark hover:underline'>
          Log in
        </Link>
      </div>
    </form>
  );
};

export default NumberEnterStep;
