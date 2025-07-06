import isEqualValidator from '@/Functions/isEqual/index.js'

export default ({ errorMessage, field, value: fieldValue }) => ({ form, value }) => {
  const compareString = field ? form[field].value : fieldValue

  return isEqualValidator(compareString, value) || errorMessage
}
