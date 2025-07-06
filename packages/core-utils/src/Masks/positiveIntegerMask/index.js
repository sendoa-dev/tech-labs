import IMask from 'imask'

export default (input, { min = 0, max = null } = {}) => IMask(input, {
  mask: Number,
  min,
  ...max ? { max } : {},
  scale: 0,
  normalizeZeros: false,
})
