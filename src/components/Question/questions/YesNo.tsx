import React, { useState } from 'react';
import { Radio } from 'antd';
import styles from '../Question.module.scss';

interface Props {
  onSubmit: any;
  setValue: any;
}

const YesNo = ({ setValue, onSubmit }: Props) => {
  const [selectedValue, setSelectedValue] = useState<string | null>(null);
  const handleRadioChange = (e: any) => {
    const value = e.target.value;
    setSelectedValue(value);
    setValue(value);
    onSubmit(value);
  };
  return (
    <div className={styles['align-center']}>
      <Radio.Group
        onChange={(e) => {
          setValue(e.target.value);
        }}
      >
        <div className={`Yes-No-Button`} key={`yes`}>
          <Radio.Button value={'true'} onClick={handleRadioChange} disabled={selectedValue === 'false'}>
            Yes
          </Radio.Button>
        </div>
        <br />
        <div className={`Yes-No-Button`} key={`no`}>
          <Radio.Button value={'false'} onClick={handleRadioChange} disabled={selectedValue === 'true'}>
            No
          </Radio.Button>
        </div>
      </Radio.Group>
    </div>
  );
};

export default YesNo;
