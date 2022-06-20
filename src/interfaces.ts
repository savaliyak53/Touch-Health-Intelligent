export interface ISignUp {
    password: string
    first_name: string
    last_name: string
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
