import date, { DATE_DAY_LONG_MONTH_FORMAT } from '@/Functions/_date'

export default d => date(d).format(DATE_DAY_LONG_MONTH_FORMAT)
