<script setup>
import { ref, toRefs, computed, watch, onMounted } from 'vue'

import CoreIcon from '@/Icon/index.vue'

const PROGRESS_ANIMATION_TIME = 1000
const CLOSING_ANIMATION_TIME = 200

defineOptions({ name: 'CoreNotification' })

const props = defineProps({
  type: {
    type: String,
    required: true,
    validator: (value) => ['green', 'warning', 'error', 'info'].includes(value),
  },
  body: {
    type: String,
    default: '',
  },
  icon: {
    type: String,
    default: '',
  },
  progress: {
    type: Number,
    default: null,
  },
  closable: {
    type: Boolean,
    default: true,
  },
  duration: {
    type: Number,
    default: 3000,
  },
})

const emits = defineEmits({
  'remove-notification': null,
})

const isClosing = ref(false)

const notificationIcon = computed(() => {
  switch (props.type) {
    case 'green':
      return 'info-filled'
    case 'warning':
    case 'error':
      return 'info-filled'
    case 'info':
      return 'info-filled'

    default:
      return null
  }
})

const displayProgressBar = computed(() => props.progress !== null)

const progressStyles = computed(() => ({
  width: `${props.progress}%`,
  transition: `width ${PROGRESS_ANIMATION_TIME}ms ease`,
}))

const notificationClasses = computed(() => ({
  'core-notification__content-green': props.type === 'green',
  'core-notification__content-warning': props.type === 'warning',
  'core-notification__content-error': props.type === 'error',
  'core-notification__content-info': !props.type || props.type === 'info',
  'core-notification--closing': isClosing.value,
}))

const closeNotification = (closeDelay = 0) => {
  closeDelay
    ? setTimeout(() => { isClosing.value = true }, closeDelay)
    : isClosing.value = true

  setTimeout(() => { emits('remove-notification') }, closeDelay + CLOSING_ANIMATION_TIME)
}

const onProgressAutoClose = (progressValue) => {
  if (progressValue === 100) {
    closeNotification(PROGRESS_ANIMATION_TIME)
  }
}

const { progress } = toRefs(props)

if (displayProgressBar.value) {
  watch(progress, onProgressAutoClose)
}

onMounted(() => {
  if (!displayProgressBar.value) {
    closeNotification(props.duration)
  }
})
</script>

<template>
  <div
    class="core-notification flex items-center px-10 min-h-16 md:text-20 mt-2 mx-auto"
    :class="notificationClasses"
  >
    <template v-if="notificationIcon">
      <CoreIcon
        data-test="core-notification-icon"
        :icon="notificationIcon"
        class="core-notification__icon left-3 top-5 w-6 absolute cursor-pointer"
      />
    </template>

    <div
      class="core-notification__body text-left md:text-center px-4 inline"
      data-test="core-notification-body"
    >
      {{ body }}
    </div>

    <template v-if="displayProgressBar">
      <div
        class="h-1 right-0 left-0 bottom-0 absolute bg-blue-200"
        data-test="core-notification-progress"
      >
        <div
          class="h-1 bottom-0 absolute bg-blue"
          data-test="core-notification-progress-bar"
          :style="progressStyles"
        />
      </div>
    </template>

    <template v-if="!!closable">
      <CoreIcon
        icon="close"
        data-test="core-notification-close"
        class="right-3 top-6 w-4 absolute cursor-pointer"
        @click="closeNotification()"
      />
    </template>
  </div>
</template>

<style lang="postcss">
.core-notification {
  width: fit-content;

  --growl-animation-duration: 0.2s;

  animation-fill-mode: forwards;
  animation-duration: var(--growl-animation-duration);
  animation-name: growl-in;
}

.core-notification__content {
  @apply text-black;
}

.core-notification__content--green {
  @apply bg-green-300;
}

.core-notification__content--green .core-notification__icon {
  @apply text-green-500 fill-white;
}

.core-notification__content--warning {
  @apply bg-yellow-200;
}

.core-notification__content--warning .core-notification__icon {
  @apply text-yellow-500 fill-white;
}

.core-notification__content--error {
  @apply bg-red-200;
}

.core-notification__content--error .core-notification__icon {
  @apply text-red-500 fill-white;
}

.core-notification__content--info {
  @apply bg-blue-200;
}

.core-notification__content--info .core-notification__icon {
  @apply text-blue-500 fill-white;
}

.core-notification__body {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  word-break: break-word;
}

.core-notification--closing {
  animation-fill-mode: forwards;
  animation-duration: var(--growl-animation-duration);
  animation-name: growl-out;
}

@keyframes growl-in {
  0% {
    transform: translateY(100%);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes growl-out {
  0% {
    transform: translateY(0);
    opacity: 1;
  }
  100% {
    transform: translateY(100%);
    opacity: 0;
  }
}
</style>
