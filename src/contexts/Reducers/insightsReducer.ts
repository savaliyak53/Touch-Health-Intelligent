import * as Actions from '../Actions/insightsAction'

export const insightReducer = (state: any, action: any) => {
    switch (action.type) {
        case Actions.INSIGHTS_ADDED:
            return {
                ...state,
                ...action.payload,
            }
        default:
            return state
    }
}
