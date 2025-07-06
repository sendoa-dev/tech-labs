import dayjs from '@/Functions/_date'
import isValidDate from '@/Functions/isValidDate'

export default ({ date, format } = {}) => {
  if (isValidDate(date)) {
    return dayjs(date).format(format)
  }

  return null
}
