import React from 'react';
import { Radio } from 'antd';

export default function SelectOne({ question, setValue }: any) {
  return (
    <div className="Select-Options">
      <Radio.Group
        onChange={(e) => {
          const index = question.options.indexOf(e.target.value);
          setValue(index);
        }}
      >
        {question.options.map((item: any, index: number) => (
          <div className={`Select-Button`} key={index}>
            <Radio.Button value={item}>{item}</Radio.Button>
            {index % 2 !== 0 && <br />}
          </div>
        ))}
      </Radio.Group>
    </div>
  );
}
