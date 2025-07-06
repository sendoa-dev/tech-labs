import ISO6391 from 'iso-639-1'

import getLanguageNameByCode from '@/Functions/getLanguageNameByCode/index.js'

export default ({ locale = 'en' } = {}) => {
  let parsedLanguages = Object.values(ISO6391.getAllCodes()).reduce((languageCarry, languageKey) => {
    const languageLabel = getLanguageNameByCode({ locale, code: languageKey })
    const parsedLanguageLabel = languageLabel?.charAt(0).toUpperCase() + languageLabel?.slice(1)

    const language = languageLabel !== languageKey
      ? {
          id: languageKey.toLowerCase(),
          label: parsedLanguageLabel,
          metadata: {
            name: parsedLanguageLabel,
          },
        }
      : null

    return language ? [...languageCarry, language] : languageCarry
  }, []).filter(Boolean)

  parsedLanguages = parsedLanguages.sort((languageA, languageB) => {
    return languageA.label.localeCompare(languageB.label)
  })

  return parsedLanguages
}
