import React from 'react';

export default function SelectMany({
  question,
  isChecked,
  handleClick,
  labelRef,
  value
}: any) {
  const checkMaxSelected = (selections: Array<number>, questionObj:any, optionIndex: number) => {
    return selections?.length >= Math.min(questionObj.max_num_selections, questionObj?.options?.length) && !isChecked(optionIndex)
  }
  return (
    <div className="Select-Options">
      <div className="ant-radio-group ant-radio-group-outline Select-Button">
        {question.options.map((item: any, index: number) => (
          <label
            ref={labelRef}
            id={`label-${index}`}
            className={`ant-radio-button-wrapper Option${index} ${
              isChecked(index) ? 'ant-radio-button-wrapper-checked' : ''}
              ${checkMaxSelected(value, question, index) ? 'ant-radio-button-disabled' : ''}
              `}
            key={index}
          >
            <span className={`ant-radio-button`}>
              <input
                type="radio"
                className="ant-radio-button-input"
                value={item}
                onClick={() => handleClick(index)}
                disabled={checkMaxSelected(value, question, index)}
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
