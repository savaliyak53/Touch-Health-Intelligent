import React, { useState, useEffect } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import AuthenticationLayout from '../../layouts/authentication-layout/AuthenticationLayout'
import Button from '../../components/Button'
import InputField from '../../components/Input'
import './index.scss'
import {
    getInteractionService,
    getUser,
    loginService,
} from '../../services/authservice'
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
            const userId = localStorage.getItem('userId')
            getUserInfo(userId)
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

    const getId = (token: any) => {
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
    const getInteraction = async () => {
        //resolve the service using promise
        //TODO(<HamzaIjaz>): Refactor all the API calls like this
        getInteractionService()
            .then((response) => {
                alert('hello?')
                if (
                    response?.data?.reward_nugget.congratulations_str ===
                    'Thanks for answering 10 questions!'
                ) {
                    navigate('/dashboard')
                } else {
                    navigate('/questionnaire')
                }
            })
            .catch(() => {
                toast('unkown error')
            })
    }
    const getUserInfo = (userId: string | null | undefined) => {
        getUser(userId)
            .then((response: any) => {
                if (response.data.preferences) {
                    getInteraction()
                } else {
                    navigate('/dashboard')
                }
            })
            .catch(() => {
                toast('Unknown error')
            })
    }

    return (
        <AuthenticationLayout caption="Login Here">
            <form
                onSubmit={() => handleSubmit(onSubmit)}
                className="LoginForm-form"
            >
                <div>
                    <InputField
                        id="username"
                        {...register('username', { required: true })}
                        placeholder="Phone"
                        type="text"
                        className="inputField"
                    />
                    <p className="LoginForm-error">
                        {errors.username?.message}
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
                    <p className="LoginForm-error">
                        {errors.password?.message}
                    </p>
                </div>
                <Button
                    size="lg"
                    onClick={handleSubmit(onSubmit)}
                    loading={isLoading}
                >
                    Login
                </Button>
                <Link to="/signup" className="kt-link kt-login__link-forgot">
                    Create an Account?
                </Link>
            </form>
        </AuthenticationLayout>
    )
}

export default Login
