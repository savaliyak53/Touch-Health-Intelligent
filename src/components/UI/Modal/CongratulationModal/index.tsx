import React, { FC } from 'react';
import TouchButton from 'components/UI/TouchButton';
import Confetti from 'components/Icons/Confetti';
import TouchModal from 'components/UI/Modal/TouchModal';

interface InputProps {
  setClose: (bool: boolean) => void;
  isOpen: boolean;
  value: number;
  type: 'data-points' | 'streak';
}

const CongratulationModal: FC<InputProps> = ({ isOpen, setClose, value, type }) => {
  return (
      <TouchModal setClose={setClose} isOpen={isOpen} >
        <div className='mb-[27px] mt-[30px]'>
          {type === 'data-points' && (
            <div className='flex mt-[86px] mb-[43px] justify-center items-center relative'>
              <Confetti className='absolute top-[-35px] left-[76px]' />
              <span className='w-[47px] h-[47px] text-white flex justify-center items-center rounded-full bg-carrot font-tilt-warp text-[18px] leading-[36px]'>
                {value}
              </span>
            </div>
          )}

          <div className='mt-3 flex flex-col w-full items-center'>
            <h3 className='text-[18px] mb-[6px] leading-[22px] flex items-center font-tilt-warp text-primary-delft-dark opacity-90'>
              {type === 'streak' && (<>{value} day{value > 1 && 's'} streak <br /></>)}
              Congratulations! <br />
              {type === 'data-points' && <>{value} data-point{value > 1 && 's'} earned</>}
            </h3>
            <p className='text-[12px] leading-[14px] text-center text-oldBurgundy opacity-90'>
              You can view your {type} on your dashboard
            </p>
          </div>
        </div>

        <div className='mx-[25px] mb-[33px]'>
          <TouchButton type={'default'} onClick={() => setClose(false)}>
            Back to dashboard
          </TouchButton>
        </div>
      </TouchModal>
  );
};

export default CongratulationModal;