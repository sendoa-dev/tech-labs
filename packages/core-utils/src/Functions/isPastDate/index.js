import dayjs from '@/Functions/_date'

export default ({ date = null } = {}) => dayjs().isAfter(dayjs(date))
