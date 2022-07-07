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

    const timeOfDay = ['Morning', 'Afternoon', 'Evening']
    return (
        <Layout defaultHeader={true} hamburger={false}>
            <div className="Content-wrap Pref">
                <h2 className="Pref-title">Preferences</h2>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    //className="Preferences-form"
                >
                    <div className="Question">
                        <h3 className="Question-title">
                            Check-in preferred time of day:
                        </h3>
                        <p>[select all that apply]</p>
                        <br />
                        <ul
                            className="no-bullets"
                            {...register('timeOfDay', {
                                required: true,
                            })}
                        >
                            {timeOfDay.map((c, i) => (
                                <li key={`${i}`} className="Pref-checkbox">
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
                                'Please select at least one option.'}
                        </p>
                    </div>
                    <div>
                        <div className="question">
                            How many minutes per week would you dedicate to
                            answering your health assistant questions?
                        </div>
                        <br />
                        <label>
                            <Slider
                                id="minutesPerWeek"
                                {...register('minutesPerWeek', {
                                    required: true,
                                })}
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
                    <Button
                        className="mt-2"
                        size="lg"
                        loading={isLoading}
                        disabled={isDisabled}
                        onClick={handleSubmit(onSubmit)}
                    >
                        Proceed
                    </Button>
                </form>
            </div>
        </Layout>
    )
}

export default Preferences
