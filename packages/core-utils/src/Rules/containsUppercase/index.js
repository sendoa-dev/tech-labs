export const uppercaseRegex = /[A-Z]/

export default ({ errorMessage }) => ({ value }) => {
  return value ? uppercaseRegex.test(value) || errorMessage : true
}
