import isUrlValidator from '@/Functions/isUrl/index.js'

export default ({ errorMessage }) => ({ value }) => {
  return value ? isUrlValidator(value) || errorMessage : true
}
