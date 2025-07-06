<script setup>
import { computed } from 'vue'

import DefaultLoader from './DefaultLoader.vue'

defineOptions({ name: 'CoreContentLoader' })

const props = defineProps({
  type: { type: String, default: 'default' },
  height: { type: Number, default: 0 },
  primaryColor: { type: String, default: 'currentColor' },
  secondaryColor: { type: String, default: '' },
  speed: { type: Number, default: 2 },
  rows: { type: Number, default: 1 },
  cols: { type: Number, default: 1 },
})

const contentLoaderComponent = computed(() => {
  return {
    DefaultLoader: props.type === 'default' ? DefaultLoader : null,
  }
})
</script>

<template>
  <component
    :is="contentLoaderComponent"
    class="w-full h-auto max-h-full text-gray-300"
    :primary-color="primaryColor"
    :secondary-color="secondaryColor"
    :speed="speed"
    :rows="rows"
    :cols="cols"
    :height="height"
    v-bind="$attrs"
  />
</template>
