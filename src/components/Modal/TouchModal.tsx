import React, { FC, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import CloseIcon from 'components/Icons/CloseIcon';

interface InputProps {
  setClose: (bool: boolean) => void;
  children: React.ReactNode;
  isOpen: boolean;
  isAuth?: boolean;
  isFullScreen?: boolean;
  withoutCloseIcon?: boolean;
}

//1. Confirm modal +
//2. Delete session modal +
//3. Delete data modal +
//4. Error modal +
//5. Free trial modal +
//6. Google modal +
//7. Guidance modal
//8. Accountant Lock modal +
//9. Error interaction modal +
//10. Last goal modal
//11. Price modal
//12. Recaptcha modal

const TouchModal: FC<InputProps> = ({ isOpen, isAuth, withoutCloseIcon, isFullScreen, setClose, children }) => {
  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setClose}>

        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto flex justify-center">
          <div className="flex w-full">
            <div className='flex min-h-full items-center justify-center mx-auto text-center'>

              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className={`relative ${isFullScreen ? 'w-full h-full' : 'w-[350px]'} transform overflow-hidden rounded-[5px] bg-white text-center shadow-primary transition-all`}>
                  {!withoutCloseIcon && <button className='float-right mr-[15px] mt-[15px] focus-visible:outline-none' type='button' onClick={() => setClose(false)}>
                    <CloseIcon />
                  </button>}
                  {children}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>

          {/* This div works as an extra space to center the modal when we use the web version main layout */}
          {!isAuth && <div className='hidden h-full w-full max-w-[50%] dd:block'/>}
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default TouchModal;