import React, { useCallback, useEffect, useState } from 'react';
import { Tooltip } from 'antd';
import type { SliderMarks } from 'antd/lib/slider';
import { SearchOutlined } from '@ant-design/icons';
import { Select } from 'antd';
const { Option } = Select;
import styles from './Question.module.scss';
import { AiOutlineQuestionCircle } from 'react-icons/ai';
import moment from 'moment';
import Date from './questions/Date';
import YesNo from './questions/YesNo';
import SelectOne from './questions/SelectOne';
import DialogSelectOne from './questions/DialogSelectOne';
import ImageAndtext from './questions/ImageAndtext';
import ImageAndTextSelectOne from './questions/ImageAndTextSelectOne';
import SelectMany from './questions/SelectMany';
import SliderComponent from './questions/Slider';
import Text from './questions/Text';
import MarkdownSelectOne from './questions/MarkdownSelectOne';
import Numeric from './questions/Numeric';
import ScrollableTime from './questions/ScrollableTime';

interface Props {
  items: any;
  setItems: any;
  selectedValue: any;
  question: any;
  onSubmit: any;
  setValue: any;
  setDisableNextButton: any;
  disable: boolean;
  value: any;
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
  value,
}: Props) => {
  const [maxNum, setMaxNum] = useState(0);
  const [defaultLength, setDefaultLength] = useState(0);

  const labelRef = React.useRef<HTMLLabelElement>(null);
  let radioOptions: any[] = [];
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
        return question?.options[key];
      });
    }
  }
  const onChange = (value: Array<string>) => {
    let i = 0;
    const indexArray = [];
    while (value.length > i) {
      const index = question?.options.indexOf(value[i]);
      indexArray.push(index);
      i++;
    }
    setValue(indexArray);
    setItems(value);
  };
  const onScrollableTimeChange = (timeString: any) => {
    const time = moment(timeString, 'hh:mm A');
    const formattedTime = time.format('H:mm:00.648052');
    setValue(formattedTime);
  };

  const handleClick = (index: number) => {
    if (radioOptions.includes(index)) {
      const newArr = radioOptions.filter((i) => i !== index);
      radioOptions = [...newArr];
      removeclass(index);
    } else {
      radioOptions = [...radioOptions, index];
    }
    setValue(radioOptions.length ? radioOptions : []);
  };

  const isChecked = (index: number) => {
    //we are getting in this form defaults=[0,1]
    if (radioOptions.includes(index)) {
      return true;
    }
    return false;
  };
  const setDisableDate = (current: moment.Moment) => {
    if (question.range == 'future_only') {
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
    window.scrollTo(0, 0);
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
    setMaxNum(Math.min(question.max_num_selections, question.options?.length));
    if (question?.type === 'multi_select') {
      if (
        question.defaults &&
        question.defaults.length > question.max_num_selections
      ) {
        setDefaultLength(
          Math.min(question.max_num_selections, question.options.length)
        );
      } else {
        setDefaultLength(question.defaults.length);
      }
    }
  }, [selectedValue]);

  const disableBtn = () => {
    setDisableNextButton(true);
  };

  useEffect(() => {
    if (disable) {
      onSubmit(value);
      handleButtonClick();
    }
  }, [disable]);

  const InputField = useCallback(() => {
    switch (question?.type) {
      case 'time':
        return <ScrollableTime onTimeChange={onScrollableTimeChange} />;
      case 'date':
        return <Date setValue={setValue} setDisableDate={setDisableDate} />;
      case 'yes_no':
        return <YesNo setValue={setValue} onSubmit={onSubmit} />;
      case 'select_one':
        return <SelectOne question={question} setValue={setValue} />;
      case 'dialog_select_one':
        return (
          <DialogSelectOne
            value={value}
            setValue={setValue}
            onSubmit={onSubmit}
            question={question}
          />
        );
      case 'image_and_text':
        return <ImageAndtext question={question} />;

      case 'image_and_text_select_one':
        return (
          <ImageAndTextSelectOne
            question={question}
            setValue={setValue}
            onSubmit={onSubmit}
          />
        );

      case 'select_many':
        return (
          <SelectMany
            question={question}
            isChecked={isChecked}
            handleClick={handleClick}
            labelRef={labelRef}
            value={radioOptions}
          />
        );
      case 'slider':
        return (
          <SliderComponent
            question={question}
            formatter={formatter}
            setValue={setValue}
          />
        );
      case 'free_text':
        return <Text setValue={setValue} rows={6} maxLength={500} />;
      case 'markdown_select_one':
        return (
          <MarkdownSelectOne
            question={question}
            setValue={setValue}
            onSubmit={onSubmit}
          />
        );
      case 'numeric':
        return <Numeric setValue={setValue} />;
      default:
        return <h2></h2>;
    }
  }, [question?.q_str, question?.type, question?.options, question?.defaults]);

  return (
    <>
      <div className={` ${styles['Question']} ${styles['Question-grp']} `}>
        {question && (
          <>
            <h3 className="Description">
              <div
                className="Text-wrapper"
              >
                <div
                  className="text-[18px] text-primary-delft-dark leading-[26px] font-['tilt_warp'] text-center max-w-[381px] m-auto"
                >
                  {question.q_str}
                </div>
              </div>
            </h3>
            
            <div className="Question-Description text-center max-w-[316px] m-auto text-[14px] mt-1">
              {question.h_str}
            </div>
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
