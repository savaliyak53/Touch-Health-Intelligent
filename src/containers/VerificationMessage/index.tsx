import React, { useState, useEffect } from 'react'
import './index.css'
import Typography from '@mui/material/Typography'
import { requestEmailOTP, requestPhoneOTP } from '../../services/authservice'
import { toast } from 'react-toastify'
import { useParams } from 'react-router'

function VerificationMessage() {
    const [emailLoading, setEmailLoading] = useState<boolean>(false)
    const [phoneLoading, setPhoneLoading] = useState<boolean>(false)
    const { userId } = useParams()

    useEffect(() => {
        sendEmailOTP()
        sendPhoneOTP()
    }, [])

    const sendEmailOTP = async () => {
        //api call for sending email otp
        setEmailLoading(true)
        const emailRequestResponse = await requestEmailOTP(userId)
        if (emailRequestResponse?.response?.data) {
            setEmailLoading(false)
            toast.error(emailRequestResponse?.response?.data?.details?.message)
        } else {
            setEmailLoading(false)
            toast.success('Email OTP sent')
        }
    }

    const sendPhoneOTP = async () => {
        //api call to send email otp
        setPhoneLoading(true)
        const phoneRequestResponse = await requestPhoneOTP(userId)
        if (phoneRequestResponse?.response?.data) {
            setPhoneLoading(false)
            toast.error('Invalid Phone Number')
        } else {
            setPhoneLoading(false)
            toast.success('Phone OTP sent')
        }
    }

    return (
        <div className="cards-video-wrapper">
            <div className="card-text">
                <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    className="resend"
                >
                    Welcome to Touch Health Assistant
                </Typography>
                <Typography
                    gutterBottom
                    variant="h6"
                    component="div"
                    className="response"
                >
                    Please check your provided phone and email for verification
                </Typography>
                <div className="resend">
                    <span
                        className={
                            emailLoading ? 'resend-otp-disabled' : 'resend-otp'
                        }
                        onClick={() => !emailLoading && sendEmailOTP()}
                    >
                        Resend verification link on Email?
                    </span>
                    <span
                        className={
                            phoneLoading ? 'resend-otp-disabled' : 'resend-otp'
                        }
                        onClick={() => !phoneLoading && sendPhoneOTP()}
                    >
                        Resend verification link on Phone?
                    </span>
                </div>
            </div>
        </div>
    )
}
export default VerificationMessage
