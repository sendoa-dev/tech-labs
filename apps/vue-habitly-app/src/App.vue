<script setup>
import { useScreens } from '@tech-labs/core-composables'
import { vueFilenameGenerator } from '@tech-labs/core-utils'
import { CoreNotifications } from '@tech-labs/core-vue-components'
import PullToRefresh from 'pulltorefreshjs'
import { ref, onMounted, onUnmounted } from 'vue'

defineOptions({ name: vueFilenameGenerator(import.meta.url) })

const useScreensComposable = useScreens()
useScreensComposable.init()

const routerViewPathKey = ref(new Date().getTime())
const pullToRefreshInstance = ref(null)

onMounted(() => {
  pullToRefreshInstance.value = PullToRefresh.init({
    mainElement: '#app-main',
    onRefresh () { routerViewPathKey.value = new Date().getTime() },
    distReload: 100,
    distIgnore: 100,
    distMax: 100,
    instructionsPullToRefresh: ' ',
    instructionsReleaseToRefresh: ' ',
    instructionsRefreshing: ' ',
  })
})

onUnmounted(() => {
  pullToRefreshInstance.value.destroyAll()
})
</script>

<template>
  <div id="app-main">
    <RouterView :key="routerViewPathKey" />

    <CoreNotifications />
  </div>
</template>
