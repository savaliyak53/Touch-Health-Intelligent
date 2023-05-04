import React from 'react';

export default function SelectMany({
  question,
  isChecked,
  handleClick,
  labelRef,
  value
}: any) {
  return (
    <div className="Select-Options">
      <div className="ant-radio-group ant-radio-group-outline Select-Button">
        {question.options.map((item: any, index: number) => (
          <label
            ref={labelRef}
            id={`label-${index}`}
            className={`ant-radio-button-wrapper Option${index} ${
              isChecked(index) ? 'ant-radio-button-wrapper-checked' : ''}
              ${value?.length >= Math.min(question.max_num_selections, question?.options?.length) && !isChecked(index) ? 'ant-radio-button-disabled' : ''}
              `}
            key={index}
          >
            <span className={`ant-radio-button`}>
              <input
                type="radio"
                className="ant-radio-button-input"
                value={item}
                onClick={() => handleClick(index)}
                disabled={value?.length >= Math.min(question.max_num_selections, question?.options?.length) && !isChecked(index)}
              />
              <span className="ant-radio-button-inner"></span>
            </span>
            <span>{item}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
