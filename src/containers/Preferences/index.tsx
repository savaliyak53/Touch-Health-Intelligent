import React, { useState } from 'react'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { Slider } from 'antd'
import './index.scss'
import InputField from '../../components/Input'
import Button from '../../components/Button'
import { preferencesService } from '../../services/authservice'
import { toast } from 'react-toastify'
import Layout from '../../layouts/Layout/Layout'
import type { RadioChangeEvent } from 'antd'
import { Radio, Space, DatePicker } from 'antd'
import moment from 'moment'
import 'moment-timezone'

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

    const {
        register,
        handleSubmit,
        control,
        formState: { errors, isValid },
    } = useForm<IFormInputs>({
        mode: 'onChange',
    })

    const onSubmit: SubmitHandler<IFormInputs> = (data) => {
        const zoneVal = moment()
            .tz(Intl.DateTimeFormat().resolvedOptions().timeZone)
            .format('Z')
        const prefereceData = {
            sex: data.sex,
            yob: data.yob,
            preferences: {
                minutes_per_week: time ?? 3,
                preferred_engagement_slots: data.timeOfDay,
                timezone: zoneVal,
            },
        }
        setIsLoading(true)
        setIsDisabled(true)
        preferencesService(prefereceData, userId)
            .then((preferencesResponse) => {
                setIsLoading(false)
                setIsDisabled(false)
                toast.success('You have submitted Preferences successfully')
                handleRedirect()
            })
            .catch((error) => {
                setIsLoading(false)
                setIsDisabled(false)
                toast.error(
                    `${error.response?.data?.title} Please check values and try again.`
                )
            })
    }
    const handleRedirect = () => {
        navigate(`/introvideo`)
    }

    const timeOfDay = ['morning', 'afternoon', 'evening']
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
                        <Controller
                            control={control}
                            name="minutesPerWeek"
                            rules={{
                                required: 'Please Select a check-in value',
                            }}
                            defaultValue={3}
                            render={({ field: { onChange, value } }) => (
                                <>
                                    <Slider
                                        className="Pref-slider"
                                        id="minutesPerWeek"
                                        value={value}
                                        min={3}
                                        max={15}
                                        onChange={onChange}
                                        defaultValue={3}
                                    />
                                    <div className="Slider-range">
                                        <span>3 min</span>
                                        <span></span>
                                        <span>10 min</span>
                                        <span>15 min</span>
                                    </div>
                                </>
                            )}
                        />

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
                            rules={{
                                required: 'Please Select an year',
                                validate: (value) => {
                                    return value > 2006
                                        ? 'You must older than 16'
                                        : true
                                },
                            }}
                            render={({
                                field: { onChange, onBlur, value, name, ref },
                            }) => (
                                <DatePicker
                                    onChange={(
                                        selectedValue,
                                        selectedValueString
                                    ) => onChange(selectedValueString)}
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
                        <Controller
                            control={control}
                            name="sex"
                            rules={{ required: 'Please Select your gender' }}
                            render={({ field: { onChange, value } }) => (
                                <Radio.Group value={value} onChange={onChange}>
                                    <Space direction="vertical">
                                        <Radio value="male">Male</Radio>
                                        <Radio value="female">Female</Radio>
                                        <Radio value="x">
                                            Better not to say
                                        </Radio>
                                    </Space>
                                </Radio.Group>
                            )}
                        />

                        <p className="Preferences-form-error">
                            {errors.sex?.message}
                        </p>
                    </div>
                    <Button
                        className="Pref-btn btn"
                        loading={isLoading}
                        disabled={!isValid}
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
