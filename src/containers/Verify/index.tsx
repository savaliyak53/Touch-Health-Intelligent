import React, { useState, useEffect } from 'react'
import './index.scss'
import Button from '../../components/Button'
import OtpInput from 'react-otp-input'
import {
    requestEmailOTP,
    requestPhoneOTP,
    verifyEmailOTP,
    verifyPhoneOTP,
    validateSignUp,
} from '../../services/authservice'
import { toast } from 'react-toastify'
import { Spin } from 'antd'
import { useParams, useNavigate } from 'react-router-dom'

const Verify = () => {
    const { userId } = useParams()
    const navigate = useNavigate()
    const [emailOTP, setEmailOTP] = useState<string | undefined>()
    const [emailLoading, setEmailLoading] = useState<boolean>(false)
    const [isEmailVerified, setIsEmailVerified] = useState<boolean>(false)
    const [phoneOTP, setPhoneOTP] = useState<string | undefined>()
    const [phoneLoading, setPhoneLoading] = useState<boolean>(false)
    const [isPhoneVerified, setIsPhoneVerified] = useState<boolean>(false)

    useEffect(() => {
        checkVerifications()
    }, [])

    const checkVerifications = async () => {
        const check = await validateSignUp(userId)
        console.log('ceck is ', check)
        if (check) {
            toast.error(check?.response?.data?.detail)
        } else {
            setIsEmailVerified(check.metadata.emailIsVerified)
            setIsPhoneVerified(check.metadata.phoneIsVerified)
            handleRedirect()
        }
    }

    const onEmailOTPChange = (value: string) => {
        setEmailOTP(value)
    }
    const onPhoneOTPChange = (value: string) => {
        setPhoneOTP(value)
    }
    const sendEmailOTP = async () => {
        //api call for sending email otp
        setEmailLoading(true)
        const emailRequestResponse = await requestEmailOTP(userId)
        if (emailRequestResponse?.response?.data) {
            setEmailLoading(false)
            toast.error(emailRequestResponse?.response?.data?.detail)
        } else {
            setEmailLoading(false)
            toast.success('OTP sent')
        }
    }

    const emailVerification = async () => {
        setEmailLoading(true)
        const emailVerificationResponse = await verifyEmailOTP(emailOTP, userId)
        if (emailVerificationResponse?.response?.data) {
            setEmailLoading(false)
            toast.error(emailVerificationResponse?.response?.data?.detail)
        } else {
            setEmailLoading(false)
            setIsEmailVerified(true)
            toast.success('Email Verified')
        }
    }

    const sendPhoneOTP = async () => {
        //api call to send email otp
        setEmailLoading(true)
        const phoneRequestResponse = await requestPhoneOTP(userId)
        if (phoneRequestResponse?.response?.data) {
            setPhoneLoading(false)
            toast.error(phoneRequestResponse?.response?.data?.detail)
        } else {
            setPhoneLoading(false)
            toast.success('OTP sent')
            handleRedirect()
        }
    }

    const phoneVerification = async () => {
        setEmailLoading(true)
        const emailVerificationResponse = await verifyPhoneOTP(phoneOTP, userId)
        if (emailVerificationResponse?.response?.data) {
            setEmailLoading(false)
            toast.error(emailVerificationResponse?.response?.data?.detail)
        } else {
            setEmailLoading(false)
            setIsPhoneVerified(true)
            toast.success('Phone Verified')
            handleRedirect()
        }
    }

    const handleRedirect = () => {
        if (isEmailVerified && isPhoneVerified) {
            navigate('/preferences')
        }
    }

    return (
        <div className="verifyWrap">
            {!isEmailVerified && (
                <div>
                    <div className="prompt">
                        Enter the email verification OTP below
                        {emailLoading && <Spin />}
                    </div>
                    <Spin />
                    <div className="digit-group">
                        <OtpInput
                            value={emailOTP}
                            onChange={onEmailOTPChange}
                            numInputs={6}
                            separator={<span>-</span>}
                            isInputNum={true}
                        />
                        <span className="resend-otp" onClick={sendEmailOTP}>
                            Resend Otp on Email?
                        </span>
                        <Button
                            size="md"
                            onClick={emailVerification}
                            disabled={emailLoading}
                        >
                            VERIFY EMAIL
                        </Button>
                    </div>
                </div>
            )}

            {!isPhoneVerified && (
                <div style={{ marginTop: '10px' }}>
                    <div className="prompt">
                        Enter the email verification OTP below{' '}
                        {phoneLoading && <Spin />}
                    </div>
                    <div className="digit-group">
                        <OtpInput
                            value={phoneOTP}
                            onChange={onPhoneOTPChange}
                            numInputs={6}
                            separator={<span>-</span>}
                            isInputNum={true}
                        />
                        <span className="resend-otp" onClick={sendPhoneOTP}>
                            Resend Otp on Phone?
                        </span>
                        <Button
                            size="md"
                            onClick={phoneVerification}
                            disabled={phoneLoading}
                        >
                            VERIFY PHONE
                        </Button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Verify
