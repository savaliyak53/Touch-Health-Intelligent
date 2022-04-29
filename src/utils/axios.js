import axios from 'axios'

const apiClient = (url, method = 'get', data = {}) => {
    const baseURL = process.env.REACT_APP_API_HOST
    const config = {
        url: url,
        method: method,
        baseURL: baseURL,
    }

    if (method.toLocaleLowerCase === 'get') {
        config['params'] = data
    } else {
        config['data'] = data
    }

    axios.interceptors.request.use((config) => {
        if (localStorage.token) {
            config.headers.Authorization = `JWT ${localStorage.token}`
        }
        return config
    })

    axios.interceptors.response.use(
        (response) => {
            return response
        },
        (error) => {
            if (error.response.status === 401) {
                localStorage.removeItem('token')
            }
            return Promise.reject(error)
        }
    )
    return axios(config)
}

export default apiClient
