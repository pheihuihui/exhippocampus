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

function show_dialog_exhippocampus() {
    let dialog = document.getElementById(id_dialog) as HTMLDialogElement
    dialog?.showModal()
}

chrome.runtime.onMessage.addListener((mess, sender, sendResp) => {
    console.log(mess)
    sendResp('copy')
})
