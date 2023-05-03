import React, { useState } from 'react';
import { Radio } from 'antd';
import styles from '../Question.module.scss';

interface Props {
  onSubmit: any;
  setValue: any;
}


const YesNo = ({ setValue, onSubmit }: Props) => {
  const [isDisabled, setIsDisabled]=useState(false)
  return (
    <div className={styles['align-center']}>
      <Radio.Group
        onChange={(e) => {
          setValue(e.target.value);
        }}
      >
        <div className={`Yes-No-Button`} key={`yes`}>
          <Radio.Button value={'true'} onClick={() => {onSubmit('true'); setIsDisabled(true)}} disabled={isDisabled}>
            Yes
          </Radio.Button>
        </div>
        <br />
        <div className={`Yes-No-Button`} key={`no`}>
          <Radio.Button value={'false'} onClick={() => {onSubmit('false'); setIsDisabled(true)}} disabled={isDisabled}>
            No
          </Radio.Button>
        </div>
      </Radio.Group>
    </div>
  );
};

export default YesNo;
