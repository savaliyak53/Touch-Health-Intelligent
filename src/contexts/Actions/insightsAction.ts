import { toast } from 'react-toastify'
import { getInsightsService } from '../../services/dashboardservice'
export const INSIGHTS_ADDED = 'INSIGHTS_ADDED'

export const storeInsights = async (dispatch: any) => {
    try {
        const response = await getInsightsService()

        if (response.data) {
            dispatch({
                type: INSIGHTS_ADDED,
                payload: {
                    ...response.data,
                },
            })
        }
    } catch (error) {
        toast('unknown error')
    }
}
