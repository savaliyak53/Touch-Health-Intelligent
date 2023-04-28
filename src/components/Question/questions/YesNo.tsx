import React from 'react';
import { Radio } from 'antd';
import styles from '../Question.module.scss';

interface Props {
  onSubmit: any;
  setValue: any;
}

const YesNo = ({ setValue, onSubmit }: Props) => {
  return (
    <div className={styles['align-center']}>
      <Radio.Group
        onChange={(e) => {
          setValue(e.target.value);
        }}
      >
        <div className={`Yes-No-Button`} key={`yes`}>
          <Radio.Button value={'true'} onClick={() => onSubmit('true')}>
            Yes
          </Radio.Button>
        </div>
        <br />
        <div className={`Yes-No-Button`} key={`no`}>
          <Radio.Button value={'false'} onClick={() => onSubmit('false')}>
            No
          </Radio.Button>
        </div>
      </Radio.Group>
    </div>
  );
};

export default YesNo;
