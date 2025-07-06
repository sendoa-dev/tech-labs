import libphonenumber from '@/Functions/libphonenumber/index.js'

export default ({ errorMessage }) => ({ value }) => {
  try {
    const parsedNumber = value && libphonenumber.phoneUtil.parseAndKeepRawInput(value)
    const isValidNumber = parsedNumber && libphonenumber.phoneUtil.isValidNumber(parsedNumber)

    return isValidNumber || errorMessage
  } catch (e) {
    return errorMessage
  }
}
