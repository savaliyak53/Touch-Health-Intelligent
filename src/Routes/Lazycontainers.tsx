import React, { lazy } from 'react'

export const SignUp = lazy(() =>
    import('../containers/SignUp').then(({ default: SignUp }) => ({
        default: SignUp,
    }))
)
