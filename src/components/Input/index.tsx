import React from "react";

import './index.scss';

interface InputProps {
    id: string;
    name: string;
    placeholder: string;
    type?: string;
  }

const InputField = (
  ({ id, name, placeholder, type, ...rest }: InputProps) => {
    return (
      <div className="mb-3 pt-0">
        <input
          type={type}
          name={name}
          className="inputField"
          placeholder={placeholder}
          {...rest}
        />
      </div>
    );
  }
);

export default InputField;
