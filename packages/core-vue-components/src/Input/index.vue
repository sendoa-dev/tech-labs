<script setup>
import { onMounted, watch, computed, ref, toRefs } from 'vue'

import CoreInputTemplate from '@/_InputTemplate/index.vue'
import CoreIcon from '@/Icon/index.vue'

defineOptions({ name: 'CoreInput' })

const props = defineProps({
  id: {
    type: String,
    default: '',
  },
  modelValue: {
    type: [String, Number],
    default: '',
  },
  type: {
    type: String,
    default: 'text',
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
  icon: {
    type: String,
    default: '',
  },
  mask: {
    type: Function,
    default: null,
  },
  trim: {
    type: Boolean,
    default: true,
  },
  iconSide: {
    type: String,
    default: '',
  },
})
const { modelValue } = toRefs(props)

const emits = defineEmits({
  'update:model-value': (value) => typeof value !== 'undefined',
  'update:model-value-with-mask': (value) => typeof value !== 'undefined',
  'click-icon': null,
  input: null,
  blur: null,
})

const input = ref(null)

const isMasked = computed(() => !!props.mask)
const maskInstance = ref('')

const setInputValue = () => {
  input.value.value = modelValue.value

  if (isMasked.value) {
    maskInstance.value?.updateValue()
  }
}

const resolvedLabelClasses = computed(() => {
  return {
    '!pl-10': props.iconSide === 'left',
    '!pr-8': props.type === 'password' || props.icon,
  }
})

const resolvedIconClasses = computed(() => {
  return {
    'left-0': props.iconSide === 'left',
  }
})

watch(modelValue, setInputValue)

onMounted(() => {
  if (isMasked.value) {
    maskInstance.value = props.mask(input.value)

    if (modelValue.value) {
      const typedValue = typeof maskInstance.value.typedValue === 'string'
        ? maskInstance.value.typedValue.trim()
        : maskInstance.value.typedValue
      emits('update:model-value', typedValue)
      emits('update:model-value-with-mask', maskInstance.value.value.trim())
    }
  }

  if (modelValue.value) {
    setInputValue()
  }
})

const onInput = async (event) => {
  const value = event.target?.value || ''

  if (!isMasked.value) {
    emits('update:model-value', value?.trim())
  } else {
    setTimeout(() => {
      const typedValue = typeof maskInstance.value.typedValue === 'string'
        ? maskInstance.value.typedValue.trim()
        : maskInstance.value.typedValue
      emits('update:model-value', typedValue)
      emits('update:model-value-with-mask', maskInstance.value.value.trim())
    })
  }

  emits('input', event)
}

const displayPassword = ref(false)

const isPasswordType = computed(() => props.type === 'password')
const resolveInputType = computed(() => {
  if (props.type === 'password') {
    return displayPassword.value ? 'text' : 'password'
  }

  return props.type
})

const togglePasswordVisibility = () => {
  displayPassword.value = !displayPassword.value
}

const onBlur = async (event) => {
  if (!props.disabled && !props.readonly) {
    emits('blur', event)
  }
}

const onClickIcon = async (event) => {
  emits('click-icon', event)
}

const charAmount = computed(() => modelValue.value?.length)
</script>

<template>
  <CoreInputTemplate
    :id="id"
    class="core-input"
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
      <div class="relative">
        <input
          :id="id"
          ref="input"
          data-test="input"
          :value="modelValue"
          class="core-input__input"
          :class="resolvedLabelClasses"
          :type="resolveInputType"
          :name="id"
          :placeholder="placeholder"
          :disabled="disabled"
          :maxlength="maxLength"
          :readonly="readonly"
          :tabindex="readonly || disabled ? -1 : 0"
          :autocapitalize="type === 'email' ? 'off' : 'on'"
          @blur="onBlur"
          @input="onInput"
        >

        <CoreIcon
          v-if="icon"
          class="core-input__input-icon"
          :class="resolvedIconClasses"
          :size="20"
          :icon="icon"
          data-test="input-icon"
          @click="onClickIcon"
        />

        <CoreIcon
          v-if="isPasswordType && !icon"
          class="core-input__input-icon"
          :size="20"
          :icon="displayPassword ? 'eye' : 'eye-off'"
          data-test="input-icon"
          @click="togglePasswordVisibility"
        />
      </div>
    </template>
  </CoreInputTemplate>
</template>

<style lang="postcss">
input[type='password']:not(:placeholder-shown) {
  /* @apply tracking-extra; */
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type='number'] {
  -moz-appearance: textfield;
}

.core-input__input-icon {
  @apply absolute right-0 top-0 cursor-pointer text-black/75 top-1/2 transform -translate-y-1/2;
}
</style>
