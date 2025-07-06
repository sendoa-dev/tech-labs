<script setup>
import { ref } from 'vue'

import UiTaskCard from '@/components/ui/TaskCard.vue'
import { useDnD } from '@/composables/useDnD.ts'
import { useBoardsStore } from '@/modules/stores/boards'

defineOptions({ name: 'DashboardView' })

const boardStore = useBoardsStore()

const {
  onDragStart,
  onDragOverItem,
  onDragOverEmptyGroup,
  getDropResult,
} = useDnD()

const onDrop = () => {
  const dropResult = getDropResult()
  if (!dropResult) return

  const { item, originGroupId, targetGroupId, index } = dropResult

  const originColumn = boardStore.currentBoard.columns.find(column => column.id === originGroupId)
  const targetColumn = boardStore.currentBoard.columns.find(column => column.id === targetGroupId)

  if (!originColumn || !targetColumn) return

  const taskIndex = originColumn.tasks.findIndex(task => task.id === item.id)
  if (taskIndex !== -1) {
    originColumn.tasks.splice(taskIndex, 1)
  }

  targetColumn.tasks.splice(index, 0, item)
}

const unusedVar = true
</script>

<template>
  <div class="flex gap-4">
    <div
      v-for="column in boardStore.currentBoard.columns"
      :key="column.id"
      class="flex-1 flex flex-col gap-4 bg-zinc-800 rounded p-4"
      tabindex="0"
      role="button"
      @drop="onDrop"
      @dragover.prevent="onDragOverEmptyGroup($event, column.id)"
    >
      <div class="text-center text-white rounded border px-4 py-2 font-bold mb-2">{{ column.name }}</div>

      <UiTaskCard
        v-for="(task, index) in column.tasks" :key="task.id"
        class="cursor-move"
        draggable="true"
        @dragstart="() => onDragStart(task, column.id)"
        @dragover.prevent="(e) => onDragOverItem(e, column.id, index)"
      >
        <template #title>{{ task.title }}</template>
        <template #description>{{ task.description }}</template>
      </UiTaskCard>

      <div
        class="cursor-pointer min-h-12 p-4 flex items-center justify-center text-zinc-400 border border-dashed"
      >
      Add new task here
      </div>

      <div
        v-if="column.tasks.length === 0"
        class="min-h-24 p-4 flex items-center justify-center text-zinc-400 border border-dashed"
      >
        There are no task for '{{ column.name }}' column.
      </div>
    </div>

    <div
      class="max-w-64 flex-1 flex flex-col gap-4 bg-zinc-800 rounded p-4"
      tabindex="0"
      role="button"
      @keypress.enter="onClickNewColumn"
      @click="onClickNewColumn"
    >
      <div
        class="cursor-pointer min-h-24 p-4 flex items-center justify-center text-zinc-400 border border-dashed"
      >
        Click here to create a new column
      </div>
    </div>
  </div>
</template>
