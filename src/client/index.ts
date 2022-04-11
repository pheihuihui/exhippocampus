import { deserializeItem } from "../utilities/data_transfer"
import { mhtml2html } from "../utilities/mhtml2html"

let ifr = document.createElement('iframe')
ifr.height = '1200'
ifr.width = '900'
ifr.style.background = 'white'
ifr.style.border = 'aqua'

document.body.appendChild(ifr)

fetch('/query/pages/title')
    .then(x => x.json())
    .then(JSON.parse)
    .then(x => {
        let det = x.details
        if (det.type == 'html') {
            let frame = ifr.contentWindow
            let doc = frame?.document
            if (doc) {
                doc.open()
                doc.write(det.content)
                doc.close()
            }
        } else {
            console.log('not html')
        }
    })
