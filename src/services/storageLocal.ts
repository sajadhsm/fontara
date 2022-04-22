import { storage } from 'webextension-polyfill'

export const storageLocal = {
  async getItem(key: string) {
    return (await storage.local.get(key))[key]
  },

  getItems(...keys: string[]) {
    return storage.local.get(keys)
  },

  setItem<T>(key: string, value: T) {
    return storage.local.set({ [key]: value })
  },

  removeItem(key: string) {
    return storage.local.remove(key)
  }
}
