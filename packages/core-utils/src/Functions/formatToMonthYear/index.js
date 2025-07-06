import dayjs, { DATE_MONTH_YEAR_FORMAT } from '@/Functions/_date'

export default d => {
  return d ? dayjs(d).format(DATE_MONTH_YEAR_FORMAT) : null
}
