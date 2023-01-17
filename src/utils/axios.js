import axios from 'axios'

const apiClient = (url, method = 'get', data = {}, header='') => {
  const baseURL = process.env.REACT_APP_API_HOST
  const config = {
    timeout: 10000,
    url: url,
    method: method,
    baseURL: baseURL
    }
    if(header !== ''){
      config.headers = {'X-Recaptcha-Token': header}
    }

  if (method.toLocaleLowerCase === 'get') {
        config['params'] = data
  } else {
        config['data'] = data
  }

  const token = localStorage.getItem('token')
  
  axios.interceptors.request.use((config) => {
    if (token) {
            config.headers.Authorization = `Bearer ${localStorage.token}`
    }
        return config
    })

  axios.interceptors.response.use(
    (response) => {
            return response
    },
    (error) => {
      if (error.response.status === 401) {
        localStorage.removeItem('userId');
        localStorage.removeItem('token');
        window.location = '/login';
      }
            return Promise.reject(error)
    }
    )
    return axios(config)
}

export default apiClient
