import {
  createAxiosInstance,
  axiosRequest,
  axiosInterceptors,
  responseCasing,
  requestCasing,
 } from '@tech-labs/core-api'

const axiosInstance = createAxiosInstance({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: import.meta.env.VITE_API_TIMEOUT,
})

export const request = (...args) => axiosRequest({ axiosInstance, ...args })

export const bootstrap = async () => {
  const interceptors = {
    request: [requestCasing],
    response: [responseCasing],
  }

  await axiosInterceptors(axiosInstance, interceptors)
}
