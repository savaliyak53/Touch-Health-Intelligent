import React from "react";

import './index.scss';

interface InputProps {
    id: string;
    name: string;
    placeholder?: string;
    type?: string;
    maxLength?: number;
    className?: string;
  }

const InputField = (
    ({
      id,
      name,
      placeholder='',
      type, maxLength=50,
      className=" ",
      ...rest }: InputProps
    ) => {
    return (
      <div className="mb-3 pt-0">
        <input
          type={type}
          name={name}
          className={className}
          placeholder={placeholder}
          {...rest}
        />
      </div>
    );
  }
);

export default InputField;
