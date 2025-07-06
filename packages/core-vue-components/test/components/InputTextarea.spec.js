import { mount } from '@vue/test-utils'

import CoreInputTextarea from '@/InputTextarea/index.vue'

async function createWrapper (override = {}) {
  const wrapper = mount(CoreInputTextarea, override)

  return { wrapper }
}

describe('CoreInputTextarea', async () => {
  test('renders correctly with default props', async () => {
    const { wrapper } = await createWrapper()

    expect(wrapper.find('textarea').exists()).toBe(true)
  })

  test.todo('binds modelValue to the textarea', async () => {
    const { wrapper } = await createWrapper({ propsData: { modelValue: 'Initial value' } })

    expect(wrapper.html()).toContain('Initial value')
  })

  test('updates modelValue on input', async () => {
    const { wrapper } = await createWrapper()
    const input = wrapper.find('textarea')

    await input.setValue('New value')

    expect(wrapper.emitted()['update:model-value'][0]).toEqual(['New value'])
  })

  test('emits blur event on textarea blur', async () => {
    const { wrapper } = await createWrapper()
    const input = wrapper.find('textarea')
    await input.trigger('blur')
    expect(wrapper.emitted().blur).toBeTruthy()
  })

  test('displays character count when enabled', async () => {
    const { wrapper } = await createWrapper({
      propsData: {
        modelValue: 'Test',
        maxLength: 100,
        charCount: true,
      },
    })

    expect(wrapper.text()).toContain('4 / 100')
  })

  test('applies passed props to the CoreInputTemplate', async () => {
    const { wrapper } = await createWrapper({
      propsData: {
        id: 'test-textarea',
        label: 'Test Label',
        errorMessage: 'Error message',
      },
    })

    expect(wrapper.find('label').text()).toContain('Test Label')
    expect(wrapper.html()).toContain('Error message')
  })
})
