import isFilledValidator from '@/Functions/isFilled/index.js'

export default ({ disableValidation, errorMessage, checkNested = false }) => ({ form, value }) => {
  if (!disableValidation || !disableValidation({ form })) {
    return value.map(val => {
      return isFilledValidator(val, { checkNested }) || errorMessage
    })
  } else {
    return true
  }
}
