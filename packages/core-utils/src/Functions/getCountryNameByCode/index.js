export default ({ code, locale = 'en' } = {}) => {
  if (code) {
    const regionNames = new Intl.DisplayNames(locale, { type: 'region' })

    try {
      const regionName = regionNames.of(code.toUpperCase())

      return regionName?.charAt(0).toUpperCase() + regionName?.slice(1)
    } catch (e) { return null }
  }

  return null
}
