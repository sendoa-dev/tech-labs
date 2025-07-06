import dayjs from '@/Functions/_date'

export default ({ startDate, endDate, format = 'd', decimals = false }) => {
  const startDateDiff = dayjs(startDate)
  const endDateDiff = dayjs(endDate)

  return startDateDiff.diff(endDateDiff, format, decimals)
}
