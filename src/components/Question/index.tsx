import React, { useCallback } from 'react'
import moment from 'moment'
import { DatePicker, TimePicker } from 'antd'
interface Props {
    type: string | undefined
    q_str: string | undefined
    // questionValue: string
    setQuestionValue: any
}

const Question = ({ type, q_str, setQuestionValue }: Props) => {
    const InputField = useCallback(() => {
        switch (type) {
            case 'time':
                return (
                    <div>
                        <TimePicker
                            format={'h:mm'}
                            use12Hours
                            onChange={(time, timeString) => {
                                setQuestionValue(timeString)
                            }}
                        />
                    </div>
                )
            case 'date':
                return (
                    <div>
                        <DatePicker
                            onChange={(date: any, dateString: any) =>
                                setQuestionValue(dateString)
                            }
                        />
                    </div>
                )
            default:
                return <h2>Cannot determine input field</h2>
        }
    }, [q_str, type])

    return (
        <div style={{ textAlign: 'center' }}>
            <div>
                <div className="question">{q_str}</div>
                <br />
                <InputField />
            </div>
        </div>
    )
}

export default Question
