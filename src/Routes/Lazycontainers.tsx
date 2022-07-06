import { lazy } from 'react'

export const SignUp = lazy(() =>
    import('../containers/Auth/Signup').then(({ default: SignUp }) => ({
        default: SignUp,
    }))
)

export const Login = lazy(() =>
    import('../containers/Auth/Login').then(({ default: Login }) => ({
        default: Login,
    }))
)
