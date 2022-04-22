import { storage } from 'webextension-polyfill'
import { storageLocal } from '~/services/storageLocal'

const CUSTOM_FONTS_STYLE_TAG_ID = 'custom-fonts'

let isActive = true
let font = 'Vazir'

export async function initialize(siteName: string) {
  const storedValues = await storageLocal.getItems(
    'font',
    'customFonts',
    siteName
  )

  font = storedValues.font
  isActive =
    storedValues[siteName] === undefined ? true : storedValues[siteName]

  handleCustomFonts(storedValues.customFonts)
  handleFontChange()

  storage.onChanged.addListener((changes) => {
    if (changes.font) {
      font = changes.font.newValue
    }

    if (changes[siteName]) {
      isActive = changes[siteName].newValue
    }

    if (changes.customFonts) {
      handleCustomFonts(changes.customFonts.newValue)
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

function handleCustomFonts(customFonts: CustomFont[]) {
  const oldStyleTag = document.getElementById(CUSTOM_FONTS_STYLE_TAG_ID)
  oldStyleTag?.remove()

  if (customFonts.length) {
    const styleTag = createStyleTagForFonts(customFonts)

    document.head
      ? document.head.appendChild(styleTag)
      : document.documentElement.appendChild(styleTag)
  }
}

function createStyleTagForFonts(customFonts: CustomFont[]) {
  const style = document.createElement('style')

  style.id = CUSTOM_FONTS_STYLE_TAG_ID
  style.innerText = customFonts
    .map(
      (font) =>
        `@font-face { font-family: ${font.name}; src: url(${font.base64}); }`
    )
    .join('\n')

  return style
}
