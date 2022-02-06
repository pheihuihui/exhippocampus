const es = require('esbuild')
const fs = require('fs')

if (fs.existsSync('./crx')) {
    fs.rmSync('./crx', { recursive: true })
}

fs.mkdirSync('./crx')
fs.copyFileSync('./chrome-manifest.json', './crx/manifest.json')
fs.copyFileSync('./asserts/icon16.png', './crx/icon16.png')
fs.copyFileSync('./asserts/icon48.png', './crx/icon48.png')
fs.copyFileSync('./asserts/icon128.png', './crx/icon128.png')

es.build({
    entryPoints: ['./src/chrome/content.ts'],
    outfile: './crx/content.js',
    minify: false,
    bundle: false,
    tsconfig: './tsconfig.json'
})

es.build({
    entryPoints: ['./src/chrome/background.ts'],
    outfile: './crx/background.js',
    minify: false,
    bundle: false,
    tsconfig: './tsconfig.json'
})