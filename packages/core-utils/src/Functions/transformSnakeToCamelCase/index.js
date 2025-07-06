const snakeToCamelCase = (iterable) => {
  if (typeof iterable === 'object' && iterable instanceof Blob) {
    return iterable
  }

  if (typeof iterable !== 'object' || iterable === null) {
    return iterable
  }

  if (Array.isArray(iterable)) {
    return iterable.map(snakeToCamelCase)
  }

  const keyValuePairs = Object.entries(iterable).map(([key, value]) => [
    key.replace(/_+(.)/g, (match) => match[match.length - 1].toUpperCase()),
    snakeToCamelCase(value),
  ])

  return Object.fromEntries(keyValuePairs)
}

export default snakeToCamelCase
