import isFilledValidator from '@/Functions/isFilled/index.js'

export default ({ errorMessage }) => ({ customErrors, value }) => {
  const isFieldFilled = isFilledValidator(value)
  if (!isFieldFilled) {
    return true
  }
  const hasNoErrors = !customErrors.length
  return hasNoErrors || errorMessage
}
