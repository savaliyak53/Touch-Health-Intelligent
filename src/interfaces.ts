export interface ISignUp {
    email: string
    password: string
    name: string
    phone: string
}
export interface ILogin {
    username: string
    password: string
}
export interface IPreferencesService {
    preferences: {
        minutes_per_week: number
        time_of_day: string[]
    }
}
