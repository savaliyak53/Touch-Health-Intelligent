import React from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import "yup-phone";

import AuthenticationLayout from '../../layouts/authentication-layout/AuthenticationLayout';
import Button from '../../components/Button';
import InputField from '../../components/Input';
import './index.scss';

type IFormInputs = {
    name: string,
    email: string,
    phone: string,
    password: string,
    confirmPassword: string,
  };

const SignUp = () => {

    const schema = yup.object({
        name: yup.string().required('Name is required'),
        email: yup.string().email('Email is invalid').required('Email is required'),
        phone: yup.string()
            .phone('DE')
            .required('Phone is required'),
        password: yup.string().required('Password is required'),
        confirmPassword: yup.string()
            .required('Confirmation Password is required')
            .oneOf([yup.ref('newPassword')], 'Your Passwords do not match.'),
    }).required();

    const { register, handleSubmit, formState: { errors } } = useForm<IFormInputs>({
        resolver: yupResolver(schema)
    });

    const onSubmit: SubmitHandler<IFormInputs> = data => console.log(data);

    return (
        <AuthenticationLayout caption="Sign Up Here">
            <form onSubmit={handleSubmit(onSubmit)} className="SingUnForm-form">
                <div>
                    <InputField
                        id="name"
                        {...register('name', { required: true })}
                        placeholder="Name"
                        type="text"
                    />
                    <p className="SingUnForm-error">{errors.name?.message}</p>
                </div>
                <div>
                    <InputField
                        id="email"
                        {...register('email', { required: true })}
                        placeholder="Email"
                        type="email"
                    />
                    <p className="SingUnForm-error">{errors.email?.message}</p>
                </div>
                <div>
                    <InputField
                        id="phone"
                        {...register('phone', { required: true })}
                        placeholder="Phone: 999-999-9999"
                        type="text"
                    />
                    <p className="SingUnForm-error">{errors.phone?.message}</p>
                </div>
                <div>
                    <InputField
                        id="password"
                        {...register('password', { required: true })}
                        placeholder="Password"
                        type="password"
                    />
                    <p className="SingUnForm-error">{errors.password?.message}</p>
                </div>
                <div>
                    <InputField
                        id="confirmPassword"
                        {...register('confirmPassword', { required: true })}
                        placeholder="Confirm Password"
                        type="password"
                    />
                    <p className="SingUnForm-error">{errors.confirmPassword?.message}</p>
                </div>
                <Button
                    size="lg"
                    onClick={handleSubmit(onSubmit)}
                >
                    Sign Up
                </Button>
            </form>
        </AuthenticationLayout>
    )
}

export default SignUp
