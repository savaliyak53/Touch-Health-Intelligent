import APIClient from '../utils/axios'

export const getConditionsService = async (userId: string | null) => {
    return APIClient(`/api/v1/user/${userId}/conditions/`, 'get')
}
