import dayjs from '@/Functions/_date'
import getDatesDiff from '@/Functions/getDatesDiff'

export default ({ startDate, endDate }) => {
  if (startDate && endDate) {
    const days = Math.abs(getDatesDiff({ startDate, endDate }))

    let referenceDate = dayjs('2000-01-01')
    const targetDate = referenceDate.add(days, 'day')

    const years = targetDate.diff(referenceDate, 'year')
    referenceDate = referenceDate.add(years, 'year')

    const months = targetDate.diff(referenceDate, 'month') || 1
    referenceDate = referenceDate.add(months, 'month')

    const remainingDays = targetDate.diff(referenceDate, 'day')

    return {
      years,
      months,
      days: remainingDays,
    }
  }

  return {}
}
