import { insertOneItem } from "../client/request"
import { I_MessageResponseMap } from "../meta/chrome"
import { T_Popup_Form } from "../meta/item"
import { sleep } from "../utilities/others"

const contextMenuId_page = 'id_capture_page'
const contextMenuId_image = 'id_capture_image'

type T_Callback = Parameters<typeof chrome.contextMenus.onClicked.addListener>[0]

chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: contextMenuId_page,
        title: 'capture page',
        contexts: ['page']
    })
    chrome.contextMenus.create({
        id: contextMenuId_image,
        title: 'capture image',
        contexts: ["image"]
    })
})

const listener: T_Callback = async function (info, tab) {
    if (info.menuItemId == contextMenuId_page) {
        let tbid = tab?.id
        if (tbid) {

            let site = info.pageUrl.split('/')[2]

            switch (site) {
                default: break
            }
        }
    }
    if (info.menuItemId == contextMenuId_image) {
        let url = info.srcUrl
        if (url) {
            fetch(url)
                .then(x => x.blob())
                .then(console.log)
        }
    }
}

chrome.contextMenus.onClicked.addListener(listener)

chrome.runtime.onMessage.addListener(async (req: T_Popup_Form, sender, sendResp) => {
    if (req.requestType == 'capture page') {
        let tabs = await chrome.tabs.query({ active: true })
        if (tabs[0] && tabs[0].id) {
            let wd = await chrome.windows.get(tabs[0].windowId)

            if (wd.id) {
                await chrome.windows.update(wd.id, { state: 'normal', height: 1000, width: 1275 })
                await sleep(500)

                let txt = await getContentFromCurrentPage(tabs[0].id)
                await insertOneItem('general', {
                    source: 'general',
                    title: req.data.title,
                    timestamp: Date.now(),
                    language: req.data.languages.length == 0 ? 'none' : req.data.languages,
                    details: {
                        type: 'mhtml',
                        content: txt!
                    },
                    tags: req.data.tags,
                    link: tabs[0].url,
                    relatedPersons: []
                })

                await sleep(500)
                await chrome.windows.update(wd.id, { state: 'maximized' })
            }
        }
    }
})

async function getContentFromCurrentPage(tabid: number) {
    return new Promise<string>((resolve, reject) => {
        chrome.pageCapture.saveAsMHTML({ tabId: tabid }, async data => {
            if (data?.size) {
                let txt = await data.text()
                resolve(txt)
            } else {
                reject('no data')
            }
        })
    })
}

function sendMessageToContent<K extends keyof I_MessageResponseMap>(tab: number, mess: K) {
    return new Promise<I_MessageResponseMap[K]>(resolve => {
        chrome.tabs.sendMessage<K, I_MessageResponseMap[K]>(tab, mess, function (resp) {
            resolve(resp)
        })
    })
}

chrome.commands.onCommand.addListener((command, tab) => {
    console.log(command)
    console.log(tab.id)
})
