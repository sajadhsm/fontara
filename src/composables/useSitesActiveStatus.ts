import { ref } from 'vue'
import { storageLocal } from '~/services/storageLocal'
import injectsData from '~/contentScripts/injectsData'

type Sites = keyof typeof injectsData

interface SiteData {
  name: string
  logo: string
  isActive: boolean
  displayName: string
}

export const useSitesActiveStatus = () => {
  const data = ref<SiteData[]>([])

  async function initializeSites() {
    const sites = Object.keys(injectsData) as Sites[]
    const sitesActiveStatus = await storageLocal.getItems(...sites)

    data.value = sites.map((site) => ({
      ...injectsData[site],
      name: site,
      isActive:
        sitesActiveStatus[site] === undefined ? true : sitesActiveStatus[site]
    }))
  }

  function toggleActiveStatus(name: string) {
    const index = data.value.findIndex((item) => item.name === name)
    const newValue = !data.value[index].isActive
    data.value[index].isActive = newValue
    storageLocal.setItem(name, newValue)
  }

  initializeSites()

  return { data, toggleActiveStatus }
}
