import React from 'react'
import { useForm } from 'react-hook-form'
import {
    Spin
  } from 'antd';

import AuthenticationLayout from '../../layouts/authentication-layout/AuthenticationLayout';

const SignUp = () => {
    const { register, handleSubmit } = useForm();

    return (
        <AuthenticationLayout caption="Sign Up Here">
            <form onSubmit={(() => {})} className="SingInForm-form">
                <div>
                    <input
                        {...register('name') }
                        className="SingInForm-inputField"
                        placeholder="Name"
                        type="text"
                    />
                </div>
                <div>
                    <input
                        {...register('email') }
                        className="SingInForm-inputField"
                        placeholder="Email"
                        type="email"
                    />
                </div>
                <div>
                    <input
                        {...register('password') }
                        className="SingInForm-inputField"
                        placeholder="Password"
                        type="password"
                    />
                </div>
                <div>
                    <input
                        {...register('confirmPassword') }
                        className="SingInForm-inputField"
                        placeholder="confirm Password"
                        type="password"
                    />
                </div>
            </form>
        </AuthenticationLayout>
    )
}

export default SignUp
