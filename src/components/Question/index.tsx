import React, { useCallback } from 'react'
import moment from 'moment'
import { TimePicker } from 'antd'
interface Props {
    type: string | undefined
    q_str: string | undefined
    // questionValue: string
    setQuestionValue: any
}

const mapArray = [
    {
        dummydata: 'dummy',
    },
]
const Question = ({ type, q_str, setQuestionValue }: Props) => {
    const InputField = useCallback(() => {
        switch (type) {
            case 'time':
                return (
                    <div>
                        <div className="question">{q_str}</div>
                        <br />
                        <>
                            <TimePicker
                                format={'h:mm'}
                                use12Hours
                                onChange={(time, timeString) => {
                                    setQuestionValue(timeString)
                                }}
                            />
                        </>
                        <br />
                    </div>
                )
            default:
                return <h2>Cannot determine input field</h2>
        }
    }, [q_str, type])

    ;() => {
        switch (type) {
            case 'time':
                return (
                    <div>
                        <div className="question">{q_str}</div>
                        <br />
                        <>
                            <TimePicker
                                format={'h:mm'}
                                use12Hours
                                onChange={(time, timeString) => {
                                    setQuestionValue(timeString)
                                }}
                            />
                        </>
                        <br />
                    </div>
                )
            default:
                return <h2>Cannot determine input field</h2>
        }
    }
    return (
        <div style={{ textAlign: 'center' }}>
            <InputField />
        </div>
    )
}

export default Question
