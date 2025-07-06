import isFilled from '@/Functions/isFilled/index.js'
import { lowercaseRegex } from '@/Rules/containsLowercase/index.js'
import { numberRegex } from '@/Rules/containsNumber/index.js'
import { specialCharRegex } from '@/Rules/containsSpecialChar/index.js'
import { uppercaseRegex } from '@/Rules/containsUppercase/index.js'

const isMinLength = (value, length) => (value.length >= length)

export default ({ errorMessage, minLength = 8 }) => ({ value }) => {
  const securePasswordRequeriments = [
    lowercaseRegex.test(value),
    numberRegex.test(value),
    specialCharRegex.test(value),
    uppercaseRegex.test(value),
    isMinLength(value, minLength),
    isFilled(value),
  ]

  return securePasswordRequeriments.every(requeriment => !!requeriment) || errorMessage
}
