import { transformSnakeToCamelCase } from '@tech-labs/core-utils'

export const responseCasing = async (response) => {
  let parsedData = response?.data

  if (!(response?.data instanceof FormData)) {
    parsedData = transformSnakeToCamelCase(parsedData)
  }

  return { ...response, data: parsedData }
}
