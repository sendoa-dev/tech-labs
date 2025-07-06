<script setup>
import { computed } from 'vue'

import { getNotifications, removeNotification } from './handler.js'
import CoreNotification from './Notification.vue'

defineOptions({ name: 'CoreNotifications' })

const notifications = computed(() => getNotifications())
</script>

<template>
  <div class="core-notifications fixed bottom-4 left-0 right-0 z-[999]">
    <CoreNotification
      v-for="notification in notifications"
      :key="notification.id"
      data-test="core-notification"
      :type="notification.type"
      :body="notification.body"
      :icon="notification.icon"
      :progress="notification.progress"
      :closable="notification.closable"
      :duration="notification.duration"
      @remove-notification="removeNotification(notification.id)"
    />
  </div>
</template>
