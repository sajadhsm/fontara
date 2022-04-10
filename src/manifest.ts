import fs from 'fs-extra'
import type { Manifest } from 'webextension-polyfill'
import type PkgType from '../package.json'
import { r, port, isDev } from '../scripts/utils'

export async function getManifest() {
  const pkg = (await fs.readJSON(r('package.json'))) as typeof PkgType

  const manifest: Manifest.WebExtensionManifest = {
    manifest_version: 2,

    name: pkg.displayName || pkg.name,
    description: pkg.description,
    version: pkg.version,
    author: 'Mostafa Alahyari',

    background: {
      page: 'dist/background/index.html',
      persistent: false
    },

    browser_action: {
      default_popup: 'dist/popup/index.html'
    },

    options_ui: {
      page: 'dist/options/index.html',
      open_in_tab: true,
      chrome_style: false
    },

    permissions: ['storage'],

    web_accessible_resources: ['assets/fonts/*.woff', 'assets/fonts/*.woff2'],

    content_security_policy: [
      "object-src 'self'",
      "font-src 'self' data:",
      "style-src 'self' 'unsafe-inline'",
      `script-src 'self' 'unsafe-eval' ${
        isDev ? `http://localhost:${port}` : ''
      }`
    ]
      .map((s) => s.trim())
      .join(';')
  }

  return manifest
}
