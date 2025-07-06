import { reactive } from 'vue'

const notificationsState = reactive({
  lastId: 0,
  notifications: [],
})

const getNotificationsLastId = () => notificationsState.lastId

export const getNotifications = () => notificationsState.notifications

export const createNotification = notification => {
  if (typeof notification !== 'object') {
    console.error(`Expecting object. ${typeof notification} found`)

    return null
  }
  const notificationId = getNotificationsLastId()

  notificationsState.lastId += 1

  notificationsState.notifications.push({
    ...notification,
    id: notificationId,
  })

  return notificationId
}

export const updateNotification = (notificationId, options) => {
  notificationsState.notifications = notificationsState.notifications.map(notification => {
    return notificationId !== notification.id
      ? notification
      : { ...notification, ...options }
  })
}

export const removeNotification = id => {
  notificationsState.notifications = notificationsState.notifications.filter(notification =>
    notification.id !== id,
  )
}

export const resetNotifications = id => {
  notificationsState.lastId = 0
  notificationsState.notifications = []
}
