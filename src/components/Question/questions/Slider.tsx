import React from 'react';
import styles from '../Question.module.scss';
import { Slider } from 'antd';

export default function SliderComponent({
  question,
  formatter,
  setValue,
}: any) {
  return (
    <div className="Question-Slider-Vertical">
      {/* <div className={styles["Slider-Vertical"]}> */}
      <span className={styles['Text1']}>{question.lower_qualifier}</span>
      <Slider
        className="Slider"
        vertical
        tipFormatter={formatter}
        min={question.lower_value}
        max={question.upper_value}
        step={question.step_value}
        tooltipVisible={question.show_values}
        onChange={(value: any) => {
          setValue(value);
        }}
      />
      <span className={styles['Text2']}>{question.upper_qualifier}</span>
    </div>
  );
}
