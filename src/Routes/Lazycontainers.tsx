import { lazy } from 'react'

export const SignUp = lazy(() =>
    import('../containers/SignUp').then(({ default: SignUp }) => ({
        default: SignUp,
    }))
)

export const Login = lazy(() =>
    import('../containers/Login').then(({ default: Login }) => ({
        default: Login,
    }))
)
