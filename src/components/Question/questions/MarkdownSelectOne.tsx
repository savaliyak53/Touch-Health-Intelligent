import React from 'react';
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
  return (
    <div className={goal_styles['IntroGoals']}>
      {question.title && (
        <h2 className={goal_styles['Title']}>{question.title}</h2>
      )}
      <div className={`Description Heading-color1 ${styles['Des-Goal']}`}>
        <ReactMarkdown rehypePlugins={[rehypeRaw]}>
          {question.body_md}
        </ReactMarkdown>
      </div>
      <div className="Select-Options">
        <Radio.Group
          onChange={(e) => {
            const index = question.options.indexOf(e.target.value);
            setValue(index);
            onSubmit(index);
          }}
        >
          {question.options.map((item: any, index: number) => (
            <div className={`Yes-No-Button`} key={index}>
              <Radio.Button value={item} key={index}>
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
