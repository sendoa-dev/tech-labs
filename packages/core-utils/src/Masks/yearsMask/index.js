import IMask from 'imask'

export default (input, { min = 1900, max = 2099 } = {}) => IMask(input, {
  mask: function (value) {
    const length = value.length
    const minDateString = min.toString()
    const maxDateString = max.toString()

    if (length === 1) {
      return value === `${minDateString[0]}` || value === `${maxDateString[0]}`
    }

    if (length === 2) {
      return (value === `${minDateString[0]}${minDateString[1]}` || value === `${maxDateString[0]}${maxDateString[1]}`)
    }

    if (length === 3) {
      if (value.substring(0, 2) === `${minDateString[0]}${minDateString[1]}`) {
        return value[2] >= '0' && value[2] <= '9'
      }
      if (value.substring(0, 2) === `${maxDateString[0]}${maxDateString[1]}`) {
        return value[2] >= '0' && value[2] <= '9'
      }
    }

    if (length === 4) {
      const fullYear = parseInt(value, 10)
      return fullYear >= min && fullYear <= max
    }

    return false
  },
  scale: 0,
  normalizeZeros: false,
})
