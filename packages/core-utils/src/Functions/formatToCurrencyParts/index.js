export default ({ number, maximumFractionDigits = 2, currency = 'EUR' }) => new Intl.NumberFormat('de', {
  style: 'currency',
  currency,
  maximumFractionDigits,
}).formatToParts(number / 100)
