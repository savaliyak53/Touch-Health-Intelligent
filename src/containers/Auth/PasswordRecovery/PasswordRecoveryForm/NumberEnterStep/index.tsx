import React, { Dispatch, SetStateAction } from 'react';
import { Link } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha';
import { isValidPhoneNumber } from 'react-phone-number-input';
import Button from '../../../../../components/Button';
import styles from '../../../Login/Login.module.scss';
import Authstyles from '../../../Auth.module.scss';
import PhoneInput from '../../../../../components/PhoneInput';

interface IProps {
  onVerify: (boolean: boolean) => void;
  setIsDisabled: (boolean: boolean) => void;
  isLoading: boolean;
  isDisabled: boolean;
  refCaptcha: React.MutableRefObject<any>;
  username: string | undefined;
  onChange: Dispatch<SetStateAction<string | undefined>>;
}

const NumberEnterStep: React.FC<IProps> = ({
  onVerify,
  username,
  onChange,
  setIsDisabled,
  isLoading,
  isDisabled,
  refCaptcha,
}) => {

  const handleOnVerify = () => {
    if (isValidPhoneNumber(username || '')) {
      onVerify(false);
    }
  };

  return (
    <form onSubmit={handleOnVerify} className={styles.Form}>
      <h1 className={styles.Title}>Reset password</h1>
      <PhoneInput
        onChange={onChange}
        placeholder="Mobile phone number"
        value={username}
      />
      <ReCAPTCHA
        className={Authstyles['recaptcha']}
        ref={refCaptcha}
        sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY as string}
        onChange={() => setIsDisabled(false)}
      />
      <Button
        onClick={handleOnVerify}
        loading={isLoading}
        disabled={isDisabled}
        className={styles.LoginButton}
      >
        Send code
      </Button>
      <div className={styles.ToSignup}>
        <span>Go back? </span>
        <Link to="/login" className={styles.Link}>
          Log in
        </Link>
      </div>
    </form>
  );
};

export default NumberEnterStep;
