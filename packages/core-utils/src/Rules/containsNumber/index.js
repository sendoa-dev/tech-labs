export const numberRegex = /[0-9]/

export default ({ errorMessage }) => ({ value }) => {
  return value ? numberRegex.test(value) || errorMessage : true
}
