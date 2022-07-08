import React, { useCallback } from 'react'
import { DatePicker, TimePicker } from 'antd'
import { Slider } from 'antd'
import type { SliderMarks } from 'antd/lib/slider'
import { Select } from 'antd'
const { Option } = Select
import './index.scss'

interface Props {
    question: any
    onSubmit: any
    setValue: any
}

const Question = ({ question, setValue, onSubmit }: Props) => {
    const formatter = (value: number | undefined) => `${value}`
    const marks: SliderMarks = {}
    marks[parseInt(question?.lower_value)] = `${question?.lower_value}`
    marks[parseInt(question?.upper_value)] = `${question?.upper_value}`

    const getdefaultValues = () => {
        const defaultArray = []
        let j = 0
        while (question?.defaults?.length > j) {
            defaultArray.push(question.options[question.defaults[j]])
            j++
        }
        return defaultArray
    }

    const children: React.ReactNode[] = []
    let i = 0
    while (question?.options?.length > i) {
        children.push(
            <Option key={question?.options[i]}>{question?.options[i]}</Option>
        )
        i++
    }
    const InputField = useCallback(() => {
        switch (question?.type) {
            case 'time':
                return (
                    <div>
                        <TimePicker
                            format={'h:mm'}
                            use12Hours
                            onChange={(time, timeString) => {
                                setValue(timeString)
                            }}
                        />
                    </div>
                )
            case 'date':
                return (
                    <div>
                        <DatePicker
                            onChange={(date: any, dateString: any) =>
                                setValue(dateString)
                            }
                        />
                    </div>
                )
            case 'yes_no':
                return (
                    <div className="align-center">
                        <button
                            className="but"
                            type="button"
                            onClick={() => {
                                setValue('true')
                                onSubmit()
                            }}
                        >
                            Yes
                        </button>
                        <button
                            type="button"
                            className="but"
                            onClick={() => {
                                setValue('false')
                                onSubmit()
                            }}
                        >
                            No
                        </button>
                    </div>
                )
            case 'multi_select':
                return (
                    <Select
                        mode="multiple"
                        allowClear
                        style={{ width: '100%' }}
                        defaultValue={getdefaultValues()}
                        placeholder="Please select"
                        onChange={(value) => {
                            let i = 0
                            const indexArray = []
                            while (value.length > i) {
                                const index = question.options.indexOf(value[i])
                                indexArray.push(index)
                                i++
                            }
                            setValue(indexArray)
                        }}
                    >
                        {children}
                    </Select>
                )

            case 'select_one':
                return (
                    <div>
                        <Select
                            allowClear
                            style={{ width: '100%' }}
                            placeholder="Please select"
                            onChange={(value) => {
                                const index = question.options.indexOf(value)
                                setValue(index)
                            }}
                        >
                            {children}
                        </Select>
                    </div>
                )
            case 'slider':
                return (
                    <div>
                        <Slider
                            tipFormatter={formatter}
                            min={question.lower_value}
                            max={question.upper_value}
                            step={question.step_value}
                            marks={marks}
                            onChange={(value) => {
                                setValue(value)
                            }}
                        />
                    </div>
                )
            case 'free_text':
                return (
                    <div>
                        <input
                            style={{ width: '100%' }}
                            onChange={(e) => {
                                setValue(e.target.value)
                            }}
                        ></input>
                    </div>
                )

            default:
                return <h2></h2>
        }
    }, [question?.q_str, question?.type])

    return (
        <div style={{ textAlign: 'center' }}>
            <div>
                <div className="question">{question?.q_str}</div>
                <br />
                <InputField />
            </div>
        </div>
    )
}

export default Question
