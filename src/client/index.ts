import { deserializeItem } from "../utilities/data_transfer"

let ifr = document.createElement('iframe')
ifr.height = '1200'
ifr.width = '900'
ifr.style.background = 'white'
ifr.style.border = 'aqua'

document.body.appendChild(ifr)

fetch('/query/pages/title')
    .then(x => x.json())
    .then(x => deserializeItem('general', x))
    .then(x => {
        let tmp = x.details.pageContent
        let blb = new Blob([tmp], { type: 'text/mhtml' })
        ifr.src = 'http://infolab.stanford.edu/pub/papers/google.pdf'
    })
