<script setup>
import { computed } from 'vue'

defineOptions({ name: 'CoreInputTemplate' })

const props = defineProps({
  id: {
    type: String,
    default: '',
  },
  templated: {
    type: Boolean,
    default: true,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  readonly: {
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
  maxLength: {
    type: Number,
    default: null,
  },
  charCount: {
    type: Boolean,
    default: false,
  },
  charAmount: {
    type: Number,
    default: 0,
  },
  charsText: {
    type: String,
    default: '',
  },
})

const inputContainerClasses = computed(() => ({
  'mb-4': props.templated,
  'core-input-base--error': props.errorMessage,
  'core-input-base--disabled': !props.readonly && props.disabled,
  'core-input-base--readonly': props.readonly,
}))

const inputHelpClasses = computed(() => (props.errorMessage ? 'core-input-base__help--filled' : 'core-input-base__help--empty'))
</script>

<template>
  <div
    class="core-input-base"
    :class="inputContainerClasses"
  >
    <!--
      @TODO: Handle prevent only for some inputs (file loader)
      @click.prevent.self
    -->
    <label
      v-if="templated"
      class="core-input-base__label"
      :for="id"
    >
      <slot name="label" />
    </label>
    <slot name="inputs" />

    <div
      v-if="templated"
      class="core-input-base__help"
      :class="inputHelpClasses"
    >
      <div class="core-input-base__help-messages">
        <p
          v-if="errorMessage"
          class="core-input-base__help-messages--error"
        >
          {{ errorMessage }}
        </p>
        <p
          v-if="helpMessage && !errorMessage"
          class="core-input-base__help-messages--help"
        >
          {{ helpMessage }}
        </p>
      </div>

      <div
        v-if="charCount && maxLength"
        class="core-input-base__help-chars"
        :class="{ 'core-input-base__help-chars--full' : charAmount === maxLength }"
      >
        {{ charAmount }} / {{ maxLength }}
        <span v-if="charsText">
          {{ charsText }}
        </span>
      </div>
    </div>
  </div>
</template>

<style lang="postcss">
.core-input-base {
  @apply relative w-full;
}

.core-input-base__label {
  @apply w-fit flex flex-col mb-2 text-black font-medium;
}

.core-input-base input,
.core-input-base textarea,
.core-input-base .input-select,
.core-input-base .input-autocomplete,
.core-input-base .input-file-uploader {
  @apply !text-sm outline-black w-full py-3 px-4 border border-transparent leading-snug bg-gray-200 rounded;
}

.core-input-base input::placeholder,
.core-input-base textarea::placeholder,
.core-input-base .input-select::placeholder,
.core-input-base .input-autocomplete::placeholder,
.core-input-base .input-file-uploader::placeholder {
  @apply text-black/50;
}

.core-input-base input:focus,
.core-input-base textarea:focus,
.core-input-base .input-select:focus,
.core-input-base .input-autocomplete:focus,
.core-input-base .input-file-uploader:focus {
  @apply border-black caret-black;
}

.core-input-base__help {
  @apply w-full flex justify-between text-xs relative mt-1;
}

.core-input-base__help--filled {
  @apply items-start;
}

.core-input-base__help--empty {
  @apply items-center min-h-4;
}

.core-input-base__help-messages--error {
  @apply text-red-500;
}

.core-input-base__help-messages--help {
  @apply text-black/50;
}

.core-input-base__help--chars {
  @apply text-black/75;
}

.core-input-base__help--chars--full {
  @apply text-orange-500;
}

.core-input-base--error input,
.core-input-base--error textarea,
.core-input-base--error .input-select,
.core-input-base--error .input-autocomplete,
.core-input-base--error .input-file-uploader,
.core-input-base--error .input-radio-group,
.core-input-base--error .input-checkbox-group {
  @apply !border-red-500 caret-red-500;
}

.core-input-base--readonly input,
.core-input-base--readonly textarea,
.core-input-base--readonly .input-select,
.core-input-base--readonly .input-autocomplete,
.core-input-base--readonly .input-file-uploader {
  @apply !bg-transparent pointer-events-none px-0 py-0 text-base text-black/25 !border-none !resize-none !min-h-fit lg:!min-h-3;
}

.core-input-base--readonly input:focus,
.core-input-base--readonly textarea:focus,
.core-input-base--readonly .input-select:focus,
.core-input-base--readonly .input-autocomplete:focus,
.core-input-base--readonly .input-file-uploader:focus {
  @apply border-transparent;
}

.core-input-base--readonly .core-input-base__label,
.core-input-base--readonly .core-input-base__help-messages--help,
.core-input-base--readonly .core-input-base__help--empty,
.core-input-base--readonly .core-input-base__help,
.core-input-base--readonly .core-input__input-icon,
.core-input-base--readonly .core-input-select__select-icon {
  @apply !hidden;
}

.core-input-base--disabled input,
.core-input-base--disabled textarea,
.core-input-base--disabled .input-select,
.core-input-base--disabled .input-autocomplete,
.core-input-base--disabled .input-file-uploader {
  @apply !border-black/95 bg-black/95 text-black/75 cursor-not-allowed;
}

.core-input-base--disabled .input-radio,
.core-input-base--disabled .input-checkbox {
  @apply opacity-50 text-black/75 cursor-not-allowed;
}

.core-input-base--disabled .core-input-base__label {
  @apply text-black/75;
}
</style>
