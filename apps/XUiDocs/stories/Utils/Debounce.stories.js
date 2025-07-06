import { debounce } from '@tech-labs/core-utils'
import { ref } from 'vue'

export default {
  title: 'Utils/Debounce',
  argTypes: {
    wait: { control: 'number' },
    immediate: { control: 'boolean' },
  },
}

const Template = (args) => {
  const result = ref('Not Debounced')

  const runDebounce = () => {
    result.value = 'Debound calling...'

    debounce(() => {
      result.value = 'Debound finished'
    }, args.wait, args.immediate)
  }

  return {
    template: `
      <button class="ui-button ui-button--primary ui-button--md" @click="runDebounce">Run</button>
      <div>{{ result }}</div>
    `,
    setup () {
      return { runDebounce, result }
    },
  }
}

export const Default = Template.bind({})
Default.args = {
  wait: 3000,
  immediate: false,
}
