// let ifr = document.createElement('iframe')
// ifr.height = '1200'
// ifr.width = '900'
// ifr.style.background = 'white'
// ifr.style.border = 'aqua'

// document.body.appendChild(ifr)

// fetch('/query/pages/title')
//     .then(x => x.json())
//     .then(JSON.parse)
//     .then(x => {
//         let det = x.details
//         if (det.type == 'html') {
//             let frame = ifr.contentWindow
//             let doc = frame?.document
//             if (doc) {
//                 doc.open()
//                 doc.write(det.content)
//                 doc.close()
//             }
//         } else {
//             console.log('not html')
//         }
//     })

import { createRoot } from 'react-dom/client'
import { _app } from '../components/_'

let div = document.createElement('div')
div.style.display = 'flex'
div.style.alignItems = 'center'
div.style.justifyContent = 'center'
div.style.flexDirection = 'column'
div.style.position = 'relative'
div.style.top = '50%'
div.style.transform = 'translateY(-50%)'
document.body.appendChild(div)

const root = createRoot(div)
root.render(_app)