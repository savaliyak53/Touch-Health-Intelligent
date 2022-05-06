import APIClient from '../utils/axios'

export const signUpService = async (data) => {
    try {
        const res = await APIClient('api/THA/PatientSignup', 'post', data)
        if (res) return res.data
    } catch (err) {
        return err
    }
}

export const loginService = async (data) => {
    try {
        const res = await APIClient('api/THA/PatientLogin', 'post', data)
        if (res) return res.data
    } catch (err) {
        return err
    }
}

export const validateSignUp = async (id) => {
    try {
        const res = await APIClient(`api/THA/PatientSignup/${id}`, 'get')
        if (res) return res.data
    } catch (err) {
        return err
    }
}

export const requestEmailOTP = async (id) => {
    try {
        const response = await APIClient(
            `/api/THA/PatientSignup/${id}/email-verification`,
            'post'
        )
        if (response) return response.data
    } catch (error) {
        return error
    }
}

export const verifyEmailOTP = async (otp, id) => {
    try {
        const response = await APIClient(
            `/api/THA/PatientSignup/${id}/email-verification`,
            'put',
            { code: otp }
        )
        if (response) return response.data
    } catch (error) {
        return error
    }
}

export const requestPhoneOTP = async (id) => {
    try {
        const response = await APIClient(
            `/api/THA/PatientSignup/${id}/phone-verification`,
            'post'
        )
        if (response) return response.data
    } catch (error) {
        return error
    }
}

export const verifyPhoneOTP = async (otp, id) => {
    try {
        const response = await APIClient(
            `/api/THA/PatientSignup/${id}/phone-verification`,
            'put',
            { code: otp }
        )
        if (response) return response.data
    } catch (error) {
        return error
    }
}
