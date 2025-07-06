import isNumberValidator from '@/Functions/isNumber/index.js'

export default ({ errorMessage }) => ({ value }) => {
  return value ? isNumberValidator(value) || errorMessage : true
}
