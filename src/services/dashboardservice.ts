import APIClient from '../utils/axios'

export const getConditionsService = async () => {
    return APIClient(`/api/v1/conditions/`, 'get')
}

export const getConcernsService = async () => {
    return APIClient(`/api/v1/concerns/`, 'get')
}

export const getInsightsService = async () => {
    return APIClient(`/api/v1/insights/`, 'get')
}
