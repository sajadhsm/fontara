import { ref } from 'vue'

import { storageLocal } from '~/services/storageLocal'

export interface CustomFont {
  name: string
  base64: string
}

const CUSTOM_FONTS_STORAGE_KEY = 'customFonts'

const fonts = ref<CustomFont[]>([])

export function useCustomFont() {
  getCustomFonts()

  async function getCustomFonts() {
    const storedFonts = await storageLocal.getItem(CUSTOM_FONTS_STORAGE_KEY)
    fonts.value = storedFonts || []
  }

  function addFont(font: CustomFont) {
    fonts.value.push(font)
    saveFonts()
  }

  function removeFont(fontName: string) {
    const index = fonts.value.findIndex((font) => font.name === fontName)
    fonts.value.splice(index, 1)
    saveFonts()
  }

  function saveFonts() {
    storageLocal.setItem(CUSTOM_FONTS_STORAGE_KEY, [...fonts.value])
  }

  return { fonts, addFont, removeFont }
}
