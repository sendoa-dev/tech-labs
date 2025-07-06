import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import duration from 'dayjs/plugin/duration'
import isToday from 'dayjs/plugin/isToday'
import localeData from 'dayjs/plugin/localeData'
import relativeTime from 'dayjs/plugin/relativeTime'
import utc from 'dayjs/plugin/utc'
import 'dayjs/locale/en'
import 'dayjs/locale/es'

const config = {
  thresholds: [
    { l: 's', r: 1 },
    { l: 'ss', r: 59, d: 'second' },
    { l: 'm', r: 1 },
    { l: 'mm', r: 59, d: 'minute' },
    { l: 'h', r: 1 },
    { l: 'hh', r: 23, d: 'hour' },
    { l: 'd', r: 1 },
    { l: 'dd', r: 29, d: 'day' },
    { l: 'M', r: 1 },
    { l: 'MM', r: 11, d: 'month' },
    { l: 'y' },
    { l: 'yy', d: 'year' },
  ],
}

dayjs.locale('en')

dayjs.extend(customParseFormat)
dayjs.extend(duration)
dayjs.extend(relativeTime, config)
dayjs.extend(utc)
dayjs.extend(isToday)
dayjs.extend(localeData)

export const DATE_API_FORMAT = 'YYYY-MM-DD'
export const DATE_DAY_MONTH_YEAR_FORMAT = 'DD-MM-YYYY'
export const DATE_DAY_LONG_MONTH_FORMAT = 'DD-MMM'
export const DATE_YEAR_FORMAT = 'YYYY'
export const DATE_LONG_MONTH_FORMAT = 'MMM'
export const DATE_MONTH_YEAR_FORMAT = 'MM-YYYY'
export const DATE_MIN_HOUR_FORMAT = 'HH:mm'

export default dayjs

export const setDayjsLocale = async (dayjsInstance, locale) => {
  const ALLOWED_LOCALES = {
    en: { weekStart: 0 },
    es: { weekStart: 1 },
  }

  if (ALLOWED_LOCALES[locale.toLowerCase()]) {
    dayjsInstance.locale(locale, ALLOWED_LOCALES[locale])
  }
}
