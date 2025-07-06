<script setup lang="ts">
import { resolveButtonClasses } from '@tech-labs/config-components'
import type { BaseButtonProps } from '@tech-labs/config-components'
import { computed } from 'vue'

defineOptions({ name: 'BaseButton' })

const props = withDefaults(defineProps<BaseButtonProps>(), {
  category: 'primary',
  size: 'full',
  outline: false,
  disabled: false,
  loading: false,
  icon: false,
  iconPosition: 'left',
})

const emits = defineEmits<{
  (e: 'click'): void
}>()

const resolvedClasses = computed(() =>
  resolveButtonClasses({
    category: props.category,
    size: props.size,
    outline: props.outline,
    disabled: props.disabled,
    loading: props.loading,
    icon: props.icon,
    iconPosition: props.iconPosition,
  }),
)

const onClick = () => {
  emits('click')
}
</script>

<template>
  <button
    type="button"
    class="core-button"
    :class="resolvedClasses"
    :disabled="disabled"
    @click="onClick"
  >
    <slot />
  </button>
</template>

<style lang="postcss">
@import '@tech-labs/config-components/styles/button.css'
</style>