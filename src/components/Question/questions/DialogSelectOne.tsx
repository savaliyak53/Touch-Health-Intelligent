import React, { useState } from 'react';
import { Radio } from 'antd';
const DialogSelectOne = ({ setValue, onSubmit, question }: any) => {
  const [isDisabled, setIsDisabled]=useState(false)
  return (
    <div className="Select-Options">
      <Radio.Group
        onChange={(e) => {
          setIsDisabled(true)
          const index = question.options.indexOf(e.target.value);
          setValue(index);
          onSubmit(index);
        }}
      >
        {question.options.map((item: any, index: number) => (
          <div className={`Yes-No-Button`} key={index}>
            <Radio.Button
              //className={styles['dialog-btn']}
              value={item}
              key={index}
              disabled={isDisabled}>
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
