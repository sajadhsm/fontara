import { ref, watch } from 'vue'
import { storageLocal } from '~/services/storageLocal'

const STORAGE_FONT_KEY = 'font'

export const useSelectedFont = () => {
  const font = ref('')

  watch(font, (newFont) => storageLocal.setItem(STORAGE_FONT_KEY, newFont))

  async function initializeFont() {
    const savedFont = await storageLocal.getItem(STORAGE_FONT_KEY)
    font.value = savedFont || ''
  }

  initializeFont()

  return font
}
