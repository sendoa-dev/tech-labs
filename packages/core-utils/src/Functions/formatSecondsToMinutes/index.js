import date from '@/Functions/_date'

export default (seconds = 0) => date.duration(seconds * 1000).minutes()
