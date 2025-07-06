<script setup>
import { useBoardsStore } from '@/modules/stores/boards'

const boardsStore = useBoardsStore()
</script>

<template>
  <div class="flex flex-row items-center justify-between gap-2 min-h-16 p-4 bg-zinc-700 text-white">
    {{ boardsStore.currentBoard.name }}

    <div class="flex flex-row items-center gap-2">
      <div>Add new</div>

      <div class="flex flex-row items-center gap-2">
        <i class="pi pi-plus" />
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>