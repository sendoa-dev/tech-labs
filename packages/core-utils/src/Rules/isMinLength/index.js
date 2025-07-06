export default ({ errorMessage, length }) => ({ value }) => {
  return value ? (value.length >= length) || errorMessage : true
}
