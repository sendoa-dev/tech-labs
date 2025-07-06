import dayjs from '@/Functions/_date'
import formatToApiDate from '@/Functions/formatToApiDate'
import isValidDate from '@/Functions/isValidDate'

export default ({ date = null, format = 'MM-YYYY' } = {}) => {
  if (!isValidDate(date, format)) { return 'INVALID_DATE_ERROR' }

  return formatToApiDate(dayjs(date, format).endOf('month'))
}
