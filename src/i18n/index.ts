import { createI18n } from 'vue-i18n'

const messages = {
  en: {
    hello: 'Hello'
  },
  fa: {
    hello: 'سلام'
  }
}

const i18n = createI18n({
  legacy: false,
  locale: 'fa',
  fallbackLocale: 'en',
  messages
})

export default i18n
