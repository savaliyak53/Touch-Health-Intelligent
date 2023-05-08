import React, { useState } from 'react';
import { Radio } from 'antd';

const DialogSelectOne = ({ value, setValue, onSubmit, question }: any) => {
  const [selectedValue, setSelectedValue] = useState<string | null>(null);
  const handleRadioChange = (e: any) => {
    const value = e.target.value;
    setSelectedValue(value);
    const index = question.options.indexOf(e.target.value);
    setValue(index);
    onSubmit(index);
  }

  return (
    <div className="Select-Options">
      <Radio.Group
        onChange={handleRadioChange}
      >
        {question.options.map((item: any, index: number) => (
          <div className={`Yes-No-Button`} key={index}>
            <Radio.Button
              value={item}
              key={index}
              disabled={selectedValue !== null && selectedValue !== item}
            >
              {item}
            </Radio.Button>
            {index % 2 !== 0 && <br />}
          </div>
        ))}
      </Radio.Group>
    </div>
  );
};

export default DialogSelectOne;
