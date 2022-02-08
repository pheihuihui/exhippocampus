import * as express from 'express'

const app = express()

const __rootdirname = process.cwd()

app.use(express.static(`${__rootdirname}/dist/client`))

app.listen(30000)