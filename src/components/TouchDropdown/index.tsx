import React, { FC, Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import ArrowDownIcon from '../Icons/ArrowDownIcon';

interface InputProps {
  onClick?: (val: string) => void;
  options?: { value: string; label: string }[];
  value?: string;
}

const TouchDropdown: FC<InputProps> = ({
   onClick,
   value,
   options
 }) => {

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
  }

  const handleOnClick = (val: string) => {
    if (onClick) {
      onClick(val);
    }
  };

  return (
    <Menu as='div' className='relative w-full h-14 mb-3.5 leading-3.5 rounded-[5px] bg-dentist shadow-primary mt-10'>
      <div className='w-full'>
        <Menu.Button className='inline-flex w-full text-left h-[60px] items-center gap-x-1.5 rounded-md px-5 bg-none'>
          {({ open }) => (
            <>
              <span className='font-roboto text-[14px] text-left font-medium leading-[14px] flex-1'>
                {value}
              </span>
              {options && options.length > 1 &&
                <ArrowDownIcon className={`transform transition duration-300 ${open ? 'rotate-180' : ''}`} />}
            </>
          )}
        </Menu.Button>
      </div>
      {options &&
        options.length && <Transition
          as={Fragment}
          enter='transition ease-out duration-100'
          enterFrom='transform opacity-0 scale-95'
          enterTo='transform opacity-100 scale-100'
          leave='transition ease-in duration-75'
          leaveFrom='transform opacity-100 scale-100'
          leaveTo='transform opacity-0 scale-95'
        >
          <Menu.Items
            className='absolute right-0 top-[52px] z-10 w-full origin-top-right bg-dentist focus:outline-none'>
            <div className='text-center shadow-primary rounded-b rounded-[5px]'>
              {options.filter(opt => opt.label !== value).map((opt) => (
                <Menu.Item key={opt.value}>
                  {({ active }) => (
                    <span
                      onClick={() => handleOnClick(opt.label)}
                      className={classNames(
                        active ? 'bg-rae' : '',
                        'block px-5 py-2 h-[65px] text-[14px] text-high-dark font-medium cursor-pointer text-left flex items-center'
                      )}
                    >
                      {opt.label}
                    </span>
                  )}
                </Menu.Item>
              ))}
            </div>
          </Menu.Items>
        </Transition>}
    </Menu>
  );
};

export default TouchDropdown;
