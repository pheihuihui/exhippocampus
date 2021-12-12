const es = require('esbuild')

es.build({
    entryPoints: ['./src/index.ts'],
    outfile: './dist/bundle.js',
    minify: true,
    bundle: true,
    tsconfig: './tsconfig.json'
})