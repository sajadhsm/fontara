import sass from 'sass'
import fs from 'fs-extra'
import { build } from 'vite'
import { r, log } from './utils'
import { sharedConfig } from '../vite.config'

interface InjectMeta {
  displayName: string
  config: {
    matches: string[]
    run_at: string
    all_frames: boolean
  }
}

const resolveInput = (...args: string[]) =>
  r('src/contentScripts/injects', ...args)
const resolveOutput = (...args: string[]) =>
  r('extension/dist/contentScripts', ...args)

export async function extractContentScriptsManifestConfig() {
  const excludeMatches = []
  const contents = []

  const directories = await fs.readdir(resolveInput())

  for (const dir of directories) {
    const meta = await getInjectMeta(dir)
    excludeMatches.push(...meta.config.matches)
    contents.push({
      ...meta.config,
      js: [`./dist/contentScripts/${dir}/inject.js`],
      css: [`./dist/contentScripts/${dir}/style.css`]
    })
  }

  return [
    // {
    //   matches: ['<all_urls>'],
    //   exclude_matches: excludeMatches
    //   // TODO: Handle global inject script & style
    // },

    ...contents
  ]
}

export async function prepareContentScripts() {
  const directories = await fs.readdir(resolveInput())

  for (const dir of directories) {
    await buildInjectScript(dir)
    await compileStyle(dir)
  }

  await extractInjectsData(directories)

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

async function extractInjectsData(directories: string[]) {
  const displayNames = new Map()

  for (const dir of directories) {
    const meta = await getInjectMeta(dir)
    displayNames.set(dir, meta.displayName)
  }

  const data = `// ---------------------------
// THIS FILE IS AUTO GENERATED
//    DO NOT EDIT DIRECTLY
// ---------------------------

${directories
  .map((dir) => `import ${dir}Logo from './injects/${dir}/logo.png'`)
  .join('\n')}

export default {
  ${directories
    .map(
      (dir) => `${dir}: {
    displayName: '${displayNames.get(dir)}',
    logo: ${dir}Logo
  }`
    )
    .join(',\n\t')}
}
`
  await fs.writeFile(r('src/contentScripts/injectsData.ts'), data, 'utf-8')
}

async function getInjectMeta(directory: string): Promise<InjectMeta> {
  return JSON.parse(
    await fs.readFile(resolveInput(`${directory}/meta.json`), 'utf-8')
  )
}
