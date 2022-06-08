import { ISignUp, ILogin, IPreferencesService } from '../interfaces'
import APIClient from '../utils/axios'

export const signUpService = async (data: ISignUp) => {
    try {
        const res = await APIClient('/api/v1/users/signup', 'post', data)
        if (res) return res.data
    } catch (err) {
        return err
    }
}

export const loginService = async (data: ILogin) => {
    try {
        const res = await APIClient('api/THA/PatientLogin', 'post', data)
        if (res) return res.data
    } catch (err) {
        return err
    }
}

export const validateSignUp = async (id: string | undefined) => {
    try {
        const res = await APIClient(`api/THA/PatientSignup/${id}`, 'get')
        if (res) return res.data
    } catch (err) {
        return err
    }
}

export const requestEmailOTP = async (id: string | undefined) => {
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

export const verifyEmailOTP = async (
    otp: string | undefined,
    id: string | undefined
) => {
    try {
        const response = await APIClient(
            `/api/v1/users/${id}/email-verification`,
            'put',
            { code: otp }
        )
        if (response) return response.data
    } catch (error) {
        return error
    }
}

export const requestPhoneOTP = async (id: string | undefined) => {
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

export const verifyPhoneOTP = async (
    otp: string | undefined,
    id: string | undefined
) => {
    try {
        const response = await APIClient(
            `/api/v1/users/${id}/phone-verification`,
            'put',
            { code: otp }
        )
        if (response) return response.data
    } catch (error) {
        return error
    }
}
export const preferencesService = async (
    data: IPreferencesService,
    id: string | undefined
) => {
    try {
        const res = await APIClient(`/api/THA/PatientSignup/${id}`, 'put', data)
        if (res) return res.data
    } catch (err) {
        return err
    }
}
