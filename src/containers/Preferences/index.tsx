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
    const checkPreferences = async () => {}

    const marks = {
        3: 3,
        15: 15,
    }

    const schema = yup
        .object({
            timeOfDay: yup
                .array()
                .min(1, 'Please Select at least one option')
                .required('required'),
        })
        .required()
    const {
        register,
        handleSubmit,
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
        navigate(`/introvideo`)
    }

    const timeOfDay = ['Morning', 'Afternoon', 'Evening']
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
                        <br />
                        {errors?.timeOfDay &&
                            'Please select at least one option'}
                    </p>
                </div>
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
