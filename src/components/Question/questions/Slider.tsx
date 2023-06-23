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
    const originalObject: {[key: string]: number} = {
      "Low Value": 0.1,
      "Middle Value": 0.5,
      "High Value": 0.7
    };
    
    for (const key in originalObject) {
      const value = originalObject[key];
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
        tipFormatter={formatter}
        min={question.lower_value}
        max={question.upper_value}
        step={question.step_value}
        marks={convertedObject}
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
