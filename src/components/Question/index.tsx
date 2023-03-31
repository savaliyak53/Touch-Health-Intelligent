import React, {
  HtmlHTMLAttributes,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { useNavigate } from "react-router-dom";
import { Button, DatePicker, Input, Radio, Tooltip } from 'antd';
import { Slider } from 'antd';
import type { SliderMarks } from 'antd/lib/slider';
import { RightOutlined, SearchOutlined } from '@ant-design/icons';
import { Select, Spin } from 'antd';
import goal_styles from './IntroGoals.module.scss';
const { Option } = Select;
// import './index.scss';
import styles from './Question.module.scss';
import TextArea from 'antd/lib/input/TextArea';
import { Timepicker } from 'react-timepicker';
import 'react-timepicker/timepicker.css';
import { AiFillQuestionCircle, AiOutlineQuestionCircle } from 'react-icons/ai';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import moment from 'moment';
import v from '../../variables.module.scss';

interface Props {
  items: any;
  setItems: any;
  selectedValue: any;
  question: any;
  onSubmit: any;
  setValue: any;
  setDisableNextButton: any;
  disable: boolean;
  value: any
}

const Question = ({
  selectedValue,
  question,
  setValue,
  onSubmit,
  setDisableNextButton,
  items,
  setItems,
  disable,
  value
}: Props) => {
  const [maxNum, setMaxNum] = useState(0);
  const [defaultLength, setDefaultLength] = useState(0);
  const navigate = useNavigate();

  const labelRef = React.useRef<HTMLLabelElement>(null);
  let radioOptions: string[] = [];
  if (question && question.type === 'select_many') {
    radioOptions = [...question.defaults];
  }
  const formatter = (value: number | undefined) => `${value}`;
  let defaults: any = [];
  const removeclass = (item: any) => {
    const el = document.querySelector<HTMLLabelElement>(`label-${item}`);
    if (el) {
      el.classList.remove('ant-radio-button-wrapper-checked');
    }
  };
  if (question && question.type === 'multi_select') {
    if (question.defaults) {
      defaults = question.defaults.map(function (key: any) {
        return question.options[key];
      });
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

  const handleClick = (index:number) => {
    const index_string = index.toString();
    if (radioOptions.includes(index_string)) {
      const newArr = radioOptions.filter((i) => i !== index_string);
      radioOptions = [...newArr];
      removeclass(index_string);
    } else {   
      radioOptions = [...radioOptions, index_string];
    }
    setValue(radioOptions.length ? radioOptions : []);
  };
 
  const isChecked = (index: number) => {
    if (radioOptions.includes(index.toString())) {
      return true;
    }
    // else
    return false;
  };
  const setDisableDate = (current: moment.Moment) => {
    if (question.range == 'future_only') {
      console.log('return date', current.isBefore(moment()));
      return current.isBefore(moment().subtract(1, 'day'));
    } else if (question.range == 'past_only') {
      return current.isAfter(moment());
    } else {
      return false;
    }
  };

  const handleButtonClick = () => {
    (document.querySelector('#yesbtn') as HTMLButtonElement).disabled = true;
    (document.querySelector('#nobtn') as HTMLButtonElement).disabled = true;
  };
  useEffect(() => {
    if (question.type === 'slider') {
      const marks: SliderMarks = {};

      marks[parseInt(question?.lower_value)] = `${question?.lower_qualifier}`;
      marks[parseInt(question?.upper_value)] = `${question?.upper_qualifier}`;
    }
    if (
      (question && question.type === 'multi_select') ||
      question.type === 'select_many'
    ) {
      setValue([...question.defaults]);
      setItems([...defaults]);
    }
  }, [question]);
  useEffect(() => {
    setMaxNum(question.max_num_selections);
    if (question?.type === 'multi_select') {
      if (
        question.defaults &&
        question.defaults.length > question.max_num_selections
      ) {
        setDefaultLength(question.max_num_selections);
      } else {
        setDefaultLength(question.defaults.length);
      }
    }
  }, [selectedValue]);
  const disableBtn = () => {
    setDisableNextButton(true)
  }
  useEffect(() => {
    if(disable){
      onSubmit(value)
      handleButtonClick()
    }
  }, [disable])
  const InputField = useCallback(() => {
    switch (question?.type) {
      case 'time':
        return (
          <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
            <Timepicker
              onChange={onTimeChange}
              militaryTime={true}
              radius={100}
            />
          </div>

        );
      case 'date':
        return (
          <DatePicker
            onChange={(date: any, dateString: any) => setValue(dateString)}
            className="Date-Select"
            disabledDate={(current) => setDisableDate(current)}
          />
        );
      case 'yes_no':
        return (
          <div className={styles['align-center']}>
            <button
              className={styles['no-btn']}
              onClick={(e) => {
                e.currentTarget.style.backgroundColor = v['primary-color2'];
                e.currentTarget.style.color = '#fff';
                disableBtn()
                setValue('false')
              }}
              disabled={disable}   
              id='nobtn'
            >
              No
            </button>
            <button
              className={styles['yes-btn']}
              onClick={(e) => {
                e.currentTarget.style.backgroundColor = v['primary-color2'];
                e.currentTarget.style.color = '#fff';
                disableBtn()
                setValue('true')
              }}
              disabled={disable}
              id='yesbtn'
            >
              Yes
            </button>
          </div>
        );
      case 'select_one':
        return (
          <Radio.Group
            className="Question-Options"
            onChange={(e) => {
              const index = question.options.indexOf(e.target.value);
              setValue(index);
            }}
          >
            {question.options.map((item: any, index: number) => (
              <>
                <Radio.Button
                  className={`Question-Option${index}`}
                  value={item}
                  key={index}
                >
                  {item}
                </Radio.Button>
                {index % 2 !== 0 && <br />}
              </>
            ))}
          </Radio.Group>
        );
      case 'dialog_select_one':
        return (
          <Radio.Group
            className="Question-Options"
            onChange={(e) => {
              const index = question.options.indexOf(e.target.value);
              setValue(index);
              onSubmit(index);
            }}
          >
            {question.options.map((item: any, index: number) => (
              <>
                <Radio.Button
                  className={styles['dialog-btn']}
                  value={item}
                  key={index}
                >
                  {item}
                </Radio.Button>
                {index % 2 !== 0 && <br />}
              </>
            ))}
          </Radio.Group>
        );
      case 'image_and_text':
        return (
          <div className={goal_styles['IntroGoals']}>
            <h2 className={goal_styles['Title']}>{question.title}</h2>
            <p className={goal_styles['Description']}>{question.sub_title}</p>
            <img
              src={question.image}
              className={goal_styles['Image']}
              alt="Image"
            />
          </div>
        );

      case 'image_and_text_select_one':
        return (
          <div className={goal_styles['IntroGoals']}>
            <h2 className={goal_styles['Title']}>{question.title}</h2>
            <p className={goal_styles['Description']}>{question.sub_title}</p>
            <img
              src={question.image}
              className={goal_styles['Image']}
              alt="Image"
            />
            <Radio.Group
              className="Question-Options"
              onChange={(e) => {
                const index = question.options.indexOf(e.target.value);
                setValue(index);
                onSubmit(index);
              }}
            >
              {question.options.map((item: any, index: number) => (
                <>
                  <Radio.Button
                    className={`Question-Option${index}`}
                    value={item}
                    key={index}
                  >
                    {item}
                  </Radio.Button>
                  {index % 2 !== 0 && <br />}
                </>
              ))}
            </Radio.Group>
          </div>
        );

      case 'select_many':
        return (
          <div className="ant-radio-group ant-radio-group-outline Question-Options">
            {question.options.map((item: any, index: number) => (
              <label
                ref={labelRef}
                id={`label-${index}`}
                className={`ant-radio-button-wrapper Option${index} ${
                  isChecked(index) ? 'ant-radio-button-wrapper-checked' : ''
                } `}
                key={index}
              >
                <span className={`ant-radio-button`}>
                  <input
                    type="radio"
                    className="ant-radio-button-input"
                    value={item}
                    onClick={() => handleClick(index)}
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
            <span className={styles['Text1']}>{question.lower_qualifier}</span>
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
              }}
            />
            <span className={styles['Text2']}>{question.upper_qualifier}</span>
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
      case 'markdown_select_one':
        return (
          <div className={goal_styles['IntroGoals']}>
           {question.title &&  <h2 className={goal_styles['Title']}>{question.title}</h2>}
            <div className={goal_styles['markdown-desc']}>
              <ReactMarkdown rehypePlugins={[rehypeRaw]}>
                {question.body_md}
              </ReactMarkdown>
            </div>
            <Radio.Group
              className="Question-Options"
              onChange={(e) => {
                const index = question.options.indexOf(e.target.value);
                setValue(index);
                onSubmit(index);
              }}
            >
              {question.options.map((item: any, index: number) => (
                <>
                  <Radio.Button
                    className={`Question-Option${index}`}
                    value={item}
                    key={index}
                  >
                    {item}
                  </Radio.Button>
                  {index % 2 !== 0 && <br />}
                </>
              ))}
            </Radio.Group>
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
      <div className={` ${styles['Question']} ${styles['Question-grp']} `}>
        {question && (
          <>
            <h3
              className={` ${styles['Question-title']} ${styles['Question-heading']} `}
            >
              {question.q_str}
              {question.h_str && (
                <Tooltip
                  title={question?.h_str}
                  placement="bottomRight"
                  overlayStyle={{ marginRight: '10px' }}
                  color="blue"
                  mouseLeaveDelay={0}
                >
                  <AiOutlineQuestionCircle
                    size={30}
                    className="question-help"
                  />
                </Tooltip>
              )}
            </h3>
            <br />
            {question.type === 'multi_select' ? (
              <div className="Select-Wrap">
                <SearchOutlined className="search" />
                <Select
                  value={items}
                  mode="multiple"
                  showSearch
                  placeholder=""
                  optionFilterProp="children"
                  onChange={onChange}
                  filterOption={(input, option) =>
                    (option!.children as unknown as string)
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                >
                  {question?.options.map((item: any, index: any) => {
                    return (
                      <Option
                        className="Question-Options"
                        key={question?.options[index]}
                        value={question?.options[index]}
                        disabled={
                          selectedValue &&
                          question?.defaults &&
                          defaultLength > maxNum
                            ? question.defaults.includes(index)
                              ? false
                              : true
                            : selectedValue &&
                              selectedValue.length >=
                                question.max_num_selections
                            ? selectedValue.includes(index)
                              ? false
                              : true
                            : false
                        }
                      >
                        {item}
                      </Option>
                    );
                  })}
                </Select>
                {/* <RightOutlined /> */}
              </div>
            ) : (
              <InputField />
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Question;
