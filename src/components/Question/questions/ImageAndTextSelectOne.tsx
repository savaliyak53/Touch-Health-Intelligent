import React, { useState } from 'react';
import goal_styles from '../IntroGoals.module.scss';
import { Radio } from 'antd';

export default function ImageAndTextSelectOne({
  question,
  setValue,
  onSubmit,
}: any) {
  const [selectedValue, setSelectedValue] = useState<string | null>(null);
  const handleRadioChange = (e: any) => {
    const value = e.target.value;
    setSelectedValue(value);
    const index = question.options.indexOf(e.target.value);
    setValue(index);
    onSubmit(index);
  }
  return (
    <div className={goal_styles['IntroGoals']}>
      <h2 className={goal_styles['Title']}>{question.title}</h2>
      <p className={goal_styles['Description']}>{question.sub_title}</p>
      <img src={question.image} className={goal_styles['Image']} alt="Image" />
      <div className="Select-Options">
        <Radio.Group
          onChange={handleRadioChange}
        >
          {question.options.map((item: any, index: number) => (
            <div className={`Yes-No-Button`} key={index}>
              <Radio.Button 
                 value={item}
                 key={index}
                 disabled={selectedValue !== null && selectedValue !== item}
                 >
                {item}
              </Radio.Button>
              {index % 2 !== 0 && <br />}
            </div>
          ))}
        </Radio.Group>
      </div>
    </div>
  );
}
