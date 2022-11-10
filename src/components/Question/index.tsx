import React, { HtmlHTMLAttributes, useCallback, useEffect, useState } from 'react';
import { DatePicker, Input, Radio, Tooltip } from 'antd';
import { Slider } from 'antd';
import type { SliderMarks } from 'antd/lib/slider';
import { RightOutlined, SearchOutlined } from '@ant-design/icons';
import { Select, Spin } from 'antd';
const { Option } = Select;
import './index.scss';
import TextArea from 'antd/lib/input/TextArea';
import { Timepicker } from 'react-timepicker';
import 'react-timepicker/timepicker.css';
import { AiFillQuestionCircle, AiOutlineQuestionCircle } from 'react-icons/ai';
import { validateSignUp } from '../../services/authservice';
import { setDefaultResultOrder } from 'dns';

interface Props {
  items:any;
  setItems:any;
  selectedValue:any;
  question: any;
  onSubmit: any;
  setValue: any;
  setDisableNextButton: any;
}

const Question = ({
  selectedValue,
  question,
  setValue,
  onSubmit,
  setDisableNextButton,
  items,
  setItems,
}: Props) => {
  const labelRef = React.useRef<HTMLLabelElement>(null);
  let radioOptions: string[] = [];
  if(question && question.type==='select_many'){
    radioOptions=[...question.defaults]
  }
  const formatter = (value: number | undefined) => `${value}`;
  let defaults:any=[]
  const removeclass=(item:any)=>{
    const el = document.querySelector<HTMLLabelElement>(`#label-${item}`);
    if(el){
      el.classList.remove('ant-radio-button-wrapper-checked')
    }
  }
  if (question && question.type === 'multi_select') {
    if(question.defaults){
      defaults= question.defaults.map(function(key:any) {return question.options[key];});
    }
  } 
  const onChange = (value: Array<string>) => {
    let i = 0;
    const indexArray = [];
      while (value.length > i) {
        const index = question.options.indexOf(value[i]);
        indexArray.push(index);
        i++;
      }
      setValue(indexArray);
      setItems(value);
  };
  const onTimeChange = (hours: any, minutes: any) => {
    setValue(`${hours}:${minutes ? minutes : '00'}:00.648052`);
  };

  const handleClick = (item: string) => {
    const index = question.options.indexOf(item);
    if (radioOptions.includes(index)) {
      const newArr = radioOptions.filter((item) => item !== index);
      radioOptions = [...newArr];
      removeclass(item);
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
    // else
    return false;
  };

  useEffect(() => {
    if (question.type === 'slider') {
      const marks: SliderMarks = {};

      marks[parseInt(question?.lower_value)] = `${question?.lower_qualifier}`;
      marks[parseInt(question?.upper_value)] = `${question?.upper_qualifier}`;

    }
    if (question && question.type === 'multi_select' || question.type === 'select_many'){
      setValue([...question.defaults]);
      setItems([...defaults]);
    }
  }, [question]);

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
          <div className="align-center">
            <button
              className="next"
              type="button"
              onClick={async () => {
                await setValue('true');
                onSubmit('true');
              }}
            >
              Yes
            </button>
            <button className="submit" 
              onClick={async () => {
                await setValue('false');
                onSubmit('false');
              }}>
              No
            </button>
          </div>
        );
      case 'select_one':
        return (
          <Radio.Group
            className="Options"
            onChange={(e) => {
              const index = question.options.indexOf(e.target.value);
              setValue(index);
            }}
          >
            {question.options.map((item: any, index: number) => (
              <>
                <Radio.Button
                  className={`Option${index}`}
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
          <div className="ant-radio-group ant-radio-group-outline Options">
            {question.options.map((item: any, index: number) => (
              <label
                ref={labelRef}
                id={`label-${item}`}
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
          <div className="Slider-Vertical">
            <span className="Text1">{question.lower_qualifier}</span>
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
            <span className="Text2">{question.upper_qualifier}</span>
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
  }, [question?.q_str, question?.type, question?.options, question?.defaults]);
  return (
    <>
      <div className="Question Question-grp">
        {question && 
        <>
        <h3 className="Question-title Question-heading">
        {question.q_str}
        {question.h_str &&
            <Tooltip
              title={question?.h_str}
              placement="bottomRight"
              overlayStyle={{marginRight:'10px'}}
              color="blue"
              mouseLeaveDelay={0}
            >
          <AiOutlineQuestionCircle size={30} className='question-help'/>  
        </Tooltip>
        }
        </h3>
      <br />
        {question.type === 'multi_select'?
          <div className="Select-Wrap">
              <SearchOutlined className="search" />
              <Select
                value={items}
                mode="multiple"
                showSearch
                placeholder="Add a condition"
                optionFilterProp="children"
                onChange={onChange}
                filterOption={(input, option) =>
                  (option!.children as unknown as string)
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
              >
                {question?.options.map((item:any, index:any)=>{
                  return <Option key={question?.options[index]}
                    value={question?.options[index]}
                    disabled={selectedValue && 
                      question?.defaults && question?.defaults?.length>  question.max_num_selections?
                      true
                      :
                      selectedValue && selectedValue.length === question.max_num_selections
                      ? selectedValue.includes(index)?false:true:false}
                    >
                    {item}
                  </Option>
                })}       
              </Select>
              <RightOutlined />
          </div>
          :<InputField />
        }
      </>
      }
      </div>
    </>
  );
};

export default Question;
