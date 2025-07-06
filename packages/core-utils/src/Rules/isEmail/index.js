import isEmailValidator from '@/Functions/isEmail/index.js'

export default ({ validate, errorMessage }) => ({ value }) => {
  const customValidation = typeof validate === 'function'
  const validableValue = customValidation && validate({ value })

  return customValidation
    ? isEmailValidator(validableValue) || errorMessage
    : value
      ? (isEmailValidator(value) || errorMessage)
      : true
}
