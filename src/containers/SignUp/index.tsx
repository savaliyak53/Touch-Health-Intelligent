import React, { useState, useEffect } from 'react'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
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
import MaskedInput from 'react-text-mask'

type IFormInputs = {
    name: string
    email: string
    phone: string
    password: string
    confirmPassword: string
}

const SignUp = () => {
    const navigate = useNavigate()
    const [passwordShown, setPasswordShown] = useState(false)
    const [confirmPasswordShown, setConfirmPasswordShown] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [isDisabled, setIsDisabled] = useState(false)
    const schema = yup
        .object()
        .shape({
            name: yup.string().required('Name is required.'),
            email: yup
                .string()
                .email('Email is invalid.')
                .required('Email is required.'),
            phone: yup.string().required('Phone number is required.'),
            // .matches(
            //     new RegExp(
            //         /^((\+0?1\s)?)\(?\d{3}\)?[\s.\s]\d{3}[\s]\d{4}$/g
            //     ),
            //     'Phone must be in 1XXXXXXXXX format'
            // ),
            password: yup
                .string()
                .required('Password is required.')
                .min(8, 'Password must be at least 8 characters.')
                .matches(/^(?=.*?[#?!@$%^&*-])/, 'Need one special character.'),
            confirmPassword: yup
                .string()
                .required('Password confirmation is required.')
                .oneOf([yup.ref('password')], 'Your passwords do not match.'),
        })
        .required()

    const {
        register,
        handleSubmit,
        reset,
        control,
        formState: { errors },
    } = useForm<IFormInputs>({
        mode: 'onChange',
        resolver: yupResolver(schema),
    })
    const onSubmit: SubmitHandler<IFormInputs> = async (data) => {
        setIsLoading(true)
        setIsDisabled(true)
        const signUpResponse = await signUpService(data)
        if (signUpResponse?.id) {
            reset()
            setIsDisabled(false)
            setIsLoading(false)
            toast.success('You have signed up successfully')
            localStorage.setItem('userId', signUpResponse.id)
            navigate(`/verification-message/${signUpResponse.id}`)
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

    return (
        <AuthenticationLayout caption="Sign up Here">
            <form onSubmit={handleSubmit(onSubmit)} className="SingUnForm-form">
                <div>
                    <InputField
                        id="name"
                        {...register('name', { required: true })}
                        placeholder="Name"
                        type="text"
                        className="inputField"
                    />
                    <p className="SingUnForm-error">{errors.name?.message}</p>
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
                    <Controller
                        control={control}
                        name="phone"
                        render={({ field: { onChange, onBlur } }) => (
                            <MaskedInput
                                mask={[
                                    /[1]/,
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
                                id="phone"
                                placeholder="Phone: XXXXXXXXXX"
                                type="text"
                                {...register('phone')}
                                className="inputField"
                                guide={false}
                                onChange={onChange}
                                onBlur={onBlur}
                            />
                        )}
                    />
                    <p className="SingUnForm-error">{errors.phone?.message}</p>
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
