import { mount } from '@vue/test-utils'

import CoreButton from '@/Button/index.vue'

async function createWrapper (override = {}) {
  const wrapper = mount(CoreButton, override)
  return { wrapper }
}

describe('CoreButton', () => {
  test('renders without errors', async () => {
    const { wrapper } = await createWrapper()
    expect(wrapper.exists()).toBe(true)
  })

  test('applies default classes correctly', async () => {
    const { wrapper } = await createWrapper()
    expect(wrapper.classes()).toContain('core-button')
    expect(wrapper.classes()).toContain('core-button--primary')
    expect(wrapper.classes()).toContain('core-button--full')
    expect(wrapper.classes()).not.toContain('core-button--outline')
    expect(wrapper.classes()).not.toContain('core-button--disabled')
  })

  test.each([
    ['primary', 'full', false, false, ['core-button--primary', 'core-button--full']],
    ['secondary', 'md', true, false, ['core-button--secondary', 'core-button--md', 'core-button--outline']],
  ])('applies custom classes when props are provided: category=%s, size=%s, outline=%s, disabled=%s', async (category, size, outline, disabled, expectedClasses) => {
    const { wrapper } = await createWrapper({
      props: { category, size, outline, disabled },
    })
    for (const className of expectedClasses) {
      expect(wrapper.classes()).toContain(className)
    }
  })

  test('emits click event when button is clicked', async () => {
    const { wrapper } = await createWrapper()
    await wrapper.trigger('click')
    expect(wrapper.emitted()).toHaveProperty('click')
  })

  test('disables button when disabled prop is true', async () => {
    const { wrapper } = await createWrapper({
      props: {
        disabled: true,
      },
    })
    expect(wrapper.attributes('disabled')).toBe('')
    expect(wrapper.classes()).toContain('core-button--disabled')
  })

  test('renders slot content correctly', async () => {
    const slotContent = 'Custom Button Text'
    const { wrapper } = await createWrapper({
      slots: {
        default: slotContent,
      },
    })
    expect(wrapper.text()).toContain(slotContent)
  })
})
