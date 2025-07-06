import { createI18n } from 'vue-i18n'

import messages from '@/modules/i18n/messages/index.js'

export const AVAILABLE_LANGUAGES = {
  ES: 'es',
  EN: 'en',
}

const getPersistedLanguage = () => {
  return window.localStorage.getItem('language') || null
}

export const DEFAULT_LANGUAGE_ID = AVAILABLE_LANGUAGES[getPersistedLanguage()?.toUpperCase()] ||
  AVAILABLE_LANGUAGES[navigator.language.toUpperCase()] ||
  AVAILABLE_LANGUAGES.EN

export const i18n = createI18n({
  legacy: false,
  locale: DEFAULT_LANGUAGE_ID,
  fallbackLocale: DEFAULT_LANGUAGE_ID,
  messages,
})

export const translate = i18n.global.t

export const setLocale = async (language) => {
  i18n.global.locale = language

  window.localStorage.setItem('language', language)

  document.querySelector('html').setAttribute('lang', language)
}

export const getLocale = () => i18n.global.locale
