import React, { useState, useEffect } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import { Slider } from 'antd'
import * as yup from 'yup'
import './index.scss'
import InputField from '../../components/Input'
import AuthenticationLayout from '../../layouts/authentication-layout/AuthenticationLayout'
import Button from '../../components/Button'
import { preferencesService } from '../../services/authservice'
import { toast } from 'react-toastify'

type IFormInputs = {
    minutesPerWeek: number
    timeOfDay: string[]
}
const Preferences = () => {
    const userId = localStorage.getItem('userId')
    const navigate = useNavigate()
    const [time, setTime] = useState(0)
    const [isLoading, setIsLoading] = useState(false)
    const [isDisabled, setIsDisabled] = useState(false)
    useEffect(() => {
        checkPreferences()
    }, [])
    const checkPreferences = async () => {
        //will get preferences and set their
    }

    const marks = {
        3: 3,
        15: 15,
    }

    const schema = yup
        .object({
            // minutesPerWeek: yup
            //     .number()
            //     .required('Minutes Per Week is required')
            //     .positive()
            //     .min(1),
            timeOfDay: yup
                .array()
                .min(1, 'Please Select atleast One Option')
                .required('required'),
        })
        .required()
    const {
        register,
        handleSubmit,
        // reset,
        formState: { errors },
    } = useForm<IFormInputs>({
        mode: 'onChange',
        resolver: yupResolver(schema),
    })

    const onSubmit: SubmitHandler<IFormInputs> = async (data) => {
        const prefereceData = {
            preferences: {
                minutes_per_week: time,
                time_of_day: data.timeOfDay,
            },
        }
        setIsLoading(true)
        setIsDisabled(true)
        const preferencesResponse = await preferencesService(
            prefereceData,
            userId
        )
        if (preferencesResponse?.response?.data) {
            setIsLoading(false)
            setIsDisabled(false)
            toast.error(preferencesResponse?.response?.data?.message)
        } else {
            setIsLoading(false)
            setIsDisabled(false)
            toast.success('You have submitted Preferences successfully')
            handleRedirect()
        }
    }

    const handleRedirect = () => {
        navigate(`/questionnaire`)
    }

    const timeOfDay = ['Morning', 'Afternoon', 'Evenings']
    return (
        <AuthenticationLayout caption="Engagement Preferences">
            <p className="intro">
                Your health assistant will get to know you over time by asking
                <br />
                questions every week. These settings help your health assistant
                <br />
                communicate with you around your own schedule.
            </p>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="Preferences-form"
            >
                <div>
                    <div className="question">
                        How many minutes per week would you dedicate to
                        answering your health assistant questions?
                    </div>
                    <br />
                    <label>
                        {/* <InputField
                            id="minutesPerWeek"
                            {...register('minutesPerWeek', { required: true })}
                            placeholder="Minutes Per Week"
                            type="number"
                            className="inputField mt-1"
                            defaultValue={0}
                            style={{
                                width: 'max-content',
                                marginRight: '10px',
                            }}
                        /> */}
                        <Slider
                            id="minutesPerWeek"
                            {...register('minutesPerWeek', { required: true })}
                            value={time}
                            min={3}
                            max={15}
                            marks={marks}
                            onChange={(value) => {
                                setTime(value)
                            }}
                        />
                        Minutes
                    </label>
                    <p className="Preferences-form-error">
                        {errors.minutesPerWeek?.message}
                    </p>
                </div>

                <div>
                    <div className="question">
                        What are your preferred times to be contacted? [select
                        all that apply]
                    </div>
                    <br />
                    <ul
                        className="no-bullets"
                        {...register('timeOfDay', {
                            required: true,
                        })}
                    >
                        {timeOfDay.map((c, i) => (
                            <li key={`${i}`}>
                                <label>
                                    <InputField
                                        key={i}
                                        id={`${c}`}
                                        {...register('timeOfDay', {
                                            required: true,
                                        })}
                                        value={c}
                                        //placeholder="Minutes Per Week"
                                        type="checkbox"
                                        className="checkbox"
                                    />
                                    {c}
                                </label>
                            </li>
                        ))}
                    </ul>
                    <br />

                    <p className="Preferences-form-error">
                        {errors?.timeOfDay &&
                            'Please Select Atleast One Option'}
                    </p>
                </div>

                {/* <div>
                    <div className="question">Do you want to get reminded?</div>
                    <br />
                    <ul className="no-bullets">
                        <li>
                            <label>
                                <InputField
                                    id="reminMe"
                                    name="remindMe"
                                    type="radio"
                                    className="checkbox"
                                    value="true"
                                />
                                Yes
                            </label>
                        </li>
                        <li>
                            <label>
                                <InputField
                                    id="reminMe"
                                    name="remindMe"
                                    type="radio"
                                    className="checkbox"
                                    value="false"
                                />
                                No
                            </label>
                        </li>
                    </ul>
                    <br />
                </div> */}
                <Button
                    className="mt-3"
                    size="lg"
                    loading={isLoading}
                    disabled={isDisabled}
                    onClick={handleSubmit(onSubmit)}
                >
                    Proceed
                </Button>
            </form>
        </AuthenticationLayout>
    )
}

export default Preferences
