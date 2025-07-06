<script setup>
import { useScreens } from '@tech-labs/core-composables'
import { ref } from 'vue'

defineOptions({
  name: 'App',
})

const routerViewPathKey = ref(new Date().getTime())

const useScreensComposable = useScreens()
useScreensComposable.init()

const unusedVariable = 'test'
</script>

<template>
  <RouterView
    :key="routerViewPathKey"
  />
</template>
