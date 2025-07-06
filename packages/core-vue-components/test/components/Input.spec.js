import { mount } from '@vue/test-utils'

import CoreInput from '@/Input/index.vue'

async function createWrapper (override = {}) {
  const wrapper = mount(CoreInput, override)

  return {
    wrapper,
    inputSelector: '[data-test="input"]',
    iconSelector: '[data-test="input-icon"]',
  }
}

describe('CoreInput', () => {
  test('renders without errors', async () => {
    const { wrapper } = await createWrapper()
    expect(wrapper.exists()).toBe(true)
  })

  test('displays the label slot correctly', async () => {
    const labelSlot = 'Custom Label'
    const { wrapper } = await createWrapper({
      slots: {
        label: labelSlot,
      },
    })
    expect(wrapper.text()).toContain(labelSlot)
  })

  test('emits update:model-value when input value changes', async () => {
    const { wrapper, inputSelector } = await createWrapper()
    const input = wrapper.find(inputSelector)
    await input.setValue('New Value')
    expect(wrapper.emitted('update:model-value')[0]).toEqual(['New Value'])
  })

  test('renders icon when icon prop is passed', async () => {
    const { wrapper, iconSelector } = await createWrapper({
      props: { icon: 'search' },
    })
    const icon = wrapper.findComponent(iconSelector)
    expect(icon.exists()).toBe(true)
  })

  test('renders password toggle icon when type is password', async () => {
    const { wrapper, iconSelector } = await createWrapper({
      props: { type: 'password' },
    })
    const icon = wrapper.findComponent(iconSelector)
    expect(icon.exists()).toBe(true)
  })

  test('toggles password visibility when eye icon is clicked', async () => {
    const { wrapper, iconSelector } = await createWrapper({
      props: { type: 'password' },
    })
    const icon = wrapper.findComponent(iconSelector)
    await icon.trigger('click')
    expect(wrapper.vm.displayPassword).toBe(true)
    await icon.trigger('click')
    expect(wrapper.vm.displayPassword).toBe(false)
  })

  test('emits click-icon event when icon is clicked', async () => {
    const { wrapper, iconSelector } = await createWrapper({
      props: { icon: 'search' },
    })
    const icon = wrapper.findComponent(iconSelector)
    await icon.trigger('click')
    expect(wrapper.emitted('click-icon')).toBeTruthy()
  })

  test('renders error message when errorMessage prop is passed', async () => {
    const errorMessage = 'This field is required'
    const { wrapper } = await createWrapper({
      props: { errorMessage },
    })
    expect(wrapper.text()).toContain(errorMessage)
  })

  test('applies the correct class when charCount is true', async () => {
    const { wrapper } = await createWrapper({
      props: { charCount: true, modelValue: '12345', maxLength: 10 },
    })
    const input = wrapper.find('[data-test="input"]')
    expect(input.exists()).toBe(true)
    expect(wrapper.text()).toContain('5 / 10')
  })

  test('disables the input when disabled prop is true', async () => {
    const { wrapper, inputSelector } = await createWrapper({
      props: { disabled: true },
    })
    const input = wrapper.find(inputSelector)
    expect(input.attributes('disabled')).toBeDefined()
  })

  test('sets the input to readonly when readonly prop is true', async () => {
    const { wrapper, inputSelector } = await createWrapper({
      props: { readonly: true },
    })
    const input = wrapper.find(inputSelector)
    expect(input.attributes('readonly')).toBeDefined()
  })

  test('applies mask when mask prop is passed', async () => {
    const mockMask = vi.fn().mockReturnValue({
      typedValue: 'masked value',
      value: '123-456',
      updateValue: vi.fn(),
    })

    const { wrapper } = await createWrapper({
      props: { mask: mockMask, modelValue: '123456' },
    })

    expect(mockMask).toHaveBeenCalled()
    expect(wrapper.emitted('update:model-value')[0]).toEqual(['masked value'])
    expect(wrapper.emitted('update:model-value-with-mask')[0]).toEqual(['123-456'])
  })

  test('emits blur event when input loses focus', async () => {
    const { wrapper, inputSelector } = await createWrapper()
    const input = wrapper.find(inputSelector)
    await input.trigger('blur')
    expect(wrapper.emitted('blur')).toBeTruthy()
  })

  test('renders without template when templated prop is false', async () => {
    const { wrapper } = await createWrapper({
      props: { templated: false },
    })

    expect(wrapper.find('.core-input-base__label').exists()).toBe(false)
  })

  test('emits correct events when input value changes with mask', async () => {
    const mockMask = vi.fn().mockReturnValue({
      typedValue: 'masked value',
      value: '123-456',
      updateValue: vi.fn(),
    })

    const { wrapper, inputSelector } = await createWrapper({
      props: { mask: mockMask, modelValue: 'initial value' },
    })

    const input = wrapper.find(inputSelector)
    await input.setValue('new value')

    vi.useFakeTimers()
    vi.runAllTimers()

    expect(wrapper.emitted('update:model-value')[0]).toEqual(['masked value'])
    expect(wrapper.emitted('update:model-value-with-mask')[0]).toEqual(['123-456'])
  })
})
