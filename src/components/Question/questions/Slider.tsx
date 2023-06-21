import React from 'react';
import styles from '../Question.module.scss';
import { Slider } from 'antd';

export default function SliderComponent({
  question,
  formatter,
  setValue,
}: any) {
  return (
    <>
    <span className={styles['Text1']}>{question.upper_qualifier}</span>
    <div className="Question-Slider-Vertical">
      <Slider
        className="Slider"
        vertical
        tipFormatter={formatter}
        min={question.lower_value}
        max={question.upper_value}
        step={question.step_value}
        marks={question.markers}
        included={true}
        defaultValue={question.init_value}
        tooltip={question.show_values}
        onChange={(value: any) => {
          setValue(value);
        }}
      />
    </div>
    <span className={styles['Text2']}>{question.lower_qualifier}</span>
    </>
  );
}
