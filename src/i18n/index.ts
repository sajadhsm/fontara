import { createI18n } from 'vue-i18n'

const messages = {
  en: {
    common: {
      addCustomFont: 'Add custom font'
    },
    options: {
      addCustomFontDescription: 'Add custom font',
      addFont: 'Add font',
      fontName: 'Font name',
      fontNameDescription: '',
      remove: 'Remove',
      savedFonts: 'Saved fonts',
      selectFont: 'Select font',
      selectFontDescription: ''
    },
    popup: {
      supportFontARA: 'Support FontAra if you wish.',
      designAndDevelopBy: 'Design & develop by',
      mostafaAlahyari: 'Mostafa Alahyari'
    }
  },
  fa: {
    common: {
      addCustomFont: 'افزودن فونت دلخواه'
    },
    options: {
      addCustomFontDescription:
        'پس از انتخاب فونت، فونت شما به صورت خودکار به لیست فونت‌ها افزوده می‌شود.',
      addFont: 'افزودن فونت',
      fontName: 'نام فونت',
      fontNameDescription:
        'یک نام به صورت لاتین وارد کنید. فقط حروف مجاز می باشد. مثلا Yekan',
      remove: 'حذف',
      savedFonts: 'فونت‌های ذخیره شده',
      selectFont: 'انتخاب فونت',
      selectFontDescription:
        'یک فونت با پسوند مجاز ttf, woff, otf انتخاب کنید. بهتر است فونت انتخاب به صورت Normal و No English باشد.'
    },
    popup: {
      supportFontARA: 'در صورت تمایل از فونت‌آرا حمایت کنید.',
      designAndDevelopBy: 'طراحی و توسعه با',
      mostafaAlahyari: 'مصطفی الهیاری'
    }
  }
}

const i18n = createI18n({
  legacy: false,
  locale: 'fa',
  fallbackLocale: 'en',
  messages
})

export default i18n
