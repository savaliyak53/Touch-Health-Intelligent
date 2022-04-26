import React, { lazy } from 'react'

export const SignUp = lazy(() =>
    import('../containers/SignUp').then(({ default: SignUp }) => ({
        default: SignUp,
    }))
)

export const Verify = lazy(() =>
    import('../containers/Verify').then(({ default: Verify }) => ({
        default: Verify,
    }))
)
