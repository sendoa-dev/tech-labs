<script setup>
import { computed } from 'vue'

import CoreInputTemplate from '@/_InputTemplate/index.vue'
import CoreIcon from '@/Icon/index.vue'

defineOptions({ name: 'CoreInputRadio' })

const props = defineProps({
  id: {
    type: String,
    default: '',
  },
  modelValue: {
    type: [String, Boolean, Number, null],
    required: true,
  },
  value: {
    type: [String, Boolean, Number],
    required: true,
  },
  radioType: {
    type: String,
    default: 'button',
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
  hideRadioIcon: {
    type: Boolean,
    default: false,
  },
  activeRadioClasses: {
    type: String,
    default: '',
  },
  radioClasses: {
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
})

const onInput = (value) => {
  if (!props.disabled && !props.readonly) {
    emits('update:model-value', value)
  }
}

const resolveRadioTypeClasses = computed(() => {
  return {
    [`core-input-radio__container-item--${props.radioType}--active`]: !props.activeRadioClasses && props.value === props.modelValue,

    'core-input-radio__container-item--button': props.radioType === 'button',
    'core-input-radio__container-item--plain': props.radioType === 'plain',
  }
})
</script>

<template>
  <CoreInputTemplate
    :id="id"
    class="core-input-radio"
    :templated="templated"
    :disabled="disabled"
    :readonly="readonly"
    :error-message="errorMessage"
    :help-message="helpMessage"
  >
    <template #inputs>
      <div class="core-input-radio__container">
        <div
          :id="id"
          class="core-input-radio__container-item input-radio"
          :class="resolveRadioTypeClasses"
          role="button"
          tabindex="0"
          @blur="onBlur"
          @keypress="onInput(value)"
          @click="onInput(value)"
        >
          <CoreIcon
            v-if="!hideRadioIcon"
            class="core-input-radio__container-item-icon"
            :icon="value === modelValue ? 'check-solid' : 'circle'"
            :size="24"
          />

          <span
            class="core-input-radio__container-item-label"
            :class="{
              [activeRadioClasses]: activeRadioClasses && value === modelValue,
              [radioClasses]: true,
              'core-input-radio__container-item-label--active': value === modelValue,
              'core-input-radio__container-item-label--only': hideRadioIcon
            }"
          >
            {{ label }}
          </span>
        </div>
      </div>
    </template>
  </CoreInputTemplate>
</template>

<style lang="postcss">
.core-input-radio {
  @apply w-full;
}

.core-input-radio__container {
  @apply flex flex-col gap-4 lg:flex-row;
}

.core-input-radio__item--button {
  @apply !bg-white !border !border-gray-500 !rounded-xl cursor-pointer w-full flex items-center;
}

.core-input-radio__item--button--active {
  @apply !border-black;
}

.core-input-radio__item--plain {
  @apply !bg-white !rounded-xl cursor-pointer w-full flex items-center;
}

.core-input-radio__item--label {
  @apply w-full text-blue-300 content-center py-4 pr-4;
}

.core-input-radio__item--label--active {
  @apply text-black;
}

.core-input-radio__item--label--only {
  @apply pr-0;
}
</style>
