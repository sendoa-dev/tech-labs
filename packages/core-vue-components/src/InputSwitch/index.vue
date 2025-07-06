<script setup>
import { computed } from 'vue'

import CoreInputTemplate from '@/_InputTemplate/index.vue'
defineOptions({ name: 'CoreInputSwitch' })

const props = defineProps({
  id: {
    type: String,
    default: '',
  },
  modelValue: {
    type: Boolean,
    required: true,
  },
  label: {
    type: String,
    default: '',
  },
  text: {
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
  switchClasses: {
    type: String,
    default: '',
  },
  activeSwitchClasses: {
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
  switchSide: {
    type: String,
    default: 'right',
  },
})

const emits = defineEmits({
  'update:model-value': (value) => typeof value !== 'undefined',
  click: null,
})

const resolvedClasses = computed(() => {
  return {
    'order-0': props.switchSide === 'left',
    'order-2': props.switchSide === 'right',
    'core-switch__button--pointer': !props.disabled,
  }
})

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
    class="core-input-switch"
    :templated="templated"
    :disabled="disabled"
    :readonly="readonly"
    :error-message="errorMessage"
    :help-message="helpMessage"
  >
    <template #inputs>
      <div
        class="core-switch"
        role="button"
        tabindex="0"
        @keypress="onInput"
        @click="onInput"
      >
        <input
          :checked="modelValue"
          class="core-switch__input"
          type="checkbox"
          :disabled="disabled"
        >
        <span
          class="core-switch__text"
          :class="{'ml-2' : switchSide === 'left'}"
        >
          <slot>
            {{ text }}
          </slot>
        </span>

        <span
          :class="resolvedClasses"
          class="core-switch__button"
        />
      </div>
    </template>
  </CoreInputTemplate>
</template>

<style lang="postcss">
.core-switch {
  @apply w-full flex items-center justify-between;
}

.core-switch__input {
  @apply hidden absolute w-0 h-1 p-0 -m-1 overflow-hidden whitespace-nowrap border-0;
}

.core-switch__button {
  @apply flex flex-shrink-0 items-center relative bg-black/50 w-12 h-6 rounded-full transition-colors duration-200 ease-in-out;
}

.core-switch__button::before {
  @apply absolute rounded-full bg-white content-[''] left-0.5 h-5 w-5 transition-transform duration-300 ease-in-out;
}

.core-switch__input:checked ~ .core-switch__button {
  @apply bg-black;
}

.core-switch__input:checked ~ .core-switch__button::before {
  @apply transform translate-x-6;
}

.core-switch__input:disabled ~ .core-switch__button {
  @apply opacity-50;
}

.core-switch__input:disabled:checked ~ .core-switch__button {
  @apply bg-black;
}

.core-switch__text {
  @apply flex-1 mr-6 select-none order-1;
}

.core-switch__button--pointer {
  @apply cursor-pointer;
}
</style>
