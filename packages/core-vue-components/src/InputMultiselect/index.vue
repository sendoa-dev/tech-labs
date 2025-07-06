<script setup>
import VueMultiselect from 'vue-multiselect'

import CoreInputTemplate from '@/_InputTemplate/index.vue'

defineOptions({ name: 'CoreInputMultiselect' })

const modelValue = defineModel({ type: Array })

const props = defineProps({
  id: {
    type: String,
    default: '',
  },
  options: {
    type: Array,
    default: () => [],
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
  optionId: {
    type: String,
    default: 'id',
  },
  optionLabel: {
    type: String,
    default: 'label',
  },
})

const emits = defineEmits({
  'update:model-value': (value) => typeof value !== 'undefined',
  blur: null,
})

const onBlur = async (event) => {
  if (!props.disabled && !props.readonly) {
    emits('blur', event)
  }
}
</script>

<template>
  <CoreInputTemplate
    :id="id"
    class="core-input"
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
        <VueMultiselect
          :id="id"
          v-model="modelValue"
          class="core-input__input"
          :name="id"
          :placeholder="placeholder"
          :disabled="disabled"
          :readonly="readonly"
          :tabindex="readonly || disabled ? -1 : 0"

          :options="options"

          :searchable="true"
          :multiple="true"
          :close-on-select="false"
          :clear-on-select="true"
          :allow-empty="true"

          :select-label="''"
          :select-group-label="''"
          :selected-label="''"
          :deselect-label="'X'"
          :deselect-group-label="''"
          :show-labels="true"

          :label="optionLabel"
          :track-by="optionId"

          @blur="onBlur"
        />
      </div>
    </template>
  </CoreInputTemplate>
</template>

<style lang="postcss">
@import 'vue-multiselect/dist/vue-multiselect.css';

.multiselect__tags:not(:has(.multiselect__placeholder)) { @apply pb-2; }

.multiselect__tags-wrap { @apply !flex items-center flex-wrap; }

.multiselect__option--highlight,
.multiselect__option--highlight:after { @apply !bg-black/75 !text-black !font-normal; }
.multiselect__option--selected,
.multiselect__option--selected:after { @apply !bg-black/95 !text-black !font-normal; }
</style>
