import { mount } from '@vue/test-utils'

import { getNotifications, removeNotification } from '@/Notifications/handler.js'
import CoreNotifications from '@/Notifications/index.vue'
import CoreNotification from '@/Notifications/Notification.vue'

vi.mock('@/Notifications/handler.js', () => ({
  getNotifications: vi.fn(),
  removeNotification: vi.fn(),
}))

async function createWrapper (override = {}) {
  const wrapper = mount(CoreNotifications, override)
  return { wrapper }
}

describe('CoreNotifications', () => {
  test('renders without errors', async () => {
    const { wrapper } = await createWrapper()
    expect(wrapper.exists()).toBe(true)
  })

  test('renders all notifications from the state', async () => {
    getNotifications.mockReturnValue([
      { type: 'success', body: 'Success message', icon: '', progress: null, closable: true, duration: 3000 },
      { type: 'error', body: 'Error message', icon: '', progress: null, closable: true, duration: 3000 },
    ])

    const { wrapper } = await createWrapper()

    expect(wrapper.findAllComponents(CoreNotification).length).toBe(2)
  })

  test('passes correct props to each notification', async () => {
    getNotifications.mockReturnValue([
      { type: 'success', body: 'Success message', icon: '', progress: null, closable: true, duration: 3000 },
      { type: 'error', body: 'Error message', icon: '', progress: null, closable: true, duration: 3000 },
    ])

    const { wrapper } = await createWrapper()
    const notifications = wrapper.findAllComponents(CoreNotification)

    expect(notifications[0].props()).toMatchObject({
      type: 'success',
      body: 'Success message',
      closable: true,
    })
    expect(notifications[1].props()).toMatchObject({
      type: 'error',
      body: 'Error message',
      closable: true,
    })
  })

  test.todo('removes a notification on remove-notification event', async () => {
    const { wrapper } = await createWrapper()
    const coreNotificationWrapper = wrapper.findAllComponents(CoreNotification)[0]
    coreNotificationWrapper.vm.$emit('remove-notification', 1)

    await wrapper.vm.$nextTick()
    expect(removeNotification).toHaveBeenCalledWith(1)
  })
})
