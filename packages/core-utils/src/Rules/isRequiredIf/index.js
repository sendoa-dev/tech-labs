import isFilledValidator from '@/Functions/isFilled/index.js'

export default ({ errorMessage, condition, field, value: fieldValue }) => ({ form, value }) => {
  const functionCondition = typeof condition === 'function' && condition({ form, value })
  const fieldCondition = !!(field && form[field].value)
  let requiredIfCondition = fieldCondition || functionCondition

  if (field && isFilledValidator(fieldValue)) {
    requiredIfCondition = Array.isArray(fieldValue)
      ? !!fieldValue.includes(form[field].value)
      : !!(form[field].value === fieldValue)
  }

  return requiredIfCondition
    ? (isFilledValidator(value) || errorMessage)
    : true
}
