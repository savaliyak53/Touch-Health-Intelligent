import React, { useCallback, useState } from 'react'
import { DatePicker, Radio, TimePicker } from 'antd'
import { Slider } from 'antd'
import type { SliderMarks } from 'antd/lib/slider'
import { RightOutlined, SearchOutlined } from '@ant-design/icons'
import { Select, Spin } from 'antd'
const { Option } = Select
import './index.scss'
import TextArea from 'antd/lib/input/TextArea'
import type { SelectProps } from 'antd/es/select'

interface Props {
    question: any
    onSubmit: any
    setValue: any
}

const Question = ({ question, setValue, onSubmit }: Props) => {
    let radioOptions: string[] = []
    const formatter = (value: number | undefined) => `${value}`
    const marks: SliderMarks = {}
    const [search, setSearch] = useState<string>()
    marks[parseInt(question?.lower_value)] = `${question?.lower_value}`
    marks[parseInt(question?.upper_value)] = `${question?.upper_value}`
    const onChange = (value: Array<string>) => {
        let i = 0
        const indexArray = []
        while (value.length > i) {
            const index = question.options.indexOf(value[i])
            indexArray.push(index)
            i++
        }
        setValue(indexArray)
    }
    const onSearch = (value: string) => {
        setSearch(value)
        console.log('search:', value)
    }

    const children: React.ReactNode[] = []
    let i = 0
    while (question?.options?.length > i) {
        children.push(
            <Option key={question?.options[i]}>{question?.options[i]}</Option>
        )
        i++
    }
    const handleClick = (item: string) => {
        const index = question.options.indexOf(item)
        if (radioOptions.includes(index)) {
            const newArr = radioOptions.filter((item) => item !== index)
            radioOptions = [...newArr]
        } else {
            radioOptions = [...radioOptions, index]
        }
        console.log(radioOptions)
        setValue(radioOptions)
    }
    const isChecked = (item: string) => {
        const index = question.options.indexOf(item)
        if (radioOptions.includes(index)) {
            return true
        }
        return false
    }
    const InputField = useCallback(() => {
        switch (question?.type) {
            case 'time':
                return (
                    <TimePicker
                        className="Date-Select"
                        format={'h:mm'}
                        use12Hours
                        onChange={(time, timeString) => {
                            setValue(timeString)
                        }}
                    />
                )
            case 'date':
                return (
                    <DatePicker
                        onChange={(date: any, dateString: any) =>
                            setValue(dateString)
                        }
                        className="Date-Select"
                    />
                )
            case 'yes_no':
                return (
                    <div className="align-center">
                        <button
                            className="next"
                            type="button"
                            onClick={async () => {
                                await setValue('true')
                                onSubmit('true')
                            }}
                        >
                            Yes
                        </button>
                        <button
                            type="button"
                            className="skip"
                            onClick={async () => {
                                await setValue('false')
                                onSubmit('false')
                            }}
                        >
                            No
                        </button>
                    </div>
                )

            case 'multi_select':
                return (
                    <div className="Select-Wrap">
                        <SearchOutlined className="search" />
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
                )
            case 'select_one':
                return (
                    <Radio.Group
                        className="Options"
                        onChange={(e) => {
                            const index = question.options.indexOf(
                                e.target.value
                            )
                            setValue(index)
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
                )
            case 'select_many':
                return (
                    <div className="ant-radio-group ant-radio-group-outline Options">
                        {question.options.map((item: any, index: number) => (
                            <>
                                <label
                                    className={`ant-radio-button-wrapper Option${index} ${
                                        isChecked(item)
                                            ? 'ant-radio-button-wrapper-checked'
                                            : ''
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
                                {index % 2 !== 0 && <br />}
                            </>
                        ))}
                    </div>
                )
            case 'slider':
                return (
                    <div className="Slider-Vertical">
                        <span className="Text1">No pain</span>
                        <Slider
                            className="Slider"
                            vertical
                            tipFormatter={formatter}
                            min={question.lower_value}
                            max={question.upper_value}
                            step={question.step_value}
                            tooltipVisible={true}
                            //marks={marks}
                            onChange={(value) => {
                                setValue(value)
                            }}
                        />
                        <span className="Text2">Worst it’s been</span>
                    </div>
                )
            case 'free_text':
                return (
                    <div>
                        <TextArea
                            className="TextArea"
                            rows={6}
                            placeholder="Enter answer here…"
                            maxLength={500}
                            onChange={(e) => {
                                setValue(e.target.value)
                            }}
                        />
                    </div>
                )

            default:
                return <h2></h2>
        }
    }, [question?.q_str, question?.type])

    return (
        <>
            <div className="Question">
                <h3 className="Question-title">{question?.q_str}</h3>

                <br />
                <InputField />
            </div>
        </>
    )
}

export default Question
