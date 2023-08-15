import React, {
  CSSProperties,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import { useTimer } from 'react-timer-hook';
import ReCAPTCHA from 'react-google-recaptcha';
import ReactCodeInput from 'react-code-input';
import { Tooltip } from 'antd';
import Button from '../../../../../components/Button';
import styles from '../../../Login/Login.module.scss';
import Authstyles from '../../../Auth.module.scss';
import passwordStyles from '../../PasswordRecovery.module.scss';
import ConfirmModal from '../../../../../components/Modal/ConfirmModal';

interface IProps {
  code: string | undefined;
  setCode: Dispatch<SetStateAction<string | undefined>>;
  onSubmitCode: () => void;
  setDisableSubmit: (boolean: boolean) => void;
  handleOTPRequest: (boolean: boolean) => void;
  isLoading: boolean;
  disableSubmit: boolean;
  refCaptcha: React.MutableRefObject<any>;
}

const codInputStyle: CSSProperties = {
  fontFamily: 'monospace',
  borderRadius: '6px',
  border: '1px solid lightgrey',
  boxShadow: 'rgba(0, 0, 0, 0.1) 0px 0px 10px 0px',
  margin: '4px',
  paddingLeft: '8px',
  width: '36px',
  height: '42px',
  fontSize: '32px',
  boxSizing: 'border-box',
  color: 'black',
  backgroundColor: 'white',
};

const CodeEnterStep: React.FC<IProps> = ({
  onSubmitCode,
  setCode,
  code,
  setDisableSubmit,
  handleOTPRequest,
  isLoading,
  disableSubmit,
  refCaptcha,
}) => {
  const [modalOpen, setModalOpen] = useState(true);
  const [enableTimer, setEnableTimer] = useState(true);
  const [openRecaptcha, setOpenRecaptcha] = useState(false);
  const [error, setError] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);

  const time = new Date();
  time.setSeconds(time.getSeconds() + 60);
  const expiryTimestamp = time;
  const { seconds, minutes, restart } = useTimer({
    expiryTimestamp,
    onExpire: () => {
      setEnableTimer(false);
      setIsDisabled(false);
    },
  });

  const restartTime = (time: number) => {
    const t = new Date();
    t.setSeconds(t.getSeconds() + time);
    restart(t);
  };

  const onReCAPTCHA = () => {
    const token = refCaptcha?.current?.getValue();
    refCaptcha.current.reset();
    localStorage.setItem('recaptcha-token', token);
    handleOTPRequest(true);
    setEnableTimer(true);
    setIsDisabled(true);
    restartTime(10);
    setOpenRecaptcha(false);
  };

  useEffect(() => {
    restartTime(10);
  }, []);

  const handleOnChange = (value: string) => {
    setCode(value);
    setDisableSubmit(false);
    setError(false);
  };

  const handleOnSubmit = (): void => {
    if (code?.length === 6) {
      onSubmitCode();
    } else {
      setError(true);
    }
  };

  // ? 'Verification code is required'
  // : 'Invalid verification code';

  return (
    <>
      <form onSubmit={onSubmitCode} className={styles.Form}>
        <h1 className={styles.Title}>Verification code</h1>
        <ReactCodeInput
          className={passwordStyles.CodeInputWrap}
          inputStyle={codInputStyle}
          name={'code'}
          inputMode="numeric"
          fields={6}
          type="number"
          onChange={handleOnChange}
          value={code}
        />
        <Tooltip
          color="orange"
          placement="bottom"
          title={
            error
              ? 'Verification code is required'
              : 'Invalid verification code'
          }
          open={error}
        />
        <Button
          onClick={handleOnSubmit}
          className={styles.LoginButton}
          loading={isLoading}
          disabled={disableSubmit}
        >
          Verify
        </Button>
        {openRecaptcha && (
          <ReCAPTCHA
            className={Authstyles['recaptcha']}
            ref={refCaptcha}
            sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY as string}
            onChange={onReCAPTCHA}
          />
        )}
        <button
          onClick={() => setOpenRecaptcha(true)}
          className={styles.ToSignup}
          type="button"
          disabled={isDisabled}
        >
          <span>Resend code&nbsp;</span>
          {enableTimer && (
            <span>
              in&nbsp;{minutes}:{seconds < 10 ? `0${seconds}` : seconds}
            </span>
          )}
        </button>
      </form>
      <ConfirmModal
        title={'Confirmation'}
        open={modalOpen}
        handleCancel={() => setModalOpen(false)}
        handleOk={() => setModalOpen(false)}
        className="Addgoal-Confirm-Modal"
        renderData={
          <div className="Description">
            We just sent a text to your number, confirm this is you by putting
            in the code you received here
          </div>
        }
      />
    </>
  );
};

export default CodeEnterStep;
