import React from 'react';
import styles from '../Question.module.scss';
import { Slider } from 'antd';

export default function SliderComponent({
  question,
  formatter,
  setValue,
}: any) {
  const convertedObject: {[key: number]: string} = {};

  if(question.markers){
    for (const key in question.markers) {
      const value = question.markers[key];
      convertedObject[value] = key;
    }
  }
  return (
    <>
    <span className={styles['Text1']}>{question.upper_qualifier}</span>
    <div className="Question-Slider-Vertical">
      <Slider
        className="Slider"
        vertical
        min={question.lower_value}
        max={question.upper_value}
        step={question.step_value}
        marks={convertedObject}
        included={true}
        defaultValue={question.init_value}
        tooltip={{open:question.show_values, formatter: formatter}}
        onChange={(value: any) => {
          setValue(value);
        }}
      />
    </div>
    <span className={styles['Text2']}>{question.lower_qualifier}</span>
    </>
  );
}
