import React from 'react'
import './index.scss'
// import Button from '../../components/Button'
// import OtpInput from 'react-otp-input'
// import {
//     requestEmailOTP,
//     requestPhoneOTP,
//     verifyEmailOTP,
//     verifyPhoneOTP,
//     validateSignUp,
// } from '../../services/authservice'
// import { toast } from 'react-toastify'
// import { Checkbox, Spin } from 'antd'
// import { useParams, useNavigate } from 'react-router-dom'
const Verify = () => {
    // const userId = localStorage.getItem('userId')
    // const navigate = useNavigate()
    // const [emailOTP, setEmailOTP] = useState<string | undefined>()
    // const [emailLoading, setEmailLoading] = useState<boolean>(false)
    // const [isEmailVerified, setIsEmailVerified] = useState<boolean>(false)
    // const [phoneOTP, setPhoneOTP] = useState<string | undefined>()
    // const [phoneLoading, setPhoneLoading] = useState<boolean>(false)
    // // const [redirect, setRedirect] = useState<boolean>(false)
    // const [isPhoneVerified, setIsPhoneVerified] = useState<boolean>(false)
    // const isUserSignedUp = localStorage.getItem('userId')
    // useEffect(() => {
    //     if (isUserSignedUp) {
    //         checkVerifications()
    //     } else {
    //         navigate('/signUp')
    //     }
    // }, [])
    // useEffect(() => {
    //     if (isPhoneVerified) {
    //         handleRedirect()
    //         localStorage.setItem('isVerified', 'true')
    //     }
    // }, [isPhoneVerified])

    // const checkVerifications = async () => {
    //     const check = await validateSignUp(userId)
    //     if (check?.response?.data) {
    //         toast.error('Invalid User Id, Try Signing Up Again')
    //         localStorage.removeItem('isVerified')
    //         localStorage.removeItem('userId')
    //         navigate('/signUp')
    //     } else {
    //         if (check.metadata.emailIsVerified) {
    //             setIsEmailVerified(true)
    //         }
    //         if (check.metadata.phoneIsVerified) {
    //             setIsPhoneVerified(true)
    //         }
    //         handleRedirect()
    //     }
    // }

    // const onEmailOTPChange = (value: string) => {
    //     setEmailOTP(value)
    // }
    // const onPhoneOTPChange = (value: string) => {
    //     setPhoneOTP(value)
    // }
    // const sendEmailOTP = async () => {
    //     //api call for sending email otp
    //     setEmailLoading(true)
    //     const emailRequestResponse = await requestEmailOTP(userId)
    //     if (emailRequestResponse?.response?.data) {
    //         setEmailLoading(false)
    //         toast.error(emailRequestResponse?.response?.data?.detail)
    //     } else {
    //         setEmailLoading(false)
    //         toast.success('Email OTP sent')
    //     }
    // }

    // const emailVerification = async () => {
    //     setEmailLoading(true)
    //     const emailVerificationResponse = await verifyEmailOTP(emailOTP, userId)
    //     if (emailVerificationResponse?.response?.data) {
    //         setEmailLoading(false)
    //         toast.error(emailVerificationResponse?.response?.data?.detail)
    //     } else {
    //         setEmailLoading(false)
    //         setIsEmailVerified(true)
    //         toast.success('Email Verified')
    //     }
    // }

    // const sendPhoneOTP = async () => {
    //     //api call to send email otp
    //     setPhoneLoading(true)
    //     const phoneRequestResponse = await requestPhoneOTP(userId)
    //     if (phoneRequestResponse?.response?.data) {
    //         setPhoneLoading(false)
    //         toast.error(phoneRequestResponse?.response?.data?.detail)
    //     } else {
    //         setPhoneLoading(false)
    //         toast.success('Phone OTP sent')
    //         handleRedirect()
    //     }
    // }

    // const phoneVerification = async () => {
    //     setPhoneLoading(true)
    //     const phoneVerificationResponse = await verifyPhoneOTP(phoneOTP, userId)
    //     if (phoneVerificationResponse?.response?.data) {
    //         setPhoneLoading(false)
    //         toast.error(phoneVerificationResponse?.response?.data?.detail)
    //     } else {
    //         setPhoneLoading(false)
    //         setIsPhoneVerified(true)
    //         toast.success('Phone Verified')
    //         handleRedirect()
    //     }
    // }

    // const handleRedirect = () => {
    //     if (isPhoneVerified) {
    //         navigate(`/preferences/${userId}`)
    //     }
    // }

    return (
        <div className="verifyWrap">
            {/* {isEmailVerified && (
                <div className="prompt">
                    <Checkbox defaultChecked disabled /> Email Verified
                </div>
            )}
            {isPhoneVerified && (
                <div className="prompt">
                    <Checkbox defaultChecked disabled /> Phone Verified
                </div>
            )}
            {!isEmailVerified && (
                <div>
                    <div className="prompt">
                        Enter the email verification OTP below
                        <Spin
                            spinning={emailLoading}
                            style={{ marginLeft: '8px' }}
                        />
                    </div>
                    <div className="digit-group">
                        <OtpInput
                            value={emailOTP}
                            onChange={onEmailOTPChange}
                            numInputs={6}
                            separator={<span>-</span>}
                            isInputNum={true}
                        />
                        <span
                            className={
                                emailLoading
                                    ? 'resend-otp-disabled'
                                    : 'resend-otp'
                            }
                            onClick={() => !emailLoading && sendEmailOTP()}
                        >
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
                        Enter the phone verification OTP below{' '}
                        <Spin
                            spinning={phoneLoading}
                            style={{ marginLeft: '8px' }}
                        />
                    </div>
                    <div className="digit-group">
                        <OtpInput
                            value={phoneOTP}
                            onChange={onPhoneOTPChange}
                            numInputs={6}
                            separator={<span>-</span>}
                            isInputNum={true}
                        />
                        <span
                            className={
                                phoneLoading
                                    ? 'resend-otp-disabled'
                                    : 'resend-otp'
                            }
                            onClick={() => !phoneLoading && sendPhoneOTP()}
                        >
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
            )} */}
        </div>
    )
}

export default Verify
