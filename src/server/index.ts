import * as express from 'express'
import { handlerInfos } from './handlers'
import * as cors from 'cors'
import * as bodyParser from 'body-parser'

const app = express()

const __rootdirname = process.cwd()

app.use(express.static(`${__rootdirname}/dist/client`))
app.use(cors())
app.use(bodyParser.text({ limit: '20mb' }))

for (const info of handlerInfos) {
    if (info.type == 'GET') {
        app.get(info.name, info.handler)
    }
    if (info.type == 'POST') {
        app.post(info.name, info.handler)
    }
}

app.listen(30000)