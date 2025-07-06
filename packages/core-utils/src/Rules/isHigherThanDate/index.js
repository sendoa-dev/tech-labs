import dayjs from '@/Functions/_date'
import isValidDateValidator from '@/Functions/isValidDate/index.js'

export default ({ disableValidation, errorMessage, format, field, value: fieldValue }) => ({ form, value }) => {
  if (!disableValidation || !disableValidation({ form })) {
    if (value) {
      const currentFieldDate = dayjs(value, format)
      const comparedDate = field ? dayjs(form[field].value, format) : dayjs(fieldValue)

      if (isValidDateValidator(currentFieldDate) && isValidDateValidator(comparedDate)) {
        const isHigherDate = currentFieldDate.diff(comparedDate) >= 0

        return isHigherDate || errorMessage
      } else {
        return true
      }
    } else {
      return true
    }
  } else {
    return true
  }
}
