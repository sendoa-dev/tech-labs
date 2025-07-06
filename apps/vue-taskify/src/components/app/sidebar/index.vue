<script setup>
import router from '@/modules/router'
import { useBoardsStore } from '@/modules/stores/boards'

const boardsStore = useBoardsStore()

const onNavigateBoard = (board) => {
  boardsStore.setCurrentBoardId(board.id)

  router.push({ name: 'DashboardBoardView', params: { id: board.id }})
}
</script>

<template>
  <div class="flex flex-col min-w-48 bg-zinc-700 min-h-full text-white">
    <div class="text-2xl font-bold h-16 flex items-center justify-center">Taskify</div>

    <div class="flex flex-col gap-2 p-4">
      <div class="text-lg font-semibold mb-4">
        All boards ({{ boardsStore.boards.length }})
      </div>

      <div
        class="ml-2 my-1 p-1 cursor-pointer"
        v-for="board in boardsStore.boards"
        tabindex="0"
        role="button"
        @keypress.enter="onNavigateBoard(board)"
        @click="onNavigateBoard(board)"
      >
        <i class="pi pi-book mr-2" />
        {{ board.name }}
      </div>
    </div>
  </div>
</template>