import React, { useCallback, useEffect, useState } from 'react';
import { DatePicker, Input, Radio, Tooltip } from 'antd';
import { Slider } from 'antd';
import type { SliderMarks } from 'antd/lib/slider';
import { RightOutlined, SearchOutlined } from '@ant-design/icons';
import { Select, Spin } from 'antd';
const { Option } = Select;
// import './index.scss';
import styles from './Question.module.scss';
import TextArea from 'antd/lib/input/TextArea';
import { Timepicker } from 'react-timepicker';
import 'react-timepicker/timepicker.css';
import { AiFillQuestionCircle, AiOutlineQuestionCircle } from 'react-icons/ai';

interface Props {
  question: any;
  onSubmit: any;
  setValue: any;
  setDisableNextButton: any;
}

const Question = ({
  question,
  setValue,
  onSubmit,
  setDisableNextButton,
}: Props) => {
  let radioOptions: string[] = [];
  const formatter = (value: number | undefined) => `${value}`;
  const [sliderMarks, setSliderMarks] = useState({});
  const [search, setSearch] = useState<string>();

  const onChange = (value: Array<string>) => {
    let i = 0;
    const indexArray = [];
    while (value.length > i) {
      const index = question.options.indexOf(value[i]);
      indexArray.push(index);
      i++;
    }
    setValue(indexArray);
  };
  const onSearch = (value: string) => {
    setSearch(value);
  };
  const onTimeChange = (hours: any, minutes: any) => {
    setValue(`${hours}:${minutes ? minutes : '00'}:00.648052`);
  };
  const children: React.ReactNode[] = [];
  let i = 0;
  while (question?.options?.length > i) {
    children.push(
      <Option key={question?.options[i]}>{question?.options[i]}</Option>
    );
    i++;
  }
  const handleClick = (item: string) => {
    const index = question.options.indexOf(item);
    if (radioOptions.includes(index)) {
      const newArr = radioOptions.filter((item) => item !== index);
      radioOptions = [...newArr];
    } else {
      radioOptions = [...radioOptions, index];
    }
    setValue(radioOptions.length ? radioOptions : undefined);
  };
  const isChecked = (item: string) => {
    const index = question.options.indexOf(item);
    if (radioOptions.includes(index)) {
      return true;
    }
    return false;
  };

  useEffect(() => {
    if (question.type === 'slider') {
      const marks: SliderMarks = {};

      marks[parseInt(question?.lower_value)] = `${question?.lower_qualifier}`;
      marks[parseInt(question?.upper_value)] = `${question?.upper_qualifier}`;

      setSliderMarks(marks);
    }
  }, []);

  const InputField = useCallback(() => {
    switch (question?.type) {
      case 'time':
        return (
          <Timepicker
            onChange={onTimeChange}
            militaryTime={true}
            radius={100}
          />
        );
      case 'date':
        return (
          <DatePicker
            onChange={(date: any, dateString: any) => setValue(dateString)}
            className="Date-Select"
          />
        );
      case 'yes_no':
        return (
          <div className={styles["align-center"]}>
            <button
              className={styles["next"]}
              type="button"
              onClick={async () => {
                await setValue('true');
                onSubmit('true');
              }}
            >
              Yes
            </button>
            <button
              type="button"
              className={styles["skip"]}
              onClick={async () => {
                await setValue('false');
                onSubmit('false');
              }}
            >
              No
            </button>
          </div>
        );

      case 'multi_select':
        return (
          <div className="Select-Wrap">
            <SearchOutlined />
            <Select
              mode="multiple"
              showSearch
              placeholder="Add a condition"
              optionFilterProp="children"
              onChange={onChange}
              onSearch={onSearch}
              filterOption={(input, option) =>
                (option!.children as unknown as string)
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
            >
              {children}
            </Select>
            <RightOutlined />
          </div>
        );
      case 'select_one':
        return (
          <Radio.Group
            className="Question-Options"
            onChange={(e) => {
              console.log('here');
              const index = question.options.indexOf(e.target.value);
              setValue(index);
            }}
          >
            {question.options.map((item: any, index: number) => (
              <>
                <Radio.Button
                  className={`Question-Option${index}`}
                  value={item}
                  key={item}
                >
                  {item}
                </Radio.Button>
                {index % 2 !== 0 && <br />}
              </>
            ))}
          </Radio.Group>
        );
      case 'select_many':
        return (
          <div className="ant-radio-group ant-radio-group-outline Question-Options">
            {question.options.map((item: any, index: number) => (
              <label
                className={`ant-radio-button-wrapper Option${index} ${
                  isChecked(item) ? 'ant-radio-button-wrapper-checked' : ''
                } `}
                key={index}
              >
                <span className={`ant-radio-button`}>
                  <input
                    type="radio"
                    className="ant-radio-button-input"
                    value={item}
                    onClick={() => handleClick(item)}
                  />
                  <span className="ant-radio-button-inner"></span>
                </span>
                <span>{item}</span>
              </label>
            ))}
          </div>
        );
      case 'slider':
        return (
        <div className="Question-Slider-Vertical">
          {/* <div className={styles["Slider-Vertical"]}> */}
            <span className={styles["Text1"]}>{question.lower_qualifier}</span>
            <Slider
              className="Slider"
              vertical
              tipFormatter={formatter}
              min={question.lower_value}
              max={question.upper_value}
              step={question.step_value}
              tooltipVisible={question.show_values}
              onChange={(value) => {
                setValue(value);
                setDisableNextButton(false);
              }}
            />
            <span className={styles["Text2"]}>{question.upper_qualifier}</span>
          </div>
        );
      case 'free_text':
        return (
          <div>
            <TextArea
              className="TextArea"
              rows={6}
              placeholder="Enter answer here…"
              maxLength={500}
              onChange={(e) => {
                setValue(e.target.value);
              }}
            />
          </div>
        );
      case 'numeric':
        return (
          <Input
            className="NumberInput"
            placeholder="Enter a number"
            type="number"
            onChange={(e) => {
              setValue(e.target.value);
            }}
          />
        );
      default:
        return <h2></h2>;
    }
  }, [question?.q_str, question?.type, question?.options]);

  return (
    <>
      <div className={` ${styles["Question"]} ${styles["Question-grp"]} `}>
      {/* <div className="Question Question-grp"> */}
        <h3 className={ ` ${styles["Question-title"]} ${styles["Question-heading"]} `}>
        {/* <h3 className="Question-title Question-heading"> */}
          {question?.q_str}
          {question?.h_str &&
              <Tooltip
                title={question?.h_str}
                placement="bottomRight"
                overlayStyle={{marginRight:'10px'}}
                color="blue"
                mouseLeaveDelay={0}
              >
            <AiOutlineQuestionCircle size={30} className={styles['question-help']} />  
          </Tooltip>
          }
          </h3>
        <br />
        <InputField />
      </div>
    </>
  );
};

export default Question;
