import base64URLEncode from '@/Functions/base64URLEncode/index.js'

export default async function (string) {
  const buffer = new TextEncoder().encode(string)

  const subtleCrypto = window.crypto.subtle

  const hashBuffer = await subtleCrypto.digest('SHA-256', buffer)

  return base64URLEncode(new Uint8Array(hashBuffer))
}
