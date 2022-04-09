import sass from 'sass'
import fs from 'fs-extra'
import { build } from 'vite'
import { r, log } from './utils'
import { sharedConfig } from '../vite.config'

const resolveInput = (...args: string[]) =>
  r('src/contentScripts/injects', ...args)
const resolveOutput = (...args: string[]) =>
  r('extension/dist/contentScripts', ...args)

export async function extractContentScriptsManifestConfig() {
  const excludeMatches = []
  const contents = []

  const directories = await fs.readdir(resolveInput())

  for (const dir of directories) {
    const config = JSON.parse(
      await fs.readFile(resolveInput(`${dir}/meta.json`), 'utf-8')
    )

    excludeMatches.push(...config.matches)

    contents.push({
      ...config,
      js: [`./dist/contentScripts/${dir}/inject.js`],
      css: [`./dist/contentScripts/${dir}/style.css`]
    })
  }

  return [
    {
      matches: ['<all_urls>'],
      exclude_matches: excludeMatches
      // TODO: Handle global inject script & style
    },

    ...contents
  ]
}

export async function prepareContentScripts() {
  const directories = await fs.readdir(resolveInput())

  for (const dir of directories) {
    await buildInjectScript(dir)
    await compileStyle(dir)
  }

  log('PRE', `built ${directories.length} content scripts`)
}

async function buildInjectScript(injectDirectory: string) {
  await build({
    ...sharedConfig,
    logLevel: 'warn',
    build: {
      outDir: resolveOutput(`${injectDirectory}`),
      emptyOutDir: false,
      lib: {
        entry: resolveInput(`${injectDirectory}/inject.ts`),
        formats: ['es'],
        fileName: () => 'inject.js'
      }
    }
  })
}

async function compileStyle(injectDirectory: string) {
  const result = sass.compile(resolveInput(`${injectDirectory}/style.scss`))

  fs.writeFile(resolveOutput(`${injectDirectory}/style.css`), result.css)
}
