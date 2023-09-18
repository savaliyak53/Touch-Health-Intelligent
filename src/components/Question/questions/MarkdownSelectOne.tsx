import React, { useState } from 'react';
import { Radio } from 'antd';
import goal_styles from '../IntroGoals.module.scss';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import styles from '../Question.module.scss';

export default function MarkdownSelectOne({
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
      {question.title && (
        <h2 className={goal_styles['Title']}>{question.title}</h2>
      )} 
      <div className={`${question.body_md ? "Markdown-Desc-md " : " Markdown-Desc"} text-center leading-9 text-[18px] text-primary-delft-dark Description Heading-color1 Markdown-Desc`}>
        <ReactMarkdown className='prose prose-h1:text-[32px] prose-h3:text-[20px] prose-li:text-[14px] prose-p:text-[14px]' rehypePlugins={[rehypeRaw]}>
          {question.body_md}
        </ReactMarkdown>
      </div>
      <div className="Select-Options">
        <Radio.Group
          onChange={handleRadioChange}
        >
          {question.options.map((item: any, index: number) => (
            <div className={`w-[351px] Yes-No-Button`} key={index}>
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
