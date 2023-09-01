import React, { FC, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import CloseIcon from 'components/Icons/CloseIcon';

interface InputProps {
  setClose: (bool: boolean) => void;
  children: React.ReactNode;
  isOpen: boolean;
}

const TouchModal: FC<InputProps> = ({ isOpen, setClose, children }) => {
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
                <Dialog.Panel className="relative w-[350px] transform overflow-hidden rounded-[5px] bg-dentist text-center shadow-primary transition-all">
                  <button className='float-right mr-[15px] mt-[15px]' type='button' onClick={() => setClose(false)}>
                    <CloseIcon />
                  </button>
                  {children}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>

          {/* This div works as an extra space to center the modal when we use the web version */}
          <div className='hidden h-full w-full max-w-[50%] dd:block'/>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default TouchModal;