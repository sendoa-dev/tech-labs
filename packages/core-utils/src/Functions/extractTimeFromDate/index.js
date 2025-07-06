import dayjs, { DATE_MIN_HOUR_FORMAT } from '@/Functions/_date'
import isValidDate from '@/Functions/isValidDate'

export default ({ date } = {}) => {
  if (isValidDate(date)) {
    return dayjs(date).format(DATE_MIN_HOUR_FORMAT)
  }

  return null
}
