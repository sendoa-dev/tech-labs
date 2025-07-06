import { isEqual, isFilled } from '@tech-labs/core-utils'
import { useId, computed, reactive } from 'vue'

export default ({ form, name } = {}) => {
  const formHandler = new FormHandler(form)

  return formHandler
}

class FormHandler {
  constructor (formData = {}) {
    const form = this._getFormHandlerProperties(formData)

    this.form = reactive(form)
    this.formState = reactive({
      isSubmitting: false,
      isSubmitted: false,
    })
  }

  scrollToError ({ field }) {
    document.getElementById(this.form[field].id)?.scrollIntoView({ behavior: 'smooth' })
  }

  checkValidForm () {
    return Object.keys(this.form).every(field => this.form[field].isValid)
  }

  hasChanges () {
    return Object.keys(this.form).some(field => this.form[field].hasChanges)
  }

  clear ({ exceptions = [], fields = [] } = {}) {
    let iterableForm = this.form

    if (fields.length) {
      iterableForm = Object.entries(this.form).reduce((formCarry, fieldEntries) => {
        return {
          ...formCarry,
          ...fields.includes(fieldEntries[0]) ? { [fieldEntries[0]]: fieldEntries[1] } : {},
        }
      }, {})
    }

    Object.keys(iterableForm).forEach(field => {
      if (exceptions.includes(field)) {
        return null
      }

      iterableForm[field].dirty = false

      if (iterableForm[field].value === null) {
        iterableForm[field].value = null
      }
      if (typeof iterableForm[field].value === 'boolean') {
        iterableForm[field].value = false
      }
      if (typeof iterableForm[field].value === 'string') {
        iterableForm[field].value = ''
      }
      if (typeof iterableForm[field].value === 'number') {
        iterableForm[field].value = 0
      }
      if (iterableForm[field] instanceof Array) {
        iterableForm[field].value = []
      }
      if (typeof iterableForm[field].value === 'object') {
        iterableForm[field].value = null
      }

      return null
    }, {})
  }

  reset () {
    Object.keys(this.form).forEach(field => {
      this.form[field].value = this.form[field].$initialValue
      this.form[field].dirty = false
      this.form[field].isLoading = false
    })

    return this
  }

  setFieldValue (field, value) {
    this.form[field].value = value

    return this
  }

  fillField (field, value) {
    this.form[field].value = value
    this.form[field].$initialValue = Array.isArray(value) ? [...(value)] : value

    return this
  }

  fillForm (form = {}) {
    Object.keys(form).forEach((field) => {
      this.form[field].value = form[field]
      this.form[field].$initialValue = Array.isArray(form[field]) ? [...(form[field])] : form[field]
    })

    return this
  }

  fillFormIfData (form = {}) {
    Object.keys(form).forEach((field) => {
      if (isFilled(form[field])) {
        this.form[field].value = form[field]
        this.form[field].$initialValue = Array.isArray(form[field]) ? [...(form[field])] : form[field]
      }
    })

    return this
  }

  assignAsyncRulesData (field, index, options) {
    this.form[field].$rulesData[index] = options

    return this
  }

  setFieldError (field, error) {
    if (this.form[field]) {
      this.form[field].customErrors.push(error)
    }

    return this
  }

  handleFieldsGenericError ({ errors, message }) {
    if (errors?.length) {
      errors?.forEach(err => {
        err?.loc.forEach(errorLocation => {
          const parsedField = errorLocation.replace(/_+(.)/g, (_, matchLetter) => matchLetter.toUpperCase())

          return this.setFieldError(parsedField, message(err.type))
        })
      })
    }

    return this
  }

  clearFieldError (field) {
    this.form[field].customErrors = []

    return this
  }

  clearCustomErrors () {
    Object.keys(this.form).forEach((field) => {
      this.form[field].customErrors = []
    })

    return this
  }

  changedFields (fields = []) {
    return fields.some(field => {
      return this.form[field]?.hasChanges
    })
  }

  getFormDataChanges (fields = []) {
    return fields.reduce((fieldsCarry, field) => {
      return {
        ...fieldsCarry,
        ...(this.form[field].hasChanges
          ? { [field]: this.form[field].value }
          : {}),
      }
    }, {})
  }

  getFormDataValues (fields = Object.keys(this.form)) {
    return fields.reduce((fieldsCarry, field) => {
      return {
        ...fieldsCarry,
        [field]: this.form[field].value,
      }
    }, {})
  }

  validateFields (fields = Object.keys(this.form), callbackFunction = () => ({})) {
    fields.forEach(field => { this.form[field].onBlur() })

    if (fields.every(field => this.form[field].isValid)) {
      callbackFunction()
    }
  }

  async submit (callbackFunction) {
    this.formState.isSubmitted = true
    this.clearCustomErrors()

    let scrolled = false
    Object.keys(this.form).forEach(field => {
      this.form[field].onBlur()

      if (!this.form[field].isValid) {
        if (!scrolled) {
          this.scrollToError({ field })

          scrolled = true
        }
      }
    })

    if (this.checkValidForm()) {
      this.formState.isSubmitting = true

      try {
        await callbackFunction()

        Object.keys(this.form).forEach((field) => {
          this.form[field].$initialValue = this.form[field].value
        })
      } catch (error) {
        return Promise.reject(error)
      } finally {
        this.formState.isSubmitting = false
      }
    }
  }

  _getFormHandlerProperties (form) {
    return Object.keys(form).reduce((formCarry, field) => {
      const _getValue = (fieldValues) => fieldValues.value
      const _getRules = (fieldValues) => fieldValues.rules === undefined ? [] : fieldValues.rules
      const _getMask = (fieldValues) => fieldValues.mask === undefined ? null : fieldValues.mask
      const _getMultiple = (fieldValues) => fieldValues.isMultiple === true
      const fieldValues = form[field]

      const value = _getValue(fieldValues)
      const rules = _getRules(fieldValues)
      const mask = _getMask(fieldValues)
      const isMultiple = _getMultiple(fieldValues)

      const rulesData = new Array(rules.length)

      return {
        ...formCarry,
        [field]: {
          id: useId(),
          value,
          mask,
          customErrors: [],
          $rules: rules,
          $rulesData: rulesData,
          $initialValue: Array.isArray(value) ? [...(value)] : value,
          errorList: computed(() => {
            let err = this.form[field].$rules
              .map((ruleFn, index) => {
                return ruleFn({
                  form: this.form,
                  value: this.form[field].value,
                  initialValue: this.form[field].$initialValue,
                  rulesAsyncData: this.form[field].$rulesData[index],
                  customErrors: this.form[field].customErrors,
                })
              })
            err = err.filter(error => error !== true)
            return err
          }),
          errors: computed(() => {
            return this.form[field].customErrors.length
              ? this.form[field].customErrors
              : this.form[field].dirty
                ? [...this.form[field].errorList, ...this.form[field].customErrors]
                : []
          }),
          errorMessage: computed(() => {
            return this.form[field].errors.length ? this.form[field].errors[0] : ''
          }),
          isValid: computed(() => {
            let errors = this.form[field].errors

            if (isMultiple) {
              errors = this.form[field].errors[0]?.filter(error => {
                return typeof error !== 'boolean'
              }) || []
            }

            return !errors.length
          }),
          hasChanges: computed(() => {
            return !isEqual(
              this.form[field].value,
              this.form[field].$initialValue,
            )
          }),
          dirty: false,
          isLoading: false,
          onBlur (callbackFunction = null) {
            this.dirty = true

            if (typeof callbackFunction === 'function') {
              callbackFunction()
            }
          },
        },
      }
    }, {})
  }
}
