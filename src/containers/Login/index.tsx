import React, { useState, useEffect } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

import Button from '../../components/Button'
import InputField from '../../components/Input'
import Layout from '../../Mobile/Layout/Layout'
import './Auth.scss'
import { getUser, loginService } from '../../services/authservice'
import jwt from 'jwt-decode'

type IFormInputs = {
    username: string
    password: string
}

type User = {
    exp: string
    iat: string
    id: string
}

const Login = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [isDisabled, setIsDisabled] = useState(false)
    const [passwordShown, setPasswordShown] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            navigate(`/preferences`)
        }
    }, [])
    const schema = yup
        .object({
            username: yup.string().required('Phone is required.'),
            password: yup.string().required('Password is required.'),
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

    const getId = (token: string) => {
        const user: User = jwt(token)
        return user.id
    }

    const onSubmit: SubmitHandler<IFormInputs> = async (data) => {
        setIsLoading(true)
        setIsDisabled(true)
        const loginResponse = await loginService(data)
        if (loginResponse?.token) {
            reset()
            setIsDisabled(false)
            setIsLoading(false)
            localStorage.setItem('token', `${loginResponse.token}`)
            const userId = getId(loginResponse.token)
            localStorage.setItem('userId', userId)
            // toast.success('You have logged in successfully.')
            getUserInfo(userId)
        } else {
            setIsDisabled(false)
            setIsLoading(false)
            toast.error(loginResponse?.response?.data?.details)
        }
    }

    const togglePassword = () => {
        setPasswordShown(!passwordShown)
    }

    const getUserInfo = (userId: string) => {
        getUser(userId)
            .then((response: any) => {
                if (response.data.preferences) {
                    navigate('/questionnaire')
                } else {
                    navigate('/preferences')
                }
            })
            .catch((error) => {
                console.log(
                    'error occurred while getting user interaction ',
                    error
                )
            })
    }

    return (
        <Layout defaultHeader={false} hamburger={false}>
            <div className="Auth-wrap">
                <form onSubmit={handleSubmit(onSubmit)} className="Auth-form">
                    <h2 className="Auth-title">Touch Health Assistant Login</h2>

                    <InputField
                        id="username"
                        {...register('username', { required: true })}
                        placeholder="Phone"
                        type="text"
                        className="app-Input"
                    />
                    <div className="Auth-forgot-wrap">
                        <p className="Auth-forgot">
                            {errors.username?.message}
                        </p>
                    </div>

                    <InputField
                        id="password"
                        {...register('password')}
                        placeholder="Password"
                        type={passwordShown ? 'text' : 'password'}
                        className="app-Input"
                        isEye={true}
                        togglePassword={togglePassword}
                    />
                    <div className="Auth-forgot-wrap">
                        <p className="Auth-forgot">
                            {errors.password?.message}
                        </p>
                    </div>

                    <Button
                        //size="lg"
                        className="Auth-submit"
                        onClick={handleSubmit(onSubmit)}
                        loading={isLoading}
                        disabled={isDisabled}
                    >
                        Login
                    </Button>
                    <div className="Auth-forgot-wrap">
                        <Link to="/signup" className="Auth-signup">
                            Create an Account?
                        </Link>
                    </div>
                </form>
            </div>
        </Layout>
    )
}

export default Login
