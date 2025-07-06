export default ({ code, locale = 'en' } = {}) => {
  if (code) {
    const regionNames = new Intl.DisplayNames(locale, { type: 'language' })

    try { return regionNames.of(code.toUpperCase()) } catch (e) { return null }
  }

  return null
}
