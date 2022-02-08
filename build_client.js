const es = require('esbuild')

es.build({
    entryPoints: ['./src/client/index.ts'],
    outfile: './dist/client.js',
    minify: true,
    bundle: true,
    tsconfig: './tsconfig.json',
    platform: 'browser'
})