import React from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

import AuthenticationLayout from '../../layouts/authentication-layout/AuthenticationLayout';
import Button from '../../components/Button';
import InputField from '../../components/Input';
import './index.scss';
import { signUpService } from '../../services/authservice'

type IFormInputs = {
    name: string,
    email: string,
    phone: string,
    password: string,
    confirmPassword: string,
  };

const SignUp = () => {
    const navigate = useNavigate()

    const schema = yup.object({
        name: yup.string().required('Name is required'),
        email: yup.string().email('Email is invalid').required('Email is required'),
        phone: yup.string()
            .required('Phone is required')
            .matches(new RegExp(/^((\+0?1\s)?)\(?\d{3}\)?[\s.\s]\d{3}[\s.-]\d{4}$/g), "Phone must be in (999) 999-9999 format"),
        password: yup.string().required('Password is required')
            .min(8)
            .matches(
                /^(?=.*?[#?!@$%^&*-])/,
               'Need one special character',
            ),
        confirmPassword: yup.string()
            .required('Confirmation Password is required')
            .oneOf([yup.ref('password')], 'Your Passwords do not match.'),
    }).required();

    const { register, handleSubmit, formState: { errors } } = useForm<IFormInputs>({
        mode: 'onChange',
        resolver: yupResolver(schema)
    });

    const onSubmit: SubmitHandler<IFormInputs> = (data) => {
        signUpService(data);
        navigate("/verify")
    }

    return (
        <AuthenticationLayout caption="Sign Up Here">
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
                    <InputField
                        id="phone"
                        {...register('phone')}
                        placeholder="Phone: (999) 999-9999"
                        type="text"
                        className="inputField"

                    />
                    <p className="SingUnForm-error">{errors.phone?.message}</p>
                </div>
                <div>
                    <InputField
                        id="password"
                        {...register('password')}
                        placeholder="Password"
                        type="password"
                        className="inputField"
                    />
                    <p className="SingUnForm-error">{errors.password?.message}</p>
                </div>
                <div>
                    <InputField
                        id="confirmPassword"
                        {...register('confirmPassword')}
                        placeholder="Confirm Password"
                        type="password"
                        className="inputField"
                    />
                    <p className="SingUnForm-error">{errors.confirmPassword?.message}</p>
                </div>
                <Button
                    size="lg"
                    onClick={handleSubmit(onSubmit)}
                >
                    Sign Up
                </Button>
                <Link
                  to="/login"
                  className="kt-link kt-login__link-forgot"
                >
                    Already have an account?
                </Link>
            </form>
        </AuthenticationLayout>
    )
}

export default SignUp
