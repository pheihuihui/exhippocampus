import { I_MessageResponseMap } from "../meta/chrome"
import { createRoot } from 'react-dom/client'
import { _app } from '../components/_'

function create_dialog_exhippocampus() {
    let div = document.createElement('div')
    div.id = 'exhiroot'
    document.body.appendChild(div)
    const root = createRoot(div)
    root.render(_app)
}

function response2backgroud<K extends keyof I_MessageResponseMap>(
    mess: K,
    sender: chrome.runtime.MessageSender,
    sendResp: (response?: I_MessageResponseMap[K]) => void
) {
    if (mess == 'general') {
        create_dialog_exhippocampus()
        console.log('hi')
    }
    // sendResp({
    //     title: 'hello',
    //     languages: [''],
    //     tags: []
    // })
}

chrome.runtime.onMessage.addListener(response2backgroud)