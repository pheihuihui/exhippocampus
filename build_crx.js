const es = require('esbuild')
const fs = require('fs')
const sass = require('node-sass')

if (fs.existsSync('./crx')) {
    fs.rmSync('./crx', { recursive: true })
}

fs.mkdirSync('./crx')
fs.copyFileSync('./asserts/chrome-manifest.json', './crx/manifest.json')
fs.copyFileSync('./asserts/icon16.png', './crx/icon16.png')
fs.copyFileSync('./asserts/icon48.png', './crx/icon48.png')
fs.copyFileSync('./asserts/icon128.png', './crx/icon128.png')

es.buildSync({
    entryPoints: ['./src/chrome/content.ts'],
    outfile: './crx/content.js',
    minify: false,
    bundle: true,
    tsconfig: './tsconfig.json'
})

es.buildSync({
    entryPoints: ['./src/chrome/background.ts'],
    outfile: './crx/background.js',
    minify: false,
    bundle: true,
    tsconfig: './tsconfig.json'
})

const src_scss = './src/styles/_crx.scss'
const dist_css = './crx/content.css'

let res = sass.renderSync({ file: src_scss })
let css_content = res.css.toString()

fs.writeFileSync(dist_css, css_content, 'utf-8')