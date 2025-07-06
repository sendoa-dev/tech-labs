import isValidDateValidator from '@/Functions/isValidDate/index.js'

export default ({ disableValidation, errorMessage, format }) => ({ form, value }) => {
  if (!disableValidation || !disableValidation({ form })) {
    return value ? isValidDateValidator(value, format) || errorMessage : true
  } else {
    return true
  }
}
