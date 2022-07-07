import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { requestPhoneOTP } from '../../services/authservice'
import { toast } from 'react-toastify'
import Button from '../../components/Button'
import { signUpService } from '../../services/authservice'
import { AiOutlineEye } from 'react-icons/ai'
import Layout from '../../layouts/Layout/Layout'
import { Tooltip } from 'antd'
import './Auth.scss'
import InputMask from 'react-input-mask'
type IFormInputs = {
    first_name: string
    last_name: string
    phone: string
    confirmPhone: string
    password: string
    confirmPassword: string
}

const SignUp = () => {
    const navigate = useNavigate()
    const [passwordShown, setPasswordShown] = useState(false)
    const [confirmPasswordShown, setConfirmPasswordShown] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [isDisabled, setIsDisabled] = useState(false)

    const {
        register,
        handleSubmit,
        reset,
        getValues,
        formState: { errors },
    } = useForm<IFormInputs>({
        mode: 'all',
        reValidateMode: 'onBlur',
        shouldFocusError: true,
        shouldUnregister: false,
    })
    const onSubmit = async (data: any) => {
        setIsLoading(true)
        setIsDisabled(true)
        const signUpResponse = await signUpService({
            phone: '1' + data.phone,
            first_name: data.first_name,
            last_name: data.last_name,
            password: data.password,
        })
        if (signUpResponse?.id) {
            reset()
            setIsDisabled(false)
            setIsLoading(false)
            localStorage.setItem('userId', signUpResponse.id)
            const isOtpSent = await sendPhoneOTP()
            if (isOtpSent) {
                navigate(`/verification-message/${signUpResponse.id}`)
            }
        } else {
            setIsDisabled(false)
            setIsLoading(false)
            toast.error(signUpResponse?.response?.data?.details?.message)
        }
    }

    const togglePassword = () => {
        setPasswordShown(!passwordShown)
    }

    const toggleConfirmPassword = () => {
        setConfirmPasswordShown(!confirmPasswordShown)
    }

    const sendPhoneOTP = async () => {
        //api call to send email otp
        const userId = localStorage.getItem('userId')
        const phoneRequestResponse = await requestPhoneOTP(userId)
        if (phoneRequestResponse?.response?.data) {
            toast.error('Invalid Phone Number')
            return false
        } else {
            toast.success('You have signed up successfully')
            toast.success('Phone verification link sent')
            return true
        }
    }
    return (
        <Layout defaultHeader={false} hamburger={false}>
            <div className="Auth-wrap">
                <form onSubmit={handleSubmit(onSubmit)} className="Auth-form">
                    <h2 className="Auth-title">Sign up</h2>
                    <div className="input-element-wrapper">
                        <Tooltip
                            color="orange"
                            placement="bottomLeft"
                            title={errors.first_name?.message}
                            visible={errors.first_name ? true : false}
                        >
                            <input
                                id="first_name"
                                {...register('first_name', {
                                    required: 'First name is required.',
                                    maxLength: {
                                        value: 50,
                                        message:
                                            'First name can have maximum 50 characters.',
                                    },
                                })}
                                placeholder="First name"
                                type="text"
                                className="app-Input"
                            />
                        </Tooltip>
                    </div>
                    <div className="input-element-wrapper">
                        <Tooltip
                            color="orange"
                            placement="bottomLeft"
                            title={errors.last_name?.message}
                            visible={errors.last_name ? true : false}
                        >
                            <input
                                id="last_name"
                                {...register('last_name', {
                                    required: 'Last name is required.',
                                    maxLength: {
                                        value: 50,
                                        message:
                                            'Last name can have maximum 50 characters.',
                                    },
                                })}
                                placeholder="Last name"
                                type="text"
                                className="app-Input"
                            />
                        </Tooltip>
                    </div>

                    <div className="input-element-wrapper">
                        <div className="flag">
                            <img
                                src={`../../assets/images/Canadian_Flag.png`}
                                alt="Canadian Flag"
                                className="Input-flag"
                            />
                            +
                        </div>
                        <Tooltip
                            color="orange"
                            placement="bottomLeft"
                            title={errors.phone?.message}
                            visible={errors.phone ? true : false}
                        >
                            <InputMask
                                className="app-Input phone"
                                id="username"
                                placeholder="Enter phone number here"
                                type="text"
                                mask={[
                                    /\d/,
                                    /\d/,
                                    /\d/,
                                    /\d/,
                                    /\d/,
                                    /\d/,
                                    /\d/,
                                    /\d/,
                                    /\d/,
                                    /\d/,
                                    /\d/,
                                ]}
                                {...register('phone', {
                                    required: 'Phone is required',
                                    pattern: {
                                        value: /^[0-9]*$/,
                                        message:
                                            'Please enter a valid phone number.',
                                    },
                                })}
                            />
                        </Tooltip>
                    </div>
                    <div className="input-element-wrapper">
                        <div className="flag">
                            <img
                                src={`../../assets/images/Canadian_Flag.png`}
                                alt="Canadian Flag"
                                className="Input-flag"
                            />
                            +
                        </div>
                        <Tooltip
                            color="orange"
                            placement="bottomLeft"
                            title={errors.confirmPhone?.message}
                            visible={
                                getValues('phone') !==
                                    getValues('confirmPhone') &&
                                errors.confirmPhone
                                    ? true
                                    : false
                            }
                        >
                            <InputMask
                                className="app-Input phone"
                                id="confirmPhone"
                                placeholder="Confirm your phone number here"
                                type="text"
                                mask={[
                                    /\d/,
                                    /\d/,
                                    /\d/,
                                    /\d/,
                                    /\d/,
                                    /\d/,
                                    /\d/,
                                    /\d/,
                                    /\d/,
                                    /\d/,
                                    /\d/,
                                ]}
                                {...register('confirmPhone', {
                                    required: 'Phone confirmation is required.',
                                    validate: (value) => {
                                        return (
                                            value === getValues('phone') ||
                                            'Phone numbers do not match'
                                        )
                                    },
                                })}
                            />
                        </Tooltip>
                    </div>
                    <div className="input-element-wrapper-password">
                        <Tooltip
                            color="orange"
                            placement="bottomLeft"
                            title={errors.password?.message}
                            visible={errors.password ? true : false}
                        >
                            <input
                                id="password"
                                placeholder="Enter password here"
                                type={passwordShown ? 'text' : 'password'}
                                className="app-Input"
                                {...register('password', {
                                    required: 'Password is required',
                                    minLength: {
                                        value: 8,
                                        message:
                                            'Password should be of at least 8 characters.',
                                    },
                                    pattern: {
                                        value: /^(?=.*?[#?!@$%^&*-])/,
                                        message: 'Need a special character.',
                                    },
                                })}
                            />
                        </Tooltip>
                        <button
                            className="btn"
                            onClick={togglePassword}
                            type="button"
                        >
                            <AiOutlineEye />
                        </button>
                    </div>
                    <div className="input-element-wrapper-password">
                        <Tooltip
                            color="orange"
                            placement="bottomLeft"
                            title={errors.confirmPassword?.message}
                            visible={errors.confirmPassword ? true : false}
                        >
                            <input
                                id="confirmPassword"
                                placeholder="Confirm password here"
                                type={
                                    confirmPasswordShown ? 'text' : 'password'
                                }
                                className="app-Input"
                                {...register('confirmPassword', {
                                    required: 'Confirm password is required',
                                    validate: (value: string) => {
                                        return (
                                            value === getValues('password') ||
                                            'Passwords do not match.'
                                        )
                                    },
                                })}
                            />
                        </Tooltip>
                        <button
                            className="btn"
                            onClick={toggleConfirmPassword}
                            type="button"
                        >
                            <AiOutlineEye />
                        </button>
                    </div>
                    <Button
                        onClick={handleSubmit(onSubmit)}
                        loading={isLoading}
                        disabled={isDisabled}
                        className="Auth-submit"
                    >
                        Sign up
                    </Button>
                </form>
                <div className="Auth-terms">
                    <Link to="/login">Already have an account?</Link>
                </div>
            </div>
        </Layout>
    )
}

export default SignUp
