import { readFile } from 'fs'
import { mhtml2html } from '../utilities/mhtml2html'


readFile('./asserts/Google.mhtml', 'utf8', (err, content) => {
    let html = mhtml2html.convert(content)
    console.log(html.serialize())
})
