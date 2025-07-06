export const specialCharRegex = /\W|_/

export default ({ errorMessage }) => ({ value }) => {
  return value ? specialCharRegex.test(value) || errorMessage : true
}
