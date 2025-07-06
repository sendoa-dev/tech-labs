<script setup>
import { computed } from 'vue'

import { bootstrap, getIconsLibrary } from '@/Icon/iconsLoader.js'

defineOptions({ name: 'CoreIcon' })

const props = defineProps({
  icon: {
    type: String,
    required: true,
  },
  area: {
    type: Number,
    default: 40,
    validator: (e) => [24, 32, 40].includes(e),
  },
  size: {
    type: Number,
    default: null,
    validator: (e) => [null, 8, 12, 16, 20, 24, 28, 32, 40].includes(e),
  },
  source: {
    type: String,
    default: '',
  },
})

const iconsLibrary = computed(() => getIconsLibrary())

const calculatePaddingClass = (area, size) => {
  if (!size) return 'p-0'

  const padding = (area - size) / 2
  switch (padding) {
    case 16:
      return 'p-4'
    case 14:
      return 'p-3.5'
    case 12:
      return 'p-3'
    case 10:
      return 'p-2.5'
    case 8:
      return 'p-2'
    case 6:
      return 'p-1.5'
    case 4:
      return 'p-1'
    case 2:
      return 'p-0.5'
    case 0:
    default:
      return 'p-0'
  }
}

const iconContainerClasses = computed(() => {
  return calculatePaddingClass(props.area, props.size)
})

const iconSizeClass = (size) => {
  switch (size) {
    case 8:
      return 'w-2 h-2'
    case 12:
      return 'w-3 h-3'
    case 16:
      return 'w-4 h-4'
    case 20:
      return 'w-5 h-5'
    case 24:
      return 'w-6 h-6'
    case 28:
      return 'w-7 h-7'
    case 32:
      return 'w-8 h-8'
    case 40:
      return 'w-10 h-10'
    default:
      return 'w-full h-full'
  }
}

const iconSize = computed(() => {
  return iconSizeClass(props.size)
})

const iconComponent = computed(() => iconsLibrary.value[props.icon])

bootstrap()
</script>

<template>
  <div
    v-if="iconComponent"
    :class="iconContainerClasses"
    data-test="icon-container"
  >
    <component
      :is="iconComponent"
      :class="iconSize"
      data-test="icon-component"
    />
  </div>
</template>
