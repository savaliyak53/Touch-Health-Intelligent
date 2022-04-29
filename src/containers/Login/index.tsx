import React, {useState} from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Link } from "react-router-dom";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { toast } from 'react-toastify';

import AuthenticationLayout from '../../layouts/authentication-layout/AuthenticationLayout';
import Button from '../../components/Button';
import InputField from '../../components/Input';
import './index.scss';
import { loginService } from '../../services/authservice'

type IFormInputs = {
    email: string,
    password: string
  };

const Login = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [isDisabled, setIsDisabled] = useState(false);

    const schema = yup.object({
        email: yup.string().required('Email or Phone is required'),
        password: yup.string().required('Password is required'),
    }).required();

    const { register, handleSubmit, reset, formState: { errors } } = useForm<IFormInputs>({
        mode: 'onChange',
        resolver: yupResolver(schema)
    });

    const onSubmit: SubmitHandler<IFormInputs> = async (data) => {
        setIsLoading(true);
        setIsDisabled(true);
        const loginResponse = await loginService(data);

        if(loginResponse?.response?.data) {
            setIsDisabled(false);
            setIsLoading(false);
            toast.error(loginResponse?.response?.data?.detail)
        }
        else {
            reset();
            setIsDisabled(false);
            setIsLoading(false);
            toast.success("You have login successfully")
        }
    }

    return (
        <AuthenticationLayout caption="Login Here">
            <form onSubmit={handleSubmit(onSubmit)} className="LoginForm-form">
                <div>
                    <InputField
                        id="email"
                        {...register('email', { required: true })}
                        placeholder="Email or Phone"
                        type="text"
                        className="inputField"

                    />
                    <p className="LoginForm-error">{errors.email?.message}</p>
                </div>
                <div>
                    <InputField
                        id="password"
                        {...register('password')}
                        placeholder="Password"
                        type="password"
                        className="inputField"
                    />
                    <p className="LoginForm-error">{errors.password?.message}</p>
                </div>
                <Button
                    size="lg"
                    onClick={handleSubmit(onSubmit)}
                    loading={isLoading}
                    disabled={isDisabled}
                >
                    Login
                </Button>
                <Link
                  to="/signup"
                  className="kt-link kt-login__link-forgot"
                >
                    Create an Account?
                </Link>
            </form>
        </AuthenticationLayout>
    )
}

export default Login;
