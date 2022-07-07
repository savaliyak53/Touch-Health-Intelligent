import { Interface } from 'readline'

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

export interface InteractionService {
    type: string | undefined
    ref_id: string | undefined
    question_response: {
        ref_id: string | undefined
        type: string | undefined
        value: any
    }
    reward_nugget_response: {
        shared: boolean
    }
}

export interface Interaction {
    type: string
    ref_id: string
    question: {
        ref_id: string
        type: string
        q_str: string
        options: Array<string> | null
        defaults: Array<number> | null
        lower_value: number | null
        upper_value: number | null
        step_value: number | null
        lower_qualifier: string | null
        upper_qualifier: string | null
        show_values: boolean | null
    }
    reward_nugget: {
        congratulations_str: string
        statistic_str: string
    }
}

// export interface Interaction {
//     type: string
//     ref_id: string
//     question: {
//         ref_id: string
//         type: string
//         q_str: string
//     }
//     reward_nugget: {
//         congratulations_str: string
//         statistic_str: string
//     }
// }
