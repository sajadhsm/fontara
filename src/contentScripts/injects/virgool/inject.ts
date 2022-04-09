import { storage } from 'webextension-polyfill'
import { storageLocal } from '~/services/storageLocal'

const FA_FONT_CSS_VAR = '--font'

async function setFontCssVariable() {
  const font = await storageLocal.getItem('font')

  if (font) {
    document.documentElement.style.setProperty(FA_FONT_CSS_VAR, font)
  } else {
    document.documentElement.style.removeProperty(FA_FONT_CSS_VAR)
  }
}

setFontCssVariable()

storage.onChanged.addListener((changes) => {
  console.log('storage.onChanged.addListener ---->', changes)
})
