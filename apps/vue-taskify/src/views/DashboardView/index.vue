<script setup>
import AppHeader from '@/components/app/header/index.vue'
import AppSidebar from '@/components/app/sidebar/index.vue'
import router from '@/modules/router'
import { useBoardsStore } from '@/modules/stores/boards'
import { boards } from '@/views/DashboardView/mockData.ts'

defineOptions({ name: 'DashboardView'})

const boardsStore = useBoardsStore()

boardsStore.setBoards(boards)
boardsStore.setCurrentBoardId(boards[0].id)

router.push({ name: 'DashboardBoardView', params: { id: boardsStore.currentBoardId }})
</script>

<template>
  <div class="flex min-h-screen w-screen">
    <AppSidebar />

    <div class="flex flex-col flex-1">
      <AppHeader />

      <div class="flex-1 bg-zinc-900 p-4">
        <RouterView />
      </div>
    </div>
  </div>
</template>


<style scoped>
</style>