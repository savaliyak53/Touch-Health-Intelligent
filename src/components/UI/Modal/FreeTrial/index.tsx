import React, { useContext } from 'react';
import { useNavigate } from 'react-router';
import moment from 'moment';
import AuthContext , { AuthContextData }  from 'contexts/AuthContext';
import TouchButton from 'components/UI/TouchButton';
import TouchModal from 'components/UI/Modal/TouchModal';

export type IProps = {
  open: boolean;
  handleOk: () => void;
  title: string;
  primaryButtonText: string;
  secondaryButtonText?: string;
  trialEndDate?: Date;
  trialExpired: boolean;
  subscriptionExpired: boolean;
};
const FreeTrialModal = ({
  open,
  title,
  handleOk,
  primaryButtonText,
  secondaryButtonText,
  trialEndDate,
  trialExpired,
  subscriptionExpired
}: IProps) => {
  const navigate = useNavigate();
  const authContext = useContext<AuthContextData | undefined>(AuthContext); 
  if (!authContext) return null;
  const { logoutUser } = authContext;

  const fakeFunction = (bool: boolean): void => {
    if (!bool) {
      console.log('Сan not be closed');
    }
  }

  const goToDashboard = (): void => {
    navigate('/dashboard')
  }

  const handleSignOut = (): void => {
    logoutUser();
    (window as any).Intercom('shutdown');
    navigate('/login');
  }

  const getMainText = (): string => {
    if (trialExpired) {
      return `Your free trial ended on ${moment(trialEndDate).format('MMMM Do, YYYY')}`
    } else if (moment(trialEndDate).diff(moment(), 'days') === 0) {
      return 'Your free trial is scheduled to end today!'
    }
    return `Your free trial is scheduled to end on ${moment(trialEndDate).format('MMMM Do, YYYY')}, giving you ${moment(trialEndDate).diff(moment(), 'days')} more days to explore our services.`
  }

  return (
    <TouchModal setClose={fakeFunction} isOpen={open} isFullScreen={true} withoutCloseIcon={true}>
      <div className='flex flex-col h-full justify-between w-full mt-[50px] px-[20px]'>
        <div>
          <h3 className='text-[18px] mb-10 leading-[22px] flex items-center font-tilt-warp text-primary-delft-dark opacity-90'>
            {title}
          </h3>
          <div className="text-3 text-oldBurgundy leading-[23px] text-left">
            <div className='mb-8'>{getMainText()}</div>
            <div>{trialExpired
              ? 'We`re thrilled to have you on board! Begin your subscription now to continue enjoying our services beyond the trial period!'
              : 'Begin your subscription now to continue enjoying our services beyond the trial period!'}</div>
          </div>
        </div>
        <div className='mx-auto mb-[120px] w-[250px] flex flex-col gap-5'>
          <TouchButton
            className={`${trialExpired || subscriptionExpired ? 'mt-18' : ''}`}
            type={'default'}
            onClick={handleOk}>
            {primaryButtonText}
          </TouchButton>

          {!trialExpired && <TouchButton
            type={'secondary'}
            onClick={goToDashboard}>
            {secondaryButtonText}
          </TouchButton>
          }

          {(trialExpired && !subscriptionExpired) && <TouchButton
            type={'secondary'}
            onClick={handleSignOut}>
            {secondaryButtonText}
          </TouchButton>
          }
        </div>
      </div>
    </TouchModal>
  );
};

export default FreeTrialModal;
