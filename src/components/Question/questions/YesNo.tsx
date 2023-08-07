import React, { useState } from 'react';
import { Radio } from 'antd';
import styles from '../Question.module.scss';

interface Props {
  onSubmit: any;
  setValue: any;
}

const YesNo = ({ setValue, onSubmit }: Props) => {
  const [disable, setDisable] = useState<any>(false);
  const handleRadioChange = (e: any) => {
    setDisable(true);
    const value = e.target.value;
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
          <Radio.Button
            value={'true'}
            onClick={(e: any) => handleRadioChange(e)}
            disabled={disable}
          >
            Yes
          </Radio.Button>
        </div>
        <br />
        <div className={`Yes-No-Button`} key={`no`}>
          <Radio.Button
            value={'false'}
            onClick={handleRadioChange}
            disabled={disable}
          >
            No
          </Radio.Button>
        </div>
      </Radio.Group>
    </div>
  );
};

export default YesNo;
