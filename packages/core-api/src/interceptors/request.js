import { transformCamelToSnakeCase } from '@tech-labs/core-utils'

export const requestCasing = async (request) => {
  const parsedParams = transformCamelToSnakeCase(request.params)
  let parsedData = request.data || {}

  if (!(request.data instanceof FormData)) {
    parsedData = transformCamelToSnakeCase(parsedData)
  }

  return { ...request, data: parsedData, params: parsedParams }
}

export const requestParamsToStrings = async (request) => {
  let parsedParams = request.params || {}

  parsedParams = Object.fromEntries(
    Object.entries(parsedParams).map(([key, value]) => [key, String(value)]),
  )

  return { ...request, params: parsedParams }
}

export const requestFormDataToJsonString = async (request) => {
  if (request.data instanceof FormData) {
    const formData = request.data

    const { headers, data } = await _parseFormData(formData)
    request.data = data
    request.dataType = 'formData'
    request.headers = { ...request.headers, ...headers }
  }

  return request
}

const _parseFormData = async formData => {
  const boundary = Math.random().toString(36).substr(2)
  const arrayFormData = []

  for (const [key, value] of formData.entries()) {
    if (value instanceof File) {
      const base64Value = await _fileToBase64(value)

      arrayFormData.push({ key, value: base64Value, type: 'base64File', fileName: value.name, contentType: value.type })
    } else {
      arrayFormData.push({ key, value, type: 'string' })
    }
  }

  return {
    headers: { 'content-type': `multipart/form-data; boundary=${boundary}` },
    data: arrayFormData,
  }
}

const _fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result.split(',')[1])
    reader.onerror = reject
  })
}

