import { CoreButton } from '@tech-labs/core-vue-components'

import { generateComponentCombinations, generateComponentPlayground } from '../_helpers'

const categoryOptions = ['primary', 'yellow', 'light']
const sizeOptions = ['full', 'md']
const outlineOptions = [false, true]
const disabledOptions = [false, true]

export default {
  title: 'Components/CoreButton',
  component: CoreButton,
  argTypes: {
    category: { control: { type: 'select' }, options: categoryOptions },
    size: { control: { type: 'select' }, options: sizeOptions },
    outline: { control: 'boolean', options: outlineOptions },
    disabled: { control: 'boolean', options: disabledOptions },
  },
}

export const Playground = generateComponentPlayground({
  component: CoreButton,
  args: {
    category: categoryOptions[0],
    size: sizeOptions[0],
    outline: outlineOptions[0],
    disabled: disabledOptions[0],
  },
})

export const AllCombinations = generateComponentCombinations({
  component: CoreButton,
  args: {
    category: categoryOptions,
    size: sizeOptions,
    outline: outlineOptions,
    disabled: disabledOptions,
  },
})
