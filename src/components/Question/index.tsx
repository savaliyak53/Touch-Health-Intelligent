import React from 'react'
import TextField from '@mui/material/TextField'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { TimePicker } from '@mui/x-date-pickers/TimePicker'

interface Props {
    type: string | undefined
    q_str: string | undefined
    value: string | undefined
    control: any
    setValue: any
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
    value,
    setValue,
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
                                    <LocalizationProvider
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
                                    </LocalizationProvider>
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
