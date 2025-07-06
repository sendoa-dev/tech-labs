import IMask from 'imask'

export default (input) => IMask(input, {
  mask: function (value) {
    if (value.length === 1) {
      return value >= '0' && value <= '9'
    }

    if (value.length === 2) {
      if (value[0] === '0') {
        return value[1] >= '1' && value[1] <= '9'
      } else if (value[0] === '1') {
        return value[1] >= '0' && value[1] <= '2'
      } else {
        return false
      }
    }

    return false
  },
  normalizeZeros: false,
})
