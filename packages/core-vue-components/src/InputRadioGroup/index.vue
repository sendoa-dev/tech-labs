<script setup>
import { computed } from 'vue'

import CoreInputTemplate from '@/_InputTemplate/index.vue'
import CoreInputRadio from '@/InputRadio/index.vue'

defineOptions({ name: 'CoreInputRadioGroup' })

const props = defineProps({
  id: {
    type: String,
    default: '',
  },
  modelValue: {
    type: [String, Boolean, Number],
    default: '',
  },
  radioType: {
    type: String,
    default: 'button',
  },
  itemsType: {
    type: String,
    default: 'equals',
  },
  itemsClasses: {
    type: String,
    default: '',
  },
  values: {
    type: Array,
    default: () => [],
  },
  label: {
    type: String,
    default: '',
  },
  readonly: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  radioClasses: {
    type: String,
    default: '',
  },
  activeRadioClasses: {
    type: String,
    default: '',
  },
  containerClasses: {
    type: String,
    default: '',
  },
  templated: {
    type: Boolean,
    default: true,
  },
  hideRadioIcon: {
    type: Boolean,
    default: false,
  },
  errorMessage: {
    type: String,
    default: '',
  },
  helpMessage: {
    type: String,
    default: '',
  },
})

const emits = defineEmits({
  'update:model-value': (value) => typeof value !== 'undefined',
  blur: null,
})

const onUpdateModelValue = (value) => {
  if (!props.disabled && !props.readonly) {
    emits('update:model-value', value)
  }
}

const onBlur = async (event) => {
  if (!props.disabled && !props.readonly) {
    emits('blur', event)
  }
}

const checkIfDisabled = (radio) => {
  return radio.enabled ? false : (radio.disabled || props.disabled)
}
const resolveItemStyles = computed(() => {
  return {
    [props.itemsClasses]: true,
    'w-full': props.itemsType === 'equals',
  }
})
</script>

<template>
  <CoreInputTemplate
    :id="id"
    class="core-input-radio-group"
    :templated="templated"
    :disabled="disabled"
    :readonly="readonly"
    :error-message="errorMessage"
    :help-message="helpMessage"
  >
    <template #label>
      <slot name="label">
        {{ label }}
      </slot>
    </template>

    <template #inputs>
      <div
        class="core-input-radio-group__container"
        :class="containerClasses"
        v-bind="$attrs"
      >
        <CoreInputRadio
          v-for="radio in values"
          :id="id"
          :key="radio.value"
          :radio-type="radioType"
          :class="resolveItemStyles"
          :templated="false"
          :radio-classes="radioClasses"
          :model-value="modelValue"
          :label="radio.label"
          :value="radio.value"
          :disabled="checkIfDisabled(radio)"
          :hide-radio-icon="hideRadioIcon"
          :active-radio-classes="activeRadioClasses"
          @click="onBlur"
          @update:model-value="onUpdateModelValue"
        />
      </div>
    </template>
  </CoreInputTemplate>
</template>

<style lang="postcss">
.core-input-radio-group {
  @apply w-full;
}

.core-input-radio-group__container {
  @apply flex flex-col gap-4 lg:flex-row;
}
</style>
