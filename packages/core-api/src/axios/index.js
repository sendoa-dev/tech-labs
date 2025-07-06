import axios from 'axios'

export const createAxiosInstance = (config = {}) => axios.create({
  ...config,
})

export async function axiosRequest ({ axiosInstance, baseURL, method, url, params = {}, data = {}, headers = {} }) {
  const requestHeaders = {
    ...headers,
  }
  const response = await axiosInstance.request({ baseURL, method, url, params, data, headers: requestHeaders })

  return response.data
}

export const axiosInterceptors = async (axiosInstance, interceptors = {}) => {
  if (interceptors.request.length) {
    interceptors.request.forEach(interceptor => {
      axiosInstance.interceptors.request.use(interceptor)
    })
  }

  if (interceptors.response.length) {
    interceptors.response.forEach(interceptor => {
      axiosInstance.interceptors.response.use(interceptor)
    })
  }
}
