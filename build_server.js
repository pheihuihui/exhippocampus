const es = require('esbuild')

es.build({
    entryPoints: ['./src/server/index.ts'],
    outfile: './dist/server.js',
    minify: true,
    bundle: true,
    tsconfig: './tsconfig.json',
    platform: 'node',
    treeShaking: true
})