import date, { DATE_API_FORMAT } from '@/Functions/_date'

export default d => date(d).format(DATE_API_FORMAT)
