import React from 'react';
import { Link } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha';
import TouchButton from "components/UI/TouchButton";
import TouchInput from 'components/UI/TouchInput';

interface IProps {
  onVerify: (boolean: boolean) => void;
  setIsDisabled: (boolean: boolean) => void;
  isDisabled: boolean;
  isLoading: boolean;
  refCaptcha: React.MutableRefObject<any>;
  username: string;
  onChange: (value: string) => void;
}

const EmailEnterStep: React.FC<IProps> = ({
  onVerify,
  username,
  onChange,
  setIsDisabled,
  isDisabled,
  isLoading,
  refCaptcha,
}) => {

  const handleOnVerify = () => {
    if (username) {
      onVerify(false);
    }
  };

  return (
    <form onSubmit={handleOnVerify} className='flex flex-col items-center justify-center'>
      <h1 className='text-primary-delft-dark font-tilt-warp font-normal text-[22px] leading-[36px] opacity-80 text-center mb-4'>
        Reset password
      </h1>
      <TouchInput
        type={'text'}
        placeholder='Email address'
        value={username}
        onChange={(e) => onChange(e.target.value)} />

      <ReCAPTCHA
        className={'mx-auto mt-6 mb-0'}
        ref={refCaptcha}
        sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY as string}
        onChange={() => setIsDisabled(false)}
      />
      <TouchButton
        className='mt-8'
        type='auth'
        onClick={handleOnVerify}
        isDisabled={isDisabled}
        isLoading={isLoading}
      >
        Send code
      </TouchButton>
      <div className={'text-high-dark font-roboto text-xs font-normal leading-4 mt-5'}>
        <span>Go back? </span>
        <Link to='/login' className='underline hover:text-high-dark hover:underline'>
          Log in
        </Link>
      </div>
    </form>
  );
};

export default EmailEnterStep;
