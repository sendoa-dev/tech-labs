import { CapacitorHttp } from '@capacitor/core'
import { isFilled } from '@tech-labs/core-utils'

const interceptorsStorage = {
  request: async (request) => request,
  response: async (response) => response,
}

export async function httpCapacitorRequest ({ method = '', baseURL = '', url = '', params = {}, data = {}, headers = {} } = {}) {
  try {
    const requestHeaders = {
      'content-type': 'application/json',
      ...headers,
    }

    let request = await interceptorsStorage.request({ method, url: `${baseURL}${url}`, params, data, headers: requestHeaders })

    request = {
      method: request.method,
      url: request.url,
      headers: request.headers,
      ...isFilled(request.params) ? { params: request.params } : {},
      ...isFilled(request.data) ? { data: request.data } : {},
      ...isFilled(request.dataType) ? { dataType: request.dataType } : {},
    }

    let response = await CapacitorHttp.request(request)

    response = await interceptorsStorage.response(response)

    return response.data
  } catch (error) {
    return Promise.reject(error)
  }
}

export const httpCapacitorInterceptors = async (interceptors = {}) => {
  if (interceptors.request) {
    interceptorsStorage.request = interceptors.request
  }

  if (interceptors.response) {
    interceptorsStorage.response = interceptors.response
  }
}
