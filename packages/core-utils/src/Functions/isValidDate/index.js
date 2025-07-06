import date from '@/Functions/_date'

export default (d = null, format = undefined, strict = true) => date(d, format, strict).isValid()
