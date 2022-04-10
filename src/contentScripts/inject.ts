import { storage } from 'webextension-polyfill'
import { storageLocal } from '~/services/storageLocal'

export async function initialize() {
  const font = await storageLocal.getItem('font')

  setFontCssVariable(font)

  storage.onChanged.addListener(({ font: { newValue: newFont } }) => {
    if (newFont) {
      setFontCssVariable(newFont)
      console.log('[FontARA] font changed to', newFont)
    }
  })
}

function setFontCssVariable(font: string) {
  const FA_FONT_CSS_VAR = '--font'

  if (font) {
    document.documentElement.style.setProperty(FA_FONT_CSS_VAR, font)
  } else {
    document.documentElement.style.removeProperty(FA_FONT_CSS_VAR)
  }
}
