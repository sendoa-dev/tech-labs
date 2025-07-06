const isEqual = (reference, compare, { ignoreType = false } = {}) => {
  const getType = (object) => Object.prototype.toString.call(object).slice(8, -1).toLowerCase()

  const areArraysEqual = () => {
    if (reference.length !== compare.length) {
      return false
    }

    for (let i = 0; i < reference.length; i++) {
      if (!isEqual(reference[i], compare[i])) {
        return false
      }
    }

    return true
  }

  const areObjectsEqual = () => {
    if (!reference || !compare || typeof reference !== typeof compare) {
      return false
    }

    if (Object.keys(reference).length !== Object.keys(compare).length) {
      return false
    }

    for (const key in reference) {
      if (Object.prototype.hasOwnProperty.call(reference, key)) {
        if (!isEqual(reference[key], compare[key])) {
          return false
        }
      }
    }

    return true
  }

  const areFunctionsEqual = () => reference.toString() === compare.toString()

  const arePrimativesEqual = () => {
    // if (ignoreType) {
    //   switch (typeof reference) {
    //     case 'number':
    //       if (typeof compare === 'string') {
    //         return reference === Number(compare)
    //       } else {
    //         return false
    //       }

    //     case 'string':
    //       if (typeof compare === 'number') {
    //         return Number(reference) === compare
    //       } else if (typeof compare === 'string') {
    //         return reference === compare
    //       } else {
    //         return false
    //       }

    //     case 'boolean':
    //       if (typeof compare === 'boolean') {
    //         return reference === compare
    //       } else {
    //         return reference === Boolean(compare)
    //       }

    //     default:
    //       return false
    //   }
    // } else {
    return reference === compare
    // }
  }

  const referenceType = getType(reference)
  const compareType = getType(compare)

  if (referenceType !== compareType) {
    return false
  }

  if (referenceType === 'array') {
    return areArraysEqual()
  }
  if (referenceType === 'object') {
    return areObjectsEqual()
  }
  if (referenceType === 'function') {
    return areFunctionsEqual()
  }

  return arePrimativesEqual()
}

export default isEqual
