import formatToCurrency from '@/Functions/formatToCurrency/index.js'

export default ({ number, maximumFractionDigits }) => formatToCurrency({
  number: Math.abs(number),
  maximumFractionDigits,
})
