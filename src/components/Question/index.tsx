import React from 'react'
import moment from 'moment'
import { TimePicker } from 'antd'
interface Props {
    type: string | undefined
    q_str: string | undefined
    questionValue: string
    control: any
    setQuestionValue: any
    register: any
    errors: any
}

const mapArray = [
    {
        dummydata: 'dummy',
    },
]
const Question = ({
    type,
    q_str,
    control,
    register,
    errors,
    questionValue,
    setQuestionValue,
}: Props) => {
    return (
        <>
            {mapArray.map((obj) => {
                switch (type) {
                    case 'time':
                        return (
                            <div>
                                <div className="question">{q_str}</div>
                                <br />
                                <>
                                    <TimePicker
                                        defaultValue={moment(
                                            new Date(),
                                            'h:mm'
                                        )}
                                        format={'h:mm'}
                                        use12Hours
                                        onChange={(time, timeString) => {
                                            setQuestionValue(timeString)
                                        }}
                                    />
                                    {/* <LocalizationProvider
                                        dateAdapter={AdapterDateFns}
                                    >
                                        <TimePicker
                                            value={value}
                                            onChange={(newValue) => {
                                                setValue(newValue)
                                            }}
                                            renderInput={(params) => (
                                                <TextField {...params} />
                                            )}
                                        />
                                    </LocalizationProvider> */}
                                </>
                                <br />
                                {errors.questionnaire && (
                                    <p className="Questionnaire-error">
                                        This field is required
                                    </p>
                                )}
                            </div>
                        )
                }
            })}
        </>
    )
}

export default Question
