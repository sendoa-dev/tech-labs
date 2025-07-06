import isFilledValidator from '@/Functions/isFilled/index.js'

export default ({ disableValidation, errorMessage }) => ({ form, value }) => {
  if (!disableValidation || !disableValidation({ form })) {
    return isFilledValidator(value) || errorMessage
  } else {
    return true
  }
}
