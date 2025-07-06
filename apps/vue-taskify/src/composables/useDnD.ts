import { ref } from 'vue'

type GroupId = string | number

type DragData<T> = {
  item: T
  originGroupId: GroupId
}

export function useDnD<T> () {
  const dragData = ref<DragData<T> | null>(null)
  const dropGroupId = ref<GroupId | null>(null)
  const dropIndex = ref<number | null>(null)

  const onDragStart = (item: T, originGroupId: GroupId) => {
    dragData.value = { item, originGroupId }
  }

  const onDragOverItem = (
    event: DragEvent,
    targetGroupId: GroupId,
    index: number,
  ) => {
    event.preventDefault()
    dropGroupId.value = targetGroupId
    dropIndex.value = index + 1
  }

  const onDragOverEmptyGroup = (event: DragEvent, targetGroupId: GroupId) => {
    event.preventDefault()
    dropGroupId.value = targetGroupId
    dropIndex.value = 0
  }

  const getDropResult = () => {
    if (!dragData.value || dropGroupId.value === null || dropIndex.value === null) return null

    const { item, originGroupId } = dragData.value
    const targetGroupId = dropGroupId.value
    const index = dropIndex.value

    dragData.value = null
    dropGroupId.value = null
    dropIndex.value = null

    return {
      item,
      originGroupId,
      targetGroupId,
      index,
    }
  }

  return {
    onDragStart,
    onDragOverItem,
    onDragOverEmptyGroup,
    getDropResult,
  }
}
