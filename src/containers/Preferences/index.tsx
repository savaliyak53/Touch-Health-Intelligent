import React, { useState, useEffect } from 'react'
import 'antd/dist/antd.css'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useParams, useNavigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
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
    const { userId } = useParams()
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)
    const [isDisabled, setIsDisabled] = useState(false)
    useEffect(() => {
        checkPreferences()
    }, [])
    const checkPreferences = async () => {
        //will get preferences and set their
    }

    const schema = yup
        .object({
            minutesPerWeek: yup
                .number()
                .required('Minutes Per Week is required')
                .positive()
                .min(1),
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
                minutesPerWeek: data.minutesPerWeek,
                timeOfDay: data.timeOfDay,
                conditions: ['sleep', 'mood'],
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
            toast.error(preferencesResponse?.response?.data?.detail)
        } else {
            setIsLoading(false)
            setIsDisabled(false)
            toast.success('You have submitted Preferences successfully')
            handleRedirect()
        }
    }

const handleRedirect = () => {
            navigate(`/usercondition/${userId}`)
    }


    const timeOfDay = ['Morning', 'Afternoon', 'Evenings']
    return (
        <AuthenticationLayout caption="Preferences">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="Preferences-form"
            >
                <div>
                    <div className="question">
                        How many minutes do you want to invest in interacting
                        with tha every week?
                    </div>
                    <br />
                    <label>
                        <InputField
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
                        />
                        Minutes
                    </label>
                    <p className="Preferences-form-error">
                        {errors.minutesPerWeek?.message}
                    </p>
                </div>

                <div>
                    <div className="question">
                        What are your prefered Times?
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

                <div>
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
