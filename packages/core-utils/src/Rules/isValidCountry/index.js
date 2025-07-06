import { whereAlpha2 } from 'iso-3166-1'

export default ({ errorMessage }) => ({ value }) => {
  return (value && !!Object.keys(whereAlpha2(value)).length) || errorMessage
}
