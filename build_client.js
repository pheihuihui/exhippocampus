const es = require('esbuild')
const fs = require('fs')

const dir_client = './dist/client'

if (fs.existsSync(dir_client)) {
    fs.rmSync(dir_client, { recursive: true })
}

fs.mkdirSync(dir_client, { recursive: true })
fs.copyFileSync('./asserts/favicon.ico', `${dir_client}/favicon.ico`)
fs.copyFileSync('./asserts/global.css', `${dir_client}/global.css`)
fs.copyFileSync('./asserts/main.html', `${dir_client}/main.html`)

es.build({
    entryPoints: ['./src/client/index.ts'],
    outfile: `${dir_client}/client.js`,
    minify: true,
    bundle: true,
    tsconfig: './tsconfig.json',
    platform: 'browser'
})