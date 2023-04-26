import React from 'react';
import { Input } from 'antd';

export default function Numeric({ setValue }: any) {
  return (
    <Input
      className="NumberInput"
      placeholder="Enter a number"
      type="number"
      onChange={(e) => {
        setValue(e.target.value);
      }}
    />
  );
}
