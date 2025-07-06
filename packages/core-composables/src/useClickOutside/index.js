import { onBeforeUnmount } from 'vue'

export default ({ ref, callback } = {}) => {
  if (!ref) {
    throw new Error('A target component has to be provided.')
  }

  if (!callback) {
    throw new Error('A callback has to be provided.')
  }

  const clickOutsideHandler = (event) => {
    if (event.target !== ref.value && event.composedPath().includes(ref.value)) {
      return null
    }

    if (typeof callback === 'function') {
      callback(event)
    }
  }

  window.addEventListener('click', clickOutsideHandler)

  onBeforeUnmount(() => { window.removeEventListener('click', clickOutsideHandler) })
}
