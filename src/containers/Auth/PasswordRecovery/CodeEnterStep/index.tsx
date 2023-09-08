import React, {
  CSSProperties,
  Dispatch,
  SetStateAction,
  useEffect,
  useState
} from 'react';
import { useTimer } from 'react-timer-hook';
import ReCAPTCHA from 'react-google-recaptcha';
import ReactCodeInput from 'react-code-input';
import { Tooltip } from 'antd';
import ConfirmModal from 'components/Modal/ConfirmModal';
import TouchButton from 'components/TouchButton';

interface IProps {
  code: string | undefined;
  setCode: Dispatch<SetStateAction<string>>;
  onSubmitCode: () => void;
  setDisableSubmit: (boolean: boolean) => void;
  handleOTPRequest: (boolean: boolean) => void;
  disableSubmit: boolean;
  isLoading: boolean;
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
  disableSubmit,
  refCaptcha,
  isLoading
}) => {
  const [modalOpen, setModalOpen] = useState(true);
  const [enableTimer, setEnableTimer] = useState(true);
  const [openRecaptcha, setOpenRecaptcha] = useState(false);
  const [error, setError] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const fieldsCount = 6;
  const inputs = document.querySelectorAll<HTMLInputElement>('.react-code-input input');

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
    restartTime(60);
    setOpenRecaptcha(false);
  };

  useEffect(() => {
    restartTime(60);
  }, []);

  const handleOnChange = (value: string) => {
    setCode(value);
    setDisableSubmit(false);
    setError(false);
    inputs.forEach((input, index) => input.style.boxShadow = 'rgba(0, 0, 0, 0.1) 0px 0px 10px 0px');
  };

  const handleOnSubmit = (): void => {
    if (code?.length === 6) {
      onSubmitCode();
    } else {
      setError(true);
      inputs.forEach((input, index) => {
        if (!input.value) {
          input.style.boxShadow = 'rgba(245, 39, 39, 0.5) 0px 0px 10px 0px';
        } else {
          input.style.boxShadow = 'rgba(0, 0, 0, 0.1) 0px 0px 10px 0px';
        }
      });
    }
  };

  return (
    <>
      <form onSubmit={onSubmitCode} className='flex flex-col items-center justify-center'>
        <h1 className='text-primary-delft-dark font-tilt-warp font-normal text-[22px] leading-[36px] opacity-80 text-center mb-4'>Verification code</h1>
        <ReactCodeInput
          className='!flex justify-between flex-wrap w-full react-code-input'
          inputStyle={codInputStyle}
          name={'code'}
          inputMode="numeric"
          fields={fieldsCount}
          type="number"
          onChange={handleOnChange}
          value={code}
        />
        <Tooltip
          color="orange"
          placement="bottom"
          title='Incorrect verification code'
          open={error}
        />
        <TouchButton
          className='mt-8'
          type='auth'
          onClick={handleOnSubmit}
          isDisabled={disableSubmit}
          isLoading={isLoading}
        >
          Verify
        </TouchButton>
        {openRecaptcha && (
          <ReCAPTCHA
            className='mx-auto mt-6 mb-0'
            ref={refCaptcha}
            sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY as string}
            onChange={onReCAPTCHA}
          />
        )}
        <button
          onClick={() => setOpenRecaptcha(true)}
          className='text-high-dark underline font-roboto text-xs font-normal leading-4 mt-5 disabled:cursor-not-allowed'
          type='button'
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
        isAuth={true}
        handleCancel={() => setModalOpen(false)}
        handleOk={() => setModalOpen(false)}>
        <div className="text-3 text-oldBurgundy leading-[23px] text-left">
          We just sent a text to your number, confirm this is you by putting
          in the code you received here
        </div>
      </ConfirmModal>
    </>
  );
};

export default CodeEnterStep;
