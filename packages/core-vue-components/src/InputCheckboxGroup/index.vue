<script setup>
import CoreInputTemplate from '@/_InputTemplate/index.vue'
import CoreInputCheckbox from '@/InputCheckbox/index.vue'

defineOptions({ name: 'CoreInputCheckboxGroup' })

const props = defineProps({
  id: {
    type: String,
    default: '',
  },
  modelValue: {
    type: Array,
    default: () => [],
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
})

const emits = defineEmits({
  'update:model-value': (value) => typeof value !== 'undefined',
  blur: null,
})

const onInput = async (checkbox) => {
  if (!checkIfDisabled(checkbox) && !props.readonly) {
    const model = [...props.modelValue]

    !model.includes(checkbox.id)
      ? model.push(checkbox.id)
      : model.splice(model.indexOf(checkbox.id), 1)

    emits('update:model-value', [...model])
  }
}

const onBlur = async (event, checkbox) => {
  emits('blur', event)
}

const checkIfDisabled = (checkbox) => {
  return checkbox.enabled ? false : (checkbox.disabled || props.disabled)
}
</script>

<template>
  <CoreInputTemplate
    :id="id"
    class="core-input-checkbox-group"
    :templated="templated"
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
        class="core-input-checkbox-group__container"
        v-bind="$attrs"
      >
        <CoreInputCheckbox
          v-for="(checkbox) in values"
          :id="id"
          :key="checkbox.value"
          :templated="false"
          :model-value="!!modelValue.includes(checkbox.id)"
          :disabled="checkIfDisabled(checkbox)"
          @click="onInput(checkbox)"
          @blur="onBlur($event, checkbox)"
        >
          <slot>
            {{ checkbox.label }}
          </slot>
        </CoreInputCheckbox>
      </div>
    </template>
  </CoreInputTemplate>
</template>

<style lang="postcss">
.core-input-checkbox-group__container {
  @apply flex flex-col gap-4;
}
</style>
