export interface ISignUp {
    email: string
    password: string
    name: string
    phone: string
}
export interface ILogin {
    email: string
    password: string
}
export interface IPreferencesService {
    preferences: {
        minutesPerWeek: number
        timeOfDay: string[]
        conditions: string[]
    }
}
