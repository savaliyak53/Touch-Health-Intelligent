import React, { FC, Fragment, useEffect, useState } from 'react';
import { Menu, Transition } from '@headlessui/react';
import ArrowDownIcon from '../Icons/ArrowDownIcon';

interface InputProps {
  placeholder?: string;
  onClick?: (val: string) => void;
  options?: { value: string; label: string }[];
}

const TouchDropdown: FC<InputProps> = ({
   onClick,
   placeholder,
   options
 }) => {
  const [value, setValue] = useState('');

  useEffect(() => {
    if (options && options.length === 1) {
      setValue(options[0].label);
    } else {
      setValue(placeholder || 'Options');
    }
  }, []);

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
    <Menu as='div' className='relative w-full h-14 mb-3.5 leading-3.5 rounded-md bg-dentist shadow-primary  mt-10'>
      <div className='w-full'>
        <Menu.Button className='inline-flex w-full text-left h-16 items-center gap-x-1.5 rounded-md px-3 bg-none'>
          {({ open }) => (
            <>
              <span className='font-roboto text-left font-medium leading-3 flex-1'>
                {value}
              </span>
              {options && options.length > 1 &&
                <ArrowDownIcon className={`mr-2 transform transition duration-300 ${open ? 'rotate-180' : ''}`} />}
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
            className='absolute right-0 z-10 mt-2 w-full origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
            <div className='py-1 text-center'>
              {options.map((opt) => (
                <Menu.Item key={opt.value}>
                  {({ active }) => (
                    <span
                      onClick={() => handleOnClick(opt.value)}
                      className={classNames(
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                        'block px-4 py-2 text-sm'
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
