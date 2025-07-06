const isFilled = (value, { checkNested = false } = {}) => {
  if (value === undefined || value === null) {
    return false
  }

  if (typeof value === 'object') {
    if (Array.isArray(value)) {
      const objectsArray = value[0] !== null && typeof value[0] === 'object'

      return objectsArray ? value.every(val => isFilled(val, { checkNested })) : !!value.length
    }

    if (value instanceof File) {
      return !!value.lastModified
    }

    if (value instanceof RegExp) {
      return !!value
    }

    if (value instanceof Date) {
      return !!value
    }

    return checkNested
      ? !!Object.values(value).length && Object.values(value).every(value =>
          isFilled(value, { checkNested }),
        )
      : !!Object.values(value).length
  }

  const serializedValue = typeof value === 'string'
    ? value.trim()
    : value

  if (serializedValue === undefined || serializedValue === null) {
    return false
  }

  return !!String(serializedValue).length
}

export default isFilled
