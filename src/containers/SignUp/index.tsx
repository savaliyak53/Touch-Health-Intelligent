import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { requestPhoneOTP } from '../../services/authservice'
import { toast } from 'react-toastify'
import AuthenticationLayout from '../../layouts/authentication-layout/AuthenticationLayout'
import Button from '../../components/Button'
import './index.scss'
import { signUpService } from '../../services/authservice'
import { AiOutlineEye } from 'react-icons/ai'

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
        <AuthenticationLayout caption="Sign up Here">
            <form onSubmit={handleSubmit(onSubmit)} className="SingUnForm-form">
                <div>
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
                        className="inputField"
                    />
                    <p className="SingUnForm-error">
                        {errors.first_name?.message}
                    </p>
                </div>
                <div>
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
                        className="inputField"
                    />
                    <p className="SingUnForm-error">
                        {errors.last_name?.message}
                    </p>
                </div>

                <div>
                    <div className="flag">
                        <img
                            src={`../../assets/images/Canadian_Flag.png`}
                            alt="Canadian Flag"
                            className="Input-flag"
                        />
                        +1
                    </div>
                    <input
                        id="phone"
                        type="tel"
                        className="Input"
                        placeholder="Enter phone number here"
                        {...register('phone', {
                            required: 'Phone is required',
                            pattern: {
                                value: /^[0-9]*$/,
                                message: 'Please enter a valid phone number.',
                            },
                            maxLength: {
                                value: 10,
                                message: 'Phone should be maximum 10 digits.',
                            },
                            minLength: {
                                value: 10,
                                message: 'Phone requires at least 10 digits.',
                            },
                        })}
                    />
                    <p className="SingUnForm-error">{errors.phone?.message}</p>
                </div>
                <div>
                    <div className="flag">
                        <img
                            src={`../../assets/images/Canadian_Flag.png`}
                            alt="Canadian Flag"
                            className="Input-flag"
                        />
                        +1
                    </div>
                    <input
                        id="confirmPhone"
                        placeholder="Confirm your phone number here"
                        type="tel"
                        className="Input"
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
                    <p className="SingUnForm-error">
                        {getValues('phone') !== getValues('confirmPhone') &&
                            errors.confirmPhone?.message}
                    </p>
                </div>
                <div>
                    <input
                        id="password"
                        placeholder="Enter password here"
                        type={passwordShown ? 'text' : 'password'}
                        className="inputField"
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
                    <button
                        className="btn"
                        onClick={togglePassword}
                        type="button"
                    >
                        <AiOutlineEye />
                    </button>
                    <p className="SingUnForm-error">
                        {errors.password?.message}
                    </p>
                </div>
                <div>
                    <input
                        id="confirmPassword"
                        placeholder="Confirm password here"
                        type={confirmPasswordShown ? 'text' : 'password'}
                        className="inputField"
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
                    <button
                        className="btn"
                        onClick={toggleConfirmPassword}
                        type="button"
                    >
                        <AiOutlineEye />
                    </button>
                    <p className="SingUnForm-error">
                        {getValues('password') !==
                            getValues('confirmPassword') &&
                            errors.confirmPassword?.message}
                    </p>
                </div>
                <Button
                    size="lg"
                    onClick={handleSubmit(onSubmit)}
                    loading={isLoading}
                    disabled={isDisabled}
                >
                    Sign up
                </Button>
                <Link to="/login" className="kt-link kt-login__link-forgot">
                    Already have an account?
                </Link>
            </form>
        </AuthenticationLayout>
    )
}

export default SignUp
