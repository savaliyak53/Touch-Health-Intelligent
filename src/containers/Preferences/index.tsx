import React, { useState, useEffect } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import { Checkbox, Slider } from 'antd'
import * as yup from 'yup'
import './index.scss'
import InputField from '../../components/Input'
import AuthenticationLayout from '../../layouts/authentication-layout/AuthenticationLayout'
import Button from '../../components/Button'
import { preferencesService } from '../../services/authservice'
import { toast } from 'react-toastify'
import Layout from '../../layouts/Layout/Layout'

type IFormInputs = {
    minutesPerWeek: number
    timeOfDay: string[]
}
const Preferences = () => {
    const userId = localStorage.getItem('userId')
    const navigate = useNavigate()
    const [time, setTime] = useState(3)
    const [isLoading, setIsLoading] = useState(false)
    const [isDisabled, setIsDisabled] = useState(false)

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
                minutes_per_week: time ?? 3,
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

    const timeOfDay = [
        'Morning (7 am to 11:59 am)',
        'Mid-day (12 pm to 5.59 pm)',
        'Evening (6 pm - 9 pm)',
    ]
    const handleOnChange = () => {
        console.log('hey')
    }
    return (
        <Layout defaultHeader={true} hamburger={false}>
            <div className="Content-wrap Pref">
                <h2 className="Pref-title">Preferences</h2>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="Preferences-form"
                >
                    <div className="Question">
                        <h3 className="Question-title">
                            Check-in preferred time of day:
                        </h3>
                        {timeOfDay.map((c, i) => (
                            <>
                                <Checkbox
                                    key={i}
                                    id={`${c}`}
                                    {...register('timeOfDay', {
                                        required: true,
                                    })}
                                    className="Pref-checkbox"
                                    onChange={handleOnChange}
                                >
                                    {c}
                                </Checkbox>
                                <br />
                            </>
                        ))}

                        <p className="Preferences-form-error">
                            {errors?.timeOfDay &&
                                'Please select at least one option.'}
                        </p>
                    </div>
                    <div className="Question">
                        <h3 className="Question-title">
                            How much time do you have for check-ins each week?
                        </h3>

                        <Slider
                            className="Pref-slider"
                            id="minutesPerWeek"
                            {...register('minutesPerWeek', {
                                required: true,
                            })}
                            value={time}
                            min={3}
                            max={15}
                            //marks={marks}
                            onChange={(value) => {
                                setTime(value)
                            }}
                            defaultValue={3}
                            //tooltipVisible={false}
                        />
                        <div className="Slider-range">
                            <span>3 min</span>
                            <span></span>
                            <span>10 min</span>
                            <span>15 min</span>
                        </div>

                        <p className="Preferences-form-error">
                            {errors.minutesPerWeek?.message}
                        </p>
                    </div>
                    <Button
                        className="Pref-btn btn"
                        //size="lg"
                        loading={isLoading}
                        disabled={isDisabled}
                        onClick={handleSubmit(onSubmit)}
                    >
                        Save and Next
                    </Button>
                </form>
            </div>
        </Layout>
    )
}

export default Preferences
