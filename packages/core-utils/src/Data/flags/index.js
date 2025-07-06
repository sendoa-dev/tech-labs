import * as flags from 'country-flag-icons/string/3x2'

export default ({ country = null } = {}) => {
  return country ? flags[country] : null
}
