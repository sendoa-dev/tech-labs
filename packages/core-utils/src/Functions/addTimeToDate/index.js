import dayjs from '@/Functions/_date'
import isValidDate from '@/Functions/isValidDate'
import isValidTime from '@/Functions/isValidTime'

export default ({ date = null, time } = {}) => {
  if (!isValidDate(date)) { return 'INVALID_DATE_ERROR' }
  if (!isValidTime(time)) { return 'INVALID_TIME_ERROR' }

  if (isValidDate(date) && isValidTime(time)) {
    const [hours, mins, seconds = '0'] = time.split(':')
    const newDate = dayjs(date).set('h', hours).set('m', mins).set('s', seconds)

    return newDate.format()
  }

  return 'UNCAUGHT_DATE_ERROR'
}
