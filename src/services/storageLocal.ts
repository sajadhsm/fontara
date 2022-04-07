import { storage } from 'webextension-polyfill'

export const storageLocal = {
  async getItem(key: string) {
    return (await storage.local.get(key))[key]
  },

  setItem(key: string, value: string) {
    return storage.local.set({ [key]: value })
  },

  removeItem(key: string) {
    return storage.local.remove(key)
  }
}
