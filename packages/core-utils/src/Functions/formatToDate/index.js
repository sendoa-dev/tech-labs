import dayjs, { DATE_DAY_MONTH_YEAR_FORMAT } from '@/Functions/_date'

export default ({ date }) => {
  return date ? dayjs(date).format(DATE_DAY_MONTH_YEAR_FORMAT) : null
}
