export default ({ number }) => {
  return number || number === 0
    ? new Intl.NumberFormat('de').format(number)
    : '-'
}
