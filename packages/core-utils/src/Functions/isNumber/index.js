const numberRegex = /^-?\d+\.?\d*$/i

export default (value) => !!value && numberRegex.test(value)
