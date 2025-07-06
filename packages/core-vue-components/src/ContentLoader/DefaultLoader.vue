<script setup>
import { ref, computed } from 'vue'
import { ContentLoader } from 'vue-content-loader'

defineOptions({ name: 'DefaultContentLoader' })

const props = defineProps({
  rows: {
    type: Number,
    required: true,
  },
  cols: {
    type: Number,
    required: true,
  },
  height: {
    type: Number,
    default: 0,
  },
  width: {
    type: Number,
    default: 0,
  },
})

const defaultHeight = ref(100)
const defaultWidth = ref(100)
const defaultRows = ref(1)
const defaultCols = ref(1)
const spaceBetween = ref(4)

const totalCols = computed(() => props.cols || defaultCols.value)
const totalRows = computed(() => props.rows || defaultRows.value)

const itemsWidth = computed(() => props.width || defaultWidth.value)
const itemsHeight = computed(() => props.height || defaultHeight.value)
const iterableLength = computed(() => totalCols.value * totalRows.value)
const viewBoxHeight = computed(() => (itemsHeight.value + (spaceBetween.value * 2)) * totalRows.value)

const resolvedStyle = computed(() => {
  let style = ''

  if (props.width !== 0) {
    style += `max-width: ${itemsWidth.value}px;`
  }

  style += `max-height: ${viewBoxHeight.value}px`

  return style
})

const getCurrentPosition = index => {
  const { columnPosition, columnNumber } = _getCurrentCol(index)
  const rowNumber = totalRows.value - ((totalRows.value * columnNumber) - index)

  const rowPosition = spaceBetween.value + rowNumber * (itemsHeight.value + spaceBetween.value)

  return {
    y: rowPosition,
    x: columnPosition,
  }
}

const _getCurrentCol = index => {
  const columnNumber = Math.ceil((index + 1) / totalRows.value) - 1

  return {
    columnPosition: columnNumber * itemsWidth.value,
    columnNumber: columnNumber + 1,
  }
}
</script>

<template>
  <ContentLoader
    :animate="false"
    v-bind="$attrs"
    preserve-aspect-ratio="none"
    :style="resolvedStyle"
    :view-box="`0 0 ${itemsWidth} ${viewBoxHeight}`"
    class="animate-pulse"
  >
    <rect
      v-for="(item, index) in iterableLength"
      :key="`col${item}`"
      :width="itemsWidth"
      :rx="1"
      :ry="1"
      :x="getCurrentPosition(index).x"
      :y="getCurrentPosition(index).y"
      :height="itemsHeight"
    />
  </ContentLoader>
</template>
