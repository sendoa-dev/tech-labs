import dayjs from '@/Functions/_date'

export default ({ date, locale }) => {
  const dayjsDate = dayjs(date)

  const monthName = new Intl.DateTimeFormat(locale, { month: 'short' }).format(dayjsDate)

  return `${monthName}. ${dayjs(date).year()}`
}
