import React, { useState, useEffect } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { toast } from 'react-toastify'
import AuthenticationLayout from '../../layouts/authentication-layout/AuthenticationLayout'
import Button from '../../components/Button'
import InputField from '../../components/Input'
import './index.scss'
import { signUpService } from '../../services/authservice'

type IFormInputs = {
    firstName: string
    lastName: string
    email: string
    phoneNumber: string
    password: string
    confirmPassword: string
}

const SignUp = () => {
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)
    const [isDisabled, setIsDisabled] = useState(false)
    useEffect(() => {
        const signUpResponse = localStorage.getItem('signUpResponse')
        if (signUpResponse) {
            if (localStorage.getItem('isVerified') == 'true') {
                navigate(`/preferences/${signUpResponse}`)
            } else {
                navigate(`/verify/${signUpResponse}`)
            }
        }
    }, [])
    const schema = yup
        .object({
            firstName: yup.string().required('First Name is required'),
            lastName: yup.string().required('Last Name is required'),
            email: yup
                .string()
                .email('Email is invalid')
                .required('Email is required'),
            phoneNumber: yup
                .string()
                .required('Phone Number is required')
                .matches(
                    new RegExp(
                        /^((\+0?1\s)?)\(?\d{3}\)?[\s.\s]\d{3}[\s.-]\d{4}$/g
                    ),
                    'Phone must be in (XXX) XXX-XXXX format'
                ),
            password: yup
                .string()
                .required('Password is required')
                .min(8)
                .matches(/^(?=.*?[#?!@$%^&*-])/, 'Need one special character'),
            confirmPassword: yup
                .string()
                .required('Confirmation Password is required')
                .oneOf([yup.ref('password')], 'Your Passwords do not match.'),
        })
        .required()

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<IFormInputs>({
        mode: 'onChange',
        resolver: yupResolver(schema),
    })

    const onSubmit: SubmitHandler<IFormInputs> = async (data) => {
        setIsLoading(true)
        setIsDisabled(true)
        const signUpResponse = await signUpService(data)
        if (signUpResponse?.response?.data) {
            setIsDisabled(false)
            setIsLoading(false)
            toast.error(signUpResponse?.response?.data?.detail)
        } else {
            reset()
            setIsDisabled(false)
            setIsLoading(false)
            toast.success('You have sign up successfully')
            localStorage.setItem('signUpResponse', `${signUpResponse.id}`)
            navigate(`/verify/${signUpResponse.id}`)
        }
    }

    return (
        <AuthenticationLayout caption="Sign up Here">
            <form onSubmit={handleSubmit(onSubmit)} className="SingUnForm-form">
                <div>
                    <InputField
                        id="firstName"
                        {...register('firstName', { required: true })}
                        placeholder="First Name"
                        type="text"
                        className="inputField"
                    />
                    <p className="SingUnForm-error">
                        {errors.firstName?.message}
                    </p>
                </div>
                <div>
                    <InputField
                        id="lastName"
                        {...register('lastName', { required: true })}
                        placeholder="Last Name"
                        type="text"
                        className="inputField"
                    />
                    <p className="SingUnForm-error">
                        {errors.lastName?.message}
                    </p>
                </div>
                <div>
                    <InputField
                        id="email"
                        {...register('email')}
                        placeholder="Email"
                        type="email"
                        className="inputField"
                    />
                    <p className="SingUnForm-error">{errors.email?.message}</p>
                </div>
                <div>
                    <InputField
                        id="phoneNumber"
                        {...register('phoneNumber')}
                        placeholder="Phone: (XXX) XXX-XXXX"
                        type="text"
                        className="inputField"
                    />
                    <p className="SingUnForm-error">
                        {errors.phoneNumber?.message}
                    </p>
                </div>
                <div>
                    <InputField
                        id="password"
                        {...register('password')}
                        placeholder="Password"
                        type="password"
                        className="inputField"
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
                        type="password"
                        className="inputField"
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
