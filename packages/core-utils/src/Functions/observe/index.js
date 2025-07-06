import { reactive } from 'vue'

export default (observableObject = {}, key = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5)) => {
  const observable = reactive(observableObject)

  if (!('observables' in window)) {
    window.observables = {}
  }

  window.observables[key] = observable

  return observable
}
