export default (url, secure = true) => {
  const protocolPrefix = secure ? 'https' : 'http'

  return /^https?:/.test(url) ? url : `${protocolPrefix}://${url}`
}
