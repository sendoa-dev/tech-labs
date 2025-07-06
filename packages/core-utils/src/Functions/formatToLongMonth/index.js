import date, { DATE_LONG_MONTH_FORMAT } from '@/Functions/_date'

export default d => date(d).format(DATE_LONG_MONTH_FORMAT)
