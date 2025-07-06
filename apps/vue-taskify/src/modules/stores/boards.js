// stores/boards.ts
import { defineStore } from 'pinia'

export const useBoardsStore = defineStore('boards', {
  state: () => ({
    boards: [],
    currentBoardId: null,
  }),

  getters: {
    currentBoard (state) {
      return state.boards.find(board => board.id === state.currentBoardId) || null
    },
  },

  actions: {
    setBoards (boards) {
      this.boards = boards
    },
    setCurrentBoardId (id) {
      this.currentBoardId = id
    },
    moveTaskToIndex (itemId, sourceColumnId, targetColumnId, targetIndex) {
      const board = this.currentBoard
      if (!board) return

      const sourceColumn = board.columns.find(col => col.id === sourceColumnId)
      const targetColumn = board.columns.find(col => col.id === targetColumnId)

      if (!sourceColumn || !targetColumn) return

      const taskIndex = sourceColumn.tasks.findIndex(task => task.id === itemId)
      if (taskIndex === -1) return

      const [task] = sourceColumn.tasks.splice(taskIndex, 1)

      if (targetIndex == null || targetIndex > targetColumn.tasks.length) {
        targetColumn.tasks.push(task)
      } else {
        targetColumn.tasks.splice(targetIndex, 0, task)
      }
    },
  },
})
