import base64URLEncode from '@/Functions/base64URLEncode/index.js'

export default function (length = 32) {
  const buffer = new Uint8Array(length)
  window.crypto.getRandomValues(buffer)

  return base64URLEncode(buffer)
}
