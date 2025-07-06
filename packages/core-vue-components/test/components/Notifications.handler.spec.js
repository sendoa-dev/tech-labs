import { getNotifications, createNotification, updateNotification, removeNotification, resetNotifications } from '@/Notifications/handler.js'

describe('Notifications handler', () => {
  vi.useFakeTimers()

  test('fetches initial notifications', () => {
    const notifications = getNotifications()
    expect(notifications).toEqual([])
  })

  test('does not create any notification with wrong structure', () => {
    createNotification('newNotification')
    const notifications = getNotifications()
    expect(notifications).toEqual([])
  })

  test('creates a new notification', async () => {
    const newNotification = { type: 'info', body: 'Information' }
    const notificationId = createNotification(newNotification)

    expect(notificationId).toBe(0)
    expect(getNotifications().length).toBe(1)
    expect(getNotifications()[0]).toMatchObject(newNotification)

    resetNotifications()
  })

  test('updates an existing notification', async () => {
    createNotification({ type: 'info', body: 'Old Info' })

    updateNotification(0, { body: 'Updated Info' })

    const notifications = getNotifications()

    expect(notifications[0].body).toBe('Updated Info')

    resetNotifications()
  })

  test('does not create anything on update with wrong id', async () => {
    createNotification({ type: 'info', body: 'Old Info' })
    updateNotification(100, { type: 'info', body: 'Updated Info' })

    const notifications = getNotifications()

    expect(notifications.length).toBe(1)
    expect(notifications[0].body).toBe('Old Info')

    resetNotifications()
  })

  test('removes a notification', async () => {
    createNotification({ type: 'success', body: 'Success message' })
    createNotification({ type: 'error', body: 'Error message' })

    removeNotification(0)

    const notifications = getNotifications()
    expect(notifications.length).toBe(1)
    expect(notifications[0].type).toBe('error')

    resetNotifications()
  })
})
