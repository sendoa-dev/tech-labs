export default ({ disableValidation, errorMessage }) => ({ form, value }) => {
  if (!disableValidation || !disableValidation({ form })) {
    return value ? /\d\d-\d\d\d\d/.test(value) || errorMessage : true
  } else {
    return true
  }
}
