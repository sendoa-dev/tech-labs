import dayjs from '@/Functions/_date'

export default ({ date, format = 'd', decimals = false }) => {
  const now = dayjs(new Date())
  const diffDate = dayjs(date)

  return diffDate.diff(now, format, decimals)
}
