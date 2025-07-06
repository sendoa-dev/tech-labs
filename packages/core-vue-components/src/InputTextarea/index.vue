<script setup>
import { ref, computed, onMounted } from 'vue'

import CoreInputTemplate from '@/_InputTemplate/index.vue'

defineOptions({ name: 'CoreInputTextarea' })

const props = defineProps({
  id: {
    type: String,
    default: '',
  },
  modelValue: {
    type: [String, Number],
    default: '',
  },
  label: {
    type: String,
    default: '',
  },
  placeholder: {
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
  templated: {
    type: Boolean,
    default: true,
  },
  errorMessage: {
    type: String,
    default: '',
  },
  helpMessage: {
    type: String,
    default: '',
  },
  maxLength: {
    type: Number,
    default: null,
  },
  charCount: {
    type: Boolean,
    default: false,
  },
  hideScrollbar: {
    type: Boolean,
    default: false,
  },
})

const inputTextareaRef = ref()

const emits = defineEmits({
  'update:model-value': (value) => typeof value !== 'undefined',
  blur: null,
})

const onInput = async (event) => {
  resizeTextarea()
  if (!props.disabled && !props.readonly) {
    const value = event.target?.value || ''

    emits('update:model-value', value.trim())
  }
}

const onBlur = async (event) => {
  resizeTextarea()
  if (!props.disabled && !props.readonly) {
    emits('blur', event)
  }
}

const onFocus = async (event) => {
  resizeTextarea()
}

const charAmount = computed(() => props.modelValue?.length)

const resizeTextarea = () => {
  inputTextareaRef.value.style.height = 'auto'
  inputTextareaRef.value.style.height = inputTextareaRef.value.scrollHeight - 4 + 'px'
}
const resolvedClasses = computed(() => {
  return {
    'core-input-textarea__input-overflow': props.hideScrollbar,
  }
})

onMounted(() => {
  resizeTextarea()
})
</script>

<template>
  <CoreInputTemplate
    :id="id"
    class="core-input-textarea"
    :max-length="maxLength"
    :char-count="charCount"
    :char-amount="charAmount"
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
      <textarea
        :id="id"
        ref="inputTextareaRef"
        :value="modelValue"
        class="core-input-textarea__input"
        :class="resolvedClasses"
        :name="id"
        :placeholder="placeholder"
        :disabled="disabled"
        :maxlength="maxLength"
        :readonly="readonly"
        @focus="onFocus"
        @blur="onBlur"
        @input="onInput"
      />
    </template>
  </CoreInputTemplate>
</template>

<style lang="postcss">
.core-input-textarea__input {
  @apply block min-h-24 p-4;
}

.core-input-textarea__input-overflow {
  @apply overflow-hidden;
}
</style>
