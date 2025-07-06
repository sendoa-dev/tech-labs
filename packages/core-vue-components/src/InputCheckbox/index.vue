<script setup>
import { computed } from 'vue'

import CoreInputTemplate from '@/_InputTemplate/index.vue'
import CoreIcon from '@/Icon/index.vue'

defineOptions({ name: 'CoreInputCheckbox' })

const props = defineProps({
  id: {
    type: String,
    default: '',
  },
  modelValue: {
    type: [Boolean, null],
    default: false,
  },
  label: {
    type: String,
    default: '',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  readonly: {
    type: Boolean,
    default: false,
  },
  templated: {
    type: Boolean,
    default: true,
  },
  checkboxClasses: {
    type: String,
    default: '',
  },
  contentClasses: {
    type: String,
    default: '',
  },
  activeCheckboxClasses: {
    type: String,
    default: '',
  },
  helpMessage: {
    type: String,
    default: '',
  },
  errorMessage: {
    type: String,
    default: '',
  },
})

const emits = defineEmits({
  'update:model-value': (value) => typeof value !== 'undefined',
  click: null,
})

const contentResolvedClasses = computed(() => {
  return {
    [props.contentClasses]: true,
    '!cursor-not-allowed': props.disabled,
  }
})

const isChecked = computed(() => props.modelValue === true)

const onInput = (event) => {
  if (!props.disabled && !props.readonly) {
    emits('update:model-value', !props.modelValue)
    emits('click', event)
  }
}
</script>

<template>
  <CoreInputTemplate
    :id="id"
    class="core-input-checkbox"
    :templated="templated"
    :disabled="disabled"
    :readonly="readonly"
    :error-message="errorMessage"
    :help-message="helpMessage"
  >
    <template #inputs>
      <div class="relative">
        <div
          class="w-fit input-checkbox flex justify-start items-center gap-2"
          :class="contentResolvedClasses"
          role="button"
          tabindex="0"
          @keypress="onInput"
          @click="onInput"
        >
          <div
            class="border-2 rounded w-5 h-5 flex flex-shrink-0 justify-center items-center mt-1"
            :class="{
              [activeCheckboxClasses]: isChecked,
              [checkboxClasses]: checkboxClasses,
              'bg-black': !activeCheckboxClasses && isChecked,
              'border-gray-400': !checkboxClasses,
            }"
          >
            <CoreIcon
              v-if="isChecked"
              icon="check"
              class="text-white stroke-3"
              :size="16"
            />
          </div>
          <slot>
            {{ label }}
          </slot>
        </div>
      </div>
    </template>
  </CoreInputTemplate>
</template>
