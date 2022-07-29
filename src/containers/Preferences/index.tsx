import React, { useState, useEffect } from 'react'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import { Slider } from 'antd'
import * as yup from 'yup'
import './index.scss'
import InputField from '../../components/Input'
import Button from '../../components/Button'
import { preferencesService } from '../../services/authservice'
import { toast } from 'react-toastify'
import Layout from '../../layouts/Layout/Layout'
import type { RadioChangeEvent } from 'antd'
import { Radio, Space, DatePicker } from 'antd'
import moment from 'moment'

type IFormInputs = {
    minutesPerWeek: number
    timeOfDay: string[]
    yob: number
    sex: string
}
const Preferences = () => {
    const userId = localStorage.getItem('userId')
    const navigate = useNavigate()
    const [time, setTime] = useState(3)
    const [isLoading, setIsLoading] = useState(false)
    const [isDisabled, setIsDisabled] = useState(false)
    const [checked, setChecked] = useState<string[]>([])
    const [value, setValue] = useState('')

    const schema = yup
        .object({
            timeOfDay: yup
                .array()
                .min(1, 'Please Select at least one option')
                .required('required'),
            yob: yup.mixed().required('Year of birth is required.'),
        })
        .required()
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<IFormInputs>({
        mode: 'onChange',
        resolver: yupResolver(schema),
    })
    const onChangeRadio = (e: RadioChangeEvent) => {
        setValue(e.target.value)
    }

    const onSubmit: SubmitHandler<IFormInputs> = async (data) => {
        const prefereceData = {
            sex: value,
            yob: parseInt(moment(data.yob).format('YYYY')),
            preferences: {
                minutes_per_week: time ?? 3,
                time_of_day: data.timeOfDay,
            },
        }
        console.log('preference data', prefereceData)
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
    const handleOnChange = (e: any, value: string) => {
        if (e.target.checked) {
            setChecked([...checked, value])
        } else {
            setChecked(checked.filter((item) => item !== value))
        }
    }
    const isChecked = (value: any) => {
        if (checked.includes(value)) {
            return true
        }
        return false
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
                        <div
                            className="no-bullets"
                            {...register('timeOfDay', {
                                required: true,
                            })}
                        >
                            {timeOfDay.map((c, i) => (
                                <div key={`${i}`}>
                                    <label className="ant-checkbox-wrapper Pref-checkbox">
                                        <span
                                            className={`ant-checkbox ${
                                                isChecked(c)
                                                    ? 'ant-checkbox-checked'
                                                    : ''
                                            }`}
                                        >
                                            <InputField
                                                key={i}
                                                id={`${c}`}
                                                {...register('timeOfDay', {
                                                    required: true,
                                                })}
                                                value={c}
                                                type="checkbox"
                                                className="ant-checkbox-input"
                                                onChange={(e: any) =>
                                                    handleOnChange(e, c)
                                                }
                                            />

                                            <span className="ant-checkbox-inner"></span>
                                        </span>
                                        <span> {c}</span>
                                    </label>
                                    <br />
                                </div>
                            ))}
                        </div>
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
                            onChange={(value) => {
                                setTime(value)
                            }}
                            defaultValue={3}
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
                    <div className="Question">
                        <h3 className="Question-title">
                            What is your year of birth?
                        </h3>
                        <Controller
                            control={control}
                            name="yob"
                            render={({
                                field: { onChange, onBlur, value, name, ref },
                            }) => (
                                <DatePicker
                                    {...register('yob', {
                                        required: true,
                                    })}
                                    onChange={onChange}
                                    picker="year"
                                    format="YYYY"
                                />
                            )}
                        />

                        <p className="Preferences-form-error">
                            {errors.yob?.message}
                        </p>
                    </div>
                    <div className="Question">
                        <h3 className="Question-title">What is your gender?</h3>

                        <Radio.Group
                            value={value}
                            {...register('sex', {
                                required: true,
                            })}
                            onChange={onChangeRadio}
                        >
                            <Space direction="vertical">
                                <Radio value="male">Male</Radio>
                                <Radio value="female">Female</Radio>
                                <Radio value="x">Better not to say</Radio>
                            </Space>
                        </Radio.Group>

                        <p className="Preferences-form-error">
                            {errors.sex?.message}
                        </p>
                    </div>
                    <Button
                        className="Pref-btn btn"
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
