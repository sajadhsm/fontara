import { runtime, tabs } from 'webextension-polyfill'
import { storageLocal } from '~/services/storageLocal'
import { STORAGE_FONT_KEY } from '~/composables/useSelectedFont'

runtime.onInstalled.addListener((): void => {
  tabs.create({ url: 'https://mimalef70.github.io/fontara#changelogs' })
})

runtime.setUninstallURL(
  'https://docs.google.com/forms/d/e/1FAIpQLSdkUvCG9vfASEits6qeAuH1UdtdAGlLp6I5QfJ4_jbsaKorLQ/viewform'
)

async function initializeFont() {
  const selectedFont = await storageLocal.getItem(STORAGE_FONT_KEY)
  if (!selectedFont) {
    storageLocal.setItem(STORAGE_FONT_KEY, 'Vazir')
  }
}

initializeFont()
