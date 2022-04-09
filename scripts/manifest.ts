import fs from 'fs-extra'
import { getManifest } from '../src/manifest'
import { r, log } from './utils'

import { extractContentScriptsManifestConfig } from './contentScripts'

export async function writeManifest() {
  const manifest = await getManifest()
  const contentScriptsConfig = await extractContentScriptsManifestConfig()

  const finalManifest = {
    ...manifest,
    content_scripts: contentScriptsConfig
  }

  await fs.writeJSON(r('extension/manifest.json'), finalManifest, {
    spaces: 2
  })

  log('PRE', 'write manifest.json')
}

writeManifest()
