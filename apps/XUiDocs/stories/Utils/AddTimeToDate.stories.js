import { addTimeToDate } from '@tech-labs/core-utils'

import { generateUtilCombinations, generateUtilPlayground } from '../_helpers'

const datesOptions = ['01/01/2023', 'invalid date', undefined, null]
const timeOptions = ['12:30', 'invalid time', undefined, null]

export default {
  title: 'Utils/AddTimeToDate',
  argTypes: {
    date: { control: 'date' },
    time: { control: 'text' },
  },
}

export const Playground = generateUtilPlayground({
  fn: addTimeToDate,
  args: {
    date: datesOptions[0],
    time: timeOptions[0],
  },
})

export const AllCombinations = generateUtilCombinations({
  fn: addTimeToDate,
  args: {
    date: datesOptions,
    time: timeOptions,
  },
})
