const camelToSnakeCase = (iterable) => {
  if (typeof iterable === 'object' && iterable instanceof Blob) {
    return iterable
  }

  if (typeof iterable !== 'object' || iterable === null) {
    return iterable
  }

  if (Array.isArray(iterable)) {
    return iterable.map(camelToSnakeCase)
  }

  const keyValuePairs = Object.entries(iterable).map(([key, value]) => [
    key.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`),
    camelToSnakeCase(value),
  ])

  return Object.fromEntries(keyValuePairs)
}

export default camelToSnakeCase
