let timeoutId = ''

export default function (callback, timeout = 0) {
  clearTimeout(timeoutId)

  timeoutId = setTimeout(() => { callback() }, timeout)
}
