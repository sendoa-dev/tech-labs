import {
  httpCapacitorRequest,
  httpCapacitorInterceptors,
  responseCasing,
  requestCasing,
  requestFormDataToJsonString,
  requestParamsToStrings,
  // requestSessionHeader,
  // responseSessionHeader,
} from '@tech-labs/core-api'

export const request = (...args) => httpCapacitorRequest({ ...args })

export const bootstrap = async () => {
  const interceptors = {
    request: _applyRequestInterceptors,
    response: _applyResponseInterceptors,
  }

  await httpCapacitorInterceptors(interceptors)
}

const _applyRequestInterceptors = async (request) => {
  let modifiedRequest = { ...request }

  // modifiedRequest = await requestSessionHeader(modifiedRequest)
  modifiedRequest = await requestCasing(modifiedRequest)
  modifiedRequest = await requestParamsToStrings(modifiedRequest)
  modifiedRequest = await requestFormDataToJsonString(modifiedRequest)

  return modifiedRequest
}

const _applyResponseInterceptors = async (response, error) => {
  let modifiedResponse = { ...response }

  if (response.status >= 200 && response.status < 300) {
    modifiedResponse = await responseCasing(modifiedResponse)

    return modifiedResponse
  } else {
    // modifiedResponse = await responseSessionHeader(modifiedResponse)

    return Promise.reject(modifiedResponse)
  }
}
