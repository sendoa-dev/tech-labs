import { mount } from '@vue/test-utils'

import CoreInputTemplate from '@/_InputTemplate/index.vue'

async function createWrapper (override = {}) {
  const wrapper = mount(CoreInputTemplate, override)

  return { wrapper }
}

describe('CoreInputTemplate', () => {
  test('renders correctly with default props', async () => {
    const { wrapper } = await createWrapper()
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.classes()).toContain('core-input-base')
  })

  test('applies disabled and readonly classes based on props', async () => {
    const { wrapper } = await createWrapper({
      propsData: {
        disabled: true,
        readonly: false,
      },
    })
    expect(wrapper.classes()).toContain('core-input-base--disabled')
  })

  test('applies disabled and readonly classes based on props', async () => {
    const { wrapper } = await createWrapper({
      propsData: {
        disabled: false,
        readonly: true,
      },
    })
    expect(wrapper.classes()).toContain('core-input-base--readonly')
  })

  test('applies disabled and readonly classes based on props', async () => {
    const { wrapper } = await createWrapper({
      propsData: {
        disabled: true,
        readonly: true,
      },
    })
    expect(wrapper.classes()).not.toContain('core-input-base--disabled')
    expect(wrapper.classes()).toContain('core-input-base--readonly')
  })

  test('displays error message when provided', async () => {
    const errorMessage = 'Error message'
    const { wrapper } = await createWrapper({
      propsData: {
        errorMessage,
      },
    })
    expect(wrapper.text()).toContain(errorMessage)
  })

  test('displays help message when provided and no error message', async () => {
    const helpMessage = 'Help message'
    const { wrapper } = await createWrapper({
      propsData: {
        helpMessage,
      },
    })
    expect(wrapper.text()).toContain(helpMessage)
  })

  test('does not display help message when error message is present', async () => {
    const { wrapper } = await createWrapper({
      propsData: {
        errorMessage: 'Error message',
        helpMessage: 'Help message',
      },
    })
    expect(wrapper.text()).not.toContain('Help message')
  })

  test('shows character count when charCount and maxLength are provided', async () => {
    const { wrapper } = await createWrapper({
      propsData: {
        charCount: true,
        maxLength: 100,
        charAmount: 50,
      },
    })
    expect(wrapper.text()).toContain('50 / 100')
  })
})
