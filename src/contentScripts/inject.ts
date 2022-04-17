import { storage } from 'webextension-polyfill'
import { storageLocal } from '~/services/storageLocal'

let isActive = true
let font = 'Vazir'

export async function initialize(siteName: string) {
  const storedValues = await storageLocal.getItems('font', siteName)

  font = storedValues.font
  isActive =
    storedValues[siteName] === undefined ? true : storedValues[siteName]

  handleFontChange()

  storage.onChanged.addListener((changes) => {
    if (changes.font) {
      font = changes.font.newValue
    }

    if (changes[siteName]) {
      isActive = changes[siteName].newValue
    }

    handleFontChange()
  })
}

function handleFontChange() {
  setFontCssVariable(isActive ? font : null)
}

function setFontCssVariable(font: string | null) {
  const FA_FONT_CSS_VAR = '--font'

  if (font) {
    document.documentElement.style.setProperty(FA_FONT_CSS_VAR, font)
    console.log('[FontARA] font changed to', font)
  } else {
    // removeProperty won't work because the var(--font) usage doesn't fallback
    // if no CSS variable is set.
    document.documentElement.style.setProperty(FA_FONT_CSS_VAR, 'none')
    console.log('[FontARA] reset font')
  }
}
