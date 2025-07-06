export const lowercaseRegex = /[a-z]/

export default ({ errorMessage }) => ({ value }) => {
  return value ? lowercaseRegex.test(value) || errorMessage : true
}
