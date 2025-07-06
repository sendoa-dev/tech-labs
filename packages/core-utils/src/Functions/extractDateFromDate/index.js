import dayjs, { DATE_DAY_MONTH_YEAR_FORMAT } from '@/Functions/_date'
import isValidDate from '@/Functions/isValidDate'

export default ({ date } = {}) => {
  if (isValidDate(date)) {
    return dayjs(date).format(DATE_DAY_MONTH_YEAR_FORMAT)
  }

  return null
}
