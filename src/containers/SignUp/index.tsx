import React, { useState, useEffect } from 'react'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { requestPhoneOTP } from '../../services/authservice'
import { toast } from 'react-toastify'
import AuthenticationLayout from '../../layouts/authentication-layout/AuthenticationLayout'
import Button from '../../components/Button'
import InputField from '../../components/Input'
import './index.scss'
import { signUpService } from '../../services/authservice'
import MaskedInput from 'react-text-mask'

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
    const [phoneLoading, setPhoneLoading] = useState<boolean>(false)
    const [passwordShown, setPasswordShown] = useState(false)
    const [confirmPasswordShown, setConfirmPasswordShown] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [isDisabled, setIsDisabled] = useState(false)
    const schema = yup
        .object()
        .shape({
            first_name: yup
                .string()
                .max(100, 'Max 100 characters')
                .required('First name  is required.'),
            last_name: yup
                .string()
                .max(100, 'Max 100 characters')
                .required('Last name is required.'),
            phone: yup
                .string()
                .required('Phone number is required.')
                .min(10, 'Phone number requires at least 10 digits')
                .max(10, 'Phone number requires maximum 10 digits'),
            confirmPhone: yup
                .string()
                .required('Phone confirmation is required.')
                .oneOf(
                    [yup.ref('phone'), null],
                    'Your phone numbers do not match.'
                ),
            password: yup
                .string()
                .required('Password is required.')
                .min(8, 'Password must be at least 8 characters.')
                .matches(/^(?=.*?[#?!@$%^&*-])/, 'Need one special character.'),
            confirmPassword: yup
                .string()
                .required('Password confirmation is required.')
                .oneOf(
                    [yup.ref('password'), null],
                    'Your passwords do not match.'
                ),
        })
        .required()

    const {
        register,
        handleSubmit,
        reset,
        control,
        getValues,
        formState: { errors },
    } = useForm<IFormInputs>({
        mode: 'onChange',
        resolver: yupResolver(schema),
    })
    const onSubmit: SubmitHandler<IFormInputs> = async (data) => {
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
            toast.error(signUpResponse?.response?.data?.error?.message)
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
        setPhoneLoading(true)
        const userId = localStorage.getItem('userId')
        const phoneRequestResponse = await requestPhoneOTP(userId)
        if (phoneRequestResponse?.response?.data) {
            setPhoneLoading(false)
            toast.error('Invalid Phone Number')
            return false
        } else {
            setPhoneLoading(false)
            toast.success('You have signed up successfully')
            toast.success('Phone verification link sent')
            return true
        }
    }

    return (
        <AuthenticationLayout caption="Sign up Here">
            <form onSubmit={handleSubmit(onSubmit)} className="SingUnForm-form">
                <div>
                    <InputField
                        id="first_name"
                        {...register('first_name', { required: true })}
                        placeholder="First name"
                        type="text"
                        className="inputField"
                    />
                    <p className="SingUnForm-error">
                        {errors.first_name?.message}
                    </p>
                </div>
                <div>
                    <InputField
                        id="last_name"
                        {...register('last_name', { required: true })}
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
                        type="text"
                        // name="phone"
                        className="Input"
                        placeholder="Enter phone number here"
                        {...register('phone', {
                            validate: {
                                required: (v) =>
                                    parseInt(v) == null ||
                                    'Phone number is requireddddddd',
                                lessThanTen: (v) =>
                                    parseInt(v) < 10 ||
                                    'should be lower than 10',
                            },
                        })}
                    />
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
                    <InputField
                        id="confirmPhone"
                        {...register('confirmPhone', { required: true })}
                        placeholder="Confirm your phone number here"
                        type="text"
                        className="Input"
                        {...register('phone', {
                            validate: (value) => {
                                if (value === getValues('confirmPhone')) {
                                    console.log('one two three')
                                }
                                return value === getValues('confirmPhone')
                            },
                        })}
                    />
                    <p className="SingUnForm-error">
                        {errors.confirmPhone?.message}
                    </p>
                </div>
                <div>
                    <InputField
                        id="password"
                        {...register('password')}
                        placeholder="Password"
                        type={passwordShown ? 'text' : 'password'}
                        className="inputField"
                        isEye={true}
                        togglePassword={togglePassword}
                    />
                    <p className="SingUnForm-error">
                        {errors.password?.message}
                    </p>
                </div>
                <div>
                    <InputField
                        id="confirmPassword"
                        {...register('confirmPassword')}
                        placeholder="Confirm Password"
                        type={confirmPasswordShown ? 'text' : 'password'}
                        className="inputField"
                        isEye={true}
                        togglePassword={toggleConfirmPassword}
                    />
                    <p className="SingUnForm-error">
                        {errors.confirmPassword?.message}
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
