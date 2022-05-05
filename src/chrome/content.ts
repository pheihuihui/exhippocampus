import { I_MessageResponseMap } from "../meta/chrome"

const id_dialog = 'id_dialog_exhippocampus'

function create_dialog_exhippocampus() {
    let dialog_exhippocampus = document.createElement('dialog')
    dialog_exhippocampus.id = id_dialog
    let butt_insert = document.createElement('button')
    butt_insert.textContent = 'insert'
    let butt_close = document.createElement('button')
    butt_close.textContent = 'close'
    butt_close.addEventListener('click', ev => {
        dialog_exhippocampus.close()
    })
    let text_ = document.createTextNode('hello exhippocampus')
    dialog_exhippocampus.appendChild(text_)
    dialog_exhippocampus.appendChild(butt_insert)
    dialog_exhippocampus.appendChild(butt_close)

    document.body.appendChild(dialog_exhippocampus)
}

create_dialog_exhippocampus()
let dialog = document.getElementById(id_dialog) as HTMLDialogElement

function response2backgroud<K extends keyof I_MessageResponseMap>(
    mess: K,
    sender: chrome.runtime.MessageSender,
    sendResp: (response?: I_MessageResponseMap[K]) => void
) {
    if (mess == 'general') {
        console.log('hi')
    }
    sendResp({
        title: 'hello',
        languages: [''],
        tags: []
    })
}

chrome.runtime.onMessage.addListener(response2backgroud)