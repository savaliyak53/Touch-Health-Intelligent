import React, { useState, useEffect } from 'react'
import './index.css'
import Typography from '@mui/material/Typography'
import { useParams } from 'react-router-dom'
import { verifyEmailOTP } from '../../services/authservice'
import { toast } from 'react-toastify'
import { Spin } from 'antd'

function EmailVerification() {
    const { code, userId } = useParams()
    const [emailLoading, setEmailLoading] = useState<boolean>(false)
    const [isEmailVerified, setIsEmailVerified] = useState<boolean>(false)

    const emailVerification = async () => {
        setEmailLoading(true)
        const emailVerificationResponse = await verifyEmailOTP(code, userId)
        if (emailVerificationResponse?.response?.data) {
            setEmailLoading(false)
            setIsEmailVerified(true)
            //  toast.success('Email Verified, Please verify your phone number')
        } else {
            setEmailLoading(false)
            //toast.error('Something went wrong')
        }
    }
    useEffect(() => {
        if (isEmailVerified) {
            // toast.success('Email Verified, Please verify your phone number')
        } else emailVerification()
    }, [])

    return (
        <div className="cards-video-wrapper">
            <div className="card-text">
                <Typography gutterBottom variant="h5" component="div">
                    Welcome to Touch Health Assistant
                </Typography>
                {}
                {emailLoading ? (
                    <p className="response">Verifying your given email ... </p>
                ) : (
                    <div>
                        {' '}
                        {isEmailVerified ? (
                            <p className="success-response">
                                Email Verified please verify your phone number
                                ...{' '}
                            </p>
                        ) : (
                            <p className="fail-response">
                                Invaid code please contact support ...{' '}
                            </p>
                        )}{' '}
                    </div>
                )}
                <div className="spin">
                    {' '}
                    <Spin spinning={emailLoading} />
                </div>
            </div>
        </div>
    )
}
export default EmailVerification
