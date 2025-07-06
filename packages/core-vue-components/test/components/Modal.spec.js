import { mount, flushPromises } from '@vue/test-utils'

import CoreModal from '@/Modal/index.vue'

const createWrapper = (override) => {
  const wrapper = mount(CoreModal, {
    ...override,
    global: { stubs: { teleport: true } },
    attachTo: document.body,
  })

  return { wrapper }
}

describe('CoreModal', () => {
  beforeEach(() => { vi.useFakeTimers() })
  afterEach(() => { vi.clearAllTimers() })

  afterEach(() => {
    document.body.innerHTML = ''
  })

  test('does not render content when not visible', async () => {
    const { wrapper } = createWrapper()

    expect(wrapper.find('.core-modal__content').exists()).toBe(false)
  })

  test('renders content when visible', async () => {
    const { wrapper } = createWrapper({ propsData: { visible: true } })

    await flushPromises()

    expect(wrapper.find('.core-modal__content').exists()).toBe(true)
  })

  test('renders title, body, and footer slots when provided', async () => {
    const { wrapper } = createWrapper(
      {
        propsData: { visible: true },
        slots: {
          title: '<div>Title slot</div>',
          body: '<div>Body slot</div>',
          footer: '<div>Footer slot</div>',
        },
      },
    )
    await flushPromises()

    expect(wrapper.html()).toContain('Title slot')
    expect(wrapper.html()).toContain('Body slot')
    expect(wrapper.html()).toContain('Footer slot')
  })

  test('closes modal and emits close event when close icon is clicked', async () => {
    const { wrapper } = createWrapper({ propsData: { visible: true } })
    await wrapper.find('.core-modal__content-header-close').trigger('click')

    await vi.runAllTimers()

    expect(wrapper.emitted()).toHaveProperty('close')
  })

  test('applies overflow-hidden class to body when modal is visible', async () => {
    const { wrapper } = createWrapper({ propsData: { visible: true } })

    expect(document.body.classList.contains('overflow-hidden')).toBe(true)

    await wrapper.find('.core-modal__content-header-close').trigger('click')

    await vi.runAllTimers()

    expect(document.body.classList.contains('overflow-hidden')).toBe(false)
  })

  test('removes overflow-hidden class from body when modal is closed', async () => {
    const { wrapper } = createWrapper({ propsData: { visible: true } })
    await wrapper.find('.core-modal__content-header-close').trigger('click')

    await vi.runAllTimers()

    expect(document.body.classList.contains('overflow-hidden')).toBe(false)
  })

  test('properly handles programmatic modal close and class removal from body', async () => {
    const { wrapper } = createWrapper({ propsData: { visible: true } })
    await wrapper.setProps({ visible: false })

    await flushPromises()
    expect(document.body.classList.contains('overflow-hidden')).toBe(false)
  })
})
