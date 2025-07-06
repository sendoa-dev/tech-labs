import { mount } from '@vue/test-utils'

import CoreInputRadio from '@/InputRadio/index.vue'
import CoreInputRadioGroup from '@/InputRadioGroup/index.vue'

async function createWrapper (override = {}) {
  const wrapper = mount(CoreInputRadioGroup, override)
  return { wrapper }
}

describe('CoreInputRadioGroup', () => {
  test('renders without errors', async () => {
    const { wrapper } = await createWrapper()
    expect(wrapper.exists()).toBe(true)
  })

  test('renders all radio options provided', async () => {
    const values = [
      { label: 'Option 1', value: '1' },
      { label: 'Option 2', value: '2' },
    ]
    const { wrapper } = await createWrapper({ propsData: { values } })
    expect(wrapper.findAllComponents(CoreInputRadio).length).toBe(values.length)
  })

  test('updates modelValue on option click', async () => {
    const values = [
      { label: 'Option 1', value: '1' },
      { label: 'Option 2', value: '2' },
    ]
    const { wrapper } = await createWrapper({ propsData: { values } })

    await wrapper.findAllComponents(CoreInputRadio)[0].vm.$emit('update:model-value', values[0].value)

    expect(wrapper.emitted()['update:model-value'][0]).toEqual(['1'])
  })

  test('does not update modelValue when disabled', async () => {
    const values = [
      { label: 'Option 1', value: '1' },
      { label: 'Option 2', value: '2' },
    ]
    const { wrapper } = await createWrapper({ propsData: { values }, disabled: true })
    await wrapper.findAllComponents(CoreInputRadio)[0].trigger('click')
    expect(wrapper.emitted()['update:model-value']).toBeFalsy()
  })

  test.todo('emits blur event when radio option is blurred', async () => {
    const values = [
      { label: 'Option 1', value: '1' },
      { label: 'Option 2', value: '2' },
    ]
    const { wrapper } = await createWrapper({ propsData: { values } })
    await wrapper.findAllComponents(CoreInputRadio)[0].trigger('blur')

    expect(wrapper.emitted('blur')).toBeTruthy()
  })

  test('renders label from slot when provided', async () => {
    const values = [{ label: 'Option 1', value: '1' }]
    const slotContent = 'Custom Label'
    const { wrapper } = await createWrapper({
      propsData: { values },
      slots: {
        label: slotContent,
      },
    })
    expect(wrapper.html()).toContain(slotContent)
  })
})
