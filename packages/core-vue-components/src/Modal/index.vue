<script setup>
import { ref, computed, useSlots, watch } from 'vue'

import CoreIcon from '@/Icon/index.vue'

const CLOSE_MODAL_TIMEOUT = 300

defineOptions({ name: 'CoreModal' })

const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
  contentClasses: {
    type: [String, Object],
    default: '',
  },
})

const slots = useSlots()

const emits = defineEmits({
  close: null,
})

const teleportNode = ref('')
const modalWrapperId = 'core-modal-wrapper'
const modalWrapperSelector = ref(`#${modalWrapperId}`)
teleportNode.value = document.querySelector(modalWrapperSelector.value)

if (!teleportNode.value) {
  teleportNode.value = document.createElement('div')
  teleportNode.value.setAttribute('id', modalWrapperId)
  document.querySelector('body').appendChild(teleportNode.value)
}

const existingBodyContent = computed(() => typeof slots.body !== 'undefined')
const existingFooterContent = computed(() => typeof slots.footer !== 'undefined')

const contentVisibility = ref('')

const isSafariIOS = () => {
  const ua = navigator.userAgent
  const isSafari = /^((?!chrome|android).)*safari/i.test(ua)
  const isIOS = /iPad|iPhone|iPod/.test(navigator.platform) ||
                (navigator.userAgent.includes('Mac') && 'ontouchend' in document)

  return isSafari && isIOS
}

const handleSafariFooter = ({ visible }) => {
  if (isSafariIOS()) {
    setTimeout(() => {
      const footerNode = document.querySelector('.core-modal__content-footer')

      if (footerNode) {
        const padding = visible ? '64px' : '0'
        footerNode.style.paddingBottom = padding
      }
    })
  }
}

const handleModalVisibility = () => {
  if (props.visible) {
    contentVisibility.value = true

    addBodyOverflowRemoval()

    handleSafariFooter({ visible: true })
  } else {
    contentVisibility.value = false

    removeBodyOverflowRemoval()

    handleSafariFooter({ visible: false })
  }
}

const removeBodyOverflowRemoval = () => {
  document.querySelector('body').classList.remove('overflow-hidden')
}
const addBodyOverflowRemoval = () => {
  document.querySelector('body').classList.add('overflow-hidden')
}

const close = () => {
  contentVisibility.value = false

  setTimeout(() => {
    removeBodyOverflowRemoval()

    emits('close')

    handleSafariFooter({ visible: false })
  }, CLOSE_MODAL_TIMEOUT)
}

watch(() => props.visible, handleModalVisibility, { immediate: true })
</script>

<template>
  <teleport :to="modalWrapperSelector">
    <div
      class="core-modal"
      v-bind="$attrs"
    >
      <Transition
        name="slide-fade"
        enter-active-class="slide-fade-enter-active"
        leave-active-class="slide-fade-leave-active"
      >
        <div
          v-if="contentVisibility"
          class="core-modal__backdrop"
        />
      </Transition>
      <Transition
        name="slide-fade"
        enter-active-class="slide-fade-enter-active"
        leave-active-class="slide-fade-leave-active"
      >
        <div
          v-if="contentVisibility"
          ref="modal"
          class="core-modal__content"
          :class="contentClasses"
        >
          <slot
            name="header"
            :close="close"
          >
            <div class="core-modal__content-header">
              <CoreIcon
                icon="close"
                class="core-modal__content-header-close"
                :size="28"
                @click="close"
                @keypress="close"
              />
            </div>
          </slot>

          <template v-if="$slots['title']">
            <div class="core-modal__content-title">
              <slot name="title" />
            </div>
          </template>

          <template v-if="existingBodyContent">
            <div class="core-modal__content-body">
              <slot name="body" />
            </div>
          </template>

          <template v-if="existingFooterContent">
            <div class="core-modal__content-footer">
              <slot name="footer" />
            </div>
          </template>
        </div>
      </Transition>
    </div>
  </teleport>
</template>

<style lang="postcss">
#core-modal-wrapper {
  @apply h-0 w-0;
}

.core-modal {
  @apply fixed z-[100] inset-0 min-h-screen min-w-full;
}

.core-modal__backdrop {
  @apply fixed inset-0 bg-black bg-black/40;
}

.core-modal__content {
  @apply fixed inset-0 h-screen w-full bg-white py-5 px-8 flex flex-col overflow-y-auto lg:w-1/2 lg:inset-auto lg:top-0 lg:right-0 lg:shadow;
}

.core-modal__content-header {
  @apply relative w-full flex;
}

.core-modal__content-header-close {
  @apply bg-black rounded-full text-white stroke-2 cursor-pointer;
}

.core-modal__content-title {
  @apply relative w-full mt-10 text-3xl mb-8;
}

.core-modal__content-body {
  @apply flex-1 relative w-full;
}

.core-modal__content-footer {
  @apply relative w-full mt-10;
}

.slide-fade-enter-active {
  transition: all 0.3s ease-in;
}

.slide-fade-leave-active {
  transition: all 0.3s ease-in;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(20px);
  opacity: 0;
}
</style>
