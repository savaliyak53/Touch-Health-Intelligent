import { lazy } from 'react'

export const SignUp = lazy(() =>
    import('../containers/Auth/Signup/Signup').then(({ default: SignUp }) => ({
        default: SignUp,
    }))
)

export const Login = lazy(() =>
    import('../containers/Auth/Login/Login').then(({ default: Login }) => ({
        default: Login,
    }))
)
